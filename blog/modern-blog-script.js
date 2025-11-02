// Modern Blog Script
class ModernBlog {
    constructor() {
        this.articles = [];
        this.filteredArticles = [];
        this.currentFilter = 'all';
        this.currentView = 'grid';
        this.searchTerm = '';
        
        this.init();
    }
    
    init() {
        this.loadArticles();
        this.bindEvents();
        this.updateStats();
        this.initCategories();
    }
    
    // 初始化分类
    initCategories() {
        if (typeof window.ArticleManager !== 'undefined') {
            const categoryData = window.ArticleManager.categories;
            const stats = window.ArticleManager.getArticleStats();
            
            this.categories = [
                { name: "全部", count: stats.total },
                ...Object.keys(categoryData).map(key => ({
                    name: key,
                    count: stats.categories[key] || 0
                }))
            ];
        } else {
            this.categories = [
                { name: "全部", count: 0 },
                { name: "学术写作", count: 0 },
                { name: "研究方法", count: 0 },
                { name: "AI工具", count: 0 },
                { name: "资助申请", count: 0 }
            ];
        }
        
        this.renderCategories();
    }
    
    // 渲染分类
    renderCategories() {
        const categoriesContainer = document.getElementById('categoriesContainer');
        if (!categoriesContainer) return;
        
        categoriesContainer.innerHTML = this.categories.map(category => `
            <div class="category-card" data-category="${category.name}">
                <h3>${category.name}</h3>
                <p>${category.count} 篇文章</p>
            </div>
        `).join('');
    }
    
    // 加载文章数据
    loadArticles() {
        // 使用新的文章数据管理系统
        if (typeof window.ArticleManager !== 'undefined') {
            this.articles = window.ArticleManager.getAllArticles();
        } else {
            console.warn('ArticleManager not found, using fallback data');
            this.articles = [];
        }
        
        this.filteredArticles = [...this.articles];
        this.renderArticles();
        this.renderFeaturedArticles();
    }
    
    // 绑定事件
    bindEvents() {
        // 搜索功能
        const searchInput = document.getElementById('heroSearch');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.searchTerm = e.target.value.toLowerCase();
                this.filterArticles();
            });
        }
        
        // 分类筛选
        document.querySelectorAll('.category-card').forEach(card => {
            card.addEventListener('click', (e) => {
                const category = e.currentTarget.dataset.category;
                this.setFilter(category);
            });
        });
        
        // 文章筛选按钮
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const filter = e.currentTarget.dataset.filter;
                this.setArticleFilter(filter);
            });
        });
        
        // 视图切换
        document.querySelectorAll('.view-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const view = e.currentTarget.dataset.view;
                this.setView(view);
            });
        });
        
        // 文章卡片点击
        document.addEventListener('click', (e) => {
            const articleCard = e.target.closest('.article-card');
            if (articleCard) {
                const url = articleCard.dataset.url;
                if (url) {
                    window.location.href = url;
                }
            }
        });
        
        // 订阅功能
        const newsletterBtn = document.querySelector('.newsletter-btn');
        if (newsletterBtn) {
            newsletterBtn.addEventListener('click', this.handleSubscribe.bind(this));
        }
    }
    
    // 设置分类筛选
    setFilter(category) {
        this.currentFilter = category;
        this.filterArticles();
        
        // 更新分类卡片状态
        document.querySelectorAll('.category-card').forEach(card => {
            card.classList.remove('active');
        });
        document.querySelector(`[data-category="${category}"]`).classList.add('active');
        
        // 滚动到文章区域
        document.querySelector('.articles-section').scrollIntoView({ 
            behavior: 'smooth' 
        });
    }
    
    // 设置文章筛选
    setArticleFilter(filter) {
        this.currentArticleFilter = filter;
        this.filterArticles();
        
        // 更新按钮状态
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-filter="${filter}"]`).classList.add('active');
    }
    
    // 设置视图模式
    setView(view) {
        this.currentView = view;
        
        // 更新按钮状态
        document.querySelectorAll('.view-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-view="${view}"]`).classList.add('active');
        
        // 更新网格样式
        const grid = document.getElementById('articlesGrid');
        if (view === 'list') {
            grid.classList.add('list-view');
        } else {
            grid.classList.remove('list-view');
        }
    }
    
    // 搜索文章
    searchArticles(query) {
        if (!query.trim()) {
            this.filteredArticles = [...this.articles];
        } else if (typeof window.ArticleManager !== 'undefined') {
            this.filteredArticles = window.ArticleManager.searchArticles(query);
        } else {
            // 备用搜索逻辑
            const lowercaseQuery = query.toLowerCase();
            this.filteredArticles = this.articles.filter(article => 
                article.title.toLowerCase().includes(lowercaseQuery) ||
                article.excerpt.toLowerCase().includes(lowercaseQuery) ||
                (article.tags && article.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery)))
            );
        }
        
        this.renderArticles();
        this.updateStats();
    }
    
    // 筛选文章
    filterArticles() {
        let filtered = [...this.articles];
        
        // 按分类筛选
        if (this.currentFilter !== 'all') {
            if (typeof window.ArticleManager !== 'undefined') {
                filtered = window.ArticleManager.getArticlesByCategory(this.currentFilter);
            } else {
                filtered = filtered.filter(article => article.category === this.currentFilter);
            }
        }
        
        // 按搜索词筛选
        if (this.searchTerm) {
            if (typeof window.ArticleManager !== 'undefined') {
                filtered = window.ArticleManager.searchArticles(this.searchTerm);
                if (this.currentFilter !== 'all') {
                    filtered = filtered.filter(article => article.category === this.currentFilter);
                }
            } else {
                filtered = filtered.filter(article => 
                    article.title.toLowerCase().includes(this.searchTerm) ||
                    article.excerpt.toLowerCase().includes(this.searchTerm) ||
                    (article.tags && article.tags.some(tag => tag.toLowerCase().includes(this.searchTerm)))
                );
            }
        }
        
        // 按文章筛选条件
        if (this.currentArticleFilter === 'latest') {
            filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
        } else if (this.currentArticleFilter === 'popular') {
            filtered = filtered.filter(article => article.popular);
        }
        
        this.filteredArticles = filtered;
        this.renderArticles();
        this.showEmptyState(filtered.length === 0);
    }
    
    // 渲染文章列表
    renderArticles() {
        const grid = document.getElementById('articlesGrid');
        const loading = document.getElementById('loadingState');
        
        if (loading) loading.style.display = 'none';
        
        if (this.filteredArticles.length === 0) {
            grid.innerHTML = '';
            return;
        }
        
        grid.innerHTML = this.filteredArticles.map(article => `
            <article class="article-card" data-url="${article.url}">
                <div class="article-image">
                    <i class="${article.icon}"></i>
                </div>
                <div class="article-content">
                    <div class="article-meta">
                        <span class="article-category">${article.categoryName}</span>
                        <span class="article-date">${this.formatDate(article.date)}</span>
                        <span class="article-read-time">
                            <i class="fas fa-clock"></i>
                            ${article.readTime}
                        </span>
                    </div>
                    <h3 class="article-title">${article.title}</h3>
                    <p class="article-excerpt">${article.excerpt}</p>
                    <div class="article-footer">
                        <span class="article-author">
                            <i class="fas fa-user"></i>
                            ${article.author}
                        </span>
                        <a href="${article.url}" class="read-more">
                            阅读更多
                            <i class="fas fa-arrow-right"></i>
                        </a>
                    </div>
                </div>
            </article>
        `).join('');
    }
    
    // 渲染精选文章
    renderFeaturedArticles() {
        const featuredContainer = document.getElementById('featuredArticles');
        if (!featuredContainer) return;
        
        let featuredArticles;
        if (typeof window.ArticleManager !== 'undefined') {
            featuredArticles = window.ArticleManager.getFeaturedArticles();
        } else {
            featuredArticles = this.articles.filter(article => article.featured);
        }
        
        if (featuredArticles.length === 0) {
            featuredContainer.innerHTML = '<p class="no-articles">暂无精选文章</p>';
            return;
        }
        
        featuredContainer.innerHTML = featuredArticles.map(article => `
            <article class="featured-article" onclick="window.location.href='${article.url}'">
                <div class="article-image">
                    <img src="${article.image || '../images/default-article.jpg'}" alt="${article.title}" loading="lazy">
                    <div class="article-category">${article.category}</div>
                </div>
                <div class="article-content">
                    <h3>${article.title}</h3>
                    <p class="article-excerpt">${article.excerpt}</p>
                    <div class="article-meta">
                        <span class="author">${article.author}</span>
                        <span class="date">${this.formatDate(article.publishDate || article.date)}</span>
                        <span class="read-time">${article.readTime}</span>
                    </div>
                </div>
            </article>
        `).join('');
    }
    
    // 更新统计数据
    updateStats() {
        const categories = {
            all: this.articles.length,
            writing: this.articles.filter(a => a.category === 'writing').length,
            research: this.articles.filter(a => a.category === 'research').length,
            tools: this.articles.filter(a => a.category === 'tools').length,
            academic: this.articles.filter(a => a.category === 'academic').length
        };
        
        // 更新总文章数
        const totalElement = document.getElementById('totalArticles');
        if (totalElement) totalElement.textContent = categories.all;
        
        // 更新分类统计
        Object.keys(categories).forEach(category => {
            const element = document.getElementById(`${category}Count`);
            if (element) {
                element.textContent = `${categories[category]} 篇文章`;
            }
        });
    }
    
    // 显示空状态
    showEmptyState(show) {
        const emptyState = document.getElementById('emptyState');
        if (emptyState) {
            emptyState.style.display = show ? 'block' : 'none';
        }
    }
    
    // 格式化日期
    formatDate(dateString) {
        const date = new Date(dateString);
        const now = new Date();
        const diffTime = Math.abs(now - date);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        
        if (diffDays === 1) return '昨天';
        if (diffDays < 7) return `${diffDays}天前`;
        if (diffDays < 30) return `${Math.floor(diffDays / 7)}周前`;
        if (diffDays < 365) return `${Math.floor(diffDays / 30)}个月前`;
        
        return date.toLocaleDateString('zh-CN');
    }
    
    // 处理订阅
    handleSubscribe() {
        const emailInput = document.querySelector('.newsletter-input');
        const email = emailInput.value.trim();
        
        if (!email) {
            alert('请输入邮箱地址');
            return;
        }
        
        if (!this.isValidEmail(email)) {
            alert('请输入有效的邮箱地址');
            return;
        }
        
        // 模拟订阅处理
        alert('订阅成功！感谢您的关注。');
        emailInput.value = '';
    }
    
    // 验证邮箱格式
    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
}

// 清除搜索
function clearSearch() {
    const searchInput = document.getElementById('heroSearch');
    if (searchInput) {
        searchInput.value = '';
        blog.searchTerm = '';
        blog.filterArticles();
    }
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
    window.blog = new ModernBlog();
    
    // 添加平滑滚动
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // 添加滚动动画
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // 观察需要动画的元素
    document.querySelectorAll('.article-card, .category-card, .section-header').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});