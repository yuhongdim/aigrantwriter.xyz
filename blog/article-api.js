// 文章管理API - 基于文件存储的文章管理系统
class ArticleAPI {
    constructor() {
        this.articlesFile = 'articles-data.json';
        this.articles = [];
        this.loadArticles();
    }

    // 加载文章数据
    async loadArticles() {
        try {
            const response = await fetch(this.articlesFile);
            if (response.ok) {
                const data = await response.json();
                this.articles = data.articles || [];
                console.log('成功加载文章数据:', this.articles.length, '篇文章');
            } else {
                console.log('文章数据文件不存在，使用空数组');
                this.articles = [];
            }
        } catch (error) {
            console.error('加载文章数据失败:', error);
            this.articles = [];
        }
        return this.articles;
    }

    // 保存文章数据到文件
    async saveArticles() {
        try {
            const data = {
                articles: this.articles,
                lastUpdated: new Date().toISOString(),
                version: "1.0"
            };

            // 由于浏览器安全限制，我们需要通过服务器端脚本来保存文件
            // 这里我们使用一个变通的方法：将数据保存到localStorage作为备份
            localStorage.setItem('userArticles', JSON.stringify(this.articles));
            localStorage.setItem('articlesBackup', JSON.stringify(data));
            
            console.log('文章数据已保存到本地存储');
            return true;
        } catch (error) {
            console.error('保存文章数据失败:', error);
            return false;
        }
    }

    // 获取所有文章
    getAllArticles() {
        return this.articles;
    }

    // 根据ID获取文章
    getArticleById(id) {
        return this.articles.find(article => article.id === id);
    }

    // 添加新文章
    async addArticle(articleData) {
        try {
            // 生成唯一ID
            const id = Date.now();
            const newArticle = {
                id: id,
                ...articleData,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            };

            this.articles.unshift(newArticle); // 新文章放在最前面
            await this.saveArticles();
            
            console.log('新文章已添加:', newArticle.title);
            return newArticle;
        } catch (error) {
            console.error('添加文章失败:', error);
            throw error;
        }
    }

    // 更新文章
    async updateArticle(id, updateData) {
        try {
            const index = this.articles.findIndex(article => article.id === id);
            if (index === -1) {
                throw new Error('文章不存在');
            }

            this.articles[index] = {
                ...this.articles[index],
                ...updateData,
                updatedAt: new Date().toISOString()
            };

            await this.saveArticles();
            console.log('文章已更新:', this.articles[index].title);
            return this.articles[index];
        } catch (error) {
            console.error('更新文章失败:', error);
            throw error;
        }
    }

    // 删除文章
    async deleteArticle(id) {
        try {
            const index = this.articles.findIndex(article => article.id === id);
            if (index === -1) {
                throw new Error('文章不存在');
            }

            const deletedArticle = this.articles.splice(index, 1)[0];
            await this.saveArticles();
            
            console.log('文章已删除:', deletedArticle.title);
            return deletedArticle;
        } catch (error) {
            console.error('删除文章失败:', error);
            throw error;
        }
    }

    // 搜索文章
    searchArticles(query) {
        if (!query) return this.articles;
        
        const searchTerm = query.toLowerCase();
        return this.articles.filter(article => {
            const titleMatch = (article.title?.zh || '').toLowerCase().includes(searchTerm) ||
                             (article.title?.en || '').toLowerCase().includes(searchTerm);
            const contentMatch = (article.content || '').toLowerCase().includes(searchTerm);
            const excerptMatch = (article.excerpt?.zh || '').toLowerCase().includes(searchTerm) ||
                                (article.excerpt?.en || '').toLowerCase().includes(searchTerm);
            
            return titleMatch || contentMatch || excerptMatch;
        });
    }

    // 按分类筛选文章
    getArticlesByCategory(category) {
        if (!category || category === 'all') return this.articles;
        return this.articles.filter(article => article.category === category);
    }

    // 导出所有数据
    exportData() {
        return {
            articles: this.articles,
            exportTime: new Date().toISOString(),
            version: "1.0"
        };
    }

    // 导入数据
    async importData(data) {
        try {
            if (!data.articles || !Array.isArray(data.articles)) {
                throw new Error('数据格式错误');
            }

            this.articles = data.articles;
            await this.saveArticles();
            
            console.log('数据导入成功:', this.articles.length, '篇文章');
            return true;
        } catch (error) {
            console.error('数据导入失败:', error);
            throw error;
        }
    }

    // 创建数据备份
    createBackup() {
        const backup = {
            articles: [...this.articles],
            backupTime: new Date().toISOString(),
            version: "1.0"
        };
        
        const backupKey = `articles_backup_${Date.now()}`;
        localStorage.setItem(backupKey, JSON.stringify(backup));
        
        console.log('备份已创建:', backupKey);
        return backupKey;
    }

    // 从localStorage恢复数据（兼容旧系统）
    async restoreFromLocalStorage() {
        try {
            const userArticles = JSON.parse(localStorage.getItem('userArticles') || '[]');
            if (userArticles.length > 0) {
                this.articles = userArticles;
                await this.saveArticles();
                console.log('从localStorage恢复了', userArticles.length, '篇文章');
                return true;
            }
            return false;
        } catch (error) {
            console.error('从localStorage恢复数据失败:', error);
            return false;
        }
    }
}

// 创建全局文章API实例
window.articleAPI = new ArticleAPI();

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', async function() {
    console.log('文章API已初始化');
    
    // 尝试从localStorage恢复数据（用于兼容旧系统）
    await window.articleAPI.restoreFromLocalStorage();
});