/**
 * 文章同步服务
 * 负责在本地和线上环境之间同步文章数据
 */
class SyncService {
    constructor() {
        this.syncInterval = 30000; // 30秒同步一次
        this.lastSyncTime = null;
        this.syncTimer = null;
        this.isOnline = navigator.onLine;
        this.pendingChanges = [];
        
        this.init();
    }

    init() {
        console.log('同步服务初始化...');
        
        // 监听网络状态变化
        window.addEventListener('online', () => {
            console.log('网络已连接，开始同步');
            this.isOnline = true;
            this.startSync();
        });

        window.addEventListener('offline', () => {
            console.log('网络已断开，停止同步');
            this.isOnline = false;
            this.stopSync();
        });

        // 监听页面可见性变化
        document.addEventListener('visibilitychange', () => {
            if (document.visibilityState === 'visible' && this.isOnline) {
                this.performSync();
            }
        });

        // 监听localStorage变化
        window.addEventListener('storage', (e) => {
            if (e.key === 'userArticles' || e.key === 'articlesData') {
                console.log('检测到文章数据变化，准备同步');
                this.scheduleSync();
            }
        });

        // 启动定期同步
        if (this.isOnline) {
            this.startSync();
        }

        // 页面卸载时保存待同步的更改
        window.addEventListener('beforeunload', () => {
            this.savePendingChanges();
        });
    }

    startSync() {
        if (this.syncTimer) {
            clearInterval(this.syncTimer);
        }

        // 立即执行一次同步
        this.performSync();

        // 设置定期同步
        this.syncTimer = setInterval(() => {
            this.performSync();
        }, this.syncInterval);

        console.log('自动同步已启动');
    }

    stopSync() {
        if (this.syncTimer) {
            clearInterval(this.syncTimer);
            this.syncTimer = null;
        }
        console.log('自动同步已停止');
    }

    scheduleSync() {
        // 延迟同步，避免频繁操作
        if (this.scheduledSyncTimeout) {
            clearTimeout(this.scheduledSyncTimeout);
        }

        this.scheduledSyncTimeout = setTimeout(() => {
            if (this.isOnline) {
                this.performSync();
            }
        }, 2000);
    }

    async performSync() {
        if (!this.isOnline) {
            console.log('网络不可用，跳过同步');
            return;
        }

        try {
            console.log('开始执行同步...');
            
            // 获取本地数据
            const localData = this.getLocalData();
            
            // 获取远程数据（模拟）
            const remoteData = await this.getRemoteData();
            
            // 比较并合并数据
            const mergedData = this.mergeData(localData, remoteData);
            
            // 更新本地数据
            this.updateLocalData(mergedData);
            
            // 上传到远程（模拟）
            await this.uploadToRemote(mergedData);
            
            this.lastSyncTime = new Date();
            console.log('同步完成:', this.lastSyncTime);
            
            // 触发同步完成事件
            this.dispatchSyncEvent('sync-completed', { 
                timestamp: this.lastSyncTime,
                articlesCount: mergedData.articles.length 
            });

        } catch (error) {
            console.error('同步失败:', error);
            this.dispatchSyncEvent('sync-failed', { error: error.message });
        }
    }

    getLocalData() {
        try {
            // 从localStorage获取文章数据
            const userArticles = JSON.parse(localStorage.getItem('userArticles') || '[]');
            const articlesData = JSON.parse(localStorage.getItem('articlesData') || '{"articles":[],"lastUpdated":"","version":"1.0.0"}');
            
            return {
                articles: [...userArticles, ...articlesData.articles],
                lastUpdated: articlesData.lastUpdated || new Date().toISOString(),
                version: articlesData.version || '1.0.0',
                source: 'local'
            };
        } catch (error) {
            console.error('获取本地数据失败:', error);
            return {
                articles: [],
                lastUpdated: new Date().toISOString(),
                version: '1.0.0',
                source: 'local'
            };
        }
    }

    async getRemoteData() {
        try {
            // 模拟从远程服务器获取数据
            // 在实际应用中，这里会是API调用
            
            // 尝试从当前域获取数据
            const response = await fetch('./articles-data.json?t=' + Date.now(), {
                method: 'GET',
                headers: {
                    'Cache-Control': 'no-cache'
                }
            });
            
            if (response.ok) {
                const data = await response.json();
                return {
                    ...data,
                    source: 'remote'
                };
            } else {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }
        } catch (error) {
            console.log('远程数据不可用，使用本地数据:', error.message);
            return {
                articles: [],
                lastUpdated: '',
                version: '1.0.0',
                source: 'remote'
            };
        }
    }

    mergeData(localData, remoteData) {
        console.log('合并数据...');
        
        // 创建文章映射，用于去重和合并
        const articleMap = new Map();
        
        // 添加远程文章
        remoteData.articles.forEach(article => {
            const key = this.getArticleKey(article);
            articleMap.set(key, { ...article, source: 'remote' });
        });
        
        // 添加本地文章，本地文章优先级更高
        localData.articles.forEach(article => {
            const key = this.getArticleKey(article);
            if (articleMap.has(key)) {
                // 如果远程也有这篇文章，比较更新时间
                const remoteArticle = articleMap.get(key);
                const localTime = new Date(article.lastModified || article.date || 0);
                const remoteTime = new Date(remoteArticle.lastModified || remoteArticle.date || 0);
                
                if (localTime >= remoteTime) {
                    articleMap.set(key, { ...article, source: 'local' });
                }
            } else {
                articleMap.set(key, { ...article, source: 'local' });
            }
        });
        
        const mergedArticles = Array.from(articleMap.values());
        
        return {
            articles: mergedArticles,
            lastUpdated: new Date().toISOString(),
            version: Math.max(
                parseFloat(localData.version || '1.0.0'),
                parseFloat(remoteData.version || '1.0.0')
            ).toFixed(1),
            syncTime: new Date().toISOString()
        };
    }

    getArticleKey(article) {
        // 使用标题和日期作为文章的唯一标识
        const title = article.title?.zh || article.title?.en || article.title || '';
        const date = article.date || '';
        return `${title}-${date}`.toLowerCase().replace(/[^a-z0-9]/g, '-');
    }

    updateLocalData(mergedData) {
        try {
            // 分离用户文章和系统文章
            const userArticles = mergedData.articles.filter(article => 
                article.source === 'local' || article.isUserGenerated
            );
            
            const systemArticles = mergedData.articles.filter(article => 
                article.source !== 'local' && !article.isUserGenerated
            );
            
            // 更新localStorage
            localStorage.setItem('userArticles', JSON.stringify(userArticles));
            localStorage.setItem('articlesData', JSON.stringify({
                articles: systemArticles,
                lastUpdated: mergedData.lastUpdated,
                version: mergedData.version
            }));
            
            console.log('本地数据已更新');
        } catch (error) {
            console.error('更新本地数据失败:', error);
        }
    }

    async uploadToRemote(data) {
        try {
            // 模拟上传到远程服务器
            // 在实际应用中，这里会调用API上传数据
            
            console.log('模拟上传数据到远程服务器...');
            
            // 创建要上传的数据
            const uploadData = {
                articles: data.articles.filter(article => !article.isUserGenerated),
                lastUpdated: data.lastUpdated,
                version: data.version,
                uploadTime: new Date().toISOString()
            };
            
            // 模拟网络延迟
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            console.log('数据上传完成（模拟）');
            
            // 在实际应用中，这里会是真实的API调用
            // const response = await fetch('/api/articles', {
            //     method: 'POST',
            //     headers: { 'Content-Type': 'application/json' },
            //     body: JSON.stringify(uploadData)
            // });
            
        } catch (error) {
            console.error('上传数据失败:', error);
            throw error;
        }
    }

    savePendingChanges() {
        // 保存待同步的更改到localStorage
        if (this.pendingChanges.length > 0) {
            localStorage.setItem('pendingSyncChanges', JSON.stringify(this.pendingChanges));
        }
    }

    loadPendingChanges() {
        try {
            const pending = localStorage.getItem('pendingSyncChanges');
            if (pending) {
                this.pendingChanges = JSON.parse(pending);
                localStorage.removeItem('pendingSyncChanges');
            }
        } catch (error) {
            console.error('加载待同步更改失败:', error);
        }
    }

    dispatchSyncEvent(eventType, data) {
        const event = new CustomEvent(eventType, { detail: data });
        window.dispatchEvent(event);
    }

    // 手动触发同步
    async forcSync() {
        console.log('手动触发同步...');
        await this.performSync();
    }

    // 获取同步状态
    getSyncStatus() {
        return {
            isOnline: this.isOnline,
            lastSyncTime: this.lastSyncTime,
            isRunning: !!this.syncTimer,
            pendingChanges: this.pendingChanges.length
        };
    }

    // 清理资源
    destroy() {
        this.stopSync();
        window.removeEventListener('online', this.handleOnline);
        window.removeEventListener('offline', this.handleOffline);
        document.removeEventListener('visibilitychange', this.handleVisibilityChange);
        window.removeEventListener('storage', this.handleStorageChange);
        window.removeEventListener('beforeunload', this.handleBeforeUnload);
    }
}

// 创建全局同步服务实例
window.syncService = new SyncService();

// 导出供其他模块使用
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SyncService;
}