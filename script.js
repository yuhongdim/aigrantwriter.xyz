// Navigation bar scroll effect
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

// Mobile navigation menu toggle
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');

navToggle.addEventListener('click', function() {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
});

// Smooth scroll to specified area
function scrollToGenerator() {
    document.getElementById('generator').scrollIntoView({
        behavior: 'smooth'
    });
}

// Smooth scroll navigation links
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

// API Configuration
const API_CONFIG = {
    baseURL: 'https://breakout.wenwen-ai.com/v1/chat/completions',
    apiKey: 'sk-6ogS4COJPVLfLclruLQ6h59IxyvcN61nGuvgpr71VNL3ARsN'
};

// Paper generation function
async function generatePaper() {
    const generateBtn = document.querySelector('.generate-btn');
    const outputContent = document.getElementById('output-content');
    const researchTopic = document.getElementById('research-topic').value;
    const paperType = document.getElementById('paper-type').value;
    const researchField = document.getElementById('research-field').value;
    const requirements = document.getElementById('requirements').value;

    // Input validation
    if (!researchTopic.trim()) {
        alert('Please enter a research topic');
        return;
    }

    // Show loading state
    generateBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Generating...';
    generateBtn.disabled = true;

    try {
        // Build prompt
        const prompt = buildPrompt(researchTopic, paperType, researchField, requirements);
        
        // Call AI API
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
                        content: 'You are a professional academic writing assistant, skilled at generating high-quality academic content.'
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
            throw new Error(`API request failed: ${response.status}`);
        }

        const data = await response.json();
        const generatedContent = data.choices[0].message.content;
        
        // Format and display generated content
        outputContent.innerHTML = formatGeneratedContent(data.choices[0].message.content, researchTopic, paperType, researchField);
        
    } catch (error) {
        console.error('Error generating paper:', error);
        // If API call fails, use backup mock content
        outputContent.innerHTML = generateMockContent(researchTopic, paperType, researchField, requirements);
        showNotification('API call failed, showing example content');
    } finally {
        // Restore button state
        generateBtn.innerHTML = '<i class="fas fa-magic"></i> Generate Paper';
        generateBtn.disabled = false;
    }
}

// Build prompt
function buildPrompt(topic, type, field, requirements) {
    const typeNames = {
        'phd': 'PhD Dissertation',
        'master': 'Master\'s Thesis',
        'proposal': 'Research Proposal',
        'review': 'Literature Review'
    };

    let prompt = `Please generate detailed outline and content for the following research topic:

Research Topic: ${topic}
Research Field: ${field}
Paper Type: ${typeNames[type] || type}`;

    if (requirements) {
        prompt += `\nSpecial Requirements: ${requirements}`;
    }

    prompt += `

Please generate content according to the following structure:
1. Research Background and Significance
2. Literature Review
3. Research Methodology
4. Expected Results
5. Innovation Points
6. Reference Suggestions

Please ensure the content is professional, detailed, and academically valuable.`;

    return prompt;
}

// Format generated content
function formatGeneratedContent(content, topic, type, field) {
    const typeNames = {
        'phd': 'PhD Dissertation',
        'master': 'Master\'s Thesis',
        'proposal': 'Research Proposal',
        'review': 'Literature Review'
    };

    return `
        <div class="generated-content">
            <h3>${typeNames[type] || 'Academic Paper'}: ${topic}</h3>
            <div class="content-body">
                ${content.replace(/\n/g, '<br>')}
            </div>
            <div class="content-meta">
                <small>
                    <i class="fas fa-clock"></i> 
                    Generated: ${new Date().toLocaleString()} |
                    Field: ${field} |
                    Type: ${typeNames[type] || type}
                </small>
            </div>
        </div>
    `;
}

// Generate mock content
function generateMockContent(topic, type, field, requirements) {
    const typeNames = {
        'phd': 'PhD Dissertation',
        'master': 'Master\'s Thesis',
        'proposal': 'Research Proposal',
        'review': 'Literature Review'
    };

    const fieldNames = {
        'education': 'Education',
        'psychology': 'Psychology',
        'computer-science': 'Computer Science',
        'medicine': 'Medicine',
        'engineering': 'Engineering',
        'business': 'Business',
        'other': 'Other'
    };

    return `
        <div class="generated-content">
            <h3>${typeNames[type]} Outline</h3>
            <h4>Research Topic: ${topic}</h4>
            <p><strong>Research Field:</strong> ${fieldNames[field]}</p>
            
            <div class="content-body">
                <h5>1. Introduction</h5>
                <p>This research aims to explore issues related to ${topic}. With the rapid development in the field of ${fieldNames[field]}, this research has important theoretical value and practical significance.</p>
                
                <h5>2. Literature Review</h5>
                <p>Through systematic review of relevant literature, current research has gaps in the following areas:</p>
                <ul>
                    <li>Theoretical framework needs further improvement</li>
                    <li>Empirical research is relatively lacking</li>
                    <li>Research methods need innovation</li>
                </ul>
                
                <h5>3. Research Methodology</h5>
                <p>This research adopts mixed research methods, combining quantitative and qualitative analysis:</p>
                <ul>
                    <li>Survey method: Collect large sample data</li>
                    <li>In-depth interview method: Obtain deep insights</li>
                    <li>Case study method: Provide specific examples</li>
                </ul>
                
                <h5>4. Expected Results</h5>
                <p>This research is expected to achieve breakthroughs in the following areas:</p>
                <ul>
                    <li>Construct new theoretical models</li>
                    <li>Propose practical guidance suggestions</li>
                    <li>Lay foundation for subsequent research</li>
                </ul>
                
                <h5>5. Research Significance</h5>
                <p>The theoretical significance of this research lies in enriching the theoretical system of ${fieldNames[field]}, and the practical significance lies in providing scientific basis for the development of related fields.</p>
            </div>
            
            <p><small><i class="fas fa-info-circle"></i> This is AI-generated sample content. In actual use, more detailed and professional content will be generated according to your specific needs.</small></p>
        </div>
    `;
}

// Copy content to clipboard
async function copyToClipboard() {
    try {
        const content = document.getElementById('output-content').innerText;
        await navigator.clipboard.writeText(content);
        showNotification('Content copied to clipboard');
    } catch (err) {
        console.error('Copy failed: ', err);
    }
}

// Show notification
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
        ${message}
    `;
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
    
    // 3秒后自动移除
    // Auto-remove after 3 seconds
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
// 工具卡片点击事件已移除，现在使用onclick属性直接调用openTool函数
// Tool card click events removed, now using onclick attribute to directly call openTool function

// 添加高亮动画
// Add highlight animation
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
    // 如果点击的是工具卡片链接，不做任何处理，让浏览器正常跳转
    if (e.target.closest('.tool-card-link')) {
        return; // 不阻止，让链接正常工作
    }
    
    // 如果点击的是导航链接，不做任何处理，让浏览器正常跳转
    if (e.target.closest('.nav-link') || e.target.closest('nav a')) {
        return; // 不阻止，让链接正常工作
    }
    
    if (e.target.closest('.action-btn')) {
        const btn = e.target.closest('.action-btn');
        const icon = btn.querySelector('i');
        const outputContent = document.getElementById('output-content');
        
        if (icon.classList.contains('fa-copy')) {
            const text = outputContent.textContent;
            if (text && !text.includes('Your generated academic content will be displayed here')) {
                copyToClipboard(text);
            } else {
                showNotification('No content to copy');
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
    
    if (text && !text.includes('Your generated academic content will be displayed here')) {
        const blob = new Blob([text], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'ai-generated-paper.txt';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        showNotification('File download started');
    } else {
        showNotification('No content to download');
    }
}

// 分享内容
function shareContent() {
    if (navigator.share) {
        navigator.share({
            title: 'AI Generated Academic Content',
        text: 'Content generated by AI Academic Writing Assistant',
            url: window.location.href
        });
    } else {
        copyToClipboard(window.location.href);
        showNotification('Link copied to clipboard');
    }
}

// 页面加载完成后的初始化
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing...');
    
    // 初始化工具提示
    initTooltips();
    
    // 处理所有带有onclick属性的按钮
    const buttonsWithOnclick = document.querySelectorAll('[onclick]');
    console.log('Found buttons with onclick:', buttonsWithOnclick.length);
    
    buttonsWithOnclick.forEach((btn, index) => {
        console.log(`Button ${index + 1}:`, btn.onclick);
        
        // 为每个按钮添加点击事件监听器
        btn.addEventListener('click', function(e) {
            console.log('Button clicked:', btn);
            
            // 如果按钮有onclick属性，执行它
            if (btn.onclick) {
                try {
                    btn.onclick.call(btn, e);
                } catch (error) {
                    console.error('Error executing onclick:', error);
                }
            }
        });
    });
    
    // 工具卡片链接处理 - 完全移除JavaScript干扰
    console.log('Tool card links will use native browser navigation');
    
    // 检查navigateToPage函数是否存在
    console.log('navigateToPage function exists:', typeof navigateToPage);
    
    // 测试函数调用
    window.testNavigation = function() {
        navigateToPage('phd-assistant.html');
    };
    
    console.log('Navigation setup complete. You can test with: testNavigation()');
    
    // 原有的调试代码
    const toolBtns = document.querySelectorAll('.tool-btn');
    console.log('Found', toolBtns.length, 'tool buttons');
    
    toolBtns.forEach((btn, index) => {
        console.log(`Button ${index + 1}:`, btn.onclick);
    });
    
    console.log('openTool function exists:', typeof openTool);
    
    const modals = document.querySelectorAll('.tool-modal');
    console.log('Found modals:', modals.length);
    modals.forEach((modal, index) => {
        console.log(`Modal ${index} ID:`, modal.id);
    });
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

// 工具模态框管理和页面导航
function openTool(toolName) {
    console.log('openTool called with:', toolName);
    
    // 首先尝试打开模态框
    const modalId = toolName + '-modal';
    console.log('Looking for modal with ID:', modalId);
    const modal = document.getElementById(modalId);
    console.log('Modal element found:', modal);
    
    if (modal) {
        console.log('Opening modal...');
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        console.log('Modal opened successfully');
        
        // 滚动到生成器区域
        setTimeout(() => {
            const generatorSection = document.getElementById('generator');
            if (generatorSection) {
                generatorSection.scrollIntoView({ behavior: 'smooth' });
            }
        }, 300);
    } else {
        console.error('Modal not found with ID:', modalId);
        
        // 如果没有找到模态框，尝试页面导航
        navigateToTool(toolName);
    }
}

// 页面导航功能
function navigateToPage(pageName) {
    console.log('navigateToPage called with:', pageName);
    try {
        // 显示一个临时提示
        alert('Navigating to: ' + pageName);
        
        // 尝试跳转
        window.location.href = pageName;
        
        console.log('Navigation initiated to:', pageName);
    } catch (error) {
        console.error('Navigation error:', error);
        alert('Navigation failed: ' + error.message);
    }
}

function navigateToTool(toolName) {
    console.log('Navigating to tool:', toolName);
    
    // 隐藏所有工具区域
    hideAllToolSections();
    
    // 显示对应的工具区域
    const toolSection = document.getElementById(toolName + '-section');
    if (toolSection) {
        toolSection.style.display = 'block';
        toolSection.scrollIntoView({ behavior: 'smooth' });
    } else {
        // 如果没有专门的区域，滚动到生成器区域并设置工具类型
        const generatorSection = document.getElementById('generator');
        if (generatorSection) {
            generatorSection.scrollIntoView({ behavior: 'smooth' });
            
            // 设置工具类型
            const toolTypeSelect = document.getElementById('paper-type');
            if (toolTypeSelect) {
                const toolTypeMap = {
                    'phd-assistant': 'phd-thesis',
                    'literature-review': 'literature-review',
                    'research-method': 'research-method',
                    'research-question': 'research-question',
                    'ai-reducer': 'ai-reducer'
                };
                
                const mappedType = toolTypeMap[toolName];
                if (mappedType) {
                    toolTypeSelect.value = mappedType;
                    // 触发change事件
                    toolTypeSelect.dispatchEvent(new Event('change'));
                }
            }
            
            // 添加高亮效果
            generatorSection.style.animation = 'highlight 2s ease-in-out';
            setTimeout(() => {
                generatorSection.style.animation = '';
            }, 2000);
        }
    }
}

// 隐藏所有工具区域
function hideAllToolSections() {
    const toolSections = document.querySelectorAll('[id$="-section"]');
    toolSections.forEach(section => {
        section.style.display = 'none';
    });
}

function closeTool() {
    const modals = document.querySelectorAll('.tool-modal');
    modals.forEach(modal => {
        modal.style.display = 'none';
    });
    document.body.style.overflow = 'auto';
}

// 点击模态框外部关闭
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('tool-modal')) {
        closeTool();
    }
});

// ESC键关闭模态框
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeTool();
    }
});

// 博士论文助手功能
async function generatePhdContent() {
    const topic = document.getElementById('phd-topic').value;
    const field = document.getElementById('phd-field').value;
    const chapter = document.getElementById('phd-chapter').value;
    const requirements = document.getElementById('phd-requirements').value;

    if (!topic.trim() || !field || !chapter) {
        alert('请填写所有必填字段');
        alert('Please fill in all required fields');
        return;
    }

    const btn = document.querySelector('#phd-assistant-modal .generate-btn');
    const output = document.getElementById('phd-output');
    
    toggleLoading(btn, true);

    try {
        const prompt = `作为博士论文写作专家，请为以下研究主题生成${chapter}章节内容：

研究主题：${topic}
研究领域：${field}
具体要求：${requirements}

请生成专业详细的${chapter}内容，包括：
1. 清晰的章节结构
2. 学术语言规范
3. 严谨的逻辑性
4. 符合博士论文标准

字数要求：2000-3000字`;

        const prompt = `As a PhD dissertation writing expert, please generate ${chapter} chapter content for the following research topic:

Research Topic: ${topic}
Research Field: ${field}
Specific Requirements: ${requirements}

Please generate professional and detailed ${chapter} content, including:
1. Clear chapter structure
2. Academic language standards
3. Rigorous logic
4. Compliance with PhD dissertation standards

Word count requirement: 2000-3000 words`;
        const result = await callAI(prompt);
        displayResult(output, result);
    } catch (error) {
        alert('生成失败，请重试');
        alert('Generation failed, please try again');
        console.error(error);
    } finally {
        toggleLoading(btn, false);
    }
}

// 文献综述生成器功能
// Literature Review Generator Function
async function generateLiteratureReview() {
    const topic = document.getElementById('lit-topic').value;
    const keywords = document.getElementById('lit-keywords').value;
    const timeframe = document.getElementById('lit-timeframe').value;
    const focus = document.getElementById('lit-focus').value;

    if (!topic.trim() || !keywords.trim()) {
        alert('请填写研究主题和关键词');
        alert('Please fill in research topic and keywords');
        return;
    }

    const btn = document.querySelector('#literature-review-modal .generate-btn');
    const output = document.getElementById('literature-output');
    
    toggleLoading(btn, true);

    try {
        const timeframeText = {
            'recent5': '近5年',
        'recent10': '近10年',
        'recent15': '近15年',
        'all': '不限时间'
        };
        const timeframeText = {
            'recent5': 'Recent 5 years',
        'recent10': 'Recent 10 years',
        'recent15': 'Recent 15 years',
        'all': 'No time limit'
        }[timeframe];

        const prompt = `作为学术研究专家，请为以下主题生成文献综述：

研究主题：${topic}
关键词：${keywords}
时间范围：${timeframeText}
综述重点：${focus}

请生成包含以下内容的文献综述：
1. 研究背景与意义
2. 国内外研究现状
3. 主要理论观点
4. 研究方法总结
5. 研究趋势分析
6. 研究空白与展望

要求：
- 结构清晰，逻辑严谨
- 引用权威文献
- 客观分析评价
- 字数：2500-3500字`;
        const prompt = `As an academic research expert, please generate a literature review for the following topic:

Research Topic: ${topic}
Keywords: ${keywords}
Time Frame: ${timeframeText}
Review Focus: ${focus}

Please generate a literature review containing the following content:
1. Research background and significance
2. Domestic and international research status
3. Main theoretical viewpoints
4. Research methodology summary
5. Research trend analysis
6. Research gaps and prospects

Requirements:
- Clear structure and rigorous logic
- Cite authoritative literature
- Objective analysis and evaluation
- Word count: 2500-3500 words`;
        const result = await callAI(prompt);
        displayResult(output, result);
    } catch (error) {
        alert('生成失败，请重试');
        console.error(error);
    } finally {
        toggleLoading(btn, false);
    }
}

// 研究方法生成器功能
async function generateResearchMethod() {
    const topic = document.getElementById('method-topic').value;
    const type = document.getElementById('method-type').value;
    const objectives = document.getElementById('method-objectives').value;

    if (!topic.trim() || !type || !objectives.trim()) {
        alert('请填写所有必填字段');
        alert('Please fill in all required fields');
        return;
    }

    const btn = document.querySelector('#research-method-modal .generate-btn');
    const output = document.getElementById('method-output');
    
    toggleLoading(btn, true);

    try {
        const prompt = `作为研究方法专家，请为以下研究设计详细的研究方法：

研究主题：${topic}
研究类型：${type}
研究目标：${objectives}

请生成包含以下内容的研究方法：
1. 研究设计
2. 研究对象与样本
3. 数据收集方法
4. 数据分析方法
5. 研究工具与技术
6. 研究流程
7. 质量控制措施
8. 伦理考虑

要求：
- 方法科学可行
- 步骤详细具体
- 符合学术规范
- 字数：2000-2800字`;
        const prompt = `As a research methodology expert, please design detailed research methods for the following study:

Research Topic: ${topic}
Research Type: ${type}
Research Objectives: ${objectives}

Please generate research methods containing the following content:
1. Research design
2. Research subjects and samples
3. Data collection methods
4. Data analysis methods
5. Research tools and techniques
6. Research process
7. Quality control measures
8. Ethical considerations

Requirements:
- Scientifically feasible methods
- Detailed and specific steps
- Compliance with academic standards
- Word count: 2000-2800 words`;
        const result = await callAI(prompt);
        displayResult(output, result);
    } catch (error) {
        alert('生成失败，请重试');
        alert('Generation failed, please try again');
        console.error(error);
    } finally {
        toggleLoading(btn, false);
    }
}

// 研究问题生成器功能
// Research Question Generator Function
async function generateResearchQuestion() {
    const field = document.getElementById('question-field').value;
    const interest = document.getElementById('question-interest').value;
    const gap = document.getElementById('question-gap').value;

    if (!field || !interest.trim()) {
        alert('请填写研究领域和研究兴趣');
        alert('Please fill in research field and research interest');
        return;
    }

    const btn = document.querySelector('#research-question-modal .generate-btn');
    const output = document.getElementById('question-output');
    
    toggleLoading(btn, true);

    try {
        const prompt = `作为学术研究专家，请根据以下信息生成创新性的研究问题：

研究领域：${field}
研究兴趣：${interest}
研究空白：${gap}

请生成：
1. 3-5个具体的研究问题
2. 每个问题的研究价值分析
3. 可行性评估
4. 预期贡献
5. 相关研究假设
6. 研究意义说明

要求：
- 问题具有创新性
- 研究价值明确
- 可操作性强
- 符合学术规范`;

        const prompt = `As an academic research expert, please generate innovative research questions based on the following information:

Research Field: ${field}
Research Interest: ${interest}
Research Gap: ${gap}

Please generate:
1. 3-5 specific research questions
2. Research value analysis for each question
3. Feasibility assessment
4. Expected contributions
5. Related research hypotheses
6. Research significance explanation

Requirements:
- Questions should be innovative
- Clear research value
- Strong operability
- Compliance with academic standards`;
        const result = await callAI(prompt);
        displayResult(output, result);
    } catch (error) {
        alert('生成失败，请重试');
        console.error(error);
    } finally {
        toggleLoading(btn, false);
    }
}

// AI降重工具功能
// AI Text Reduction Tool Function
async function generateReducedText() {
    const text = document.getElementById('reducer-text').value;
    const level = document.getElementById('reducer-level').value;
    const style = document.getElementById('reducer-style').value;

    if (!text.trim()) {
        alert('请输入需要降重的文本');
        alert('Please enter text that needs to be reduced');
        return;
    }

    const btn = document.querySelector('#ai-reducer-modal .generate-btn');
    const output = document.getElementById('reducer-output');
    
    toggleLoading(btn, true);

    try {
        const levelText = {
            'light': '轻度降重：保持原意，微调表达',
        'medium': '中度降重：改写句式，同义词替换',
        'heavy': '深度降重：重组结构，全面改写'
        };
        const levelText = {
            'light': 'Light reduction: Maintain original meaning, fine-tune expression',
        'medium': 'Medium reduction: Rewrite sentence structure, synonym replacement',
        'heavy': 'Deep reduction: Restructure organization, comprehensive rewriting'
        };

        const styleText = {
            'academic': '学术风格',
        'formal': '正式风格',
        'natural': '自然风格'
        };
        const styleText = {
            'academic': 'Academic style',
        'formal': 'Formal style',
        'natural': 'Natural style'
        };

        const prompt = `作为专业的文本改写专家，请对以下文本进行降重处理：

原文：
${text}

降重要求：${levelText}
写作风格：${styleText}

请遵循以下原则：
1. 保持原文核心含义
2. 改变句式结构和表达方式
3. 使用同义词替换
4. 调整段落组织
5. 保持逻辑连贯性
6. 符合${styleText}要求

请输出改写后的文本，无需额外说明。`;
        const prompt = `As a professional text rewriting expert, please perform text reduction on the following text:

Original Text:
${text}

Reduction Requirements: ${levelText}
Writing Style: ${styleText}

Please follow these principles:
1. Maintain the core meaning of the original text
2. Change sentence structure and expression
3. Use synonym replacement
4. Adjust paragraph organization
5. Maintain logical coherence
6. Meet ${styleText} requirements

Please output the rewritten text directly without additional explanation.`;
        const result = await callAI(prompt);
        
        // 显示结果和统计信息
        displayResult(output, result);
        updateReductionStats(text, result);
        
    } catch (error) {
        alert('文本降重失败，请重试');
        alert('Text reduction failed, please try again');
        console.error(error);
    } finally {
        toggleLoading(btn, false);
    }
}

// 更新降重统计信息
// Update reduction statistics
function updateReductionStats(originalText, reducedText) {
    document.getElementById('original-count').textContent = originalText.length;
    document.getElementById('reduced-count').textContent = reducedText.length;
    
    // 简单的相似度估算（实际应用中可以使用更复杂的算法）
    // Simple similarity estimation (more complex algorithms can be used in actual applications)
    const similarity = calculateSimilarity(originalText, reducedText);
    const reduction = Math.max(0, Math.round((1 - similarity) * 100));
    document.getElementById('similarity-reduction').textContent = `约 ${reduction}%`;
    document.getElementById('similarity-reduction').textContent = `About ${reduction}%`;
}

// 简单的文本相似度计算
// Simple text similarity calculation
function calculateSimilarity(text1, text2) {
    const words1 = text1.toLowerCase().split(/\s+/);
    const words2 = text2.toLowerCase().split(/\s+/);
    
    const commonWords = words1.filter(word => words2.includes(word));
    const totalWords = Math.max(words1.length, words2.length);
    
    return commonWords.length / totalWords;
}

// 通用AI调用函数
// Universal AI calling function
async function callAI(prompt) {
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
                    content: '你是一个专业的学术写作助手，擅长生成高质量的学术内容。'
                    content: 'You are a professional academic writing assistant, skilled at generating high-quality academic content.'
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
        throw new Error(`API request failed: ${response.status}`);
    }

    const data = await response.json();
    return data.choices[0].message.content;
}

// 显示结果
// Display results
function displayResult(outputElement, content) {
    outputElement.style.display = 'block';
    const contentDiv = outputElement.querySelector('.output-content');
    contentDiv.textContent = content;
}

// 切换加载状态
// Toggle loading state
function toggleLoading(button, isLoading) {
    const btnText = button.querySelector('.btn-text');
    const spinner = button.querySelector('.loading-spinner');
    
    if (isLoading) {
        btnText.style.display = 'none';
        spinner.style.display = 'inline-block';
        button.disabled = true;
    } else {
        btnText.style.display = 'inline-block';
        spinner.style.display = 'none';
        button.disabled = false;
    }
}

// 复制到剪贴板功能（更新版本）
// Copy to clipboard function (updated version)
function copyToClipboard(outputId) {
    const outputElement = document.getElementById(outputId);
    const content = outputElement.querySelector('.output-content').textContent;
    
    navigator.clipboard.writeText(content).then(() => {
        showNotification('内容已复制到剪贴板');
        showNotification('Content copied to clipboard');
    }).catch(() => {
        // 降级方案
        const textArea = document.createElement('textarea');
        textArea.value = content;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        showNotification('内容已复制到剪贴板');
        showNotification('Content copied to clipboard');
    });
}