console.log('Ultra clean script loaded - NO link interference');

// 只保留最基本的功能，绝对不干扰任何链接
document.addEventListener('DOMContentLoaded', function() {
    console.log('Page loaded - links should work normally');
    
    // 移动端导航切换（如果需要）
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }
    
    // 滚动效果（不干扰链接）
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        if (header) {
            if (window.scrollY > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }
    });
    
    console.log('Ultra clean script initialization complete - NO event listeners on links');
});

// API配置（如果需要）
const API_CONFIG = {
    baseURL: 'https://breakout.wenwen-ai.com/v1/chat/completions',
    apiKey: 'sk-6ogS4COJPVLfLclruLQ6h59IxyvcN61nGuvgpr71VNL3ARsN'
};

// 通知函数
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    Object.assign(notification.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        padding: '15px 20px',
        borderRadius: '5px',
        color: 'white',
        backgroundColor: type === 'error' ? '#e74c3c' : type === 'success' ? '#27ae60' : '#3498db',
        zIndex: '10000',
        animation: 'slideIn 0.3s ease-out'
    });
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// 复制到剪贴板
async function copyToClipboard(text) {
    try {
        await navigator.clipboard.writeText(text);
        showNotification('Copied to clipboard!', 'success');
    } catch (err) {
        console.error('Failed to copy: ', err);
    }
}

console.log('Ultra clean script loaded successfully - ALL LINKS SHOULD WORK');