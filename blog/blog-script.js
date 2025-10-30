// Blog JavaScript Functions

// 博客功能脚本 / Blog Functions Script
let allPosts = [];
let currentCategory = 'all';
let postsPerPage = 6;
let currentPage = 1;
let currentLanguage = 'zh'; // 默认语言 / Default language

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
        contactSupport: '联系客服'
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
        contactSupport: 'Contact Support'
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
    currentLanguage = lang;
    document.documentElement.setAttribute('data-lang', lang);
    
    // 更新所有双语元素 / Update all bilingual elements
    const bilingualElements = document.querySelectorAll('[data-zh][data-en]');
    bilingualElements.forEach(element => {
        const text = lang === 'zh' ? element.getAttribute('data-zh') : element.getAttribute('data-en');
        element.textContent = text;
    });
    
    // 更新语言按钮状态 / Update language button states
    document.querySelectorAll('.lang-btn').forEach(btn => {
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
    // 加载保存的语言偏好 / Load saved language preference
    const savedLanguage = localStorage.getItem('preferredLanguage') || 'zh';
    switchLanguage(savedLanguage);
    
    initializeBlog();
    setupEventListeners();
});

// 初始化博客功能 / Initialize blog functions
function initializeBlog() {
    loadPosts();
    setupCategoryFilter();
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
    langButtons.forEach(button => {
        button.addEventListener('click', function() {
            const lang = this.getAttribute('data-lang');
            switchLanguage(lang);
        });
    });
}

// 加载文章数据
function loadPosts() {
    // 示例文章数据 - 实际使用时可以从API或JSON文件加载
    allPosts = [
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

    displayPosts();
}

// 显示文章
function displayPosts() {
    const postsGrid = document.getElementById('postsGrid');
    if (!postsGrid) return;

    // 筛选文章
    let filteredPosts = currentCategory === 'all' 
        ? allPosts 
        : allPosts.filter(post => post.category === currentCategory);

    // 分页
    const startIndex = (currentPage - 1) * postsPerPage;
    const endIndex = startIndex + postsPerPage;
    const postsToShow = filteredPosts.slice(0, endIndex);

    // 清空现有内容
    postsGrid.innerHTML = '';

    // 生成文章卡片
    postsToShow.forEach(post => {
        const postCard = createPostCard(post);
        postsGrid.appendChild(postCard);
    });

    // 更新加载更多按钮
    updateLoadMoreButton(filteredPosts.length, endIndex);

    // 添加动画效果
    const cards = postsGrid.querySelectorAll('.post-card');
    cards.forEach((card, index) => {
        setTimeout(() => {
            card.classList.add('fade-in');
        }, index * 100);
    });
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

    card.innerHTML = `
        <div class="post-image">
            <i class="${post.icon}"></i>
            ${post.isNew ? '<span class="new-badge">新</span>' : ''}
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
                        <div class="form-group">
                            <label for="articleTitle">${currentLanguage === 'zh' ? '文章标题' : 'Article Title'} *</label>
                            <input type="text" id="articleTitle" name="title" required 
                                   placeholder="${currentLanguage === 'zh' ? '请输入文章标题...' : 'Enter article title...'}">
                        </div>
                        
                        <div class="form-group">
                            <label for="articleExcerpt">${currentLanguage === 'zh' ? '文章摘要' : 'Article Excerpt'} *</label>
                            <textarea id="articleExcerpt" name="excerpt" rows="3" required 
                                      placeholder="${currentLanguage === 'zh' ? '请输入文章摘要，建议100-200字...' : 'Enter article excerpt, 100-200 words recommended...'}"></textarea>
                        </div>
                        
                        <div class="form-row">
                            <div class="form-group">
                                <label for="articleCategory">${currentLanguage === 'zh' ? '文章分类' : 'Category'} *</label>
                                <select id="articleCategory" name="category" required>
                                    <option value="">${currentLanguage === 'zh' ? '选择分类' : 'Select Category'}</option>
                                    <option value="ai-tools">${currentLanguage === 'zh' ? 'AI工具' : 'AI Tools'}</option>
                                    <option value="writing-tips">${currentLanguage === 'zh' ? '写作技巧' : 'Writing Tips'}</option>
                                    <option value="research-methods">${currentLanguage === 'zh' ? '研究方法' : 'Research Methods'}</option>
                                    <option value="academic-resources">${currentLanguage === 'zh' ? '学术资源' : 'Academic Resources'}</option>
                                    <option value="publication">${currentLanguage === 'zh' ? '发表指导' : 'Publication'}</option>
                                </select>
                            </div>
                            
                            <div class="form-group">
                                <label for="articleAuthor">${currentLanguage === 'zh' ? '作者' : 'Author'} *</label>
                                <input type="text" id="articleAuthor" name="author" required 
                                       placeholder="${currentLanguage === 'zh' ? '作者姓名' : 'Author name'}">
                            </div>
                        </div>
                        
                        <div class="form-row">
                            <div class="form-group">
                                <label for="articleReadTime">${currentLanguage === 'zh' ? '阅读时间' : 'Read Time'}</label>
                                <input type="text" id="articleReadTime" name="readTime" 
                                       placeholder="${currentLanguage === 'zh' ? '如：5分钟' : 'e.g., 5 min'}">
                            </div>
                            
                            <div class="form-group">
                                <label for="articleIcon">${currentLanguage === 'zh' ? '图标' : 'Icon'}</label>
                                <select id="articleIcon" name="icon">
                                    <option value="fas fa-robot">🤖 Robot</option>
                                    <option value="fas fa-pen-fancy">✒️ Pen</option>
                                    <option value="fas fa-microscope">🔬 Microscope</option>
                                    <option value="fas fa-database">💾 Database</option>
                                    <option value="fas fa-graduation-cap">🎓 Graduation</option>
                                    <option value="fas fa-book">📚 Book</option>
                                    <option value="fas fa-chart-line">📈 Chart</option>
                                </select>
                            </div>
                        </div>
                        
                        <div class="form-group">
                            <label for="articleContent">${currentLanguage === 'zh' ? '文章内容' : 'Article Content'} *</label>
                            <textarea id="articleContent" name="content" rows="10" required 
                                      placeholder="${currentLanguage === 'zh' ? '请输入文章正文内容...' : 'Enter article content...'}"></textarea>
                        </div>
                        
                        <div class="form-group">
                            <label for="articleKeywords">${currentLanguage === 'zh' ? '关键词' : 'Keywords'}</label>
                            <input type="text" id="articleKeywords" name="keywords" 
                                   placeholder="${currentLanguage === 'zh' ? '用逗号分隔，如：AI写作,学术论文,研究方法' : 'Comma separated, e.g., AI writing, academic paper, research method'}">
                        </div>
                        
                        <div class="form-actions">
                            <button type="button" class="btn btn-secondary" onclick="closePublishForm()">
                                ${currentLanguage === 'zh' ? '取消' : 'Cancel'}
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
}

// 关闭发布表单 / Close publish form
function closePublishForm() {
    const modal = document.getElementById('publishModal');
    if (modal) {
        modal.remove();
        document.body.style.overflow = 'auto';
    }
}

// 处理表单提交 / Handle form submission
function handlePublishSubmit(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const articleData = {
        title: formData.get('title'),
        excerpt: formData.get('excerpt'),
        category: formData.get('category'),
        author: formData.get('author'),
        readTime: formData.get('readTime') || '5分钟',
        icon: formData.get('icon') || 'fas fa-file-alt',
        content: formData.get('content'),
        keywords: formData.get('keywords'),
        date: new Date().toISOString().split('T')[0],
        id: Date.now() // 简单的ID生成
    };
    
    // 验证必填字段
    if (!articleData.title || !articleData.excerpt || !articleData.category || !articleData.author || !articleData.content) {
        const message = currentLanguage === 'zh' ? '请填写所有必填字段' : 'Please fill in all required fields';
        showNotification(message, 'error');
        return;
    }
    
    // 生成文件名
    const fileName = generateFileName(articleData.title);
    
    // 显示处理中消息
    const processingMessage = currentLanguage === 'zh' ? 
        '正在处理文章发布...' : 'Processing article publication...';
    showNotification(processingMessage, 'info');
    
    // 模拟文章发布过程
    setTimeout(() => {
        // 将文章添加到当前会话的文章列表中（临时显示）
        const newPost = {
            id: articleData.id,
            title: articleData.title,
            excerpt: articleData.excerpt,
            category: articleData.category,
            categoryName: getCategoryName(articleData.category),
            author: articleData.author,
            date: articleData.date,
            readTime: articleData.readTime,
            icon: articleData.icon,
            url: `${fileName}.html`,
            isNew: true // 标记为新文章
        };
        
        // 添加到文章列表开头
        allPosts.unshift(newPost);
        
        // 重新显示文章列表
        displayPosts();
        
        // 显示成功消息和说明
        const successMessage = currentLanguage === 'zh' ? 
            `文章发布成功！\n\n您的文章"${articleData.title}"已添加到博客列表中。\n\n注意：这是演示版本，文章仅在当前会话中可见。\n如需永久保存，请联系管理员或按照开发文档进行配置。` :
            `Article published successfully!\n\nYour article "${articleData.title}" has been added to the blog list.\n\nNote: This is a demo version, the article is only visible in the current session.\nFor permanent storage, please contact the administrator or follow the development documentation.`;
        
        showNotification(successMessage, 'success');
        closePublishForm();
        
        // 滚动到页面顶部显示新文章
        window.scrollTo({ top: 0, behavior: 'smooth' });
        
    }, 1500); // 1.5秒延迟模拟处理时间
}

// 获取分类名称 / Get category name
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
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                searchArticles();
            }
        });
    }
});

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