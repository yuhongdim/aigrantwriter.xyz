// Research Method Generator JavaScript

// API Configuration
const API_CONFIG = {
    baseURL: 'https://breakout.wenwen-ai.com/v1/chat/completions',
    apiKey: 'sk-6ogS4COJPVLfLclruLQ6h59IxyvcN61nGuvgpr71VNL3ARsN'
};

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('.generator-form');
    if (form) {
        form.addEventListener('submit', handleFormSubmit);
    }
});

// Handle form submission
async function handleFormSubmit(event) {
    event.preventDefault();
    
    // Get form data
    const formData = getFormData();
    
    // Validate required fields
    if (!validateFormData(formData)) {
        showNotification('Please fill in all required fields', 'error');
        return;
    }
    
    // Generate research method
    await generateResearchMethod(formData);
}

// Get form data
function getFormData() {
    return {
        researchQuestion: document.getElementById('research-question').value.trim(),
        researchType: document.getElementById('research-type').value,
        researchField: document.getElementById('research-field').value,
        targetPopulation: document.getElementById('target-population').value.trim(),
        dataCollection: Array.from(document.getElementById('data-collection').selectedOptions).map(option => option.value),
        sampleSize: document.getElementById('sample-size').value,
        researchDuration: document.getElementById('research-duration').value
    };
}

// Validate form data
function validateFormData(data) {
    return data.researchQuestion && 
           data.researchType && 
           data.researchField && 
           data.targetPopulation;
}

// Generate research method using AI
async function generateResearchMethod(formData) {
    const submitButton = document.querySelector('.btn-primary');
    const originalText = submitButton.innerHTML;
    
    // Show loading state
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Generating...';
    submitButton.disabled = true;
    
    try {
        // Build prompt
        const prompt = buildResearchMethodPrompt(formData);
        
        // Call AI API
        const result = await callAI(prompt);
        
        // Display result
        displayResult(result);
        
        showNotification('Research method generated successfully!', 'success');
        
    } catch (error) {
        console.error('Error generating research method:', error);
        showNotification('Failed to generate research method. Please try again.', 'error');
    } finally {
        // Reset button
        submitButton.innerHTML = originalText;
        submitButton.disabled = false;
    }
}

// Build AI prompt for research method generation
function buildResearchMethodPrompt(data) {
    const dataCollectionMethods = data.dataCollection.join(', ');
    
    return `As a research methodology expert, please design a comprehensive research method for the following study:

Research Question: ${data.researchQuestion}
Research Type: ${data.researchType}
Research Field: ${data.researchField}
Target Population: ${data.targetPopulation}
Data Collection Methods: ${dataCollectionMethods}
Expected Sample Size: ${data.sampleSize}
Research Duration: ${data.researchDuration}

Please generate a detailed research methodology that includes:

1. Research Design
   - Overall research approach and rationale
   - Research paradigm and theoretical framework

2. Participants and Sampling
   - Target population description
   - Sampling strategy and justification
   - Sample size calculation and power analysis
   - Inclusion and exclusion criteria

3. Data Collection Methods
   - Detailed description of each method
   - Instruments and tools to be used
   - Data collection procedures and timeline

4. Data Analysis Plan
   - Quantitative analysis methods (if applicable)
   - Qualitative analysis approach (if applicable)
   - Software and tools for analysis

5. Research Procedures
   - Step-by-step research process
   - Timeline and milestones
   - Quality assurance measures

6. Ethical Considerations
   - IRB/Ethics approval requirements
   - Informed consent procedures
   - Data privacy and confidentiality
   - Risk mitigation strategies

7. Limitations and Assumptions
   - Potential limitations of the study
   - Key assumptions
   - Strategies to address limitations

8. Expected Outcomes
   - Anticipated findings and contributions
   - Implications for theory and practice

Requirements:
- Methodology should be scientifically rigorous
- Procedures should be detailed and replicable
- Comply with academic standards
- Length: 2000-3000 words
- Use clear, professional academic language`;
}

// Call AI API
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
                    role: 'user',
                    content: prompt
                }
            ],
            max_tokens: 4000,
            temperature: 0.7
        })
    });

    if (!response.ok) {
        throw new Error(`API request failed: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    
    if (!data.choices || !data.choices[0] || !data.choices[0].message) {
        throw new Error('Invalid API response format');
    }

    return data.choices[0].message.content;
}

// Display the generated result
function displayResult(content) {
    // Create or get result container
    let resultContainer = document.getElementById('research-method-result');
    
    if (!resultContainer) {
        resultContainer = document.createElement('div');
        resultContainer.id = 'research-method-result';
        resultContainer.className = 'result-container';
        
        // Insert after the form
        const form = document.querySelector('.generator-form');
        form.parentNode.insertBefore(resultContainer, form.nextSibling);
    }
    
    // Format and display content
    const formattedContent = formatContent(content);
    
    resultContainer.innerHTML = `
        <div class="result-header">
            <h3><i class="fas fa-check-circle"></i> Generated Research Method</h3>
            <div class="result-actions">
                <button onclick="copyResult()" class="btn btn-secondary">
                    <i class="fas fa-copy"></i> Copy
                </button>
                <button onclick="downloadResult()" class="btn btn-secondary">
                    <i class="fas fa-download"></i> Download
                </button>
            </div>
        </div>
        <div class="result-content">
            ${formattedContent}
        </div>
    `;
    
    // Scroll to result
    resultContainer.scrollIntoView({ behavior: 'smooth' });
}

// Format content for display
function formatContent(content) {
    // Convert markdown-style formatting to HTML
    let formatted = content
        .replace(/^# (.*$)/gm, '<h2>$1</h2>')
        .replace(/^## (.*$)/gm, '<h3>$1</h3>')
        .replace(/^### (.*$)/gm, '<h4>$1</h4>')
        .replace(/^\* (.*$)/gm, '<li>$1</li>')
        .replace(/^- (.*$)/gm, '<li>$1</li>')
        .replace(/\n\n/g, '</p><p>')
        .replace(/^(?!<[h|l|p])/gm, '<p>')
        .replace(/(?<![>])$/gm, '</p>');
    
    // Wrap consecutive list items in ul tags
    formatted = formatted.replace(/(<li>.*?<\/li>)(\s*<li>.*?<\/li>)*/gs, '<ul>$&</ul>');
    
    return formatted;
}

// Copy result to clipboard
function copyResult() {
    const resultContent = document.querySelector('.result-content');
    if (resultContent) {
        const text = resultContent.innerText;
        navigator.clipboard.writeText(text).then(() => {
            showNotification('Content copied to clipboard!', 'success');
        }).catch(() => {
            showNotification('Failed to copy content', 'error');
        });
    }
}

// Download result as text file
function downloadResult() {
    const resultContent = document.querySelector('.result-content');
    if (resultContent) {
        const text = resultContent.innerText;
        const blob = new Blob([text], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = url;
        a.download = 'research-method.txt';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        showNotification('Research method downloaded!', 'success');
    }
}

// Show notification
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existing = document.querySelector('.notification');
    if (existing) {
        existing.remove();
    }
    
    // Create notification
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check' : type === 'error' ? 'exclamation-triangle' : 'info'}"></i>
        <span>${message}</span>
        <button onclick="this.parentElement.remove()" class="notification-close">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 5000);
}

// Add CSS for notifications and results
const style = document.createElement('style');
style.textContent = `
    .notification {
        position: fixed;
        top: 20px;
        right: 20px;
        background: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        display: flex;
        align-items: center;
        gap: 0.5rem;
        z-index: 1000;
        animation: slideInRight 0.3s ease;
    }
    
    .notification-success {
        border-left: 4px solid #10b981;
        color: #065f46;
    }
    
    .notification-error {
        border-left: 4px solid #ef4444;
        color: #991b1b;
    }
    
    .notification-info {
        border-left: 4px solid #3b82f6;
        color: #1e40af;
    }
    
    .notification-close {
        background: none;
        border: none;
        cursor: pointer;
        padding: 0;
        margin-left: 0.5rem;
        opacity: 0.7;
    }
    
    .notification-close:hover {
        opacity: 1;
    }
    
    .result-container {
        margin-top: 3rem;
        background: white;
        border-radius: 12px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        overflow: hidden;
    }
    
    .result-header {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        padding: 1.5rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    
    .result-header h3 {
        margin: 0;
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }
    
    .result-actions {
        display: flex;
        gap: 0.5rem;
    }
    
    .result-actions .btn {
        background: rgba(255, 255, 255, 0.2);
        border: 1px solid rgba(255, 255, 255, 0.3);
        color: white;
        padding: 0.5rem 1rem;
        border-radius: 6px;
        text-decoration: none;
        display: flex;
        align-items: center;
        gap: 0.25rem;
        transition: all 0.2s;
    }
    
    .result-actions .btn:hover {
        background: rgba(255, 255, 255, 0.3);
    }
    
    .result-content {
        padding: 2rem;
        line-height: 1.6;
        color: #374151;
    }
    
    .result-content h2 {
        color: #1f2937;
        margin-top: 2rem;
        margin-bottom: 1rem;
        padding-bottom: 0.5rem;
        border-bottom: 2px solid #e5e7eb;
    }
    
    .result-content h3 {
        color: #374151;
        margin-top: 1.5rem;
        margin-bottom: 0.75rem;
    }
    
    .result-content h4 {
        color: #4b5563;
        margin-top: 1rem;
        margin-bottom: 0.5rem;
    }
    
    .result-content ul {
        margin: 1rem 0;
        padding-left: 1.5rem;
    }
    
    .result-content li {
        margin-bottom: 0.5rem;
    }
    
    .result-content p {
        margin-bottom: 1rem;
    }
    
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
`;
document.head.appendChild(style);