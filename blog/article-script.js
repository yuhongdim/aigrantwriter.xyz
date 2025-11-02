// Article Page Script
class ArticlePage {
    constructor() {
        this.init();
    }
    
    init() {
        this.setupTableOfContents();
        this.setupScrollSpy();
        this.setupShareButtons();
        this.setupCommentForm();
        this.setupReadingProgress();
        this.setupMobileMenu();
        this.setupSmoothScrolling();
    }
    
    // 设置目录功能
    setupTableOfContents() {
        const tocContainer = document.querySelector('.table-of-contents ul');
        const headings = document.querySelectorAll('.content-section h2, .content-section h3');
        
        if (!tocContainer || headings.length === 0) return;
        
        // 清空现有目录
        tocContainer.innerHTML = '';
        
        headings.forEach((heading, index) => {
            // 为标题添加ID
            if (!heading.id) {
                heading.id = `heading-${index}`;
            }
            
            const li = document.createElement('li');
            const a = document.createElement('a');
            a.href = `#${heading.id}`;
            a.textContent = heading.textContent;
            a.className = heading.tagName.toLowerCase() === 'h3' ? 'sub-heading' : '';
            
            li.appendChild(a);
            tocContainer.appendChild(li);
        });
    }
    
    // 设置滚动监听
    setupScrollSpy() {
        const tocLinks = document.querySelectorAll('.table-of-contents a');
        const headings = document.querySelectorAll('.content-section h2, .content-section h3');
        
        if (tocLinks.length === 0 || headings.length === 0) return;
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                const id = entry.target.id;
                const tocLink = document.querySelector(`.table-of-contents a[href="#${id}"]`);
                
                if (entry.isIntersecting) {
                    // 移除所有活动状态
                    tocLinks.forEach(link => link.classList.remove('active'));
                    // 添加当前活动状态
                    if (tocLink) {
                        tocLink.classList.add('active');
                    }
                }
            });
        }, {
            rootMargin: '-20% 0px -80% 0px'
        });
        
        headings.forEach(heading => {
            observer.observe(heading);
        });
    }
    
    // 设置分享按钮
    setupShareButtons() {
        const shareButtons = document.querySelectorAll('.share-btn');
        
        shareButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const type = btn.classList.contains('wechat') ? 'wechat' :
                           btn.classList.contains('weibo') ? 'weibo' : 'copy';
                
                this.handleShare(type);
            });
        });
    }
    
    // 处理分享功能
    handleShare(type) {
        const url = window.location.href;
        const title = document.title;
        const description = document.querySelector('meta[name="description"]')?.content || '';
        
        switch (type) {
            case 'wechat':
                // 微信分享（显示二维码或复制链接）
                this.showWechatShare(url);
                break;
                
            case 'weibo':
                // 微博分享
                const weiboUrl = `https://service.weibo.com/share/share.php?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}&pic=&appkey=`;
                window.open(weiboUrl, '_blank', 'width=600,height=400');
                break;
                
            case 'copy':
                // 复制链接
                this.copyToClipboard(url);
                break;
        }
    }
    
    // 显示微信分享
    showWechatShare(url) {
        // 创建模态框显示二维码或复制提示
        const modal = document.createElement('div');
        modal.className = 'share-modal';
        modal.innerHTML = `
            <div class="share-modal-content">
                <div class="share-modal-header">
                    <h3>分享到微信</h3>
                    <button class="close-btn">&times;</button>
                </div>
                <div class="share-modal-body">
                    <p>复制链接到微信分享：</p>
                    <div class="copy-link-container">
                        <input type="text" value="${url}" readonly>
                        <button class="copy-btn">复制</button>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // 绑定事件
        modal.querySelector('.close-btn').addEventListener('click', () => {
            document.body.removeChild(modal);
        });
        
        modal.querySelector('.copy-btn').addEventListener('click', () => {
            this.copyToClipboard(url);
            document.body.removeChild(modal);
        });
        
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                document.body.removeChild(modal);
            }
        });
    }
    
    // 复制到剪贴板
    async copyToClipboard(text) {
        try {
            await navigator.clipboard.writeText(text);
            this.showToast('链接已复制到剪贴板');
        } catch (err) {
            // 降级方案
            const textArea = document.createElement('textarea');
            textArea.value = text;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            this.showToast('链接已复制到剪贴板');
        }
    }
    
    // 显示提示消息
    showToast(message) {
        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.textContent = message;
        
        document.body.appendChild(toast);
        
        // 显示动画
        setTimeout(() => {
            toast.classList.add('show');
        }, 100);
        
        // 自动隐藏
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => {
                if (document.body.contains(toast)) {
                    document.body.removeChild(toast);
                }
            }, 300);
        }, 3000);
    }
    
    // 设置评论表单
    setupCommentForm() {
        const commentForm = document.querySelector('.comment-form form');
        
        if (!commentForm) return;
        
        commentForm.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleCommentSubmit(commentForm);
        });
        
        // 设置点赞和回复按钮
        document.querySelectorAll('.like-btn').forEach(btn => {
            btn.addEventListener('click', this.handleLike.bind(this));
        });
        
        document.querySelectorAll('.reply-btn').forEach(btn => {
            btn.addEventListener('click', this.handleReply.bind(this));
        });
    }
    
    // 处理评论提交
    handleCommentSubmit(form) {
        const formData = new FormData(form);
        const name = formData.get('name') || form.querySelector('input[type="text"]').value;
        const email = formData.get('email') || form.querySelector('input[type="email"]').value;
        const comment = formData.get('comment') || form.querySelector('textarea').value;
        
        // 验证表单
        if (!name.trim() || !email.trim() || !comment.trim()) {
            this.showToast('请填写所有必填字段');
            return;
        }
        
        if (!this.isValidEmail(email)) {
            this.showToast('请输入有效的邮箱地址');
            return;
        }
        
        // 模拟提交
        this.showToast('评论提交成功，等待审核');
        form.reset();
        
        // 实际应用中应该发送到服务器
        console.log('Comment submitted:', { name, email, comment });
    }
    
    // 验证邮箱
    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // 处理点赞
    handleLike(e) {
        const btn = e.currentTarget;
        const countSpan = btn.querySelector('span') || btn;
        const currentCount = parseInt(countSpan.textContent.match(/\d+/)?.[0] || '0');
        
        // 切换点赞状态
        if (btn.classList.contains('liked')) {
            btn.classList.remove('liked');
            countSpan.innerHTML = `<i class="fas fa-thumbs-up"></i> 赞 (${currentCount - 1})`;
        } else {
            btn.classList.add('liked');
            countSpan.innerHTML = `<i class="fas fa-thumbs-up"></i> 赞 (${currentCount + 1})`;
        }
    }
    
    // 处理回复
    handleReply(e) {
        const btn = e.currentTarget;
        const commentItem = btn.closest('.comment-item');
        const authorName = commentItem.querySelector('.comment-author').textContent;
        
        // 滚动到评论表单
        const commentForm = document.querySelector('.comment-form');
        if (commentForm) {
            commentForm.scrollIntoView({ behavior: 'smooth' });
            
            // 在评论框中添加回复前缀
            const textarea = commentForm.querySelector('textarea');
            if (textarea) {
                textarea.value = `@${authorName} `;
                textarea.focus();
            }
        }
    }
    
    // 设置阅读进度
    setupReadingProgress() {
        const progressBar = document.createElement('div');
        progressBar.className = 'reading-progress';
        document.body.appendChild(progressBar);
        
        window.addEventListener('scroll', () => {
            const article = document.querySelector('.article-content');
            if (!article) return;
            
            const articleTop = article.offsetTop;
            const articleHeight = article.offsetHeight;
            const windowHeight = window.innerHeight;
            const scrollTop = window.pageYOffset;
            
            const progress = Math.max(0, Math.min(100, 
                ((scrollTop - articleTop + windowHeight) / articleHeight) * 100
            ));
            
            progressBar.style.width = `${progress}%`;
        });
    }
    
    // 设置移动端菜单
    setupMobileMenu() {
        const navToggle = document.querySelector('.nav-toggle');
        const navMenu = document.querySelector('.nav-menu');
        
        if (!navToggle || !navMenu) return;
        
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
        
        // 点击菜单项时关闭菜单
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            });
        });
    }
    
    // 设置平滑滚动
    setupSmoothScrolling() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                
                if (target) {
                    const offsetTop = target.offsetTop - 100; // 考虑固定导航栏
                    
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
}

// 全局分享函数（供HTML调用）
window.shareToWechat = function() {
    if (window.articlePage) {
        window.articlePage.handleShare('wechat');
    }
};

window.shareToWeibo = function() {
    if (window.articlePage) {
        window.articlePage.handleShare('weibo');
    }
};

window.copyLink = function() {
    if (window.articlePage) {
        window.articlePage.handleShare('copy');
    }
};

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
    window.articlePage = new ArticlePage();
    
    // 添加必要的CSS样式
    const style = document.createElement('style');
    style.textContent = `
        /* 分享模态框样式 */
        .share-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 1000;
        }
        
        .share-modal-content {
            background: white;
            border-radius: 0.75rem;
            padding: 0;
            max-width: 400px;
            width: 90%;
            box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
        }
        
        .share-modal-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 1.5rem;
            border-bottom: 1px solid #e2e8f0;
        }
        
        .share-modal-header h3 {
            margin: 0;
            font-size: 1.125rem;
            font-weight: 600;
        }
        
        .close-btn {
            background: none;
            border: none;
            font-size: 1.5rem;
            cursor: pointer;
            color: #64748b;
            padding: 0;
            width: 2rem;
            height: 2rem;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .share-modal-body {
            padding: 1.5rem;
        }
        
        .copy-link-container {
            display: flex;
            gap: 0.5rem;
            margin-top: 1rem;
        }
        
        .copy-link-container input {
            flex: 1;
            padding: 0.5rem;
            border: 1px solid #e2e8f0;
            border-radius: 0.375rem;
            font-size: 0.875rem;
        }
        
        .copy-btn {
            background: #2563eb;
            color: white;
            border: none;
            padding: 0.5rem 1rem;
            border-radius: 0.375rem;
            cursor: pointer;
            font-size: 0.875rem;
        }
        
        /* 提示消息样式 */
        .toast {
            position: fixed;
            top: 2rem;
            right: 2rem;
            background: #1f2937;
            color: white;
            padding: 0.75rem 1.5rem;
            border-radius: 0.5rem;
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
            z-index: 1000;
            transform: translateX(100%);
            opacity: 0;
            transition: all 0.3s ease;
        }
        
        .toast.show {
            transform: translateX(0);
            opacity: 1;
        }
        
        /* 阅读进度条样式 */
        .reading-progress {
            position: fixed;
            top: 0;
            left: 0;
            width: 0%;
            height: 3px;
            background: #2563eb;
            z-index: 100;
            transition: width 0.1s ease;
        }
        
        /* 点赞按钮样式 */
        .like-btn.liked {
            color: #ef4444;
        }
        
        /* 移动端菜单样式 */
        @media (max-width: 768px) {
            .nav-menu {
                position: absolute;
                top: 100%;
                left: 0;
                right: 0;
                background: white;
                border: 1px solid #e2e8f0;
                border-top: none;
                flex-direction: column;
                padding: 1rem;
                gap: 1rem;
                transform: translateY(-10px);
                opacity: 0;
                visibility: hidden;
                transition: all 0.2s ease;
            }
            
            .nav-menu.active {
                transform: translateY(0);
                opacity: 1;
                visibility: visible;
            }
            
            .nav-toggle.active {
                color: #2563eb;
            }
        }
    `;
    document.head.appendChild(style);
});