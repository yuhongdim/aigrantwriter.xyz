// HTML压缩工具
function minifyHTML(html) {
    return html
        // 移除HTML注释（保留条件注释）
        .replace(/<!--(?!\[if\s)[\s\S]*?-->/g, '')
        // 移除多余的空白字符
        .replace(/\s+/g, ' ')
        // 移除标签间的空白
        .replace(/>\s+</g, '><')
        // 移除行首行尾空白
        .trim();
}

// 如果在Node.js环境中运行
if (typeof module !== 'undefined' && module.exports) {
    module.exports = minifyHTML;
}

// 浏览器环境中的使用示例
if (typeof window !== 'undefined') {
    window.minifyHTML = minifyHTML;
    
    // 自动压缩页面HTML（可选）
    document.addEventListener('DOMContentLoaded', function() {
        // 这里可以添加动态内容的压缩逻辑
        console.log('HTML minification ready');
    });
}