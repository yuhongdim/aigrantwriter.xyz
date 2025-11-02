// Enhanced Article Publishing System
class ArticlePublisher {
    constructor() {
        this.initializeElements();
        this.bindEvents();
        this.loadDrafts();
        this.setupAutoSave();
    }

    initializeElements() {
        // Form elements
        this.form = document.getElementById('publishForm');
        this.titleInput = document.getElementById('articleTitle');
        this.slugInput = document.getElementById('articleSlug');
        this.excerptInput = document.getElementById('articleExcerpt');
        this.keywordsInput = document.getElementById('seoKeywords');
        this.categorySelect = document.getElementById('articleCategory');
        this.iconInput = document.getElementById('articleIcon');
        this.readingTimeInput = document.getElementById('readingTime');
        this.contentTextarea = document.getElementById('articleContent');
        this.publishImmediatelyCheckbox = document.getElementById('publishImmediately');
        this.submitToGoogleCheckbox = document.getElementById('submitToGoogle');

        // Buttons
        this.previewBtn = document.getElementById('previewBtn');
        this.saveDraftBtn = document.getElementById('saveDraftBtn');
        this.publishBtn = document.querySelector('button[type="submit"]');

        // Modal elements
        this.previewModal = document.getElementById('previewModal');
        this.previewContent = document.getElementById('previewContent');
        this.closePreviewBtn = document.getElementById('closePreview');

        // Success elements
        this.successMessage = document.getElementById('successMessage');
        this.viewArticleLink = document.getElementById('viewArticle');
        this.publishAnotherBtn = document.getElementById('publishAnother');

        // Counters
        this.wordCountSpan = document.getElementById('wordCount');
        this.charCountSpan = document.getElementById('charCount');
    }

    bindEvents() {
        // Form submission
        this.form.addEventListener('submit', (e) => this.handlePublish(e));

        // Title to slug auto-generation
        this.titleInput.addEventListener('input', () => this.generateSlug());

        // Content word counting
        this.contentTextarea.addEventListener('input', () => this.updateWordCount());

        // Icon selection
        document.querySelectorAll('.icon-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.selectIcon(e));
        });

        // Toolbar actions
        document.querySelectorAll('.toolbar-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.handleToolbarAction(e));
        });

        // Preview functionality
        this.previewBtn.addEventListener('click', () => this.showPreview());
        this.closePreviewBtn.addEventListener('click', () => this.hidePreview());

        // Draft saving
        this.saveDraftBtn.addEventListener('click', () => this.saveDraft());

        // Success modal actions
        this.publishAnotherBtn.addEventListener('click', () => this.resetForm());

        // Auto-save on content change
        this.contentTextarea.addEventListener('input', () => this.autoSave());

        // Reading time calculation
        this.contentTextarea.addEventListener('input', () => this.calculateReadingTime());
    }

    generateSlug() {
        const title = this.titleInput.value;
        const slug = title
            .toLowerCase()
            .replace(/[^a-z0-9\s-]/g, '')
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-')
            .trim('-');
        this.slugInput.value = slug;
    }

    updateWordCount() {
        const content = this.contentTextarea.value;
        const words = content.trim() ? content.trim().split(/\s+/).length : 0;
        const chars = content.length;
        
        this.wordCountSpan.textContent = words;
        this.charCountSpan.textContent = chars;
    }

    calculateReadingTime() {
        const content = this.contentTextarea.value;
        const words = content.trim() ? content.trim().split(/\s+/).length : 0;
        const readingTime = Math.max(1, Math.ceil(words / 200)); // 200 words per minute
        
        if (!this.readingTimeInput.value) {
            this.readingTimeInput.value = readingTime;
        }
    }

    selectIcon(e) {
        e.preventDefault();
        const icon = e.target.dataset.icon;
        this.iconInput.value = icon;
    }

    handleToolbarAction(e) {
        e.preventDefault();
        const action = e.target.closest('.toolbar-btn').dataset.action;
        const textarea = this.contentTextarea;
        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const selectedText = textarea.value.substring(start, end);

        let replacement = '';
        let cursorOffset = 0;

        switch (action) {
            case 'bold':
                replacement = `**${selectedText || 'bold text'}**`;
                cursorOffset = selectedText ? 0 : -11;
                break;
            case 'italic':
                replacement = `*${selectedText || 'italic text'}*`;
                cursorOffset = selectedText ? 0 : -12;
                break;
            case 'heading':
                replacement = `## ${selectedText || 'Heading'}`;
                cursorOffset = selectedText ? 0 : -7;
                break;
            case 'list':
                replacement = `- ${selectedText || 'List item'}`;
                cursorOffset = selectedText ? 0 : -9;
                break;
        }

        textarea.setRangeText(replacement, start, end, 'end');
        if (cursorOffset < 0) {
            textarea.setSelectionRange(
                textarea.selectionStart + cursorOffset,
                textarea.selectionStart + cursorOffset
            );
        }
        textarea.focus();
    }

    showPreview() {
        const formData = this.getFormData();
        const previewHTML = this.generatePreviewHTML(formData);
        this.previewContent.innerHTML = previewHTML;
        this.previewModal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }

    hidePreview() {
        this.previewModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }

    generatePreviewHTML(data) {
        const processedContent = this.processMarkdown(data.content);
        
        return `
            <article class="article-preview">
                <header class="article-header">
                    <div class="article-meta">
                        <span class="category">${data.category}</span>
                        <span class="reading-time">${data.readingTime} min read</span>
                    </div>
                    <h1 class="article-title">
                        ${data.icon} ${data.title}
                    </h1>
                    <p class="article-excerpt">${data.excerpt}</p>
                    <div class="article-info">
                        <span class="publish-date">${new Date().toLocaleDateString()}</span>
                        ${data.keywords ? `<div class="keywords">Keywords: ${data.keywords}</div>` : ''}
                    </div>
                </header>
                <div class="article-content">
                    ${processedContent}
                </div>
            </article>
        `;
    }

    processMarkdown(content) {
        return content
            .replace(/^### (.*$)/gim, '<h3>$1</h3>')
            .replace(/^## (.*$)/gim, '<h2>$1</h2>')
            .replace(/^# (.*$)/gim, '<h1>$1</h1>')
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>')
            .replace(/^- (.*$)/gim, '<li>$1</li>')
            .replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>')
            .replace(/^\d+\. (.*$)/gim, '<li>$1</li>')
            .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank">$1</a>')
            .replace(/^> (.*$)/gim, '<blockquote>$1</blockquote>')
            .replace(/```([\s\S]*?)```/g, '<pre><code>$1</code></pre>')
            .replace(/\n/g, '<br>');
    }

    getFormData() {
        return {
            title: this.titleInput.value.trim(),
            slug: this.slugInput.value.trim(),
            excerpt: this.excerptInput.value.trim(),
            keywords: this.keywordsInput.value.trim(),
            category: this.categorySelect.value,
            icon: this.iconInput.value || '📝',
            readingTime: this.readingTimeInput.value || 8,
            content: this.contentTextarea.value.trim(),
            publishImmediately: this.publishImmediatelyCheckbox.checked,
            submitToGoogle: this.submitToGoogleCheckbox.checked,
            publishDate: new Date().toISOString(),
            id: this.generateArticleId()
        };
    }

    generateArticleId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    }

    async handlePublish(e) {
        e.preventDefault();
        
        const formData = this.getFormData();
        
        // Validate form
        if (!this.validateForm(formData)) {
            return;
        }

        // Show loading state
        this.setLoadingState(true);

        try {
            // Generate article HTML file
            const articleHTML = this.generateArticleHTML(formData);
            
            // Save article to localStorage (for now, until we have a backend)
            this.saveArticleToStorage(formData);
            
            // Update blog index
            this.updateBlogIndex(formData);
            
            // Generate/update sitemap
            this.updateSitemap(formData);
            
            // Simulate file creation (in a real scenario, this would be a server request)
            await this.simulateFileSave(formData.slug, articleHTML);
            
            // Submit to Google (simulate)
            if (formData.submitToGoogle) {
                await this.submitToGoogleIndexing(formData);
            }
            
            // Show success message
            this.showSuccessMessage(formData);
            
        } catch (error) {
            console.error('Publishing failed:', error);
            this.showErrorMessage('Failed to publish article. Please try again.');
        } finally {
            this.setLoadingState(false);
        }
    }

    validateForm(data) {
        const errors = [];
        
        if (!data.title) errors.push('Title is required');
        if (!data.slug) errors.push('URL slug is required');
        if (!data.excerpt) errors.push('Excerpt is required');
        if (!data.category) errors.push('Category is required');
        if (!data.content) errors.push('Content is required');
        
        if (data.excerpt.length > 160) {
            errors.push('Excerpt should be 160 characters or less for SEO');
        }
        
        if (errors.length > 0) {
            alert('Please fix the following errors:\n' + errors.join('\n'));
            return false;
        }
        
        return true;
    }

    generateArticleHTML(data) {
        const processedContent = this.processMarkdown(data.content);
        
        return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${data.title} - AI Grant Writer Blog</title>
    <meta name="description" content="${data.excerpt}">
    <meta name="keywords" content="${data.keywords}">
    <meta name="author" content="AI Grant Writer">
    <meta property="og:title" content="${data.title}">
    <meta property="og:description" content="${data.excerpt}">
    <meta property="og:type" content="article">
    <meta property="og:url" content="https://aigrantwriter.xyz/blog/${data.slug}.html">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="${data.title}">
    <meta name="twitter:description" content="${data.excerpt}">
    <link rel="canonical" href="https://aigrantwriter.xyz/blog/${data.slug}.html">
    <link rel="icon" href="../favicon.svg" type="image/svg+xml">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="article-styles.css">
    <script type="application/ld+json">
    {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": "${data.title}",
        "description": "${data.excerpt}",
        "author": {
            "@type": "Person",
            "name": "AI Grant Writer"
        },
        "datePublished": "${data.publishDate}",
        "dateModified": "${data.publishDate}",
        "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": "https://aigrantwriter.xyz/blog/${data.slug}.html"
        }
    }
    </script>
</head>
<body>
    <header class="header">
        <div class="container">
            <nav class="nav">
                <a href="../index.html" class="logo">AI Grant Writer</a>
                <a href="index.html" class="back-link">← Back to Blog</a>
            </nav>
        </div>
    </header>

    <main class="main">
        <div class="container">
            <article class="article">
                <header class="article-header">
                    <div class="article-meta">
                        <span class="category">${data.category}</span>
                        <span class="reading-time">${data.readingTime} min read</span>
                        <time datetime="${data.publishDate}">${new Date(data.publishDate).toLocaleDateString()}</time>
                    </div>
                    <h1 class="article-title">
                        <span class="article-icon">${data.icon}</span>
                        ${data.title}
                    </h1>
                    <p class="article-excerpt">${data.excerpt}</p>
                </header>

                <div class="article-content">
                    ${processedContent}
                </div>

                <footer class="article-footer">
                    <div class="article-tags">
                        ${data.keywords ? data.keywords.split(',').map(tag => 
                            `<span class="tag">${tag.trim()}</span>`
                        ).join('') : ''}
                    </div>
                    <div class="share-buttons">
                        <a href="https://twitter.com/intent/tweet?text=${encodeURIComponent(data.title)}&url=${encodeURIComponent('https://aigrantwriter.xyz/blog/' + data.slug + '.html')}" target="_blank" class="share-btn twitter">Share on Twitter</a>
                        <a href="https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent('https://aigrantwriter.xyz/blog/' + data.slug + '.html')}" target="_blank" class="share-btn linkedin">Share on LinkedIn</a>
                    </div>
                </footer>
            </article>
        </div>
    </main>

    <footer class="site-footer">
        <div class="container">
            <p>&copy; 2024 AI Grant Writer. All rights reserved.</p>
        </div>
    </footer>
</body>
</html>`;
    }

    saveArticleToStorage(data) {
        // Get existing articles
        const articles = JSON.parse(localStorage.getItem('publishedArticles') || '[]');
        
        // Add new article
        articles.unshift(data);
        
        // Save back to localStorage
        localStorage.setItem('publishedArticles', JSON.stringify(articles));
        
        console.log('Article saved to localStorage:', data.title);
    }

    updateBlogIndex(data) {
        // This would update the main blog index page
        // For now, we'll just log it
        console.log('Blog index updated with new article:', data.title);
    }

    updateSitemap(data) {
        // Generate sitemap entry
        const sitemapEntry = {
            url: `https://aigrantwriter.xyz/blog/${data.slug}.html`,
            lastmod: data.publishDate,
            changefreq: 'monthly',
            priority: '0.8'
        };
        
        // Get existing sitemap entries
        const sitemap = JSON.parse(localStorage.getItem('sitemap') || '[]');
        sitemap.push(sitemapEntry);
        localStorage.setItem('sitemap', JSON.stringify(sitemap));
        
        console.log('Sitemap updated with new article:', sitemapEntry.url);
    }

    async simulateFileSave(slug, html) {
        // Simulate file saving delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // In a real implementation, this would save the HTML file to the server
        console.log(`Article file would be saved as: ${slug}.html`);
        
        // For demonstration, we'll create a downloadable file
        const blob = new Blob([html], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        
        // Store the URL for the "View Article" link
        this.lastPublishedUrl = url;
        this.lastPublishedSlug = slug;
    }

    async submitToGoogleIndexing(data) {
        // Simulate Google indexing submission
        await new Promise(resolve => setTimeout(resolve, 500));
        
        console.log('Article submitted to Google for indexing:', data.title);
        
        // In a real implementation, this would use Google's Indexing API
        // https://developers.google.com/search/apis/indexing-api/v3/quickstart
    }

    showSuccessMessage(data) {
        // Immediate preview uses object URL
        this.viewArticleLink.href = this.lastPublishedUrl || '#';
        this.viewArticleLink.download = `${data.slug}.html`;

        // Build static production URL for Google submission
        const origin = (window.location && window.location.origin) ? window.location.origin : 'https://aigrantwriter.xyz';
        const base = origin.includes('localhost') ? 'https://aigrantwriter.xyz' : origin;
        const staticLink = `${base}/blog/${data.slug}.html`;

        // Populate copyable input and bind copy action
        const input = document.getElementById('staticLinkInput');
        const copyBtn = document.getElementById('copyStaticLinkBtn');
        if (input) input.value = staticLink;
        if (copyBtn) {
            copyBtn.onclick = () => {
                try {
                    if (input) {
                        input.select();
                        input.setSelectionRange(0, input.value.length);
                    }
                    navigator.clipboard.writeText(staticLink).then(() => {
                        copyBtn.textContent = 'Copied!';
                        setTimeout(() => { copyBtn.textContent = 'Copy Link'; }, 1500);
                    }).catch(() => {
                        // Fallback if clipboard API fails
                        document.execCommand('copy');
                    });
                } catch (err) {
                    console.warn('Copy failed:', err);
                }
            };
        }

        this.successMessage.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }

    showErrorMessage(message) {
        alert(message);
    }

    setLoadingState(loading) {
        this.publishBtn.disabled = loading;
        this.publishBtn.innerHTML = loading ? 
            '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/></svg> Publishing...' :
            '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 19l7-7 3 3-7 7-3-3z"/><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/><path d="M2 2l7.586 7.586"/><circle cx="11" cy="11" r="2"/></svg> Publish Article';
    }

    saveDraft() {
        const formData = this.getFormData();
        formData.isDraft = true;
        
        const drafts = JSON.parse(localStorage.getItem('articleDrafts') || '[]');
        
        // Check if draft already exists
        const existingIndex = drafts.findIndex(draft => draft.slug === formData.slug);
        
        if (existingIndex >= 0) {
            drafts[existingIndex] = formData;
        } else {
            drafts.push(formData);
        }
        
        localStorage.setItem('articleDrafts', JSON.stringify(drafts));
        
        // Show feedback
        this.saveDraftBtn.innerHTML = '✓ Draft Saved';
        setTimeout(() => {
            this.saveDraftBtn.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17,21 17,13 7,13 7,21"/><polyline points="7,3 7,8 15,8"/></svg> Save Draft';
        }, 2000);
    }

    loadDrafts() {
        // This could be expanded to show a draft selection interface
        const drafts = JSON.parse(localStorage.getItem('articleDrafts') || '[]');
        console.log('Available drafts:', drafts.length);
    }

    setupAutoSave() {
        let autoSaveTimeout;
        
        const autoSave = () => {
            clearTimeout(autoSaveTimeout);
            autoSaveTimeout = setTimeout(() => {
                if (this.contentTextarea.value.trim()) {
                    this.saveDraft();
                }
            }, 30000); // Auto-save every 30 seconds
        };
        
        this.contentTextarea.addEventListener('input', autoSave);
    }

    autoSave() {
        // This is called by the setupAutoSave method
    }

    resetForm() {
        this.form.reset();
        this.updateWordCount();
        this.successMessage.style.display = 'none';
        document.body.style.overflow = 'auto';
        this.titleInput.focus();
    }
}

// Initialize the publisher when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new ArticlePublisher();
});

// Close modal when clicking outside
document.addEventListener('click', (e) => {
    const previewModal = document.getElementById('previewModal');
    const successMessage = document.getElementById('successMessage');
    
    if (e.target === previewModal) {
        previewModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
    
    if (e.target === successMessage) {
        successMessage.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});