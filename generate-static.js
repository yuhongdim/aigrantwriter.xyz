const fs = require('fs');
const path = require('path');

// 文章数据 - 从 localStorage 或默认数据中获取
const articlesData = {
    "mhhtjrhc80kursa47dv": {
        "id": "mhhtjrhc80kursa47dv",
        "title": "AI Tools for Dissertation Literature Review Outline: Streamlining Your Research",
        "content": `<h1>AI Tools for Dissertation Literature Review Outline: Streamlining Your Research</h1>

<p>Writing a dissertation literature review can be one of the most challenging aspects of academic research. The process involves synthesizing vast amounts of scholarly work, identifying gaps in existing research, and presenting a coherent narrative that supports your research questions. Fortunately, artificial intelligence has revolutionized how we approach literature reviews, offering powerful tools that can streamline the entire process.</p>

<h2>Understanding the Literature Review Challenge</h2>

<p>A comprehensive literature review requires researchers to:</p>
<ul>
<li>Search through thousands of academic papers</li>
<li>Identify relevant sources across multiple databases</li>
<li>Synthesize complex information from diverse sources</li>
<li>Organize findings into a logical structure</li>
<li>Identify research gaps and opportunities</li>
</ul>

<p>Traditional methods often involve manual searching, reading, and note-taking – a process that can take months or even years. AI tools are changing this landscape by automating many of these time-consuming tasks.</p>

<h2>Top AI Tools for Literature Review</h2>

<h3>1. Semantic Scholar</h3>
<p>Semantic Scholar uses AI to understand the semantic meaning of research papers, making it easier to find relevant literature. Its AI-powered search goes beyond keyword matching to understand context and meaning.</p>

<h3>2. Research Rabbit</h3>
<p>This tool creates visual maps of research papers, showing connections between different studies and helping researchers discover new relevant papers through citation networks.</p>

<h3>3. Elicit</h3>
<p>Elicit uses language models to help researchers find papers, extract key information, and synthesize findings. It can answer research questions by pulling information from multiple papers.</p>

<h3>4. Litmaps</h3>
<p>Litmaps creates interactive citation maps that help researchers visualize the landscape of their research area and discover influential papers they might have missed.</p>

<h3>5. Scite</h3>
<p>Scite uses AI to analyze how papers cite each other, providing context about whether citations support, contradict, or simply mention the cited work.</p>

<h2>Creating an Effective Outline with AI</h2>

<p>Once you've gathered your sources using AI tools, the next step is creating a structured outline. Here's how AI can help:</p>

<h3>Thematic Analysis</h3>
<p>AI tools can analyze your collected papers and identify common themes, helping you organize your literature review into logical sections.</p>

<h3>Gap Identification</h3>
<p>Machine learning algorithms can identify areas where research is sparse, helping you pinpoint potential research gaps.</p>

<h3>Chronological Organization</h3>
<p>AI can help organize literature chronologically, showing how research in your field has evolved over time.</p>

<h2>Best Practices for AI-Assisted Literature Reviews</h2>

<h3>1. Start with Broad Searches</h3>
<p>Use AI tools to cast a wide net initially, then narrow down your focus based on the most relevant findings.</p>

<h3>2. Verify AI Recommendations</h3>
<p>While AI tools are powerful, always verify their recommendations and ensure the sources they suggest are truly relevant to your research.</p>

<h3>3. Combine Multiple Tools</h3>
<p>Different AI tools have different strengths. Use a combination of tools to get the most comprehensive view of your research area.</p>

<h3>4. Maintain Critical Thinking</h3>
<p>AI tools should supplement, not replace, your critical thinking and analysis skills.</p>

<h2>The Future of AI in Academic Research</h2>

<p>As AI technology continues to advance, we can expect even more sophisticated tools for literature review and academic research. Future developments may include:</p>

<ul>
<li>More accurate semantic understanding of research papers</li>
<li>Better integration between different research databases</li>
<li>Advanced synthesis capabilities that can generate literature review drafts</li>
<li>Real-time updates as new relevant research is published</li>
</ul>

<h2>Conclusion</h2>

<p>AI tools have transformed the literature review process, making it more efficient and comprehensive than ever before. By leveraging these technologies, researchers can focus more time on analysis and synthesis rather than manual searching and organization. However, it's important to remember that these tools are aids to, not replacements for, careful scholarly work.</p>

<p>The key to success is learning how to effectively integrate AI tools into your research workflow while maintaining the critical thinking and analytical skills that are essential for high-quality academic work. As these tools continue to evolve, they will undoubtedly become even more valuable assets in the researcher's toolkit.</p>`,
        "excerpt": "Discover how AI tools are revolutionizing dissertation literature reviews. Learn about the best AI-powered platforms for research discovery, organization, and synthesis to streamline your academic research process.",
        "author": "AI Grant Writer",
        "publishDate": "2024-01-15",
        "readTime": "8 min read",
        "tags": ["AI Tools", "Literature Review", "Academic Research", "Dissertation", "Research Methods"],
        "category": "Academic Writing",
        "slug": "ai-tools-for-dissertation-literature-review-outline-streamlining-your-research"
    }
};

// 读取模板文件
function readTemplate() {
    // 直接使用基本模板，不读取模板文件
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{TITLE}} - AI Grant Writer</title>
    <meta name="description" content="{{EXCERPT}}">
    <meta name="keywords" content="{{KEYWORDS}}">
    <meta name="author" content="{{AUTHOR}}">
    <meta name="robots" content="index, follow">
    
    <!-- Open Graph Meta Tags -->
    <meta property="og:title" content="{{TITLE}}">
    <meta property="og:description" content="{{EXCERPT}}">
    <meta property="og:type" content="article">
    <meta property="og:url" content="https://www.aigrantwriter.xyz/blog/{{SLUG}}.html">
    <meta property="og:site_name" content="AI Grant Writer">
    
    <!-- Twitter Card Meta Tags -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="{{TITLE}}">
    <meta name="twitter:description" content="{{EXCERPT}}">
    
    <!-- Canonical URL -->
    <link rel="canonical" href="https://www.aigrantwriter.xyz/blog/{{SLUG}}.html">
    
    <!-- Favicon -->
    <link rel="icon" type="image/x-icon" href="../favicon.ico">
    
    <!-- CSS -->
    <link rel="stylesheet" href="../styles.css">
    <link rel="stylesheet" href="blog-styles.css">
    
    <!-- JSON-LD Structured Data -->
    <script type="application/ld+json">
    {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": "{{TITLE}}",
        "description": "{{EXCERPT}}",
        "author": {
            "@type": "Person",
            "name": "{{AUTHOR}}"
        },
        "datePublished": "{{PUBLISH_DATE}}",
        "dateModified": "{{PUBLISH_DATE}}",
        "publisher": {
            "@type": "Organization",
            "name": "AI Grant Writer",
            "url": "https://www.aigrantwriter.xyz"
        },
        "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": "https://www.aigrantwriter.xyz/blog/{{SLUG}}.html"
        }
    }
    </script>
</head>
<body>
    <header>
        <nav>
            <div class="nav-container">
                <a href="../index.html" class="logo">AI Grant Writer</a>
                <ul class="nav-menu">
                    <li><a href="../index.html">Home</a></li>
                    <li><a href="../blog.html">Blog</a></li>
                    <li><a href="../about.html">About</a></li>
                    <li><a href="../contact.html">Contact</a></li>
                </ul>
            </div>
        </nav>
    </header>

    <main class="article-main">
        <article class="article-content">
            <div class="article-meta">
                <span class="publish-date">{{PUBLISH_DATE}}</span>
                <span class="read-time">{{READ_TIME}}</span>
                <span class="category">{{CATEGORY}}</span>
            </div>
            
            <div class="article-body">
                {{CONTENT}}
            </div>
            
            <div class="article-tags">
                {{TAGS}}
            </div>
        </article>
    </main>

    <footer>
        <div class="footer-content">
            <p>&copy; 2024 AI Grant Writer. All rights reserved.</p>
        </div>
    </footer>
</body>
</html>`;
}

// 生成静态HTML文件
function generateStaticHTML(articleId) {
    const article = articlesData[articleId];
    if (!article) {
        console.error(`Article with ID ${articleId} not found`);
        return false;
    }
    
    let template = readTemplate();
    
    // 替换模板中的占位符
    template = template.replace(/{{TITLE}}/g, article.title);
    template = template.replace(/{{EXCERPT}}/g, article.excerpt);
    template = template.replace(/{{CONTENT}}/g, article.content);
    template = template.replace(/{{AUTHOR}}/g, article.author);
    template = template.replace(/{{PUBLISH_DATE}}/g, article.publishDate);
    template = template.replace(/{{READ_TIME}}/g, article.readTime);
    template = template.replace(/{{CATEGORY}}/g, article.category);
    template = template.replace(/{{SLUG}}/g, article.slug);
    template = template.replace(/{{KEYWORDS}}/g, article.tags.join(', '));
    
    // 生成标签HTML
    const tagsHTML = article.tags.map(tag => `<span class="tag">${tag}</span>`).join('');
    template = template.replace(/{{TAGS}}/g, tagsHTML);
    
    // 确保blog目录存在
    const blogDir = path.join(__dirname, 'blog');
    if (!fs.existsSync(blogDir)) {
        fs.mkdirSync(blogDir, { recursive: true });
    }
    
    // 写入静态HTML文件
    const outputPath = path.join(blogDir, `${article.slug}.html`);
    fs.writeFileSync(outputPath, template, 'utf8');
    
    console.log(`Static HTML file generated: ${outputPath}`);
    return true;
}

// 更新sitemap.xml
function updateSitemap(articleSlug) {
    const sitemapPath = path.join(__dirname, 'sitemap.xml');
    const articleUrl = `https://www.aigrantwriter.xyz/blog/${articleSlug}.html`;
    
    let sitemap = '';
    if (fs.existsSync(sitemapPath)) {
        sitemap = fs.readFileSync(sitemapPath, 'utf8');
    } else {
        sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url>
        <loc>https://www.aigrantwriter.xyz/</loc>
        <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>1.0</priority>
    </url>
    <url>
        <loc>https://www.aigrantwriter.xyz/blog.html</loc>
        <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.8</priority>
    </url>
</urlset>`;
    }
    
    // 检查URL是否已存在
    if (!sitemap.includes(articleUrl)) {
        const newUrl = `    <url>
        <loc>${articleUrl}</loc>
        <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.7</priority>
    </url>
</urlset>`;
        
        sitemap = sitemap.replace('</urlset>', newUrl);
        fs.writeFileSync(sitemapPath, sitemap, 'utf8');
        console.log(`Sitemap updated with: ${articleUrl}`);
    }
}

// 主函数
function main() {
    const articleId = 'mhhtjrhc80kursa47dv';
    
    console.log(`Generating static HTML for article ID: ${articleId}`);
    
    if (generateStaticHTML(articleId)) {
        const article = articlesData[articleId];
        updateSitemap(article.slug);
        console.log('✅ Static file generation completed successfully!');
        console.log(`📄 Static file: blog/${article.slug}.html`);
        console.log(`🔗 URL: https://www.aigrantwriter.xyz/blog/${article.slug}.html`);
    } else {
        console.log('❌ Failed to generate static file');
    }
}

// 运行脚本
main();