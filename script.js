// 导航栏滚动效果
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// 移动端导航菜单切换
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');

navToggle.addEventListener('click', function() {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
});

// 平滑滚动到指定区域
function scrollToGenerator() {
    document.getElementById('generator').scrollIntoView({
        behavior: 'smooth'
    });
}

// 平滑滚动导航链接
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// API 配置
const API_CONFIG = {
    baseURL: 'https://breakout.wenwen-ai.com/v1/chat/completions',
    apiKey: 'sk-6ogS4COJPVLfLclruLQ6h59IxyvcN61nGuvgpr71VNL3ARsN'
};

// 论文生成功能
async function generatePaper() {
    const generateBtn = document.querySelector('.generate-btn');
    const outputContent = document.getElementById('output-content');
    const researchTopic = document.getElementById('research-topic').value;
    const paperType = document.getElementById('paper-type').value;
    const researchField = document.getElementById('research-field').value;
    const requirements = document.getElementById('requirements').value;

    // 验证输入
    if (!researchTopic.trim()) {
        alert('请输入研究主题');
        return;
    }

    // 显示加载状态
    generateBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> 生成中...';
    generateBtn.disabled = true;

    try {
        // 构建提示词
        const prompt = buildPrompt(researchTopic, paperType, researchField, requirements);
        
        // 调用 AI API
        const response = await fetch(API_CONFIG.baseURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${API_CONFIG.apiKey}`
            },
            body: JSON.stringify({
                model: 'gpt-3.5-turbo',
                messages: [
                    {
                        role: 'system',
                        content: '你是一个专业的学术论文写作助手，擅长生成高质量的学术论文内容。'
                    },
                    {
                        role: 'user',
                        content: prompt
                    }
                ],
                max_tokens: 4000,
                temperature: 0.7
            })
        });

        if (!response.ok) {
            throw new Error(`API 请求失败: ${response.status}`);
        }

        const data = await response.json();
        const generatedContent = data.choices[0].message.content;
        
        // 格式化并显示生成的内容
        outputContent.innerHTML = formatGeneratedContent(generatedContent, researchTopic, paperType, researchField);
        
    } catch (error) {
        console.error('生成论文时出错:', error);
        // 如果 API 调用失败，使用备用的模拟内容
        const generatedContent = generateMockContent(researchTopic, paperType, researchField, requirements);
        outputContent.innerHTML = generatedContent;
        showNotification('API 调用失败，显示示例内容');
    } finally {
        // 恢复按钮状态
        generateBtn.innerHTML = '<i class="fas fa-magic"></i> 生成论文';
        generateBtn.disabled = false;
    }
}

// 构建提示词
function buildPrompt(topic, type, field, requirements) {
    const typeNames = {
        'phd': '博士论文',
        'master': '硕士论文',
        'proposal': '研究提案',
        'review': '文献综述'
    };

    let prompt = `请为以下研究主题生成一份${typeNames[type] || '学术论文'}的详细大纲和内容：

研究主题：${topic}
研究领域：${field}
论文类型：${typeNames[type] || type}`;

    if (requirements) {
        prompt += `\n特殊要求：${requirements}`;
    }

    prompt += `

请按照以下结构生成内容：
1. 研究背景与意义
2. 文献综述
3. 研究方法
4. 预期结果
5. 创新点
6. 参考文献建议

请确保内容专业、详细且具有学术价值。`;

    return prompt;
}

// 格式化生成的内容
function formatGeneratedContent(content, topic, type, field) {
    const typeNames = {
        'phd': '博士论文',
        'master': '硕士论文',
        'proposal': '研究提案',
        'review': '文献综述'
    };

    return `
        <div class="generated-paper">
            <h3>${typeNames[type] || '学术论文'}: ${topic}</h3>
            <div class="paper-content">
                ${content.replace(/\n/g, '<br>').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')}
            </div>
            <div class="generation-info">
                <small>
                    <i class="fas fa-info-circle"></i>
                    生成时间: ${new Date().toLocaleString()} | 
                    研究领域: ${field} | 
                    论文类型: ${typeNames[type] || type}
                </small>
            </div>
        </div>
    `;
}

// 生成模拟内容
function generateMockContent(topic, type, field, requirements) {
    const typeNames = {
        'phd': '博士论文',
        'master': '硕士论文',
        'proposal': '研究提案',
        'review': '文献综述'
    };

    const fieldNames = {
        'education': '教育学',
        'psychology': '心理学',
        'computer-science': '计算机科学',
        'medicine': '医学',
        'engineering': '工程学',
        'business': '商学',
        'other': '其他'
    };

    return `
        <div class="generated-paper">
            <h3>${typeNames[type]}大纲</h3>
            <h4>研究主题：${topic}</h4>
            <p><strong>研究领域：</strong>${fieldNames[field]}</p>
            
            <div class="paper-section">
                <h5>1. 引言</h5>
                <p>本研究旨在探讨${topic}的相关问题。随着${fieldNames[field]}领域的快速发展，该研究具有重要的理论意义和实践价值。</p>
            </div>

            <div class="paper-section">
                <h5>2. 文献综述</h5>
                <p>通过对相关文献的系统梳理，发现当前研究在以下几个方面存在不足：</p>
                <ul>
                    <li>理论框架需要进一步完善</li>
                    <li>实证研究相对缺乏</li>
                    <li>研究方法有待创新</li>
                </ul>
            </div>

            <div class="paper-section">
                <h5>3. 研究方法</h5>
                <p>本研究采用混合研究方法，结合定量和定性分析：</p>
                <ul>
                    <li>问卷调查法：收集大样本数据</li>
                    <li>深度访谈法：获取深层次信息</li>
                    <li>案例分析法：提供具体实例</li>
                </ul>
            </div>

            <div class="paper-section">
                <h5>4. 预期结果</h5>
                <p>本研究预期将在以下方面取得突破：</p>
                <ul>
                    <li>构建新的理论模型</li>
                    <li>提出实践指导建议</li>
                    <li>为后续研究提供基础</li>
                </ul>
            </div>

            <div class="paper-section">
                <h5>5. 研究意义</h5>
                <p>本研究的理论意义在于丰富${fieldNames[field]}的理论体系，实践意义在于为相关领域的发展提供科学依据。</p>
            </div>

            <div class="generation-info">
                <p><small><i class="fas fa-info-circle"></i> 这是AI生成的示例内容，实际使用时将根据您的具体需求生成更详细和专业的内容。</small></p>
            </div>
        </div>
    `;
}

// 复制内容到剪贴板
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(function() {
        showNotification('内容已复制到剪贴板');
    }, function(err) {
        console.error('复制失败: ', err);
    });
}

// 显示通知
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #10b981;
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        z-index: 10000;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// 添加CSS动画
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

    .generated-paper {
        text-align: left;
        line-height: 1.6;
    }

    .generated-paper h3 {
        color: #1e293b;
        margin-bottom: 1rem;
        font-size: 1.3rem;
    }

    .generated-paper h4 {
        color: #374151;
        margin-bottom: 0.5rem;
        font-size: 1.1rem;
    }

    .generated-paper h5 {
        color: #4b5563;
        margin: 1.5rem 0 0.5rem 0;
        font-size: 1rem;
    }

    .paper-section {
        margin-bottom: 1.5rem;
        padding-bottom: 1rem;
        border-bottom: 1px solid #e5e7eb;
    }

    .paper-section:last-of-type {
        border-bottom: none;
    }

    .paper-section ul {
        margin: 0.5rem 0;
        padding-left: 1.5rem;
    }

    .paper-section li {
        margin-bottom: 0.3rem;
        color: #6b7280;
    }

    .generation-info {
        background: #f3f4f6;
        padding: 1rem;
        border-radius: 8px;
        margin-top: 1.5rem;
    }

    .generation-info small {
        color: #6b7280;
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

// 工具卡片点击事件
document.querySelectorAll('.tool-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const toolCard = this.closest('.tool-card');
        const toolTitle = toolCard.querySelector('h3').textContent;
        
        // 根据工具类型设置表单默认值
        if (toolTitle.includes('博士论文')) {
            document.getElementById('paper-type').value = 'phd';
        } else if (toolTitle.includes('文献综述')) {
            document.getElementById('paper-type').value = 'review';
        } else if (toolTitle.includes('研究方法')) {
            document.getElementById('requirements').value = '请重点生成研究方法论部分';
        } else if (toolTitle.includes('研究问题')) {
            document.getElementById('requirements').value = '请帮助生成创新性的研究问题和假设';
        }
        
        // 滚动到生成器区域
        scrollToGenerator();
        
        // 高亮显示生成器区域
        const generator = document.getElementById('generator');
        generator.style.animation = 'highlight 2s ease';
    });
});

// 添加高亮动画
const highlightStyle = document.createElement('style');
highlightStyle.textContent = `
    @keyframes highlight {
        0% { background-color: transparent; }
        50% { background-color: rgba(102, 126, 234, 0.1); }
        100% { background-color: transparent; }
    }
`;
document.head.appendChild(highlightStyle);

// 输出区域按钮功能
document.addEventListener('click', function(e) {
    if (e.target.closest('.action-btn')) {
        const btn = e.target.closest('.action-btn');
        const icon = btn.querySelector('i');
        const outputContent = document.getElementById('output-content');
        
        if (icon.classList.contains('fa-copy')) {
            const text = outputContent.textContent;
            if (text && !text.includes('您生成的学术内容将在这里显示')) {
                copyToClipboard(text);
            } else {
                showNotification('暂无内容可复制');
            }
        } else if (icon.classList.contains('fa-download')) {
            downloadContent();
        } else if (icon.classList.contains('fa-share')) {
            shareContent();
        }
    }
});

// 下载内容
function downloadContent() {
    const outputContent = document.getElementById('output-content');
    const text = outputContent.textContent;
    
    if (text && !text.includes('您生成的学术内容将在这里显示')) {
        const blob = new Blob([text], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'ai-generated-paper.txt';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        showNotification('文件下载已开始');
    } else {
        showNotification('暂无内容可下载');
    }
}

// 分享内容
function shareContent() {
    if (navigator.share) {
        navigator.share({
            title: 'AI生成的学术内容',
            text: 'AI学术写作助手生成的内容',
            url: window.location.href
        });
    } else {
        copyToClipboard(window.location.href);
        showNotification('链接已复制到剪贴板');
    }
}

// 页面加载完成后的初始化
document.addEventListener('DOMContentLoaded', function() {
    // 添加页面加载动画
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
    
    // 初始化工具提示
    initTooltips();
});

// 初始化工具提示
function initTooltips() {
    const tooltipElements = document.querySelectorAll('[data-tooltip]');
    tooltipElements.forEach(element => {
        element.addEventListener('mouseenter', showTooltip);
        element.addEventListener('mouseleave', hideTooltip);
    });
}

function showTooltip(e) {
    const tooltip = document.createElement('div');
    tooltip.className = 'tooltip';
    tooltip.textContent = e.target.getAttribute('data-tooltip');
    tooltip.style.cssText = `
        position: absolute;
        background: #1f2937;
        color: white;
        padding: 0.5rem 1rem;
        border-radius: 6px;
        font-size: 0.875rem;
        z-index: 10000;
        pointer-events: none;
        opacity: 0;
        transition: opacity 0.3s ease;
    `;
    
    document.body.appendChild(tooltip);
    
    const rect = e.target.getBoundingClientRect();
    tooltip.style.left = rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2) + 'px';
    tooltip.style.top = rect.top - tooltip.offsetHeight - 10 + 'px';
    
    setTimeout(() => {
        tooltip.style.opacity = '1';
    }, 10);
    
    e.target._tooltip = tooltip;
}

function hideTooltip(e) {
    if (e.target._tooltip) {
        e.target._tooltip.remove();
        delete e.target._tooltip;
    }
}