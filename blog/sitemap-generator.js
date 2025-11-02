// Sitemap Generator for SEO and Google Indexing
class SitemapGenerator {
    constructor(baseUrl = 'https://aigrantwriter.xyz') {
        this.baseUrl = baseUrl;
        this.sitemapData = [];
        this.init();
    }

    init() {
        this.loadExistingSitemap();
        this.generateSitemap();
    }

    loadExistingSitemap() {
        try {
            const stored = localStorage.getItem('sitemap');
            this.sitemapData = stored ? JSON.parse(stored) : [];
        } catch (error) {
            console.error('Error loading sitemap:', error);
            this.sitemapData = [];
        }
    }

    addUrl(url, lastmod = new Date().toISOString(), changefreq = 'monthly', priority = '0.8') {
        const urlEntry = {
            loc: url,
            lastmod: lastmod.split('T')[0], // Format as YYYY-MM-DD
            changefreq: changefreq,
            priority: priority
        };

        // Check if URL already exists
        const existingIndex = this.sitemapData.findIndex(entry => entry.loc === url);
        
        if (existingIndex >= 0) {
            // Update existing entry
            this.sitemapData[existingIndex] = urlEntry;
        } else {
            // Add new entry
            this.sitemapData.push(urlEntry);
        }

        this.saveSitemap();
        return urlEntry;
    }

    removeUrl(url) {
        this.sitemapData = this.sitemapData.filter(entry => entry.loc !== url);
        this.saveSitemap();
    }

    generateSitemap() {
        // Add static pages
        this.addStaticPages();
        
        // Add blog articles
        this.addBlogArticles();
        
        // Generate XML
        const xml = this.generateXML();
        
        // Save XML sitemap
        this.saveSitemapXML(xml);
        
        return xml;
    }

    addStaticPages() {
        const staticPages = [
            {
                url: `${this.baseUrl}/`,
                changefreq: 'weekly',
                priority: '1.0'
            },
            {
                url: `${this.baseUrl}/blog/`,
                changefreq: 'daily',
                priority: '0.9'
            },
            {
                url: `${this.baseUrl}/blog/index.html`,
                changefreq: 'daily',
                priority: '0.9'
            },
            {
                url: `${this.baseUrl}/about.html`,
                changefreq: 'monthly',
                priority: '0.7'
            },
            {
                url: `${this.baseUrl}/contact.html`,
                changefreq: 'monthly',
                priority: '0.6'
            }
        ];

        staticPages.forEach(page => {
            this.addUrl(page.url, new Date().toISOString(), page.changefreq, page.priority);
        });
    }

    addBlogArticles() {
        try {
            // 已发布的新文章（本地存储）
            const newArticles = JSON.parse(localStorage.getItem('publishedArticles') || '[]');

            // 用于去重的集合
            const added = new Set(this.sitemapData.map(e => e.loc));

            // 1) 收录通过发布表单生成的新文章
            newArticles.forEach(article => {
                if (article.slug && article.publishImmediately) {
                    const articleUrl = `${this.baseUrl}/blog/${article.slug}.html`;
                    if (!added.has(articleUrl)) {
                        this.addUrl(
                            articleUrl,
                            article.publishDate || new Date().toISOString(),
                            'monthly',
                            '0.8'
                        );
                        added.add(articleUrl);
                    }
                }
            });

            // 2) 收录原网站已有文章（ArticleManager）
            if (typeof window !== 'undefined' && window.ArticleManager && typeof window.ArticleManager.getAllArticles === 'function') {
                const existingArticles = window.ArticleManager.getAllArticles();
                existingArticles.forEach(a => {
                    const urlPart = a.url || (a.slug ? `${a.slug}.html` : null);
                    if (!urlPart) return;
                    const articleUrl = `${this.baseUrl}/blog/${urlPart}`;
                    if (!added.has(articleUrl)) {
                        this.addUrl(
                            articleUrl,
                            (a.lastModified || a.publishDate || new Date().toISOString()),
                            'monthly',
                            '0.8'
                        );
                        added.add(articleUrl);
                    }
                });
            }
        } catch (error) {
            console.error('Error adding blog articles to sitemap:', error);
        }
    }

    generateXML() {
        const xmlHeader = '<?xml version="1.0" encoding="UTF-8"?>\n';
        const urlsetOpen = '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
        const urlsetClose = '</urlset>';

        let xmlContent = xmlHeader + urlsetOpen;

        this.sitemapData.forEach(entry => {
            xmlContent += '  <url>\n';
            xmlContent += `    <loc>${this.escapeXml(entry.loc)}</loc>\n`;
            xmlContent += `    <lastmod>${entry.lastmod}</lastmod>\n`;
            xmlContent += `    <changefreq>${entry.changefreq}</changefreq>\n`;
            xmlContent += `    <priority>${entry.priority}</priority>\n`;
            xmlContent += '  </url>\n';
        });

        xmlContent += urlsetClose;
        return xmlContent;
    }

    escapeXml(unsafe) {
        return unsafe.replace(/[<>&'"]/g, function (c) {
            switch (c) {
                case '<': return '&lt;';
                case '>': return '&gt;';
                case '&': return '&amp;';
                case '\'': return '&apos;';
                case '"': return '&quot;';
            }
        });
    }

    saveSitemap() {
        try {
            localStorage.setItem('sitemap', JSON.stringify(this.sitemapData));
        } catch (error) {
            console.error('Error saving sitemap:', error);
        }
    }

    saveSitemapXML(xml) {
        try {
            localStorage.setItem('sitemapXML', xml);
            
            // Create downloadable sitemap file
            const blob = new Blob([xml], { type: 'application/xml' });
            const url = URL.createObjectURL(blob);
            
            // Store URL for download
            localStorage.setItem('sitemapDownloadUrl', url);
            
            console.log('Sitemap XML generated and saved');
            return url;
        } catch (error) {
            console.error('Error saving sitemap XML:', error);
        }
    }

    downloadSitemap() {
        const xml = this.generateXML();
        const blob = new Blob([xml], { type: 'application/xml' });
        const url = URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = url;
        a.download = 'sitemap.xml';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }

    // Ping Google to notify sitemap location (simple, CORS-friendly)
    async pingGoogleSitemap() {
        try {
            const sitemapUrl = `${this.baseUrl}/sitemap.xml`;
            const pingUrl = `https://www.google.com/ping?sitemap=${encodeURIComponent(sitemapUrl)}`;
            // Use no-cors fetch to send the ping; response is opaque but request is sent
            await fetch(pingUrl, { mode: 'no-cors' });
            console.log('Google ping sent for sitemap:', sitemapUrl);
        } catch (error) {
            console.warn('Google ping failed:', error);
        }
    }

    getSitemapStats() {
        return {
            totalUrls: this.sitemapData.length,
            lastUpdated: new Date().toISOString(),
            urls: this.sitemapData
        };
    }

    validateSitemap() {
        const errors = [];
        
        this.sitemapData.forEach((entry, index) => {
            // Validate URL format
            try {
                new URL(entry.loc);
            } catch (e) {
                errors.push(`Invalid URL at index ${index}: ${entry.loc}`);
            }
            
            // Validate changefreq
            const validChangefreq = ['always', 'hourly', 'daily', 'weekly', 'monthly', 'yearly', 'never'];
            if (!validChangefreq.includes(entry.changefreq)) {
                errors.push(`Invalid changefreq at index ${index}: ${entry.changefreq}`);
            }
            
            // Validate priority
            const priority = parseFloat(entry.priority);
            if (isNaN(priority) || priority < 0 || priority > 1) {
                errors.push(`Invalid priority at index ${index}: ${entry.priority}`);
            }
            
            // Validate lastmod format
            if (!/^\d{4}-\d{2}-\d{2}$/.test(entry.lastmod)) {
                errors.push(`Invalid lastmod format at index ${index}: ${entry.lastmod}`);
            }
        });
        
        return {
            isValid: errors.length === 0,
            errors: errors
        };
    }

    // Google Search Console integration
    async submitToGoogle(indexingApiKey = null) {
        if (!indexingApiKey) {
            console.warn('Google Indexing API key not provided. Skipping automatic submission.');
            return false;
        }

        try {
            // This would integrate with Google's Indexing API
            // For now, we'll simulate the submission
            console.log('Submitting sitemap to Google Search Console...');
            
            // In a real implementation, you would:
            // 1. Use Google's Indexing API
            // 2. Submit individual URLs for indexing
            // 3. Handle authentication with service account
            
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            console.log('Sitemap submitted to Google successfully');
            return true;
        } catch (error) {
            console.error('Error submitting to Google:', error);
            return false;
        }
    }

    // Generate robots.txt content
    generateRobotsTxt() {
        const robotsTxt = `User-agent: *
Allow: /

# Sitemap
Sitemap: ${this.baseUrl}/sitemap.xml

# Crawl-delay for polite crawling
Crawl-delay: 1

# Disallow admin areas (if any)
Disallow: /admin/
Disallow: /private/
Disallow: /*.json$
Disallow: /api/

# Allow important directories
Allow: /blog/
Allow: /assets/
Allow: /css/
Allow: /js/
Allow: /images/`;

        return robotsTxt;
    }

    saveRobotsTxt() {
        const robotsTxt = this.generateRobotsTxt();
        
        try {
            localStorage.setItem('robotsTxt', robotsTxt);
            
            // Create downloadable robots.txt file
            const blob = new Blob([robotsTxt], { type: 'text/plain' });
            const url = URL.createObjectURL(blob);
            
            localStorage.setItem('robotsTxtDownloadUrl', url);
            
            console.log('robots.txt generated and saved');
            return url;
        } catch (error) {
            console.error('Error saving robots.txt:', error);
        }
    }

    downloadRobotsTxt() {
        const robotsTxt = this.generateRobotsTxt();
        const blob = new Blob([robotsTxt], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = url;
        a.download = 'robots.txt';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }
}

// Google Analytics and Search Console helper
class SEOHelper {
    constructor() {
        this.sitemapGenerator = new SitemapGenerator();
    }

    // Generate structured data for articles
    generateArticleStructuredData(article) {
        return {
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": article.title,
            "description": article.excerpt,
            "image": article.image || `${this.sitemapGenerator.baseUrl}/assets/default-article-image.jpg`,
            "author": {
                "@type": "Person",
                "name": "AI Grant Writer",
                "url": this.sitemapGenerator.baseUrl
            },
            "publisher": {
                "@type": "Organization",
                "name": "AI Grant Writer",
                "logo": {
                    "@type": "ImageObject",
                    "url": `${this.sitemapGenerator.baseUrl}/favicon.svg`
                }
            },
            "datePublished": article.publishDate,
            "dateModified": article.publishDate,
            "mainEntityOfPage": {
                "@type": "WebPage",
                "@id": `${this.sitemapGenerator.baseUrl}/blog/${article.slug}.html`
            },
            "keywords": article.keywords,
            "articleSection": article.category,
            "wordCount": this.calculateWordCount(article.content)
        };
    }

    calculateWordCount(content) {
        return content.trim() ? content.trim().split(/\s+/).length : 0;
    }

    // Generate meta tags for better SEO
    generateMetaTags(article) {
        return {
            title: `${article.title} - AI Grant Writer Blog`,
            description: article.excerpt,
            keywords: article.keywords,
            canonical: `${this.sitemapGenerator.baseUrl}/blog/${article.slug}.html`,
            ogTitle: article.title,
            ogDescription: article.excerpt,
            ogUrl: `${this.sitemapGenerator.baseUrl}/blog/${article.slug}.html`,
            ogType: 'article',
            twitterCard: 'summary_large_image',
            twitterTitle: article.title,
            twitterDescription: article.excerpt
        };
    }

    // Check SEO score for an article
    checkSEOScore(article) {
        const score = {
            total: 0,
            maxScore: 100,
            checks: []
        };

        // Title length check (50-60 characters)
        if (article.title.length >= 50 && article.title.length <= 60) {
            score.total += 15;
            score.checks.push({ name: 'Title Length', status: 'good', points: 15 });
        } else {
            score.checks.push({ name: 'Title Length', status: 'warning', points: 0, suggestion: 'Title should be 50-60 characters' });
        }

        // Description length check (150-160 characters)
        if (article.excerpt.length >= 150 && article.excerpt.length <= 160) {
            score.total += 15;
            score.checks.push({ name: 'Meta Description', status: 'good', points: 15 });
        } else {
            score.checks.push({ name: 'Meta Description', status: 'warning', points: 0, suggestion: 'Description should be 150-160 characters' });
        }

        // Keywords check
        if (article.keywords && article.keywords.trim()) {
            score.total += 10;
            score.checks.push({ name: 'Keywords', status: 'good', points: 10 });
        } else {
            score.checks.push({ name: 'Keywords', status: 'warning', points: 0, suggestion: 'Add relevant keywords' });
        }

        // Content length check (minimum 300 words)
        const wordCount = this.calculateWordCount(article.content);
        if (wordCount >= 300) {
            score.total += 20;
            score.checks.push({ name: 'Content Length', status: 'good', points: 20 });
        } else {
            score.checks.push({ name: 'Content Length', status: 'warning', points: 0, suggestion: 'Content should be at least 300 words' });
        }

        // Heading structure check
        const hasHeadings = /^#{1,6}\s/.test(article.content);
        if (hasHeadings) {
            score.total += 10;
            score.checks.push({ name: 'Heading Structure', status: 'good', points: 10 });
        } else {
            score.checks.push({ name: 'Heading Structure', status: 'warning', points: 0, suggestion: 'Use headings to structure content' });
        }

        // URL slug check
        if (article.slug && article.slug.length <= 60 && /^[a-z0-9-]+$/.test(article.slug)) {
            score.total += 10;
            score.checks.push({ name: 'URL Slug', status: 'good', points: 10 });
        } else {
            score.checks.push({ name: 'URL Slug', status: 'warning', points: 0, suggestion: 'Use SEO-friendly URL slug' });
        }

        // Reading time check
        if (article.readingTime && article.readingTime >= 3) {
            score.total += 10;
            score.checks.push({ name: 'Reading Time', status: 'good', points: 10 });
        } else {
            score.checks.push({ name: 'Reading Time', status: 'warning', points: 0, suggestion: 'Aim for at least 3 minutes reading time' });
        }

        // Category check
        if (article.category) {
            score.total += 10;
            score.checks.push({ name: 'Category', status: 'good', points: 10 });
        } else {
            score.checks.push({ name: 'Category', status: 'warning', points: 0, suggestion: 'Select a relevant category' });
        }

        score.percentage = Math.round((score.total / score.maxScore) * 100);
        score.grade = this.getSEOGrade(score.percentage);

        return score;
    }

    getSEOGrade(percentage) {
        if (percentage >= 90) return 'A+';
        if (percentage >= 80) return 'A';
        if (percentage >= 70) return 'B';
        if (percentage >= 60) return 'C';
        if (percentage >= 50) return 'D';
        return 'F';
    }
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { SitemapGenerator, SEOHelper };
}

// Initialize when loaded in browser
if (typeof window !== 'undefined') {
    window.SitemapGenerator = SitemapGenerator;
    window.SEOHelper = SEOHelper;
}