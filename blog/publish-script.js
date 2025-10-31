// Article Publishing Script
function ArticlePublisher() {
    this.form = document.getElementById('publishForm');
    this.previewModal = document.getElementById('previewModal');
    this.successMessage = document.getElementById('successMessage');
    this.wordCountElement = document.getElementById('wordCount');
    
    this.initializeEventListeners();
    this.initializeWordCounter();
    this.initializeIconSelector();
    this.initializeToolbar();
    this.initializePublishToggle();
}

ArticlePublisher.prototype.initializeEventListeners = function() {
    var self = this;
    
    // Form submission
    this.form.addEventListener('submit', function(e) { self.handleSubmit(e); });
    
    // Button events
    document.getElementById('previewBtn').addEventListener('click', function() { self.showPreview(); });
    document.getElementById('saveDraftBtn').addEventListener('click', function() { self.saveDraft(); });
    document.getElementById('closePreview').addEventListener('click', function() { self.closePreview(); });
    document.getElementById('publishAnother').addEventListener('click', function() { self.resetForm(); });
    
    // Success message close
    this.successMessage.addEventListener('click', function(e) {
        if (e.target === self.successMessage) {
            self.hideSuccessMessage();
        }
    });
};

ArticlePublisher.prototype.initializeWordCounter = function() {
    var self = this;
    var contentTextarea = document.getElementById('articleContent');
    
    contentTextarea.addEventListener('input', function() {
        var words = self.countWords(contentTextarea.value);
        self.wordCountElement.textContent = words;
        
        // Auto-calculate reading time if not set
        var readingTimeInput = document.getElementById('readingTime');
        if (!readingTimeInput.value) {
            var estimatedTime = Math.max(1, Math.ceil(words / 200)); // 200 words per minute
            readingTimeInput.placeholder = estimatedTime;
        }
    });
};

ArticlePublisher.prototype.initializeIconSelector = function() {
    var iconInput = document.getElementById('articleIcon');
    var iconGrid = document.querySelector('.icon-grid');
    
    if (iconGrid) {
        iconGrid.addEventListener('click', function(e) {
            if (e.target.classList.contains('icon-option')) {
                // Remove active class from all icons
                document.querySelectorAll('.icon-option').forEach(function(icon) {
                    icon.classList.remove('active');
                });
                
                // Add active class to clicked icon
                e.target.classList.add('active');
                iconInput.value = e.target.textContent;
            }
        });
    }
};

ArticlePublisher.prototype.initializeToolbar = function() {
    var toolbar = document.querySelector('.editor-toolbar');
    var contentTextarea = document.getElementById('articleContent');
    
    if (toolbar) {
        toolbar.addEventListener('click', function(e) {
            if (e.target.classList.contains('toolbar-btn')) {
                var action = e.target.dataset.action;
                var start = contentTextarea.selectionStart;
                var end = contentTextarea.selectionEnd;
                var selectedText = contentTextarea.value.substring(start, end);
                var replacement = '';
                
                switch (action) {
                    case 'bold':
                        replacement = '**' + selectedText + '**';
                        break;
                    case 'italic':
                        replacement = '*' + selectedText + '*';
                        break;
                    case 'heading':
                        replacement = '## ' + selectedText;
                        break;
                    case 'link':
                        replacement = '[' + selectedText + '](url)';
                        break;
                    case 'list':
                        replacement = '- ' + selectedText;
                        break;
                }
                
                contentTextarea.setRangeText(replacement, start, end, 'end');
                contentTextarea.focus();
            }
        });
    }
};

ArticlePublisher.prototype.initializePublishToggle = function() {
    var publishImmediatelyCheckbox = document.getElementById('publishImmediately');
    var scheduledDateGroup = document.getElementById('scheduledDateGroup');
    
    if (publishImmediatelyCheckbox && scheduledDateGroup) {
        var toggleScheduleOptions = function() {
            if (publishImmediatelyCheckbox.checked) {
                scheduledDateGroup.style.display = 'none';
            } else {
                scheduledDateGroup.style.display = 'block';
            }
        };
        
        publishImmediatelyCheckbox.addEventListener('change', toggleScheduleOptions);
        toggleScheduleOptions(); // Initialize state
    }
};

ArticlePublisher.prototype.countWords = function(text) {
    return text.trim().split(/\s+/).filter(function(word) { return word.length > 0; }).length;
};

ArticlePublisher.prototype.collectFormData = function() {
    var formData = new FormData(this.form);
    var tags = formData.get('tags') ? formData.get('tags').split(',').map(function(tag) { return tag.trim(); }) : [];
    
    return {
        title: formData.get('title'),
        excerpt: formData.get('excerpt'),
        category: formData.get('category'),
        icon: formData.get('icon'),
        readingTime: formData.get('readingTime'),
        content: formData.get('content'),
        tags: tags,
        author: formData.get('author'),
        publishType: formData.get('publishType'),
        scheduleDate: formData.get('scheduleDate'),
        scheduleTime: formData.get('scheduleTime'),
        date: new Date().toISOString()
    };
};

ArticlePublisher.prototype.handleSubmit = function(e) {
    e.preventDefault();
    
    var articleData = this.collectFormData();
    
    // Validate required fields
    if (!articleData.title || !articleData.content) {
        alert('Please fill in the title and content fields.');
        return;
    }
    
    // Show loading state
    var publishBtn = document.getElementById('publishBtn');
    var originalText = publishBtn.innerHTML;
    publishBtn.innerHTML = '<span class="animate-spin">⟳</span> Publishing...';
    publishBtn.disabled = true;
    
    // Simulate publishing process
    var self = this;
    setTimeout(function() {
        self.publishArticle(articleData);
        publishBtn.innerHTML = originalText;
        publishBtn.disabled = false;
    }, 2000);
};

ArticlePublisher.prototype.publishArticle = function(articleData) {
    if (this.editingArticleId) {
        // Update existing article
        this.updateExistingArticle(articleData);
    } else {
        // Create new article
        this.updateNewBlogScript(articleData);
        this.updateFastScript(articleData);
    }
    
    // Show success message
    this.showSuccessMessage();
    
    // Reset form
    this.resetForm();
};

ArticlePublisher.prototype.updateNewBlogScript = function(articleData) {
    // Generate article ID from title with 'new_' prefix
    var articleId = 'new_' + articleData.title.toLowerCase()
        .replace(/[^a-z0-9\s]/g, '')
        .replace(/\s+/g, '-')
        .substring(0, 50);
    
    // Create article object
    var article = {
        id: articleId,
        title: articleData.title,
        excerpt: articleData.excerpt || articleData.content.substring(0, 150) + '...',
        category: articleData.category || 'writing',
        categoryName: this.getCategoryName(articleData.category || 'writing'),
        date: new Date().toISOString().split('T')[0],
        readTime: Math.max(1, Math.ceil(this.countWords(articleData.content) / 200)) + ' min read',
        icon: articleData.icon || '📝',
        url: articleId + '.html',
        content: articleData.content,
        tags: articleData.tags || [],
        author: articleData.author || 'AI Grant Writer'
    };
    
    // Get existing articles from localStorage (use 'newArticles' key)
    var existingArticles = JSON.parse(localStorage.getItem('newArticles') || '[]');
    
    // Add new article to the beginning
    existingArticles.unshift(article);
    
    // Save back to localStorage
    localStorage.setItem('newArticles', JSON.stringify(existingArticles));
    
    console.log('Article saved to localStorage:', article);
};

// Update existing article
ArticlePublisher.prototype.updateExistingArticle = function(articleData) {
    try {
        // Get existing articles from localStorage
        var existingArticles = JSON.parse(localStorage.getItem('newArticles') || '[]');
        
        // Find and update the article
        var articleIndex = existingArticles.findIndex(article => article.id === this.editingArticleId);
        
        if (articleIndex !== -1) {
            // Update the existing article
            var updatedArticle = {
                id: this.editingArticleId, // Keep original ID
                title: articleData.title,
                excerpt: articleData.excerpt || articleData.content.substring(0, 150) + '...',
                category: articleData.category || 'writing',
                categoryName: this.getCategoryName(articleData.category || 'writing'),
                date: existingArticles[articleIndex].date, // Keep original date
                readTime: Math.max(1, Math.ceil(this.countWords(articleData.content) / 200)) + ' min read',
                icon: articleData.icon || '📝',
                url: existingArticles[articleIndex].url, // Keep original URL
                content: articleData.content,
                tags: articleData.tags || [],
                author: articleData.author || 'AI Grant Writer'
            };
            
            existingArticles[articleIndex] = updatedArticle;
            
            // Save back to localStorage
            localStorage.setItem('newArticles', JSON.stringify(existingArticles));
            
            console.log('Article updated in localStorage:', updatedArticle);
        } else {
            throw new Error('Article not found');
        }
        
        // Clear editing state
        this.editingArticleId = null;
        
    } catch (error) {
        console.error('更新文章时出错:', error);
        alert('更新文章失败，请重试。');
    }
};

ArticlePublisher.prototype.getCategoryName = function(category) {
    var categoryNames = {
        'writing': 'Writing Tips',
        'research': 'Research Methods', 
        'tools': 'AI Tools',
        'academic': 'Academic Guidance',
        'grants': 'Grant Writing'
    };
    return categoryNames[category] || 'General';
};

ArticlePublisher.prototype.updateFastScript = function(articleData) {
    // This would normally update the database
    // For demo purposes, we'll just log the article
    console.log('Article published to fast-blog-script.js:', articleData);
};

ArticlePublisher.prototype.showSuccessMessage = function() {
    this.successMessage.style.display = 'flex';
};

ArticlePublisher.prototype.hideSuccessMessage = function() {
    this.successMessage.style.display = 'none';
};

ArticlePublisher.prototype.resetForm = function() {
    this.form.reset();
    this.wordCountElement.textContent = '0';
    
    // Reset icon selection
    document.querySelectorAll('.icon-option').forEach(function(icon) {
        icon.classList.remove('active');
    });
    
    // Hide schedule options
    var scheduledDateGroup = document.getElementById('scheduledDateGroup');
    if (scheduledDateGroup) {
        scheduledDateGroup.style.display = 'none';
    }
    
    this.hideSuccessMessage();
};

ArticlePublisher.prototype.saveDraft = function() {
    var articleData = this.collectFormData();
    
    // Save to localStorage (simulate draft save)
    localStorage.setItem('articleDraft', JSON.stringify(articleData));
    
    // Show feedback
    var saveDraftBtn = document.getElementById('saveDraftBtn');
    var originalText = saveDraftBtn.innerHTML;
    saveDraftBtn.innerHTML = '✓ Saved';
    saveDraftBtn.style.background = '#10b981';
    
    setTimeout(function() {
        saveDraftBtn.innerHTML = originalText;
        saveDraftBtn.style.background = '';
    }, 2000);
};

ArticlePublisher.prototype.showPreview = function() {
    var articleData = this.collectFormData();
    var previewContent = document.getElementById('previewContent');
    
    var formattedContent = this.formatMarkdown(articleData.content);
    var tagsHtml = articleData.tags.length > 0 
        ? '<div class="article-tags">' + articleData.tags.map(function(tag) { return '<span class="tag">' + tag + '</span>'; }).join('') + '</div>'
        : '';
    
    previewContent.innerHTML = 
        '<div class="preview-article">' +
            '<h1>' + articleData.title + '</h1>' +
            '<div class="article-meta">' +
                '<span>' + (articleData.icon || '📝') + '</span>' +
                '<span>' + this.formatDate(articleData.date) + '</span>' +
                '<span>' + articleData.readingTime + ' min read</span>' +
                '<span>' + this.getCategoryName(articleData.category) + '</span>' +
                '<span>By ' + (articleData.author || 'AI Grant Writer') + '</span>' +
            '</div>' +
            tagsHtml +
            '<div class="article-content">' +
                formattedContent +
            '</div>' +
        '</div>';
    
    this.previewModal.style.display = 'flex';
};

ArticlePublisher.prototype.closePreview = function() {
    this.previewModal.style.display = 'none';
};

ArticlePublisher.prototype.formatMarkdown = function(text) {
    return text
        .replace(/^### (.*$)/gim, '<h3>$1</h3>')
        .replace(/^## (.*$)/gim, '<h2>$1</h2>')
        .replace(/^# (.*$)/gim, '<h1>$1</h1>')
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.*?)\*/g, '<em>$1</em>')
        .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>')
        .replace(/^- (.*$)/gim, '<li>$1</li>')
        .replace(/\n/g, '<br>');
};

ArticlePublisher.prototype.formatDate = function(dateString) {
    var date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
    });
};

ArticlePublisher.prototype.getCategoryName = function(category) {
    var categories = {
        'writing': 'Writing Techniques',
        'research': 'Research Methods',
        'tools': 'AI Tools',
        'academic': 'Academic Guidance'
    };
    return categories[category] || category;
};

// Load article for editing
ArticlePublisher.prototype.loadEditingArticle = function() {
    try {
        var editingArticleData = sessionStorage.getItem('editingArticle');
        if (editingArticleData) {
            var article = JSON.parse(editingArticleData);
            
            // Fill form fields with article data
            document.getElementById('articleTitle').value = article.title || '';
            document.getElementById('articleContent').value = article.content || '';
            document.getElementById('articleExcerpt').value = article.excerpt || '';
            document.getElementById('articleCategory').value = article.category || '';
            document.getElementById('articleTags').value = (article.tags || []).join(', ');
            document.getElementById('articleAuthor').value = article.author || '';
            document.getElementById('readingTime').value = article.readingTime || '';
            
            // Set icon if available
            if (article.icon) {
                var iconButtons = document.querySelectorAll('.icon-option');
                iconButtons.forEach(function(btn) {
                    if (btn.textContent.trim() === article.icon) {
                        btn.click();
                    }
                });
            }
            
            // Update word count
            var words = this.countWords(article.content || '');
            this.wordCountElement.textContent = words;
            
            // Change page title and button text
            document.querySelector('.page-title').textContent = '编辑文章';
            document.querySelector('button[type="submit"]').textContent = '更新文章';
            
            // Store original article ID for updating
            this.editingArticleId = article.id;
            
            // Clear sessionStorage
            sessionStorage.removeItem('editingArticle');
        }
    } catch (error) {
        console.error('加载编辑文章数据时出错:', error);
        alert('加载文章数据失败，请重试。');
    }
};

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    var publisher = new ArticlePublisher();
    
    // Check if we're in edit mode
    var urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('edit') === 'true') {
        publisher.loadEditingArticle();
    }
});

// Add spinning animation for loading states
var style = document.createElement('style');
style.textContent = 
    '.animate-spin {' +
        'animation: spin 1s linear infinite;' +
    '}' +
    '@keyframes spin {' +
        'from { transform: rotate(0deg); }' +
        'to { transform: rotate(360deg); }' +
    '}';
document.head.appendChild(style);