// 懒加载功能
(function() {
    'use strict';
    
    // 检查浏览器是否支持 Intersection Observer
    if (!('IntersectionObserver' in window)) {
        // 如果不支持，直接加载所有图片
        loadAllImages();
        return;
    }
    
    // 创建 Intersection Observer
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                loadImage(img);
                observer.unobserve(img);
            }
        });
    }, {
        // 提前50px开始加载
        rootMargin: '50px 0px',
        threshold: 0.01
    });
    
    // 加载单个图片
    function loadImage(img) {
        if (img.dataset.src) {
            img.src = img.dataset.src;
            img.classList.remove('lazy');
            img.classList.add('loaded');
        }
        if (img.dataset.srcset) {
            img.srcset = img.dataset.srcset;
        }
    }
    
    // 加载所有图片（降级方案）
    function loadAllImages() {
        const lazyImages = document.querySelectorAll('img[data-src]');
        lazyImages.forEach(loadImage);
    }
    
    // 初始化懒加载
    function initLazyLoad() {
        const lazyImages = document.querySelectorAll('img[data-src]');
        lazyImages.forEach(img => {
            imageObserver.observe(img);
        });
    }
    
    // 页面加载完成后初始化
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initLazyLoad);
    } else {
        initLazyLoad();
    }
    
    // 为动态添加的图片提供懒加载
    window.addLazyLoad = function(element) {
        const lazyImages = element.querySelectorAll('img[data-src]');
        lazyImages.forEach(img => {
            imageObserver.observe(img);
        });
    };
})();

// CSS样式（通过JavaScript添加）
const lazyLoadStyles = `
    img.lazy {
        opacity: 0;
        transition: opacity 0.3s;
    }
    
    img.loaded {
        opacity: 1;
    }
    
    img.lazy::before {
        content: '';
        display: block;
        width: 100%;
        height: 200px;
        background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
        background-size: 200% 100%;
        animation: loading 1.5s infinite;
    }
    
    @keyframes loading {
        0% { background-position: 200% 0; }
        100% { background-position: -200% 0; }
    }
`;

// 添加样式到页面
const styleSheet = document.createElement('style');
styleSheet.textContent = lazyLoadStyles;
document.head.appendChild(styleSheet);