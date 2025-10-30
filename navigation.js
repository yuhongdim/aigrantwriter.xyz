// 强制导航脚本 - 确保卡片点击功能正常工作
(function() {
    'use strict';
    
    console.log('Navigation script loading...');
    
    // 定义卡片到URL的映射关系 - 直接跳转到对应的HTML页面
    const cardUrlMapping = {
        'Grant Proposal AI': 'grant-proposal.html',
        'Dissertation Writer': 'dissertation-writer.html', 
        'Research Paper AI': 'research-paper.html',
        'Literature Review AI': 'literature-review.html',
        'Academic Proofreading AI': 'academic-proofreading.html',
        'Manuscript Editor': 'manuscript-editor.html',
        'AI Text Reducer': 'ai-text-reducer.html'
    };
    
    function initializeCardNavigation() {
        console.log('=== INITIALIZING CARD NAVIGATION ===');
        console.log('DOM ready state:', document.readyState);
        console.log('Current URL:', window.location.href);
        
        // 直接为每个工具卡片添加点击事件
        const cards = document.querySelectorAll('.tool-card');
        console.log('Found cards:', cards.length);
        
        // 详细检查每个卡片的结构
        cards.forEach((card, index) => {
            const titleElement = card.querySelector('.tool-header h3');
            const linkElement = card.querySelector('.tool-link');
            console.log(`Card ${index + 1} structure:`, {
                hasTitle: !!titleElement,
                hasLink: !!linkElement,
                title: titleElement ? titleElement.textContent.trim() : 'NO TITLE',
                href: linkElement ? linkElement.getAttribute('href') : 'NO HREF'
            });
        });
        
        if (cards.length === 0) {
            console.warn('No tool cards found, retrying in 500ms...');
            setTimeout(initializeCardNavigation, 500);
            return;
        }
        
        cards.forEach((card, index) => {
            // 强制设置cursor样式 - 多种方式确保生效
            card.style.cursor = 'pointer !important';
            card.style.setProperty('cursor', 'pointer', 'important');
            
            // 获取卡片标题来确定跳转URL
            const titleElement = card.querySelector('.tool-header h3');
            const link = card.querySelector('.tool-link');
            
            let targetUrl = '';
            
            if (titleElement) {
                const cardTitle = titleElement.textContent.trim();
                // 优先使用映射的URL，如果没有则使用原有的href
                targetUrl = cardUrlMapping[cardTitle] || (link ? link.getAttribute('href') : '');
                console.log(`Card ${index + 1}: "${cardTitle}" -> ${targetUrl}`);
            } else if (link) {
                targetUrl = link.getAttribute('href');
                console.log(`Card ${index + 1}: Using href -> ${targetUrl}`);
            }
            
            if (targetUrl) {
                console.log(`=== SETTING UP CARD ${index + 1} ===`);
                console.log('Target URL:', targetUrl);
                
                // 移除所有现有的事件监听器
                const newCard = card.cloneNode(true);
                card.parentNode.replaceChild(newCard, card);
                
                // 重新获取新的卡片引用
                const freshCard = document.querySelectorAll('.tool-card')[index];
                
                // 强制设置样式
                freshCard.style.cursor = 'pointer !important';
                freshCard.style.setProperty('cursor', 'pointer', 'important');
                
                // 创建最简单的点击处理器
                const simpleClickHandler = function(e) {
                    console.log(`=== CARD ${index + 1} CLICKED ===`);
                    console.log('Navigating to:', targetUrl);
                    
                    // 阻止默认行为
                    e.preventDefault();
                    e.stopPropagation();
                    
                    // 直接跳转
                    window.location.href = targetUrl;
                    return false;
                };
                
                // 使用最直接的方式绑定事件
                freshCard.onclick = simpleClickHandler;
                
                // 添加悬停效果
                freshCard.addEventListener('mouseenter', function() {
                    this.style.cursor = 'pointer !important';
                    this.style.transform = 'translateY(-3px)';
                    this.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.1)';
                    this.style.borderColor = '#3b82f6';
                });
                
                freshCard.addEventListener('mouseleave', function() {
                    this.style.cursor = 'pointer !important';
                    this.style.transform = 'translateY(0)';
                    this.style.boxShadow = '';
                    this.style.borderColor = '';
                });
                
                console.log(`Card ${index + 1} setup complete with onclick handler`);
            } else {
                console.warn(`Card ${index + 1}: No target URL found`);
            }
        });
        
        console.log('=== CARD NAVIGATION SETUP COMPLETE ===');
    }
    
    // 多种方式确保初始化执行
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeCardNavigation);
    } else {
        initializeCardNavigation();
    }
    
    // 备用初始化
    setTimeout(initializeCardNavigation, 100);
    setTimeout(initializeCardNavigation, 500);
    setTimeout(initializeCardNavigation, 1000);
    
    console.log('Navigation script loaded');
})();

// 平滑滚动功能
document.addEventListener('DOMContentLoaded', function() {
    // 平滑滚动到锚点
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // 移动端菜单切换
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
    }
});