// Blog articles data
const articles = [
    {
        id: 'academic-abstract-writing-guide',
        title: 'Complete Guide to Academic Abstract Writing',
        excerpt: 'Master the art of writing academic abstracts, including structure, key elements, and common pitfalls to avoid for improved publication success.',
        category: 'writing',
        categoryName: 'Writing Tips',
        date: '2024-01-15',
        readTime: '8 min read',
        icon: '📝',
        url: 'academic-abstract-writing-guide.html'
    },
    {
        id: 'qualitative-research-methods',
        title: 'Complete Guide to Qualitative Research Methods',
        excerpt: 'Explore core qualitative research methodologies, including interview techniques, data analysis, and result presentation for scientific research projects.',
        category: 'research',
        categoryName: 'Research Methods',
        date: '2024-01-12',
        readTime: '12 min read',
        icon: '🔍',
        url: 'qualitative-research-methods.html'
    },
    {
        id: 'ai-academic-writing-guide-2024',
        title: '2024 Complete Guide to AI Academic Writing Tools',
        excerpt: 'Discover how the latest AI writing tools are revolutionizing academic writing processes while maintaining academic integrity and improving efficiency.',
        category: 'tools',
        categoryName: 'AI Tools',
        date: '2024-01-10',
        readTime: '10 min read',
        icon: '🤖',
        url: 'ai-academic-writing-guide-2024.html'
    },
    {
        id: 'academic-collaboration-tips',
        title: 'Academic Collaboration and Team Research Guide',
        excerpt: 'Learn how to build effective academic partnerships, manage interdisciplinary teams, and achieve success in collaborative research projects.',
        category: 'academic',
        categoryName: 'Academic Guidance',
        date: '2024-01-08',
        readTime: '9 min read',
        icon: '🤝',
        url: 'academic-collaboration-tips.html'
    },
    {
        id: 'academic-presentation-guide',
        title: 'Academic Presentation and Conference Speaking Skills',
        excerpt: 'Master the art of academic presentations, from PowerPoint creation to live delivery, ensuring your research gets the best possible showcase.',
        category: 'academic',
        categoryName: 'Academic Guidance',
        date: '2024-01-05',
        readTime: '11 min read',
        icon: '🎤',
        url: 'academic-presentation-guide.html'
    },
    {
        id: 'sci-journal-submission-guide',
        title: 'SCI Journal Submission Strategies and Tips',
        excerpt: 'Learn the complete process of SCI journal submission, including journal selection, manuscript preparation, and peer review response strategies.',
        category: 'academic',
        categoryName: 'Academic Guidance',
        date: '2024-01-03',
        readTime: '15 min read',
        icon: '📄',
        url: 'sci-journal-submission-guide.html'
    }
];

// DOM元素
let articlesGrid, searchInput, filterTags, loading, emptyState;

// 当前筛选状态
let currentCategory = 'all';
let currentSearchTerm = '';

// 初始化
document.addEventListener('DOMContentLoaded', function() {
    loadAllArticles();
    initializeElements();
    setupEventListeners();
    renderArticles();
});

// 加载所有文章（包括localStorage中的新文章）
function loadAllArticles() {
    // 获取localStorage中的文章
    const newArticles = JSON.parse(localStorage.getItem('newArticles') || '[]');
    
    // 调试信息
    console.log('New articles from localStorage:', newArticles);
    console.log('Original articles:', articles);
    
    // 合并文章数组，新文章在前
    window.allArticles = [...newArticles, ...articles];
    
    console.log('All articles after merge:', window.allArticles);
}

// 初始化DOM元素
function initializeElements() {
    articlesGrid = document.getElementById('articlesGrid');
    searchInput = document.getElementById('searchInput');
    loading = document.getElementById('loading');
    emptyState = document.getElementById('emptyState');
    filterTags = document.querySelectorAll('.tag');
}

// 设置事件监听器
function setupEventListeners() {
    // 搜索功能
    if (searchInput) {
        searchInput.addEventListener('input', debounce(handleSearch, 300));
    }
    
    // 分类筛选
    filterTags.forEach(tag => {
        tag.addEventListener('click', () => handleCategoryFilter(tag));
    });
}

// 处理搜索
function handleSearch(event) {
    currentSearchTerm = event.target.value.toLowerCase().trim();
    renderArticles();
}

// 处理分类筛选
function handleCategoryFilter(clickedTag) {
    // 更新活动状态
    filterTags.forEach(tag => tag.classList.remove('active'));
    clickedTag.classList.add('active');
    
    // 更新当前分类
    currentCategory = clickedTag.dataset.category;
    renderArticles();
}

// 渲染文章列表
function renderArticles() {
    if (!articlesGrid) return;
    
    showLoading();
    
    // 模拟加载延迟（实际项目中可以移除）
    setTimeout(() => {
        const filteredArticles = filterArticles();
        
        if (filteredArticles.length === 0) {
            showEmptyState();
        } else {
            displayArticles(filteredArticles);
        }
        
        hideLoading();
    }, 300);
}

// 筛选文章
function filterArticles() {
    const articlesToFilter = window.allArticles || articles;
    return articlesToFilter.filter(article => {
        const matchesCategory = currentCategory === 'all' || article.category === currentCategory;
        const matchesSearch = !currentSearchTerm || 
            article.title.toLowerCase().includes(currentSearchTerm) ||
            article.excerpt.toLowerCase().includes(currentSearchTerm) ||
            article.categoryName.toLowerCase().includes(currentSearchTerm);
        
        return matchesCategory && matchesSearch;
    });
}

// 显示文章列表
function displayArticles(articles) {
    articlesGrid.innerHTML = articles.map(article => createArticleCard(article)).join('');
    articlesGrid.style.display = 'grid';
    emptyState.style.display = 'none';
}

// 创建文章卡片
function createArticleCard(article) {
    // 限制标题长度 - 调整为更短的长度，与其他文章保持一致
    const truncatedTitle = article.title.length > 30 ? 
        article.title.substring(0, 30) + '...' : 
        article.title;
    
    // 检查是否为新发布的文章（通过ID前缀判断）
    const isNewArticle = article.id && article.id.toString().startsWith('new_');
    
    return `
        <article class="article-card">
            ${isNewArticle ? `
                <div class="article-management">
                    <button class="edit-btn" onclick="editArticle('${article.id}')" title="编辑文章">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                        </svg>
                    </button>
                    <button class="delete-btn" onclick="deleteArticle('${article.id}')" title="删除文章">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <polyline points="3,6 5,6 21,6"/>
                            <path d="M19,6v14a2,2,0,0,1-2,2H7a2,2,0,0,1-2-2V6m3,0V4a2,2,0,0,1,2-2h4a2,2,0,0,1,2,2V6"/>
                            <line x1="10" y1="11" x2="10" y2="17"/>
                            <line x1="14" y1="11" x2="14" y2="17"/>
                        </svg>
                    </button>
                </div>
            ` : ''}
            <div class="article-image">
                <span style="font-size: 3rem;">${article.icon}</span>
            </div>
            <div class="article-content">
                <div class="article-meta">
                    <span class="article-category">${article.categoryName}</span>
                    <span>${article.date}</span>
                    <span>${article.readTime}</span>
                </div>
                <h3 class="article-title" title="${article.title}">${truncatedTitle}</h3>
                <p class="article-excerpt">${article.excerpt}</p>
                <div class="article-actions">
                    <a href="article.html?id=${article.id}" class="article-link">
                        Read Full Article
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M5 12h14M12 5l7 7-7 7"/>
                        </svg>
                    </a>
                </div>
            </div>
        </article>
    `;
}

// 显示加载状态
function showLoading() {
    if (loading) loading.style.display = 'flex';
    if (articlesGrid) articlesGrid.style.display = 'none';
    if (emptyState) emptyState.style.display = 'none';
}

// 隐藏加载状态
function hideLoading() {
    if (loading) loading.style.display = 'none';
}

// 显示空状态
function showEmptyState() {
    if (emptyState) emptyState.style.display = 'block';
    if (articlesGrid) articlesGrid.style.display = 'none';
}

// 防抖函数
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// 平滑滚动到顶部
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// 删除文章功能
function deleteArticle(articleId) {
    if (confirm('确定要删除这篇文章吗？此操作不可撤销。')) {
        try {
            // 从localStorage中获取新发布的文章
            const newArticles = JSON.parse(localStorage.getItem('newArticles') || '[]');
            
            // 过滤掉要删除的文章
            const updatedArticles = newArticles.filter(article => article.id !== articleId);
            
            // 更新localStorage
            localStorage.setItem('newArticles', JSON.stringify(updatedArticles));
            
            // 重新加载文章列表
            loadArticles();
            
            alert('文章已成功删除！');
        } catch (error) {
            console.error('删除文章时出错:', error);
            alert('删除文章失败，请重试。');
        }
    }
}

// 编辑文章功能
function editArticle(articleId) {
    try {
        // 从localStorage中获取新发布的文章
        const newArticles = JSON.parse(localStorage.getItem('newArticles') || '[]');
        
        // 找到要编辑的文章
        const articleToEdit = newArticles.find(article => article.id === articleId);
        
        if (articleToEdit) {
            // 将文章数据存储到sessionStorage中，供发布页面使用
            sessionStorage.setItem('editingArticle', JSON.stringify(articleToEdit));
            
            // 跳转到发布页面
            window.location.href = 'publish-article.html?edit=true';
        } else {
            alert('未找到要编辑的文章。');
        }
    } catch (error) {
        console.error('编辑文章时出错:', error);
        alert('编辑文章失败，请重试。');
    }
}

// 导出供其他脚本使用
window.BlogApp = {
    articles,
    renderArticles,
    scrollToTop,
    deleteArticle,
    editArticle
};