// 博客脚本快速版 - 版本 1.3
// 优化性能，快速加载

// 全局变量
let currentLanguage = 'zh';
let currentCategory = 'all';
let currentPage = 1;
const postsPerPage = 6;
let allPosts = [];

console.log('博客脚本快速版 1.3 已加载');

// 精简文章数据 - 只包含最新的6篇文章
const defaultPosts = [
    {
        id: 1,
        title: {
            zh: "2024年AI学术写作完全指南",
            en: "Complete Guide to AI Academic Writing 2024"
        },
        excerpt: {
            zh: "学术论文写作的关键要素和实用技巧，包括选题、文献综述、研究方法等详细指导。",
            en: "Key elements and practical tips for academic paper writing, including topic selection, literature review, and research methods."
        },
        category: "academic-writing",
        categoryName: {
            zh: "学术写作",
            en: "Academic Writing"
        },
        author: {
            zh: "AI Grant Writer 团队",
            en: "AI Grant Writer Team"
        },
        date: "2024-01-20",
        readTime: {
            zh: "8分钟",
            en: "8 min read"
        },
        icon: "fas fa-file-alt",
        url: "ai-academic-writing-guide-2024.html"
    },
    {
        id: 2,
        title: {
            zh: "如何撰写高质量的学术论文摘要",
            en: "How to Write High-Quality Academic Paper Abstracts"
        },
        excerpt: {
            zh: "学术论文摘要写作的完整指南，包括结构安排、关键要素和常见错误避免。",
            en: "Complete guide to writing academic abstracts, including structure, key elements, and common mistakes to avoid."
        },
        category: "academic-writing",
        categoryName: {
            zh: "学术写作",
            en: "Academic Writing"
        },
        author: {
            zh: "Dr. 张教授",
            en: "Dr. Zhang Professor"
        },
        date: "2024-01-18",
        readTime: {
            zh: "7分钟",
            en: "7 min read"
        },
        icon: "fas fa-file-text",
        url: "academic-abstract-writing-guide.html"
    },
    {
        id: 3,
        title: {
            zh: "定性研究方法：从理论到实践",
            en: "Qualitative Research Methods: From Theory to Practice"
        },
        excerpt: {
            zh: "深入探讨定性研究的核心方法论，包括现象学、扎根理论、案例研究等方法。",
            en: "In-depth exploration of core qualitative research methodologies, including phenomenology and grounded theory."
        },
        category: "research-methods",
        categoryName: {
            zh: "研究方法",
            en: "Research Methods"
        },
        author: {
            zh: "Dr. 李研究员",
            en: "Dr. Li Researcher"
        },
        date: "2024-01-16",
        readTime: {
            zh: "12分钟",
            en: "12 min read"
        },
        icon: "fas fa-search",
        url: "qualitative-research-methods.html"
    },
    {
        id: 4,
        title: {
            zh: "学术合作与团队管理技巧",
            en: "Academic Collaboration and Team Management Skills"
        },
        excerpt: {
            zh: "成功学术研究的团队合作策略，包括跨学科合作和冲突处理。",
            en: "Team collaboration strategies for successful academic research, including interdisciplinary cooperation."
        },
        category: "collaboration",
        categoryName: {
            zh: "学术合作",
            en: "Academic Collaboration"
        },
        author: {
            zh: "Prof. 王团队",
            en: "Prof. Wang Team"
        },
        date: "2024-01-14",
        readTime: {
            zh: "9分钟",
            en: "9 min read"
        },
        icon: "fas fa-users",
        url: "academic-collaboration-tips.html"
    },
    {
        id: 5,
        title: {
            zh: "AI工具在学术研究中的应用",
            en: "Applications of AI Tools in Academic Research"
        },
        excerpt: {
            zh: "人工智能技术在学术研究中的具体应用，从文献综述到数据分析。",
            en: "Specific applications of AI technology in academic research, from literature review to data analysis."
        },
        category: "ai-tools",
        categoryName: {
            zh: "AI工具",
            en: "AI Tools"
        },
        author: {
            zh: "Dr. 李明",
            en: "Dr. Li Ming"
        },
        date: "2024-01-12",
        readTime: {
            zh: "6分钟",
            en: "6 min read"
        },
        icon: "fas fa-robot",
        url: "ai-tools-academic-writing.html"
    },
    {
        id: 6,
        title: {
            zh: "研究伦理与学术诚信指南",
            en: "Research Ethics and Academic Integrity Guide"
        },
        excerpt: {
            zh: "学术研究中的伦理规范和诚信要求，确保研究的质量和可信度。",
            en: "Ethical standards and integrity requirements in academic research to ensure quality and credibility."
        },
        category: "ethics",
        categoryName: {
            zh: "研究伦理",
            en: "Research Ethics"
        },
        author: {
            zh: "Prof. 张华",
            en: "Prof. Zhang Hua"
        },
        date: "2024-01-10",
        readTime: {
            zh: "10分钟",
            en: "10 min read"
        },
        icon: "fas fa-balance-scale",
        url: "research-ethics-guide.html"
    }
];

// 语言切换函数
function switchLanguage(lang) {
    console.log('切换语言到:', lang);
    currentLanguage = lang;
    
    // 更新语言按钮状态
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`[onclick="switchLanguage('${lang}')"]`)?.classList.add('active');
    
    // 重新显示文章
    displayPosts();
}

// 分类筛选函数
function filterByCategory(category) {
    console.log('筛选分类:', category);
    currentCategory = category;
    currentPage = 1;
    
    // 更新分类按钮状态
    document.querySelectorAll('.category-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`[onclick="filterByCategory('${category}')"]`)?.classList.add('active');
    
    displayPosts();
}

// 搜索文章函数
function searchArticles() {
    const searchInput = document.getElementById('searchInput');
    const searchTerm = searchInput?.value.toLowerCase().trim();
    
    if (!searchTerm) {
        displayPosts();
        return;
    }
    
    console.log('搜索关键词:', searchTerm);
    
    const filteredPosts = allPosts.filter(post => {
        const title = post.title[currentLanguage].toLowerCase();
        const excerpt = post.excerpt[currentLanguage].toLowerCase();
        const category = post.categoryName[currentLanguage].toLowerCase();
        
        return title.includes(searchTerm) || 
               excerpt.includes(searchTerm) || 
               category.includes(searchTerm);
    });
    
    displayFilteredPosts(filteredPosts);
}

// 显示筛选后的文章
function displayFilteredPosts(posts) {
    const postsGrid = document.getElementById('postsGrid');
    if (!postsGrid) return;
    
    if (posts.length === 0) {
        postsGrid.innerHTML = '<div class="no-results">未找到相关文章</div>';
        return;
    }
    
    postsGrid.innerHTML = posts.map(post => createPostCard(post)).join('');
}

// 创建文章卡片
function createPostCard(post) {
    return `
        <article class="post-card" onclick="openPost('${post.url}')">
            <div class="post-icon">
                <i class="${post.icon}"></i>
            </div>
            <div class="post-content">
                <h3 class="post-title">${post.title[currentLanguage]}</h3>
                <p class="post-excerpt">${post.excerpt[currentLanguage]}</p>
                <div class="post-meta">
                    <span class="post-category">${post.categoryName[currentLanguage]}</span>
                    <span class="post-date">${post.date}</span>
                    <span class="post-read-time">${post.readTime[currentLanguage]}</span>
                </div>
            </div>
        </article>
    `;
}

// 显示文章函数
function displayPosts() {
    const postsGrid = document.getElementById('postsGrid');
    if (!postsGrid) {
        console.log('未找到postsGrid元素');
        return;
    }
    
    console.log('显示文章，当前语言:', currentLanguage, '当前分类:', currentCategory);
    
    let filteredPosts = allPosts;
    
    // 按分类筛选
    if (currentCategory !== 'all') {
        filteredPosts = allPosts.filter(post => post.category === currentCategory);
    }
    
    // 分页处理
    const startIndex = (currentPage - 1) * postsPerPage;
    const endIndex = startIndex + postsPerPage;
    const postsToShow = filteredPosts.slice(startIndex, endIndex);
    
    // 生成HTML
    postsGrid.innerHTML = postsToShow.map(post => createPostCard(post)).join('');
    
    console.log(`显示了 ${postsToShow.length} 篇文章`);
}

// 打开文章函数
function openPost(url) {
    console.log('打开文章:', url);
    if (url) {
        window.location.href = url;
    }
}

// 加载文章数据
function loadPosts() {
    console.log('加载文章数据...');
    allPosts = [...defaultPosts];
    displayPosts();
    console.log('文章数据加载完成，共', allPosts.length, '篇文章');
}

// 初始化博客
function initializeBlog() {
    console.log('初始化博客...');
    
    // 检查是否是博客列表页面
    const postsGrid = document.getElementById('postsGrid');
    if (postsGrid) {
        console.log('检测到博客列表页面，加载文章列表...');
        loadPosts();
    } else {
        console.log('检测到单独文章页面，跳过文章列表加载');
    }
    
    // 设置搜索框事件
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                searchArticles();
            }
        });
    }
    
    console.log('博客初始化完成');
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    console.log('页面加载完成，开始初始化博客...');
    initializeBlog();
});