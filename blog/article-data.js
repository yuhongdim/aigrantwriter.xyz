// 文章数据管理系统
// 这个文件用于管理所有博客文章的数据

// 文章数据结构
const articlesData = {
    // 现有文章
    "ai-academic-writing-guide-2024": {
        id: "ai-academic-writing-guide-2024",
        title: "AI学术写作指南2024：从入门到精通",
        description: "全面的AI学术写作指南，涵盖工具选择、写作技巧、质量控制等方面，帮助研究者提升学术写作效率和质量。",
        author: "AI Grant Writer",
        publishDate: "2024-10-15",
        lastModified: "2024-10-15",
        category: "学术写作",
        tags: ["AI写作", "学术论文", "研究方法", "写作技巧"],
        readTime: "15分钟",
        featured: true,
        status: "published",
        url: "ai-academic-writing-guide-2024.html",
        image: "../images/ai-writing-guide.jpg",
        excerpt: "探索如何利用AI技术提升学术写作效率，从选择合适的工具到掌握高级写作技巧，本指南将为您提供全面的解决方案。"
    },
    
    "academic-abstract-writing-guide": {
        id: "academic-abstract-writing-guide",
        title: "学术摘要写作完全指南",
        description: "详细介绍学术摘要的写作方法、结构要求和常见问题，帮助研究者撰写高质量的学术摘要。",
        author: "AI Grant Writer",
        publishDate: "2024-09-20",
        lastModified: "2024-09-20",
        category: "学术写作",
        tags: ["摘要写作", "学术论文", "写作规范"],
        readTime: "10分钟",
        featured: false,
        status: "published",
        url: "academic-abstract-writing-guide.html",
        image: "../images/abstract-guide.jpg",
        excerpt: "学术摘要是论文的重要组成部分，本指南将教您如何撰写清晰、准确、有吸引力的学术摘要。"
    }
};

// 文章分类
const categories = {
    "学术写作": {
        name: "学术写作",
        description: "学术论文写作技巧和方法",
        color: "#3b82f6",
        icon: "📝"
    },
    "研究方法": {
        name: "研究方法",
        description: "科研方法和技巧分享",
        color: "#10b981",
        icon: "🔬"
    },
    "AI工具": {
        name: "AI工具",
        description: "AI写作工具使用指南",
        color: "#8b5cf6",
        icon: "🤖"
    },
    "资助申请": {
        name: "资助申请",
        description: "科研资助申请技巧",
        color: "#f59e0b",
        icon: "💰"
    }
};

// 获取所有文章
function getAllArticles() {
    return Object.values(articlesData).filter(article => article.status === 'published');
}

// 根据分类获取文章
function getArticlesByCategory(category) {
    return getAllArticles().filter(article => article.category === category);
}

// 获取精选文章
function getFeaturedArticles() {
    return getAllArticles().filter(article => article.featured);
}

// 根据ID获取文章
function getArticleById(id) {
    return articlesData[id];
}

// 搜索文章
function searchArticles(query) {
    const lowercaseQuery = query.toLowerCase();
    return getAllArticles().filter(article => 
        article.title.toLowerCase().includes(lowercaseQuery) ||
        article.description.toLowerCase().includes(lowercaseQuery) ||
        article.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery)) ||
        article.excerpt.toLowerCase().includes(lowercaseQuery)
    );
}

// 添加新文章
function addArticle(articleData) {
    const id = articleData.id || generateArticleId(articleData.title);
    articlesData[id] = {
        ...articleData,
        id: id,
        publishDate: articleData.publishDate || new Date().toISOString().split('T')[0],
        lastModified: new Date().toISOString().split('T')[0],
        status: articleData.status || 'published'
    };
    
    // 保存到本地存储（如果在浏览器环境中）
    if (typeof localStorage !== 'undefined') {
        localStorage.setItem('articlesData', JSON.stringify(articlesData));
    }
    
    return articlesData[id];
}

// 生成文章ID
function generateArticleId(title) {
    return title.toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim('-') + '-' + Date.now();
}

// 获取文章统计信息
function getArticleStats() {
    const articles = getAllArticles();
    const categoryStats = {};
    
    articles.forEach(article => {
        if (!categoryStats[article.category]) {
            categoryStats[article.category] = 0;
        }
        categoryStats[article.category]++;
    });
    
    return {
        total: articles.length,
        featured: getFeaturedArticles().length,
        categories: categoryStats,
        latestArticle: articles.sort((a, b) => new Date(b.publishDate) - new Date(a.publishDate))[0]
    };
}

// 导出函数和数据
if (typeof module !== 'undefined' && module.exports) {
    // Node.js 环境
    module.exports = {
        articlesData,
        categories,
        getAllArticles,
        getArticlesByCategory,
        getFeaturedArticles,
        getArticleById,
        searchArticles,
        addArticle,
        getArticleStats
    };
} else {
    // 浏览器环境
    window.ArticleManager = {
        articlesData,
        categories,
        getAllArticles,
        getArticlesByCategory,
        getFeaturedArticles,
        getArticleById,
        searchArticles,
        addArticle,
        getArticleStats
    };
}