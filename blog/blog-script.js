// Blog JavaScript Functions

// 博客功能脚本 / Blog Functions Script
let allPosts = [];
let currentCategory = 'all';
let postsPerPage = 6;
let currentPage = 1;
let currentLanguage = 'zh'; // 默认语言 / Default language

// 自动语言检测和设置功能 / Auto Language Detection and Setup
function detectAndSetLanguage() {
    console.log('开始自动语言检测...');
    
    // 1. 检查URL路径中的语言标识符
    const currentPath = window.location.pathname;
    const currentSearch = window.location.search;
    
    // 检查URL参数中的语言设置
    const urlParams = new URLSearchParams(currentSearch);
    const urlLang = urlParams.get('lang');
    
    // 检查路径中的语言标识符
    let detectedLang = null;
    
    if (urlLang && (urlLang === 'zh' || urlLang === 'en')) {
        detectedLang = urlLang;
        console.log('从URL参数检测到语言:', detectedLang);
    } else if (currentPath.includes('/cn/') || currentPath.includes('/zh/')) {
        detectedLang = 'zh';
        console.log('从URL路径检测到中文区域');
    } else if (currentPath.includes('/en/')) {
        detectedLang = 'en';
        console.log('从URL路径检测到英文区域');
    } else {
        // 2. 如果URL中没有语言标识符，检查浏览器语言偏好
        const browserLang = navigator.language || navigator.userLanguage;
        console.log('浏览器语言:', browserLang);
        
        // 3. 检查本地存储的语言偏好
        const savedLang = localStorage.getItem('preferred-language');
        console.log('本地存储的语言偏好:', savedLang);
        
        if (savedLang && (savedLang === 'zh' || savedLang === 'en')) {
            detectedLang = savedLang;
            console.log('使用本地存储的语言偏好:', detectedLang);
        } else if (browserLang.startsWith('zh')) {
            detectedLang = 'zh';
            console.log('根据浏览器语言设置为中文');
        } else {
            detectedLang = 'en';
            console.log('默认设置为英文');
        }
    }
    
    // 4. 应用检测到的语言
    if (detectedLang && detectedLang !== currentLanguage) {
        console.log('切换语言从', currentLanguage, '到', detectedLang);
        currentLanguage = detectedLang;
        switchLanguage(detectedLang);
    } else {
        console.log('保持当前语言:', currentLanguage);
        // 确保页面显示正确的语言
        switchLanguage(currentLanguage);
    }
}

// 智能语言重定向功能 / Smart Language Redirect
function setupSmartLanguageRedirect() {
    // 监听语言切换按钮点击，更新URL参数
    const langButtons = document.querySelectorAll('.lang-btn');
    langButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            const targetLang = this.getAttribute('data-lang');
            
            // 更新URL参数而不刷新页面
            const currentUrl = new URL(window.location);
            currentUrl.searchParams.set('lang', targetLang);
            
            // 使用pushState更新URL，不刷新页面
            window.history.pushState({}, '', currentUrl.toString());
            
            console.log('URL已更新为:', currentUrl.toString());
        });
    });
}

// 翻译API功能 / Translation API Functions
async function translateText(text, targetLang) {
    try {
        // 使用免费的翻译API (MyMemory)
        const sourceLang = targetLang === 'zh' ? 'en' : 'zh';
        const response = await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${sourceLang}|${targetLang}`);
        const data = await response.json();
        
        if (data.responseStatus === 200) {
            return data.responseData.translatedText;
        } else {
            throw new Error('Translation failed');
        }
    } catch (error) {
        console.error('Translation error:', error);
        // 如果翻译失败，返回原文
        return text;
    }
}

// 批量翻译函数
async function translateContent(content, targetLang) {
    const result = {};
    
    for (const [key, value] of Object.entries(content)) {
        if (typeof value === 'string' && value.trim()) {
            try {
                result[key] = await translateText(value, targetLang);
                // 添加延迟避免API限制
                await new Promise(resolve => setTimeout(resolve, 100));
            } catch (error) {
                console.error(`Translation failed for ${key}:`, error);
                result[key] = value; // 保留原文
            }
        } else {
            result[key] = value;
        }
    }
    
    return result;
}

// 语言文本配置 / Language text configuration
const translations = {
    zh: {
        searchPlaceholder: '搜索文章...',
        searchButton: '搜索',
        publishButton: '发布新文章',
        loadMore: '加载更多',
        noResults: '没有找到相关文章',
        subscribeSuccess: '订阅成功！感谢您的关注。',
        subscribeError: '订阅失败，请稍后重试。',
        invalidEmail: '请输入有效的邮箱地址',
        enterEmail: '请输入邮箱地址',
        publishTitle: '文章发布指南',
        publishSteps: {
            step1: '第一步: 准备文章内容',
            step2: '第二步: 复制文章模板',
            step3: '第三步: 编辑文章信息',
            step4: '第四步: 保存文章文件',
            step5: '第五步: 测试和发布'
        },
        quickLinks: '快速链接',
        needHelp: '需要帮助?',
        contactSupport: '联系客服',
        editArticle: '编辑',
        deleteArticle: '删除',
        confirmDelete: '确定要删除这篇文章吗？',
        articleDeleted: '文章已删除',
        deleteError: '删除文章失败'
    },
    en: {
        searchPlaceholder: 'Search articles...',
        searchButton: 'Search',
        publishButton: 'Publish Article',
        loadMore: 'Load More',
        noResults: 'No articles found',
        subscribeSuccess: 'Successfully subscribed! Thank you for your interest.',
        subscribeError: 'Subscription failed, please try again later.',
        invalidEmail: 'Please enter a valid email address',
        enterEmail: 'Please enter your email address',
        publishTitle: 'Article Publishing Guide',
        publishSteps: {
            step1: 'Step 1: Prepare Article Content',
            step2: 'Step 2: Copy Article Template',
            step3: 'Step 3: Edit Article Information',
            step4: 'Step 4: Save Article File',
            step5: 'Step 5: Test and Publish'
        },
        quickLinks: 'Quick Links',
        needHelp: 'Need Help?',
        contactSupport: 'Contact Support',
        editArticle: 'Edit',
        deleteArticle: 'Delete',
        confirmDelete: 'Are you sure you want to delete this article?',
        articleDeleted: 'Article deleted',
        deleteError: 'Failed to delete article'
    }
};

// 获取翻译文本 / Get translated text
function getText(key) {
    const keys = key.split('.');
    let text = translations[currentLanguage];
    for (const k of keys) {
        text = text[k];
    }
    return text || key;
}

// 语言切换功能 / Language switching function
function switchLanguage(lang) {
    console.log('switchLanguage 被调用，语言:', lang);
    
    currentLanguage = lang;
    document.documentElement.setAttribute('data-lang', lang);
    
    // 更新所有双语元素 / Update all bilingual elements
    // 处理格式1: <span data-zh="..." data-en="...">内容</span>
    const spanBilingualElements = document.querySelectorAll('span[data-zh][data-en]');
    console.log('找到span双语元素数量:', spanBilingualElements.length);
    
    spanBilingualElements.forEach(element => {
        const text = lang === 'zh' ? element.getAttribute('data-zh') : element.getAttribute('data-en');
        element.textContent = text;
    });
    
    // 处理格式2: <h1 data-zh="..." data-en="...">内容</h1> (直接在元素上)
    const directBilingualElements = document.querySelectorAll('[data-zh][data-en]:not(span)');
    console.log('找到直接双语元素数量:', directBilingualElements.length);
    
    directBilingualElements.forEach(element => {
        const text = lang === 'zh' ? element.getAttribute('data-zh') : element.getAttribute('data-en');
        
        // 检查是否有嵌套的双语元素（如strong标签）
        const nestedBilingualElements = element.querySelectorAll('[data-zh][data-en]');
        
        if (nestedBilingualElements.length > 0) {
            // 先设置外层元素的内容
            element.innerHTML = text;
            
            // 然后处理嵌套的双语元素
            const newNestedElements = element.querySelectorAll('[data-zh][data-en]');
            newNestedElements.forEach(nestedElement => {
                const nestedText = lang === 'zh' ? nestedElement.getAttribute('data-zh') : nestedElement.getAttribute('data-en');
                nestedElement.textContent = nestedText;
            });
        } else {
            // 没有嵌套元素，直接设置内容
            element.innerHTML = text;
        }
    });
    
    // 更新语言按钮状态 / Update language button states
    const langButtons = document.querySelectorAll('.lang-btn');
    console.log('找到语言按钮数量:', langButtons.length);
    
    langButtons.forEach(btn => {
        btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
    });
    
    // 更新搜索框占位符 / Update search placeholder
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.placeholder = getText('searchPlaceholder');
    }
    
    // 重新渲染文章列表以显示对应语言的内容
    displayPosts();
    
    // 保存语言偏好 / Save language preference
    localStorage.setItem('preferredLanguage', lang);
}

// 初始化博客 / Initialize blog
document.addEventListener('DOMContentLoaded', function() {
    console.log('博客脚本已加载');
    
    // 首先执行自动语言检测
    detectAndSetLanguage();
    
    // 设置智能语言重定向
    setupSmartLanguageRedirect();
    
    initializeBlog();
    setupEventListeners();
    
    // 设置搜索框回车事件
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                searchArticles();
            }
        });
    }
});

// 初始化博客功能 / Initialize blog functions
function initializeBlog() {
    console.log('初始化博客功能...');
    loadPosts();
    setupCategoryFilter();
    console.log('博客初始化完成，文章数量:', allPosts.length);
}

// 设置事件监听器 / Setup event listeners
function setupEventListeners() {
    // 分类筛选按钮 / Category filter buttons
    const categoryBtns = document.querySelectorAll('.category-btn');
    categoryBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const category = this.dataset.category;
            filterPostsByCategory(category);
            
            // 更新按钮状态 / Update button states
            categoryBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // 加载更多按钮 / Load more button
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', loadMorePosts);
    }

    // 导航菜单切换 / Navigation menu toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
    }
    
    // 语言切换按钮 / Language switch buttons
    const langButtons = document.querySelectorAll('.lang-btn');
    console.log('设置语言按钮事件监听器，按钮数量:', langButtons.length);
    
    langButtons.forEach(button => {
        console.log('为按钮添加事件监听器:', button.getAttribute('data-lang'));
        button.addEventListener('click', function() {
            const lang = this.getAttribute('data-lang');
            console.log('语言按钮被点击:', lang);
            switchLanguage(lang);
        });
    });
}

// 加载文章数据
function loadPosts() {
    // 示例文章数据 - 实际使用时可以从API或JSON文件加载
    const defaultPosts = [
        {
            id: 1,
            title: {
                zh: "2024年AI学术写作完全指南：提升研究效率的10个关键策略",
                en: "Complete AI Academic Writing Guide 2024: 10 Key Strategies to Boost Research Efficiency"
            },
            excerpt: {
                zh: "掌握2024年最新AI学术写作技巧，从论文构思到发表的完整指南。包含10个实用策略、工具推荐和案例分析，助您提升学术写作效率和质量。",
                en: "Master the latest AI academic writing techniques for 2024, from paper conception to publication. Includes 10 practical strategies, tool recommendations, and case studies to enhance your academic writing efficiency and quality."
            },
            category: "ai-tools",
            categoryName: {
                zh: "AI工具",
                en: "AI Tools"
            },
            author: {
                zh: "Dr. 张学术",
                en: "Dr. Zhang Academic"
            },
            date: "2024-01-15",
            readTime: {
                zh: "12分钟",
                en: "12 min read"
            },
            icon: "fas fa-robot",
            url: "ai-academic-writing-guide-2024.html"
        },
        {
            id: 2,
            title: {
                zh: "如何撰写高质量的学术论文摘要",
                en: "How to Write High-Quality Academic Paper Abstracts"
            },
            excerpt: {
                zh: "学术论文摘要是读者了解您研究的第一印象。本文将详细介绍如何撰写清晰、简洁且有吸引力的论文摘要，包括结构安排、关键要素和常见错误避免。",
                en: "Academic paper abstracts are readers' first impression of your research. This article provides detailed guidance on writing clear, concise, and engaging abstracts, including structure, key elements, and common mistakes to avoid."
            },
            category: "writing-tips",
            categoryName: {
                zh: "写作技巧",
                en: "Writing Tips"
            },
            author: {
                zh: "Dr. 张教授",
                en: "Dr. Zhang Professor"
            },
            date: "2024-01-15",
            readTime: {
                zh: "5分钟",
                en: "5 min read"
            },
            icon: "fas fa-pen-fancy",
            url: "academic-abstract-writing-guide.html"
        },
        {
            id: 3,
            title: {
                zh: "定性研究方法：从理论到实践",
                en: "Qualitative Research Methods: From Theory to Practice"
            },
            excerpt: {
                zh: "深入探讨定性研究的核心方法论，包括现象学、扎根理论、案例研究等方法的应用场景、数据收集技巧和分析策略。",
                en: "In-depth exploration of core qualitative research methodologies, including phenomenology, grounded theory, case studies, and their applications, data collection techniques, and analysis strategies."
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
            date: "2024-01-12",
            readTime: {
                zh: "8分钟",
                en: "8 min read"
            },
            icon: "fas fa-microscope",
            url: "qualitative-research-methods.html"
        },
        {
            id: 4,
            title: {
                zh: "顶级学术数据库使用指南",
                en: "Guide to Top Academic Databases"
            },
            excerpt: {
                zh: "全面介绍Web of Science、Scopus、PubMed等主要学术数据库的使用技巧，帮助研究者高效检索和管理文献资源。",
                en: "Comprehensive introduction to using major academic databases like Web of Science, Scopus, and PubMed, helping researchers efficiently search and manage literature resources."
            },
            category: "academic-resources",
            categoryName: {
                zh: "学术资源",
                en: "Academic Resources"
            },
            author: {
                zh: "Dr. 王图书馆员",
                en: "Dr. Wang Librarian"
            },
            date: "2024-01-10",
            readTime: {
                zh: "6分钟",
                en: "6 min read"
            },
            icon: "fas fa-database",
            url: "academic-databases-guide.html"
        },
        {
            id: 5,
            title: {
                zh: "SCI期刊投稿策略与技巧",
                en: "SCI Journal Submission Strategies and Tips"
            },
            excerpt: {
                zh: "详细解析SCI期刊投稿流程，包括期刊选择标准、投稿信撰写、同行评议应对策略，以及提高接收率的实用建议。",
                en: "Detailed analysis of SCI journal submission process, including journal selection criteria, cover letter writing, peer review response strategies, and practical tips to improve acceptance rates."
            },
            category: "publication-guide",
            categoryName: {
                zh: "发表指南",
                en: "Publication Guide"
            },
            author: {
                zh: "Dr. 陈编辑",
                en: "Dr. Chen Editor"
            },
            date: "2024-01-08",
            readTime: {
                zh: "10分钟",
                en: "10 min read"
            },
            icon: "fas fa-journal-whills",
            url: "sci-journal-submission-guide.html"
        },
        {
            id: 6,
            title: {
                zh: "AI工具在学术写作中的应用",
                en: "Applications of AI Tools in Academic Writing"
            },
            excerpt: {
                zh: "探索人工智能如何革命性地改变学术写作流程，介绍最新的AI写作助手、文献分析工具和数据可视化技术。",
                en: "Explore how artificial intelligence is revolutionizing academic writing processes, introducing the latest AI writing assistants, literature analysis tools, and data visualization technologies."
            },
            category: "ai-tools",
            categoryName: {
                zh: "AI工具",
                en: "AI Tools"
            },
            author: {
                zh: "Dr. 刘技术专家",
                en: "Dr. Liu Tech Expert"
            },
            date: "2024-01-05",
            readTime: {
                zh: "7分钟",
                en: "7 min read"
            },
            icon: "fas fa-robot",
            url: "ai-tools-academic-writing.html"
        },
        {
            id: 7,
            title: {
                zh: "研究伦理与学术诚信指南",
                en: "Research Ethics and Academic Integrity Guide"
            },
            excerpt: {
                zh: "深入讨论学术研究中的伦理问题，包括数据收集伦理、引用规范、利益冲突声明等关键议题，确保研究的诚信性。",
                en: "In-depth discussion of ethical issues in academic research, including data collection ethics, citation standards, conflict of interest declarations, and other key topics to ensure research integrity."
            },
            category: "academic-resources",
            categoryName: {
                zh: "学术资源",
                en: "Academic Resources"
            },
            author: {
                zh: "Dr. 赵伦理委员",
                en: "Dr. Zhao Ethics Committee"
            },
            date: "2024-01-03",
            readTime: {
                zh: "9分钟",
                en: "9 min read"
            },
            icon: "fas fa-balance-scale",
            url: "research-ethics-guide.html"
        },
        {
            id: 8,
            title: {
                zh: "统计分析软件SPSS实用教程",
                en: "Practical SPSS Tutorial for Statistical Analysis"
            },
            excerpt: {
                zh: "从基础操作到高级分析，全面介绍SPSS在学术研究中的应用，包括描述性统计、假设检验、回归分析等核心功能。",
                en: "From basic operations to advanced analysis, comprehensive introduction to SPSS applications in academic research, including descriptive statistics, hypothesis testing, regression analysis, and other core functions."
            },
            category: "research-methods",
            categoryName: {
                zh: "研究方法",
                en: "Research Methods"
            },
            author: {
                zh: "Dr. 孙统计师",
                en: "Dr. Sun Statistician"
            },
            date: "2024-01-01",
            readTime: {
                zh: "12分钟",
                en: "12 min read"
            },
            icon: "fas fa-chart-bar",
            url: "spss-tutorial-guide.html"
        },
        {
            id: 9,
            title: {
                zh: "学术会议演讲技巧与PPT制作",
                en: "Academic Conference Presentation Skills and PPT Creation"
            },
            excerpt: {
                zh: "掌握学术会议演讲的核心技巧，包括演讲结构设计、PPT视觉设计原则、互动技巧和Q&A环节应对策略。",
                en: "Master core skills for academic conference presentations, including speech structure design, PPT visual design principles, interaction techniques, and Q&A session strategies."
            },
            category: "writing-tips",
            categoryName: {
                zh: "写作技巧",
                en: "Writing Tips"
            },
            author: {
                zh: "Dr. 周演讲专家",
                en: "Dr. Zhou Presentation Expert"
            },
            date: "2023-12-28",
            readTime: {
                zh: "6分钟",
                en: "6 min read"
            },
            icon: "fas fa-presentation",
            url: "academic-presentation-guide.html"
        }
    ];

    // 加载用户发布的文章
    const userPosts = loadUserArticlesFromStorage();
    
    // 合并默认文章和用户文章（用户文章在前）
    allPosts = [...userPosts, ...defaultPosts];

    displayPosts();
}

// 显示文章
function displayPosts() {
    console.log('=== displayPosts 函数开始执行 ===');
    console.log('当前文章数量:', allPosts.length);
    console.log('当前分类:', currentCategory);
    console.log('当前语言:', currentLanguage);
    console.log('allPosts内容:', allPosts);
    
    const postsGrid = document.getElementById('postsGrid');
    if (!postsGrid) {
        console.error('错误：未找到postsGrid元素');
        return;
    }
    console.log('成功找到postsGrid元素:', postsGrid);

    // 隐藏加载指示器
    const loadingIndicator = postsGrid.querySelector('.loading-indicator');
    if (loadingIndicator) {
        loadingIndicator.style.display = 'none';
        console.log('隐藏了加载指示器');
    } else {
        console.log('未找到加载指示器元素');
    }

    // 筛选文章
    let filteredPosts = currentCategory === 'all' 
        ? allPosts 
        : allPosts.filter(post => post.category === currentCategory);

    console.log('筛选后的文章数量:', filteredPosts.length, '当前分类:', currentCategory);

    // 分页
    const startIndex = (currentPage - 1) * postsPerPage;
    const endIndex = startIndex + postsPerPage;
    const postsToShow = filteredPosts.slice(0, endIndex);

    console.log('要显示的文章数量:', postsToShow.length);

    // 清空现有内容
    postsGrid.innerHTML = '';

    // 如果没有文章，显示提示信息
    if (postsToShow.length === 0) {
        const noPostsMessage = document.createElement('div');
        noPostsMessage.className = 'no-posts-message';
        noPostsMessage.innerHTML = `
            <div class="no-posts-content">
                <i class="fas fa-file-alt"></i>
                <h3>${currentLanguage === 'zh' ? '暂无文章' : 'No Articles'}</h3>
                <p>${currentLanguage === 'zh' ? '还没有发布任何文章，点击上方按钮发布第一篇文章吧！' : 'No articles published yet. Click the button above to publish your first article!'}</p>
            </div>
        `;
        postsGrid.appendChild(noPostsMessage);
        return;
    }

    // 生成文章卡片
    console.log('开始生成文章卡片...');
    postsToShow.forEach((post, index) => {
        console.log(`创建第 ${index + 1} 篇文章:`, post.title);
        try {
            const postCard = createPostCard(post);
            postsGrid.appendChild(postCard);
            console.log(`成功添加第 ${index + 1} 篇文章到网格`);
        } catch (error) {
            console.error(`创建第 ${index + 1} 篇文章时出错:`, error);
        }
    });
    console.log('文章卡片生成完成');

    // 更新加载更多按钮
    updateLoadMoreButton(filteredPosts.length, endIndex);

    // 添加动画效果
    const cards = postsGrid.querySelectorAll('.post-card');
    cards.forEach((card, index) => {
        setTimeout(() => {
            card.classList.add('fade-in');
        }, index * 100);
    });
    
    console.log('文章显示完成');
}

// 创建文章卡片
function createPostCard(post) {
    const card = document.createElement('div');
    card.className = 'post-card';
    if (post.isNew) {
        card.classList.add('new-post');
    }
    card.onclick = () => openPost(post.id);

    // 处理双语和单语内容
    const title = (post.title && typeof post.title === 'object') 
        ? (currentLanguage === 'zh' ? post.title.zh : post.title.en)
        : post.title;
    
    const excerpt = (post.excerpt && typeof post.excerpt === 'object')
        ? (currentLanguage === 'zh' ? post.excerpt.zh : post.excerpt.en)
        : post.excerpt;
    
    const categoryName = (post.categoryName && typeof post.categoryName === 'object')
        ? (currentLanguage === 'zh' ? post.categoryName.zh : post.categoryName.en)
        : post.categoryName;
    
    const author = (post.author && typeof post.author === 'object')
        ? (currentLanguage === 'zh' ? post.author.zh : post.author.en)
        : post.author;
    
    const readTime = (post.readTime && typeof post.readTime === 'object')
        ? (currentLanguage === 'zh' ? post.readTime.zh : post.readTime.en)
        : post.readTime;

    // 检查是否为用户发布的文章
    const isUserArticle = post.publishLanguage || post.isUserGenerated;
    
    card.innerHTML = `
        <div class="post-image">
            <i class="${post.icon}"></i>
            ${post.isNew ? '<span class="new-badge">新</span>' : ''}
            ${isUserArticle ? `
                <div class="article-actions" onclick="event.stopPropagation()">
                    <button class="action-btn edit-btn" onclick="editArticle(${post.id})" title="${getText('editArticle')}">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="action-btn delete-btn" onclick="confirmDeleteArticle(${post.id})" title="${getText('deleteArticle')}">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            ` : ''}
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

    return card;
}

// 按分类筛选文章
function filterPostsByCategory(category) {
    currentCategory = category;
    currentPage = 1;
    displayPosts();
}

// 加载更多文章
function loadMorePosts() {
    currentPage++;
    displayPosts();
}

// 更新加载更多按钮
function updateLoadMoreButton(totalPosts, currentlyShown) {
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    if (!loadMoreBtn) return;

    if (currentlyShown >= totalPosts) {
        loadMoreBtn.style.display = 'none';
    } else {
        loadMoreBtn.style.display = 'block';
    }
}

// 格式化日期
function formatDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

// 打开文章详情
function openPost(postId) {
    // 查找对应的文章
    const post = allPosts.find(p => p.id === postId);
    if (post && post.url) {
        // 如果文章有自定义URL，使用自定义URL并传递语言参数
        // 由于文章文件在同一目录下，直接使用相对路径
        const url = `${post.url}?lang=${currentLanguage}`;
        window.location.href = url;
    } else {
        // 否则使用默认的文章页面并传递语言参数
        window.location.href = `article.html?id=${postId}&lang=${currentLanguage}`;
    }
}

// 设置分类筛选
function setupCategoryFilter() {
    // 可以在这里添加更多分类筛选逻辑
}

// 订阅邮件列表
function subscribeNewsletter() {
    const emailInput = document.getElementById('emailInput');
    const email = emailInput.value.trim();

    if (!email) {
        showNotification(getText('enterEmail'), 'error');
        return;
    }

    if (!isValidEmail(email)) {
        showNotification(getText('invalidEmail'), 'error');
        return;
    }

    // 这里可以添加实际的邮件订阅逻辑 / Add actual subscription logic here
    // 例如发送到后端API或第三方邮件服务 / e.g., send to backend API or third-party email service

    showNotification(getText('subscribeSuccess'), 'success');
    emailInput.value = '';
}

// 验证邮箱格式
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// 显示通知
function showNotification(message, type = 'info') {
    // 创建通知元素
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <span>${message}</span>
        <button onclick="this.parentElement.remove()">×</button>
    `;

    // 添加到页面
    document.body.appendChild(notification);

    // 自动移除
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 5000);
}

// 搜索功能（可选） / Search functionality (optional)
function searchPosts(query) {
    if (!query.trim()) {
        displayPosts();
        return;
    }

    const filteredPosts = allPosts.filter(post => 
        post.title.toLowerCase().includes(query.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(query.toLowerCase()) ||
        post.categoryName.toLowerCase().includes(query.toLowerCase())
    );

    // 临时替换allPosts进行显示 / Temporarily replace allPosts for display
    const originalPosts = allPosts;
    allPosts = filteredPosts;
    currentPage = 1;
    displayPosts();
    allPosts = originalPosts;
}

// 搜索文章功能 / Search articles functionality
function searchArticles() {
    const searchInput = document.getElementById('searchInput');
    const query = searchInput.value.trim();
    
    if (query) {
        searchPosts(query);
        const searchMessage = currentLanguage === 'zh' ? 
            `搜索结果: "${query}"` : 
            `Search results: "${query}"`;
        showNotification(searchMessage, 'info');
    } else {
        // 如果搜索框为空，显示所有文章 / If search box is empty, show all articles
        filterPostsByCategory('all');
        const allMessage = currentLanguage === 'zh' ? 
            '显示所有文章' : 
            'Showing all articles';
        showNotification(allMessage, 'info');
    }
}

// 显示发布表单
function showPublishForm() {
    const publishModal = `
        <div class="publish-modal" id="publishModal">
            <div class="publish-modal-content">
                <div class="publish-modal-header">
                    <h3>${currentLanguage === 'zh' ? '发布新文章' : 'Publish New Article'}</h3>
                    <button class="close-btn" onclick="closePublishForm()">&times;</button>
                </div>
                <div class="publish-modal-body">
                    <form class="publish-form" id="publishForm">
                        <!-- 写作语言选择 -->
                        <div class="form-group">
                            <label>${currentLanguage === 'zh' ? '写作语言' : 'Writing Language'}</label>
                            <div class="language-selector">
                                <label class="radio-label">
                                    <input type="radio" name="writingLang" value="zh" ${currentLanguage === 'zh' ? 'checked' : ''}>
                                    ${currentLanguage === 'zh' ? '中文写作（自动翻译成英文）' : 'Chinese (Auto-translate to English)'}
                                </label>
                                <label class="radio-label">
                                    <input type="radio" name="writingLang" value="en" ${currentLanguage === 'en' ? 'checked' : ''}>
                                    ${currentLanguage === 'zh' ? '英文写作（自动翻译成中文）' : 'English (Auto-translate to Chinese)'}
                                </label>
                            </div>
                        </div>
                        
                        <!-- 文章标题 -->
                        <div class="form-group">
                            <label for="articleTitle">${currentLanguage === 'zh' ? '文章标题' : 'Article Title'} *</label>
                            <input type="text" id="articleTitle" name="title" required 
                                   placeholder="${currentLanguage === 'zh' ? '请输入文章标题...' : 'Enter article title...'}">
                        </div>
                        
                        <div class="form-group">
                            <label for="articleKeywords">${currentLanguage === 'zh' ? 'SEO关键词' : 'SEO Keywords'} *</label>
                            <input type="text" id="articleKeywords" name="keywords" required
                                   placeholder="${currentLanguage === 'zh' ? '用逗号分隔，如：AI写作,学术论文,研究方法' : 'Comma separated, e.g., AI writing, academic paper, research method'}">
                        </div>
                        
                        <!-- 文章内容 -->
                        <div class="form-group">
                            <label for="articleContent">${currentLanguage === 'zh' ? '文章内容' : 'Article Content'} *</label>
                            <textarea id="articleContent" name="content" rows="10" required 
                                      placeholder="${currentLanguage === 'zh' ? '请输入文章正文内容...' : 'Enter article content...'}"></textarea>
                        </div>
                        
                        <!-- 翻译预览区域 -->
                        <div class="form-group" id="translationPreview" style="display: none;">
                            <label>${currentLanguage === 'zh' ? '翻译预览' : 'Translation Preview'}</label>
                            <div class="translation-container">
                                <div class="translation-item">
                                    <strong>${currentLanguage === 'zh' ? '翻译后标题：' : 'Translated Title:'}</strong>
                                    <div id="translatedTitle" class="translation-text"></div>
                                </div>
                                <div class="translation-item">
                                    <strong>${currentLanguage === 'zh' ? '翻译后内容：' : 'Translated Content:'}</strong>
                                    <div id="translatedContent" class="translation-text"></div>
                                </div>
                            </div>
                        </div>
                        
                        <div class="form-actions">
                            <button type="button" class="btn btn-secondary" onclick="closePublishForm()">
                                ${currentLanguage === 'zh' ? '取消' : 'Cancel'}
                            </button>
                            <button type="button" class="btn btn-info" id="previewTranslation">
                                ${currentLanguage === 'zh' ? '预览翻译' : 'Preview Translation'}
                            </button>
                            <button type="submit" class="btn btn-primary">
                                ${currentLanguage === 'zh' ? '发布文章' : 'Publish Article'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', publishModal);
    document.body.style.overflow = 'hidden';
    
    // 添加表单提交事件
    document.getElementById('publishForm').addEventListener('submit', handlePublishSubmit);
    
    // 添加预览翻译事件
    document.getElementById('previewTranslation').addEventListener('click', previewTranslation);
}

// 关闭发布表单 / Close publish form
// 预览翻译功能
async function previewTranslation() {
    const title = document.getElementById('articleTitle').value.trim();
    const content = document.getElementById('articleContent').value.trim();
    const writingLang = document.querySelector('input[name="writingLang"]:checked').value;
    
    if (!title || !content) {
        showNotification(
            currentLanguage === 'zh' ? '请先填写标题和内容' : 'Please fill in title and content first',
            'warning'
        );
        return;
    }
    
    const previewBtn = document.getElementById('previewTranslation');
    const originalText = previewBtn.textContent;
    previewBtn.textContent = currentLanguage === 'zh' ? '翻译中...' : 'Translating...';
    previewBtn.disabled = true;
    
    try {
        const targetLang = writingLang === 'zh' ? 'en' : 'zh';
        
        // 翻译标题和内容
        const translatedTitle = await translateText(title, targetLang);
        const translatedContent = await translateText(content, targetLang);
        
        // 显示翻译结果
        document.getElementById('translatedTitle').textContent = translatedTitle;
        document.getElementById('translatedContent').textContent = translatedContent;
        document.getElementById('translationPreview').style.display = 'block';
        
        showNotification(
            currentLanguage === 'zh' ? '翻译预览已生成' : 'Translation preview generated',
            'success'
        );
    } catch (error) {
        console.error('Translation preview error:', error);
        showNotification(
            currentLanguage === 'zh' ? '翻译预览失败，请稍后重试' : 'Translation preview failed, please try again',
            'error'
        );
    } finally {
        previewBtn.textContent = originalText;
        previewBtn.disabled = false;
    }
}

function closePublishForm() {
    const modal = document.getElementById('publishModal');
    if (modal) {
        // 清除编辑模式状态
        const form = modal.querySelector('form');
        if (form) {
            delete form.dataset.editingId;
        }
        
        modal.remove();
        document.body.style.overflow = 'auto';
    }
}

// 处理表单提交 / Handle form submission
async function handlePublishSubmit(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const form = event.target;
    
    // 检查是否为编辑模式
    const editingId = form.dataset.editingId;
    const isEditing = !!editingId;
    
    // 获取表单数据
    const userTitle = formData.get('title');
    const userContent = formData.get('content');
    const userKeywords = formData.get('keywords');
    const writingLang = formData.get('writingLang');
    
    // 验证必填字段
    if (!userTitle || !userContent || !userKeywords || !writingLang) {
        const message = currentLanguage === 'zh' ? '请填写所有必填字段' : 'Please fill in all required fields';
        showNotification(message, 'error');
        return;
    }
    
    // 显示翻译中消息
    const translatingMessage = currentLanguage === 'zh' ? '正在翻译内容...' : 'Translating content...';
    showNotification(translatingMessage, 'info');
    
    try {
        // 确定目标翻译语言
        const targetLang = writingLang === 'zh' ? 'en' : 'zh';
        
        // 翻译标题和内容
        const translatedTitle = await translateText(userTitle, targetLang);
        const translatedContent = await translateText(userContent, targetLang);
        
        // 根据写作语言分配中英文内容
        const titleZh = writingLang === 'zh' ? userTitle : translatedTitle;
        const titleEn = writingLang === 'zh' ? translatedTitle : userTitle;
        const contentZh = writingLang === 'zh' ? userContent : translatedContent;
        const contentEn = writingLang === 'zh' ? translatedContent : userContent;
        
        // 自动生成双语摘要（取内容前150个字符）
        const autoExcerptZh = contentZh.length > 150 ? 
            contentZh.substring(0, 150) + '...' : 
            contentZh;
        const autoExcerptEn = contentEn.length > 150 ? 
            contentEn.substring(0, 150) + '...' : 
            contentEn;
        
        // 根据关键词自动分类
        const autoCategory = getAutoCategory(userKeywords);
        
        // 创建双语格式的文章数据
        const articleData = {
            title: {
                zh: titleZh,
                en: titleEn
            },
            excerpt: {
                zh: autoExcerptZh,
                en: autoExcerptEn
            },
            category: autoCategory,
            categoryName: getCategoryName(autoCategory),
            author: {
                zh: 'AI学术助手',
                en: 'AI Academic Assistant'
            },
            readTime: {
                zh: Math.ceil(Math.max(contentZh.length, contentEn.length) / 200) + ' 分钟阅读',
                en: Math.ceil(Math.max(contentZh.length, contentEn.length) / 200) + ' min read'
            },
            icon: 'fas fa-file-alt',
            content: {
                zh: contentZh,
                en: contentEn
            },
            keywords: userKeywords,
            writingLanguage: writingLang, // 记录原始写作语言
            date: isEditing ? 
                (function() {
                    // 编辑模式：保持原有日期
                    const userArticles = JSON.parse(localStorage.getItem('userArticles') || '[]');
                    const existingArticle = userArticles.find(a => a.id == editingId);
                    return existingArticle ? existingArticle.date : new Date().toISOString().split('T')[0];
                })() : 
                new Date().toISOString().split('T')[0],
            id: isEditing ? parseInt(editingId) : Date.now(),
            filename: isEditing ? 
                (function() {
                    const userArticles = JSON.parse(localStorage.getItem('userArticles') || '[]');
                    const existingArticle = userArticles.find(a => a.id == editingId);
                    return existingArticle ? existingArticle.filename : generateFileName(titleEn);
                })() : 
                generateFileName(titleEn),
            isUserGenerated: true
        };
        
        // 显示处理中消息
        const processingMessage = isEditing ?
            (currentLanguage === 'zh' ? '正在更新文章...' : 'Updating article...') :
            (currentLanguage === 'zh' ? '正在发布文章...' : 'Publishing article...');
        showNotification(processingMessage, 'info');
        
        // 模拟文章发布/更新过程
        setTimeout(() => {
            try {
                if (isEditing) {
                    updateArticleInStorage(articleData);
                } else {
                    saveArticleToStorage(articleData);
                }
                
                // 重新加载和显示文章列表
                loadAndDisplayArticles();
                
                // 显示成功消息
                const successMessage = isEditing 
                    ? (currentLanguage === 'zh' ? '文章更新成功！已自动翻译为双语版本。' : 'Article updated successfully! Auto-translated to bilingual version.')
                    : (currentLanguage === 'zh' ? '文章发布成功！已自动翻译为双语版本。' : 'Article published successfully! Auto-translated to bilingual version.');
                
                showNotification(successMessage, 'success');
                
                // 关闭表单并滚动到顶部
                closePublishForm();
                window.scrollTo({ top: 0, behavior: 'smooth' });
            } catch (error) {
                console.error('Error saving article:', error);
                showNotification(
                    currentLanguage === 'zh' ? '发布失败，请重试' : 'Publishing failed, please try again',
                    'error'
                );
            }
        }, 1000);
        
    } catch (error) {
        console.error('Translation error:', error);
        showNotification(
            currentLanguage === 'zh' ? '翻译失败，请检查网络连接后重试' : 'Translation failed, please check network and try again',
            'error'
        );
    }
}

// 重新加载并显示文章列表
function loadAndDisplayArticles() {
    loadPosts();
    displayPosts();
}

// 保存文章到本地存储 / Save article to local storage
function saveArticleToStorage(article) {
    try {
        // 获取现有的用户文章
        let userArticles = JSON.parse(localStorage.getItem('userArticles') || '[]');
        
        // 检查是否已存在相同ID的文章
        const existingIndex = userArticles.findIndex(a => a.id === article.id);
        if (existingIndex !== -1) {
            userArticles[existingIndex] = article; // 更新现有文章
        } else {
            userArticles.unshift(article); // 添加新文章到开头
        }
        
        // 限制最多保存50篇用户文章
        if (userArticles.length > 50) {
            userArticles = userArticles.slice(0, 50);
        }
        
        // 保存到localStorage
        localStorage.setItem('userArticles', JSON.stringify(userArticles));
        
        console.log('文章已保存到本地存储:', article.title);
    } catch (error) {
        console.error('保存文章到本地存储失败:', error);
        const errorMessage = currentLanguage === 'zh' ? 
            '文章保存失败，请检查浏览器存储权限' : 
            'Failed to save article, please check browser storage permissions';
        showNotification(errorMessage, 'error');
    }
}

// 更新本地存储中的文章 / Update article in local storage
function updateArticleInStorage(article) {
    try {
        // 获取现有的用户文章
        let userArticles = JSON.parse(localStorage.getItem('userArticles') || '[]');
        
        // 查找要更新的文章
        const existingIndex = userArticles.findIndex(a => a.id === article.id);
        if (existingIndex !== -1) {
            userArticles[existingIndex] = article; // 更新现有文章
            
            // 保存到localStorage
            localStorage.setItem('userArticles', JSON.stringify(userArticles));
            
            console.log('文章已更新到本地存储:', article.title);
        } else {
            console.error('未找到要更新的文章:', article.id);
            const errorMessage = currentLanguage === 'zh' ? 
                '未找到要更新的文章' : 
                'Article to update not found';
            showNotification(errorMessage, 'error');
        }
    } catch (error) {
        console.error('更新文章到本地存储失败:', error);
        const errorMessage = currentLanguage === 'zh' ? 
            '文章更新失败，请检查浏览器存储权限' : 
            'Failed to update article, please check browser storage permissions';
        showNotification(errorMessage, 'error');
    }
}

// 从本地存储加载用户文章 / Load user articles from local storage
function loadUserArticlesFromStorage() {
    try {
        const userArticles = JSON.parse(localStorage.getItem('userArticles') || '[]');
        return userArticles;
    } catch (error) {
        console.error('从本地存储加载用户文章失败:', error);
        return [];
    }
}

// 删除用户文章 / Delete user article
function deleteUserArticle(articleId) {
    try {
        let userArticles = JSON.parse(localStorage.getItem('userArticles') || '[]');
        userArticles = userArticles.filter(article => article.id !== articleId);
        localStorage.setItem('userArticles', JSON.stringify(userArticles));
        
        // 从当前显示列表中移除
        allPosts = allPosts.filter(post => post.id !== articleId);
        displayPosts();
        
        const message = getText('articleDeleted');
        showNotification(message, 'success');
    } catch (error) {
        console.error('删除文章失败:', error);
        const errorMessage = getText('deleteError');
        showNotification(errorMessage, 'error');
    }
}

// 确认删除文章
function confirmDeleteArticle(articleId) {
    const confirmMessage = getText('confirmDelete');
    if (confirm(confirmMessage)) {
        deleteUserArticle(articleId);
    }
}

// 编辑文章
function editArticle(articleId) {
    try {
        // 查找要编辑的文章
        const userArticles = JSON.parse(localStorage.getItem('userArticles') || '[]');
        const article = userArticles.find(a => a.id === articleId);
        
        if (!article) {
            const errorMessage = currentLanguage === 'zh' ? '找不到要编辑的文章' : 'Article not found';
            showNotification(errorMessage, 'error');
            return;
        }
        
        // 显示发布表单并填充数据
        showPublishForm();
        
        // 填充表单数据
        setTimeout(() => {
            const titleInput = document.getElementById('articleTitle');
            const contentInput = document.getElementById('articleContent');
            const keywordsInput = document.getElementById('articleKeywords');
            const writingLangSelect = document.getElementById('writingLang');
            
            if (titleInput && contentInput && keywordsInput && writingLangSelect) {
                // 确定原始写作语言和内容
                const writingLang = article.writingLanguage || 'zh'; // 默认为中文
                let originalTitle, originalContent;
                
                if (writingLang === 'zh') {
                    // 原文是中文
                    originalTitle = article.title?.zh || article.title || '';
                    originalContent = article.content?.zh || article.content || '';
                } else {
                    // 原文是英文
                    originalTitle = article.title?.en || article.title || '';
                    originalContent = article.content?.en || article.content || '';
                }
                
                // 填充表单
                titleInput.value = originalTitle;
                contentInput.value = originalContent;
                keywordsInput.value = article.keywords || '';
                writingLangSelect.value = writingLang;
                
                // 设置编辑模式标识
                const form = document.getElementById('publishForm');
                if (form) {
                    form.dataset.editingId = articleId;
                }
                
                // 更新语言选择提示
                const langHint = document.querySelector('.lang-hint');
                if (langHint) {
                    if (writingLang === 'zh') {
                        langHint.textContent = currentLanguage === 'zh' ? 
                            '将自动翻译为英文' : 'Will auto-translate to English';
                    } else {
                        langHint.textContent = currentLanguage === 'zh' ? 
                            '将自动翻译为中文' : 'Will auto-translate to Chinese';
                    }
                }
            }
        }, 100);
        
    } catch (error) {
        console.error('编辑文章失败:', error);
        const errorMessage = currentLanguage === 'zh' ? '编辑文章失败' : 'Failed to edit article';
        showNotification(errorMessage, 'error');
    }
}

// 获取分类名称 / Get category name
// 根据关键词自动分类 / Auto categorize based on keywords
function getAutoCategory(keywords) {
    if (!keywords) return 'academic-resources';
    
    const keywordsLower = keywords.toLowerCase();
    
    // AI工具相关关键词
    if (keywordsLower.includes('ai') || keywordsLower.includes('人工智能') || 
        keywordsLower.includes('chatgpt') || keywordsLower.includes('机器学习') ||
        keywordsLower.includes('artificial intelligence') || keywordsLower.includes('machine learning')) {
        return 'ai-tools';
    }
    
    // 写作技巧相关关键词
    if (keywordsLower.includes('写作') || keywordsLower.includes('论文') || 
        keywordsLower.includes('writing') || keywordsLower.includes('essay') ||
        keywordsLower.includes('academic writing') || keywordsLower.includes('学术写作')) {
        return 'writing-tips';
    }
    
    // 研究方法相关关键词
    if (keywordsLower.includes('研究') || keywordsLower.includes('方法') || 
        keywordsLower.includes('research') || keywordsLower.includes('methodology') ||
        keywordsLower.includes('数据分析') || keywordsLower.includes('data analysis')) {
        return 'research-methods';
    }
    
    // 发表指导相关关键词
    if (keywordsLower.includes('发表') || keywordsLower.includes('期刊') || 
        keywordsLower.includes('publication') || keywordsLower.includes('journal') ||
        keywordsLower.includes('投稿') || keywordsLower.includes('submission')) {
        return 'publication';
    }
    
    // 默认分类
    return 'academic-resources';
}

function getCategoryName(category) {
    const categoryNames = {
        'ai-tools': currentLanguage === 'zh' ? 'AI工具' : 'AI Tools',
        'writing-tips': currentLanguage === 'zh' ? '写作技巧' : 'Writing Tips', 
        'research-methods': currentLanguage === 'zh' ? '研究方法' : 'Research Methods',
        'academic-resources': currentLanguage === 'zh' ? '学术资源' : 'Academic Resources',
        'publication': currentLanguage === 'zh' ? '发表指导' : 'Publication'
    };
    return categoryNames[category] || category;
}

// 生成文件名 / Generate filename
function generateFileName(title) {
    return title.toLowerCase()
        .replace(/[^\w\s-]/g, '') // 移除特殊字符
        .replace(/\s+/g, '-') // 空格替换为连字符
        .replace(/--+/g, '-') // 多个连字符替换为单个
        .substring(0, 50); // 限制长度
}

// 生成文章代码 / Generate article code
function generateArticleCode(data, fileName) {
    const categoryNames = {
        'ai-tools': currentLanguage === 'zh' ? 'AI工具' : 'AI Tools',
        'writing-tips': currentLanguage === 'zh' ? '写作技巧' : 'Writing Tips',
        'research-methods': currentLanguage === 'zh' ? '研究方法' : 'Research Methods',
        'academic-resources': currentLanguage === 'zh' ? '学术资源' : 'Academic Resources',
        'publication': currentLanguage === 'zh' ? '发表指导' : 'Publication'
    };
    
    return `// 添加到 blog-script.js 的 loadPosts 函数中：
{
    id: ${data.id},
    title: "${data.title}",
    excerpt: "${data.excerpt}",
    category: "${data.category}",
    categoryName: "${categoryNames[data.category]}",
    author: "${data.author}",
    date: "${data.date}",
    readTime: "${data.readTime}",
    icon: "${data.icon}",
    url: "${fileName}.html"
},

// 文章内容：
标题: ${data.title}
摘要: ${data.excerpt}
分类: ${data.category}
作者: ${data.author}
日期: ${data.date}
阅读时间: ${data.readTime}
关键词: ${data.keywords}

正文内容:
${data.content}`;
}

// 添加回车键搜索功能
// 导出功能供其他脚本使用
window.blogFunctions = {
    searchPosts,
    filterPostsByCategory,
    subscribeNewsletter,
    showNotification,
    searchArticles,
    showPublishForm,
    closePublishForm
};