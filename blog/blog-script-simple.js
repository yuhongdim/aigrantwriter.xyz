// 博客脚本简化版 - 版本 1.2
// 专注于核心文章显示功能

// 全局变量
let currentLanguage = 'zh';
let currentCategory = 'all';
let currentPage = 1;
const postsPerPage = 6;
let allPosts = [];

console.log('博客脚本简化版 1.2 已加载 - 时间戳:', Date.now());

// 文章数据 - 包含所有已发布的博文
const defaultPosts = [
    {
        id: 1,
        title: {
            zh: "2024年AI学术写作完全指南：提升研究效率的10个关键策略",
            en: "Complete Guide to AI Academic Writing 2024: 10 Key Strategies to Boost Research Efficiency"
        },
        excerpt: {
            zh: "学术论文写作是研究工作的重要组成部分，本文将介绍撰写高质量学术论文的关键要素和实用技巧，包括选题、文献综述、研究方法、数据分析和结论撰写等方面的详细指导。",
            en: "Academic paper writing is an essential part of research work. This article introduces key elements and practical tips for writing high-quality academic papers, including detailed guidance on topic selection, literature review, research methods, data analysis, and conclusion writing."
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
        date: "2024-01-15",
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
            zh: "AI工具在学术研究中的应用",
            en: "Applications of AI Tools in Academic Research"
        },
        excerpt: {
            zh: "人工智能技术正在革命性地改变学术研究的方式，从文献综述到数据分析，AI工具为研究者提供了强大的支持。本文探讨了各种AI工具在不同研究阶段的具体应用。",
            en: "Artificial intelligence technology is revolutionizing the way academic research is conducted, providing powerful support for researchers from literature review to data analysis. This article explores specific applications of various AI tools at different research stages."
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
        date: "2024-01-10",
        readTime: {
            zh: "6分钟",
            en: "6 min read"
        },
        icon: "fas fa-robot",
        url: "ai-tools-academic-writing.html"
    },
    {
        id: 3,
        title: {
            zh: "研究伦理与学术诚信指南",
            en: "Research Ethics and Academic Integrity Guide"
        },
        excerpt: {
            zh: "获得研究资助是学术生涯的重要里程碑。本文分享申请研究资助的实用策略和注意事项，包括项目规划、预算制定、申请书撰写等关键环节。",
            en: "Obtaining research funding is an important milestone in academic careers. This article shares practical strategies and considerations for applying for research grants, including project planning, budget development, and proposal writing."
        },
        category: "grant-writing",
        categoryName: {
            zh: "资助申请",
            en: "Grant Writing"
        },
        author: {
            zh: "Prof. 张华",
            en: "Prof. Zhang Hua"
        },
        date: "2024-01-05",
        readTime: {
            zh: "10分钟",
            en: "10 min read"
        },
        icon: "fas fa-money-bill-wave",
        url: "research-ethics-guide.html"
    },
    {
        id: 4,
        title: {
            zh: "如何撰写高质量的学术论文摘要",
            en: "How to Write High-Quality Academic Paper Abstracts"
        },
        excerpt: {
            zh: "学术论文摘要是读者了解您研究的第一印象。本文详细介绍如何撰写清晰、简洁且有吸引力的论文摘要，包括结构安排、关键要素和常见错误避免。",
            en: "Academic paper abstracts are the first impression readers have of your research. This article provides detailed guidance on writing clear, concise, and compelling abstracts, including structure, key elements, and common mistakes to avoid."
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
        date: "2024-01-20",
        readTime: {
            zh: "7分钟",
            en: "7 min read"
        },
        icon: "fas fa-file-text",
        url: "academic-abstract-writing-guide.html"
    },
    {
        id: 5,
        title: {
            zh: "定性研究方法：从理论到实践",
            en: "Qualitative Research Methods: From Theory to Practice"
        },
        excerpt: {
            zh: "深入探讨定性研究的核心方法论，包括现象学、扎根理论、案例研究等方法的应用场景、数据收集技巧和分析策略。",
            en: "In-depth exploration of core qualitative research methodologies, including phenomenology, grounded theory, case studies, and their application scenarios, data collection techniques, and analysis strategies."
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
        date: "2024-01-18",
        readTime: {
            zh: "12分钟",
            en: "12 min read"
        },
        icon: "fas fa-search",
        url: "qualitative-research-methods.html"
    },
    {
        id: 6,
        title: {
            zh: "学术合作与团队管理技巧",
            en: "Academic Collaboration and Team Management Skills"
        },
        excerpt: {
            zh: "成功的学术研究往往需要团队合作。本文分享如何建立高效的研究团队，管理跨学科合作项目，以及处理团队冲突的实用策略。",
            en: "Successful academic research often requires teamwork. This article shares how to build efficient research teams, manage interdisciplinary collaborative projects, and practical strategies for handling team conflicts."
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
        date: "2024-01-16",
        readTime: {
            zh: "9分钟",
            en: "9 min read"
        },
        icon: "fas fa-users",
        url: "academic-collaboration-tips.html"
    },
    {
        id: 7,
        title: {
            zh: "学术演讲技巧指南",
            en: "Academic Presentation Skills Guide"
        },
        excerpt: {
            zh: "学术演讲是研究者展示成果、交流思想的重要平台。本文提供从准备到实施的全面指导，帮助您提升演讲效果和学术影响力。",
            en: "Academic presentations are important platforms for researchers to showcase results and exchange ideas. This article provides comprehensive guidance from preparation to implementation, helping you improve presentation effectiveness and academic impact."
        },
        category: "presentation",
        categoryName: {
            zh: "学术演讲",
            en: "Academic Presentation"
        },
        author: {
            zh: "Dr. 陈演讲",
            en: "Dr. Chen Speaker"
        },
        date: "2024-01-14",
        readTime: {
            zh: "8分钟",
            en: "8 min read"
        },
        icon: "fas fa-presentation",
        url: "academic-presentation-guide.html"
    },
    {
        id: 8,
        title: {
            zh: "SCI期刊投稿策略与技巧",
            en: "SCI Journal Submission Strategies and Techniques"
        },
        excerpt: {
            zh: "成功发表SCI论文是学术生涯的重要目标。本文详细介绍期刊选择、投稿准备、审稿回复等关键环节的策略和技巧。",
            en: "Successfully publishing SCI papers is an important goal in academic careers. This article provides detailed strategies and techniques for journal selection, submission preparation, and reviewer response."
        },
        category: "publication",
        categoryName: {
            zh: "学术发表",
            en: "Academic Publication"
        },
        author: {
            zh: "Prof. 刘编辑",
            en: "Prof. Liu Editor"
        },
        date: "2024-01-12",
        readTime: {
            zh: "11分钟",
            en: "11 min read"
        },
        icon: "fas fa-journal-whills",
        url: "sci-journal-submission-guide.html"
    },
    {
        id: 9,
        title: {
            zh: "SPSS统计分析完整教程",
            en: "Complete SPSS Statistical Analysis Tutorial"
        },
        excerpt: {
            zh: "SPSS是社会科学研究中最常用的统计软件之一。本教程从基础操作到高级分析，全面介绍SPSS在学术研究中的应用。",
            en: "SPSS is one of the most commonly used statistical software in social science research. This tutorial comprehensively introduces SPSS applications in academic research, from basic operations to advanced analysis."
        },
        category: "data-analysis",
        categoryName: {
            zh: "数据分析",
            en: "Data Analysis"
        },
        author: {
            zh: "Dr. 统计师",
            en: "Dr. Statistician"
        },
        date: "2024-01-08",
        readTime: {
            zh: "15分钟",
            en: "15 min read"
        },
        icon: "fas fa-chart-bar",
        url: "spss-tutorial-guide.html"
    },
    {
        id: 10,
        title: {
            zh: "顶级学术数据库使用指南",
            en: "Guide to Using Top Academic Databases"
        },
        excerpt: {
            zh: "高质量的文献检索是学术研究的基础。本文介绍主要学术数据库的特点、检索技巧和高效利用方法，助您快速找到相关研究。",
            en: "High-quality literature search is the foundation of academic research. This article introduces the characteristics, search techniques, and efficient utilization methods of major academic databases to help you quickly find relevant research."
        },
        category: "research-tools",
        categoryName: {
            zh: "研究工具",
            en: "Research Tools"
        },
        author: {
            zh: "图书馆员 小李",
            en: "Librarian Li"
        },
        date: "2024-01-06",
        readTime: {
            zh: "10分钟",
            en: "10 min read"
        },
        icon: "fas fa-database",
        url: "academic-databases-guide.html"
    },
    {
        id: 11,
        title: {
            zh: "AI工具在学术写作中的应用前景",
            en: "Future Prospects of AI Tools in Academic Writing"
        },
        excerpt: {
            zh: "探索人工智能技术在学术写作领域的最新发展和未来趋势，分析AI工具如何改变传统的研究和写作模式。",
            en: "Explore the latest developments and future trends of artificial intelligence technology in academic writing, analyzing how AI tools are changing traditional research and writing patterns."
        },
        category: "ai-tools",
        categoryName: {
            zh: "AI工具",
            en: "AI Tools"
        },
        author: {
            zh: "AI研究团队",
            en: "AI Research Team"
        },
        date: "2024-01-03",
        readTime: {
            zh: "9分钟",
            en: "9 min read"
        },
        icon: "fas fa-brain",
        url: "ai-tools-academic-writing-future.html"
    }
];

// 格式化日期
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('zh-CN');
}

// 创建文章卡片
function createPostCard(post) {
    const card = document.createElement('div');
    card.className = 'post-card';
    
    const title = post.title[currentLanguage] || post.title.zh;
    const excerpt = post.excerpt[currentLanguage] || post.excerpt.zh;
    const categoryName = post.categoryName[currentLanguage] || post.categoryName.zh;
    const author = post.author[currentLanguage] || post.author.zh;
    const readTime = post.readTime[currentLanguage] || post.readTime.zh;

    card.innerHTML = `
        <div class="post-image">
            <i class="${post.icon}"></i>
        </div>
        <div class="post-content">
            <div class="post-meta">
                <span class="post-category">${categoryName}</span>
                <span class="post-date">
                    <i class="fas fa-calendar"></i>
                    ${formatDate(post.date)}
                </span>
            </div>
            <h3 class="post-title">${title}</h3>
            <p class="post-excerpt">${excerpt}</p>
            <div class="post-footer">
                <div class="post-author">
                    <i class="fas fa-user"></i>
                    ${author}
                </div>
                <div class="post-read-time">
                    <i class="fas fa-clock"></i>
                    ${readTime}
                </div>
            </div>
        </div>
    `;

    // 添加点击事件处理
    card.onclick = () => openPost(post.id);
    card.style.cursor = 'pointer';

    return card;
}

// 打开文章页面
function openPost(postId) {
    // 查找对应的文章
    const post = allPosts.find(p => p.id === postId);
    console.log('点击的文章ID:', postId);
    console.log('找到的文章:', post);
    
    if (post && post.url) {
        // 如果文章有自定义URL，使用自定义URL并传递语言参数
        const url = `${post.url}?lang=${currentLanguage}`;
        console.log('跳转到URL:', url);
        window.location.href = url;
    } else {
        // 否则使用默认的文章页面并传递语言参数
        const fallbackUrl = `article.html?id=${postId}&lang=${currentLanguage}`;
        console.log('使用默认URL:', fallbackUrl);
        window.location.href = fallbackUrl;
    }
}

// 显示文章
function displayPosts() {
    console.log('开始显示文章，当前文章数量:', allPosts.length);
    
    const postsGrid = document.getElementById('postsGrid');
    if (!postsGrid) {
        console.error('未找到postsGrid元素');
        return;
    }

    // 隐藏加载指示器
    const loadingIndicator = postsGrid.querySelector('.loading-indicator');
    if (loadingIndicator) {
        loadingIndicator.remove();
        console.log('移除了加载指示器');
    }

    // 筛选文章
    let filteredPosts = currentCategory === 'all' 
        ? allPosts 
        : allPosts.filter(post => post.category === currentCategory);

    console.log('筛选后的文章数量:', filteredPosts.length);

    // 分页
    const startIndex = (currentPage - 1) * postsPerPage;
    const endIndex = startIndex + postsPerPage;
    const postsToShow = filteredPosts.slice(0, endIndex);

    console.log('要显示的文章数量:', postsToShow.length);

    // 清空现有内容
    postsGrid.innerHTML = '';

    if (postsToShow.length === 0) {
        postsGrid.innerHTML = `
            <div class="no-posts-message">
                <div class="no-posts-content">
                    <i class="fas fa-file-alt"></i>
                    <h3>暂无文章</h3>
                    <p>还没有发布任何文章。</p>
                </div>
            </div>
        `;
        return;
    }

    // 生成文章卡片
    postsToShow.forEach(post => {
        const postCard = createPostCard(post);
        postsGrid.appendChild(postCard);
    });

    console.log('文章显示完成');
}

// 加载文章
function loadPosts() {
    console.log('开始加载文章...');
    
    // 加载用户文章（如果有的话）
    let userPosts = [];
    try {
        userPosts = JSON.parse(localStorage.getItem('userArticles') || '[]');
    } catch (error) {
        console.log('加载用户文章失败:', error);
    }
    
    // 合并文章
    allPosts = [...userPosts, ...defaultPosts];
    console.log('文章加载完成，共', allPosts.length, '篇');
    
    displayPosts();
}

// 按分类筛选文章
function filterPostsByCategory(category) {
    currentCategory = category;
    currentPage = 1;
    displayPosts();
    
    // 更新分类按钮状态
    document.querySelectorAll('.category-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`[onclick="filterPostsByCategory('${category}')"]`)?.classList.add('active');
}

// 搜索文章
function searchArticles() {
    const searchInput = document.getElementById('searchInput');
    const searchTerm = searchInput?.value.toLowerCase().trim();
    
    if (!searchTerm) {
        loadPosts();
        return;
    }
    
    const filteredPosts = allPosts.filter(post => {
        const title = post.title[currentLanguage] || post.title.zh;
        const excerpt = post.excerpt[currentLanguage] || post.excerpt.zh;
        const author = post.author[currentLanguage] || post.author.zh;
        
        return title.toLowerCase().includes(searchTerm) ||
               excerpt.toLowerCase().includes(searchTerm) ||
               author.toLowerCase().includes(searchTerm);
    });
    
    // 临时替换allPosts进行显示
    const originalPosts = allPosts;
    allPosts = filteredPosts;
    displayPosts();
    allPosts = originalPosts;
}

// 初始化博客
function initializeBlog() {
    console.log('初始化博客...');
    
    // 检查是否是博客列表页面（有postsGrid元素）
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