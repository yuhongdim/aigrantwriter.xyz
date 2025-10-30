// 干净的JavaScript文件 - 不干扰链接导航
console.log('Clean script loaded');

// 滚动效果
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
});

// 移动端导航切换
document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
    }

    // 平滑滚动到锚点 - 只处理页面内锚点链接
    document.querySelectorAll('a[href^="#"]:not(.tool-card-link)').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            // 只处理真正的锚点链接（以#开头且不是空的）
            if (href && href.length > 1) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // 记录工具卡片链接但不干扰它们
    const toolCardLinks = document.querySelectorAll('.tool-card-link');
    console.log('找到工具卡片链接数量:', toolCardLinks.length);
    
    toolCardLinks.forEach((link, index) => {
        console.log(`链接 ${index + 1}: ${link.href}`);
        // 不添加任何事件监听器，让浏览器原生处理
    });
});

// 滚动到生成器部分
function scrollToGenerator() {
    const toolsSection = document.getElementById('tools');
    if (toolsSection) {
        toolsSection.scrollIntoView({ 
            behavior: 'smooth' 
        });
    }
}

// API配置
const API_CONFIG = {
    baseURL: 'https://breakout.wenwen-ai.com/v1/chat/completions',
    apiKey: 'sk-6ogS4COJPVLfLclruLQ6h59IxyvcN61nGuvgpr71VNL3ARsN'
};

// 通知系统
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 5px;
        color: white;
        font-weight: 500;
        z-index: 10000;
        animation: slideIn 0.3s ease-out;
        max-width: 300px;
        word-wrap: break-word;
    `;
    
    switch(type) {
        case 'success':
            notification.style.backgroundColor = '#10b981';
            break;
        case 'error':
            notification.style.backgroundColor = '#ef4444';
            break;
        case 'warning':
            notification.style.backgroundColor = '#f59e0b';
            break;
        default:
            notification.style.backgroundColor = '#3b82f6';
    }
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// 复制到剪贴板功能
async function copyToClipboard(text) {
    try {
        await navigator.clipboard.writeText(text);
        showNotification('内容已复制到剪贴板', 'success');
    } catch (err) {
        console.error('复制失败:', err);
        showNotification('复制失败，请手动复制', 'error');
    }
}

// 样式注入
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    .nav-menu.active {
        display: flex;
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        background: white;
        flex-direction: column;
        padding: 1rem;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
    }

    .nav-toggle.active span:nth-child(1) {
        transform: rotate(-45deg) translate(-5px, 6px);
    }

    .nav-toggle.active span:nth-child(2) {
        opacity: 0;
    }

    .nav-toggle.active span:nth-child(3) {
        transform: rotate(45deg) translate(-5px, -6px);
    }

    @media (max-width: 768px) {
        .nav-menu {
            display: none;
        }
    }
`;
document.head.appendChild(style);

console.log('Clean script initialization complete');