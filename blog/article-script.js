// Article Detail Page JavaScript

// 文章数据
const articleData = {
    1: {
        title: "如何撰写高质量的学术论文摘要",
        titleEn: "How to Write High-Quality Academic Paper Abstracts",
        excerpt: "学术论文摘要是读者了解您研究的第一印象。本文将详细介绍如何撰写清晰、简洁且有吸引力的论文摘要。",
        excerptEn: "Academic paper abstracts are readers' first impression of your research. This article provides detailed guidance on writing clear, concise, and engaging abstracts.",
        category: "writing-tips",
        categoryName: "写作技巧",
        categoryNameEn: "Writing Tips",
        author: "Dr. 张教授",
        authorEn: "Dr. Zhang Professor",
        authorTitle: "学术写作专家",
        authorTitleEn: "Academic Writing Expert",
        date: "2024-01-15",
        readTime: "5分钟",
        readTimeEn: "5 min read",
        tags: ["论文摘要", "学术写作", "写作技巧", "研究方法"],
        tagsEn: ["Abstract", "Academic Writing", "Writing Tips", "Research Methods"],
        content: `
            <h2>什么是学术论文摘要？</h2>
            <p>学术论文摘要是对整篇论文的简洁总结，通常包含研究目的、方法、主要发现和结论。一个优秀的摘要应该能够让读者在不阅读全文的情况下，快速了解研究的核心内容和价值。</p>
            
            <h2>摘要的基本结构</h2>
            <p>一个标准的学术论文摘要通常包含以下四个要素：</p>
            
            <h3>1. 研究背景与目的</h3>
            <p>简要说明研究的背景、问题的重要性以及研究目的。这部分应该回答"为什么要进行这项研究？"的问题。</p>
            <blockquote>
                <p><strong>示例：</strong>"随着人工智能技术的快速发展，其在教育领域的应用日益广泛。然而，AI工具对学生学习效果的影响机制尚不明确。本研究旨在探讨AI辅助学习工具对大学生学习成效的影响。"</p>
            </blockquote>
            
            <h3>2. 研究方法</h3>
            <p>简述研究采用的方法、数据来源、样本规模等关键信息。</p>
            <blockquote>
                <p><strong>示例：</strong>"采用准实验设计，选取某大学240名本科生作为研究对象，随机分为实验组和对照组，实验周期为12周。"</p>
            </blockquote>
            
            <h3>3. 主要发现</h3>
            <p>概述研究的核心发现和重要结果，可以包含关键数据。</p>
            <blockquote>
                <p><strong>示例：</strong>"结果显示，使用AI辅助学习工具的学生在期末考试中的平均成绩比对照组高出15.3%（p<0.01），学习满意度也显著提升。"</p>
            </blockquote>
            
            <h3>4. 结论与意义</h3>
            <p>总结研究的主要结论和理论或实践意义。</p>
            <blockquote>
                <p><strong>示例：</strong>"研究证实了AI辅助学习工具的有效性，为高等教育中AI技术的应用提供了实证支持，对推进智慧教育发展具有重要意义。"</p>
            </blockquote>
            
            <h2>撰写摘要的实用技巧</h2>
            
            <h3>1. 控制字数</h3>
            <ul>
                <li>中文摘要：通常200-300字</li>
                <li>英文摘要：通常150-250词</li>
                <li>会议摘要：可能更短，100-150词</li>
            </ul>
            
            <h3>2. 使用主动语态</h3>
            <p>尽量使用主动语态，使表达更加直接有力。</p>
            <div class="comparison-box">
                <div class="comparison-item">
                    <h4>❌ 被动语态</h4>
                    <p>"数据被收集和分析"</p>
                </div>
                <div class="comparison-item">
                    <h4>✅ 主动语态</h4>
                    <p>"我们收集并分析了数据"</p>
                </div>
            </div>
            
            <h3>3. 避免常见错误</h3>
            <ul>
                <li><strong>过于宽泛：</strong>避免使用模糊的表述，要具体明确</li>
                <li><strong>缺乏数据：</strong>适当包含关键的定量结果</li>
                <li><strong>引用文献：</strong>摘要中通常不引用其他文献</li>
                <li><strong>使用缩写：</strong>首次出现的专业术语应写全称</li>
            </ul>
            
            <h2>不同类型论文的摘要特点</h2>
            
            <h3>实证研究论文</h3>
            <p>重点突出研究方法、样本特征、主要发现和统计结果。</p>
            
            <h3>理论研究论文</h3>
            <p>强调理论贡献、逻辑论证过程和理论意义。</p>
            
            <h3>综述论文</h3>
            <p>突出文献范围、分析框架、主要观点和未来研究方向。</p>
            
            <h2>摘要质量检查清单</h2>
            <div class="checklist">
                <label><input type="checkbox"> 是否清楚说明了研究目的？</label>
                <label><input type="checkbox"> 是否简述了研究方法？</label>
                <label><input type="checkbox"> 是否包含了主要发现？</label>
                <label><input type="checkbox"> 是否总结了研究结论？</label>
                <label><input type="checkbox"> 字数是否符合要求？</label>
                <label><input type="checkbox"> 语言是否简洁明确？</label>
                <label><input type="checkbox"> 是否避免了专业术语的过度使用？</label>
                <label><input type="checkbox"> 是否独立成篇，不依赖正文？</label>
            </div>
            
            <h2>总结</h2>
            <p>撰写高质量的学术论文摘要需要反复练习和修改。记住，摘要是论文的"门面"，值得投入足够的时间和精力来完善。通过遵循上述结构和技巧，您可以撰写出清晰、准确、有吸引力的论文摘要，为您的研究成果赢得更多关注。</p>

            <div class="call-to-action">
                <h3>需要更多帮助？</h3>
                <p>使用我们的AI写作助手来优化您的论文摘要，获得个性化的改进建议。</p>
                <a href="../writing-optimization.html" class="cta-button">立即优化摘要</a>
            </div>
        `,
        contentEn: `
            <h2>What is an Academic Paper Abstract?</h2>
            <p>An academic paper abstract is a concise summary of the entire paper, typically containing research objectives, methods, main findings, and conclusions. An excellent abstract should enable readers to quickly understand the core content and value of the research without reading the full text.</p>
            
            <h2>Basic Structure of an Abstract</h2>
            <p>A standard academic paper abstract usually contains the following four elements:</p>
            
            <h3>1. Research Background and Objectives</h3>
            <p>Briefly explain the research background, importance of the problem, and research objectives. This section should answer "Why conduct this research?"</p>
            <blockquote>
                <p><strong>Example:</strong>"With the rapid development of artificial intelligence technology, its application in education is becoming increasingly widespread. However, the mechanism of AI tools' impact on student learning outcomes remains unclear. This study aims to explore the impact of AI-assisted learning tools on college students' learning effectiveness."</p>
            </blockquote>
            
            <h3>2. Research Methods</h3>
            <p>Briefly describe the research methods, data sources, sample size, and other key information.</p>
            <blockquote>
                <p><strong>Example:</strong>"Using a quasi-experimental design, 240 undergraduate students from a university were selected as research subjects, randomly divided into experimental and control groups, with an experimental period of 12 weeks."</p>
            </blockquote>
            
            <h3>3. Main Findings</h3>
            <p>Summarize the core findings and important results of the research, which may include key data.</p>
            <blockquote>
                <p><strong>Example:</strong>"Results showed that students using AI-assisted learning tools scored 15.3% higher on final exams than the control group (p<0.01), and learning satisfaction also significantly improved."</p>
            </blockquote>
            
            <h3>4. Conclusions and Significance</h3>
            <p>Summarize the main conclusions and theoretical or practical significance of the research.</p>
            <blockquote>
                <p><strong>Example:</strong>"The study confirmed the effectiveness of AI-assisted learning tools, providing empirical support for the application of AI technology in higher education, which is of great significance for promoting smart education development."</p>
            </blockquote>
            
            <h2>Practical Tips for Writing Abstracts</h2>
            
            <h3>1. Word Count Control</h3>
            <ul>
                <li>Chinese abstracts: Usually 200-300 characters</li>
                <li>English abstracts: Usually 150-250 words</li>
                <li>Conference abstracts: May be shorter, 100-150 words</li>
            </ul>
            
            <h3>2. Use Active Voice</h3>
            <p>Try to use active voice to make expressions more direct and powerful.</p>
            <div class="comparison-box">
                <div class="comparison-item">
                    <h4>❌ Passive Voice</h4>
                    <p>"Data were collected and analyzed"</p>
                </div>
                <div class="comparison-item">
                    <h4>✅ Active Voice</h4>
                    <p>"We collected and analyzed data"</p>
                </div>
            </div>
            
            <h3>3. Avoid Common Mistakes</h3>
            <ul>
                <li><strong>Too broad:</strong> Avoid vague expressions, be specific and clear</li>
                <li><strong>Lack of data:</strong> Appropriately include key quantitative results</li>
                <li><strong>Citing literature:</strong> Abstracts usually do not cite other literature</li>
                <li><strong>Using abbreviations:</strong> Professional terms should be written in full when first mentioned</li>
            </ul>
            
            <h2>Abstract Characteristics for Different Types of Papers</h2>
            
            <h3>Empirical Research Papers</h3>
            <p>Emphasize research methods, sample characteristics, main findings, and statistical results.</p>
            
            <h3>Theoretical Research Papers</h3>
            <p>Emphasize theoretical contributions, logical reasoning processes, and theoretical significance.</p>
            
            <h3>Review Papers</h3>
            <p>Highlight literature scope, analytical framework, main viewpoints, and future research directions.</p>
            
            <h2>Abstract Quality Checklist</h2>
            <div class="checklist">
                <label><input type="checkbox"> Does it clearly state the research objectives?</label>
                <label><input type="checkbox"> Does it briefly describe the research methods?</label>
                <label><input type="checkbox"> Does it include the main findings?</label>
                <label><input type="checkbox"> Does it summarize the research conclusions?</label>
                <label><input type="checkbox"> Does the word count meet requirements?</label>
                <label><input type="checkbox"> Is the language concise and clear?</label>
                <label><input type="checkbox"> Does it avoid overuse of technical terms?</label>
                <label><input type="checkbox"> Is it self-contained and independent of the main text?</label>
            </div>
            
            <h2>Summary</h2>
            <p>Writing high-quality academic paper abstracts requires repeated practice and revision. Remember, the abstract is the "facade" of your paper and deserves sufficient time and effort to perfect. By following the above structure and techniques, you can write clear, accurate, and attractive paper abstracts that will gain more attention for your research achievements.</p>

            <div class="call-to-action">
                <h3>Need More Help?</h3>
                <p>Use our AI writing assistant to optimize your paper abstracts and get personalized improvement suggestions.</p>
                <a href="../writing-optimization.html" class="cta-button">Optimize Abstract Now</a>
            </div>
        `
    },
    2: {
        title: "定性研究方法：从理论到实践",
        titleEn: "Qualitative Research Methods: From Theory to Practice",
        excerpt: "深入探讨定性研究的核心方法论，包括现象学、扎根理论、案例研究等方法的应用场景。",
        excerptEn: "In-depth exploration of core qualitative research methodologies, including phenomenology, grounded theory, case studies, and their applications.",
        category: "research-methods",
        categoryName: "研究方法",
        categoryNameEn: "Research Methods",
        author: "Dr. 李研究员",
        authorEn: "Dr. Li Researcher",
        authorTitle: "质性研究专家",
        authorTitleEn: "Qualitative Research Expert",
        date: "2024-01-12",
        readTime: "8分钟",
        readTimeEn: "8 min read",
        tags: ["定性研究", "研究方法", "现象学", "扎根理论", "案例研究"],
        tagsEn: ["Qualitative Research", "Research Methods", "Phenomenology", "Grounded Theory", "Case Study"],
        content: `
            <h2>定性研究概述</h2>
            <p>定性研究是一种探索性的研究方法，旨在深入理解社会现象的本质、意义和复杂性。与定量研究不同，定性研究更关注"为什么"和"如何"的问题，而非"多少"的问题。</p>
            
            <h2>主要定性研究方法</h2>
            
            <h3>1. 现象学研究</h3>
            <p>现象学研究关注个体对特定现象的主观体验和意义建构。</p>
            <h4>适用场景：</h4>
            <ul>
                <li>探索个体的生活体验</li>
                <li>理解特定现象的本质</li>
                <li>研究意识和感知过程</li>
            </ul>
            
            <h3>2. 扎根理论</h3>
            <p>扎根理论通过系统的数据收集和分析，从数据中归纳出理论。</p>
            <h4>核心特点：</h4>
            <ul>
                <li>理论从数据中"扎根"产生</li>
                <li>采用持续比较分析法</li>
                <li>理论饱和是停止收集数据的标准</li>
            </ul>
            
            <h3>3. 案例研究</h3>
            <p>案例研究深入分析一个或多个案例，以理解复杂的社会现象。</p>
            <h4>类型：</h4>
            <ul>
                <li>单案例研究</li>
                <li>多案例研究</li>
                <li>嵌入式案例研究</li>
            </ul>
            
            <h2>数据收集方法</h2>
            
            <h3>深度访谈</h3>
            <p>通过开放式问题与参与者进行深入对话，获取丰富的主观体验数据。</p>
            
            <h3>参与观察</h3>
            <p>研究者深入研究情境，观察并记录自然发生的行为和互动。</p>
            
            <h3>焦点小组</h3>
            <p>组织小组讨论，通过群体互动获取集体观点和共识。</p>
            
            <h2>数据分析策略</h2>
            
            <h3>主题分析</h3>
            <p>识别、分析和报告数据中的模式（主题）。</p>
            
            <h3>内容分析</h3>
            <p>系统地分析文本内容，识别特定的词汇、主题或概念。</p>
            
            <h3>叙事分析</h3>
            <p>分析个体或群体讲述的故事结构和意义。</p>
            
            <h2>质量保证策略</h2>
            
            <h3>可信度（Credibility）</h3>
            <ul>
                <li>三角验证</li>
                <li>成员检验</li>
                <li>同行评议</li>
            </ul>
            
            <h3>可转移性（Transferability）</h3>
            <ul>
                <li>详细描述研究情境</li>
                <li>提供丰富的案例描述</li>
            </ul>
            
            <h3>可依赖性（Dependability）</h3>
            <ul>
                <li>详细记录研究过程</li>
                <li>建立审计轨迹</li>
            </ul>
            
            <h2>实践建议</h2>
            
            <h3>研究设计阶段</h3>
            <ol>
                <li>明确研究问题和目的</li>
                <li>选择合适的研究方法</li>
                <li>制定数据收集计划</li>
                <li>考虑伦理问题</li>
            </ol>
            
            <h3>数据收集阶段</h3>
            <ol>
                <li>建立良好的研究关系</li>
                <li>保持开放和敏感的态度</li>
                <li>及时记录和整理数据</li>
                <li>注意数据饱和点</li>
            </ol>
            
            <h3>数据分析阶段</h3>
            <ol>
                <li>反复阅读和熟悉数据</li>
                <li>系统编码和分类</li>
                <li>寻找模式和主题</li>
                <li>验证和完善分析结果</li>
            </ol>
            
            <h2>常见挑战与应对</h2>
            
            <h3>主观性问题</h3>
            <p><strong>挑战：</strong>研究者的主观性可能影响数据收集和分析</p>
            <p><strong>应对：</strong>保持反思性，使用多种验证策略</p>
            
            <h3>数据量大</h3>
            <p><strong>挑战：</strong>定性数据通常量大且复杂</p>
            <p><strong>应对：</strong>使用质性数据分析软件，建立系统的编码体系</p>
            
            <h3>泛化问题</h3>
            <p><strong>挑战：</strong>定性研究结果的泛化能力有限</p>
            <p><strong>应对：</strong>关注理论泛化而非统计泛化，提供详细的情境描述</p>
            
            <h2>总结</h2>
            <p>定性研究为我们提供了深入理解复杂社会现象的有力工具。通过选择合适的方法、严格的数据收集和分析过程，以及有效的质量保证策略，定性研究能够产生有价值的洞察和理论贡献。</p>
        `,
        contentEn: `
            <h2>Overview of Qualitative Research</h2>
            <p>Qualitative research is an exploratory research method aimed at deeply understanding the nature, meaning, and complexity of social phenomena. Unlike quantitative research, qualitative research focuses more on "why" and "how" questions rather than "how much" questions.</p>
            
            <h2>Main Qualitative Research Methods</h2>
            
            <h3>1. Phenomenological Research</h3>
            <p>Phenomenological research focuses on individuals' subjective experiences and meaning construction of specific phenomena.</p>
            <h4>Applicable Scenarios:</h4>
            <ul>
                <li>Exploring individual life experiences</li>
                <li>Understanding the essence of specific phenomena</li>
                <li>Studying consciousness and perception processes</li>
            </ul>
            
            <h3>2. Grounded Theory</h3>
            <p>Grounded theory inductively develops theory from data through systematic data collection and analysis.</p>
            <h4>Core Features:</h4>
            <ul>
                <li>Theory emerges "grounded" in data</li>
                <li>Uses constant comparative analysis</li>
                <li>Theoretical saturation is the criterion for stopping data collection</li>
            </ul>
            
            <h3>3. Case Study</h3>
            <p>Case study involves in-depth analysis of one or more cases to understand complex social phenomena.</p>
            <h4>Types:</h4>
            <ul>
                <li>Single case study</li>
                <li>Multiple case study</li>
                <li>Embedded case study</li>
            </ul>
            
            <h2>Data Collection Methods</h2>
            
            <h3>In-depth Interviews</h3>
            <p>Conducting deep conversations with participants through open-ended questions to obtain rich subjective experience data.</p>
            
            <h3>Participant Observation</h3>
            <p>Researchers immerse themselves in the research context, observing and recording naturally occurring behaviors and interactions.</p>
            
            <h3>Focus Groups</h3>
            <p>Organizing group discussions to obtain collective viewpoints and consensus through group interaction.</p>
            
            <h2>Data Analysis Strategies</h2>
            
            <h3>Thematic Analysis</h3>
            <p>Identifying, analyzing, and reporting patterns (themes) in data.</p>
            
            <h3>Content Analysis</h3>
            <p>Systematically analyzing text content to identify specific words, themes, or concepts.</p>
            
            <h3>Narrative Analysis</h3>
            <p>Analyzing the structure and meaning of stories told by individuals or groups.</p>
            
            <h2>Quality Assurance Strategies</h2>
            
            <h3>Credibility</h3>
            <ul>
                <li>Triangulation</li>
                <li>Member checking</li>
                <li>Peer review</li>
            </ul>
            
            <h3>Transferability</h3>
            <ul>
                <li>Detailed description of research context</li>
                <li>Providing rich case descriptions</li>
            </ul>
            
            <h3>Dependability</h3>
            <ul>
                <li>Detailed recording of research process</li>
                <li>Establishing audit trail</li>
            </ul>
            
            <h2>Practical Recommendations</h2>
            
            <h3>Research Design Phase</h3>
            <ol>
                <li>Clarify research questions and objectives</li>
                <li>Select appropriate research methods</li>
                <li>Develop data collection plan</li>
                <li>Consider ethical issues</li>
            </ol>
            
            <h3>Data Collection Phase</h3>
            <ol>
                <li>Establish good research relationships</li>
                <li>Maintain open and sensitive attitude</li>
                <li>Record and organize data promptly</li>
                <li>Pay attention to data saturation point</li>
            </ol>
            
            <h3>Data Analysis Phase</h3>
            <ol>
                <li>Repeatedly read and familiarize with data</li>
                <li>Systematic coding and categorization</li>
                <li>Look for patterns and themes</li>
                <li>Verify and refine analysis results</li>
            </ol>
            
            <h2>Common Challenges and Solutions</h2>
            
            <h3>Subjectivity Issues</h3>
            <p><strong>Challenge:</strong> Researcher subjectivity may affect data collection and analysis</p>
            <p><strong>Solution:</strong> Maintain reflexivity, use multiple validation strategies</p>
            
            <h3>Large Data Volume</h3>
            <p><strong>Challenge:</strong> Qualitative data is usually large and complex</p>
            <p><strong>Solution:</strong> Use qualitative data analysis software, establish systematic coding system</p>
            
            <h3>Generalization Issues</h3>
            <p><strong>Challenge:</strong> Limited generalizability of qualitative research results</p>
            <p><strong>Solution:</strong> Focus on theoretical rather than statistical generalization, provide detailed contextual descriptions</p>
            
            <h2>Summary</h2>
            <p>Qualitative research provides us with powerful tools for deeply understanding complex social phenomena. Through selecting appropriate methods, rigorous data collection and analysis processes, and effective quality assurance strategies, qualitative research can generate valuable insights and theoretical contributions.</p>
        `
    },
    3: {
        title: "2024年AI学术写作完全指南",
        titleEn: "Complete Guide to AI Academic Writing in 2024",
        excerpt: "探索人工智能如何革命性地改变学术写作流程，从文献综述到论文撰写的全方位指导。",
        excerptEn: "Explore how artificial intelligence is revolutionizing academic writing processes, from literature reviews to comprehensive paper writing guidance.",
        category: "ai-tools",
        categoryName: "AI工具",
        categoryNameEn: "AI Tools",
        author: "Dr. 王教授",
        authorEn: "Dr. Wang Professor",
        authorTitle: "AI研究专家",
        authorTitleEn: "AI Research Expert",
        date: "2024-01-20",
        readTime: "12分钟",
        readTimeEn: "12 min read",
        tags: ["AI写作", "学术写作", "人工智能", "写作工具", "研究方法"],
        tagsEn: ["AI Writing", "Academic Writing", "Artificial Intelligence", "Writing Tools", "Research Methods"],
        content: `
            <h2>AI学术写作的新时代</h2>
            <p>2024年，人工智能技术在学术写作领域的应用已经达到了前所未有的高度。从ChatGPT到专业的学术写作AI工具，研究者们现在拥有了强大的助手来提升写作效率和质量。</p>
            
            <h2>主要AI写作工具概览</h2>
            
            <h3>1. 通用AI助手</h3>
            <h4>ChatGPT</h4>
            <ul>
                <li><strong>优势：</strong>强大的语言理解和生成能力</li>
                <li><strong>适用场景：</strong>头脑风暴、大纲制作、初稿撰写</li>
                <li><strong>注意事项：</strong>需要人工验证事实准确性</li>
            </ul>
            
            <h4>Claude</h4>
            <ul>
                <li><strong>优势：</strong>更好的逻辑推理和长文本处理</li>
                <li><strong>适用场景：</strong>复杂论证、文献分析</li>
                <li><strong>特点：</strong>更注重安全性和准确性</li>
            </ul>
            
            <h3>2. 专业学术工具</h3>
            <h4>Grammarly</h4>
            <ul>
                <li><strong>功能：</strong>语法检查、风格优化</li>
                <li><strong>学术版特色：</strong>学术写作风格建议</li>
                <li><strong>集成性：</strong>支持多种写作平台</li>
            </ul>
            
            <h4>Writefull</h4>
            <ul>
                <li><strong>专业性：</strong>专为学术写作设计</li>
                <li><strong>数据基础：</strong>基于数百万篇学术论文</li>
                <li><strong>功能：</strong>语言使用频率分析、句式建议</li>
            </ul>
            
            <h2>AI辅助学术写作流程</h2>
            
            <h3>第一阶段：研究准备</h3>
            <h4>1. 文献搜索与筛选</h4>
            <p>使用AI工具快速筛选相关文献：</p>
            <ul>
                <li>利用语义搜索找到相关研究</li>
                <li>AI摘要生成快速了解文献内容</li>
                <li>自动分类和标签管理</li>
            </ul>
            
            <h4>2. 研究问题精炼</h4>
            <blockquote>
                <p><strong>AI提示示例：</strong>"基于以下文献综述，帮我精炼研究问题，确保其具有创新性和可行性：[插入文献综述]"</p>
            </blockquote>
            
            <h3>第二阶段：写作规划</h3>
            <h4>1. 大纲生成</h4>
            <p>AI可以帮助创建结构化的论文大纲：</p>
            <div class="code-block">
                <h5>提示模板：</h5>
                <p>"请为关于[研究主题]的学术论文创建详细大纲，包括：<br>
                - 引言部分的逻辑结构<br>
                - 文献综述的组织方式<br>
                - 方法论部分的关键要素<br>
                - 结果展示的最佳实践<br>
                - 讨论部分的论证逻辑"</p>
            </div>
            
            <h4>2. 时间管理</h4>
            <p>AI可以帮助制定写作时间表，根据论文复杂度和个人写作习惯优化进度安排。</p>
            
            <h3>第三阶段：内容创作</h3>
            <h4>1. 引言撰写</h4>
            <p>AI辅助引言写作的最佳实践：</p>
            <ul>
                <li><strong>背景介绍：</strong>AI帮助梳理研究背景的逻辑层次</li>
                <li><strong>文献缺口：</strong>识别现有研究的不足之处</li>
                <li><strong>研究贡献：</strong>清晰表达研究的创新点</li>
            </ul>
            
            <h4>2. 方法论部分</h4>
            <p>AI在方法论写作中的应用：</p>
            <ul>
                <li>标准化方法描述的生成</li>
                <li>统计方法选择的建议</li>
                <li>伦理考量的完整性检查</li>
            </ul>
            
            <h4>3. 结果与讨论</h4>
            <p>AI辅助数据解释和讨论：</p>
            <ul>
                <li>数据可视化建议</li>
                <li>统计结果的学术表达</li>
                <li>结果与理论的关联分析</li>
            </ul>
            
            <h2>AI写作的质量控制</h2>
            
            <h3>1. 事实核查</h3>
            <div class="warning-box">
                <h4>⚠️ 重要提醒</h4>
                <p>AI生成的内容必须进行严格的事实核查。AI可能会产生看似合理但实际错误的信息。</p>
            </div>
            
            <h3>2. 原创性保证</h3>
            <ul>
                <li>使用查重工具检测相似度</li>
                <li>确保AI辅助不等于抄袭</li>
                <li>保持个人学术声音和观点</li>
            </ul>
            
            <h3>3. 学术诚信</h3>
            <p>在使用AI工具时应遵循的原则：</p>
            <ul>
                <li>透明披露AI工具的使用</li>
                <li>保持批判性思维</li>
                <li>确保最终内容的学术责任</li>
            </ul>
            
            <h2>高效AI写作技巧</h2>
            
            <h3>1. 提示工程（Prompt Engineering）</h3>
            <h4>有效提示的特征：</h4>
            <ul>
                <li><strong>具体性：</strong>提供详细的背景信息</li>
                <li><strong>结构化：</strong>使用清晰的格式要求</li>
                <li><strong>示例导向：</strong>提供期望输出的样例</li>
            </ul>
            
            <h4>提示模板库：</h4>
            <div class="template-box">
                <h5>文献综述提示：</h5>
                <p>"请基于以下文献列表，撰写一个关于[主题]的文献综述段落，要求：<br>
                1. 按时间顺序组织<br>
                2. 突出研究发展趋势<br>
                3. 识别研究缺口<br>
                4. 使用学术写作风格"</p>
            </div>
            
            <h3>2. 迭代优化</h3>
            <p>AI写作是一个迭代过程：</p>
            <ol>
                <li>初始生成</li>
                <li>人工审查和修改</li>
                <li>AI进一步优化</li>
                <li>最终人工校对</li>
            </ol>
            
            <h2>未来展望</h2>
            
            <h3>技术发展趋势</h3>
            <ul>
                <li><strong>多模态AI：</strong>整合文本、图像、数据的综合分析</li>
                <li><strong>个性化助手：</strong>根据个人写作风格定制的AI工具</li>
                <li><strong>实时协作：</strong>AI与人类的无缝协作写作</li>
            </ul>
            
            <h3>挑战与机遇</h3>
            <ul>
                <li><strong>挑战：</strong>学术诚信、质量控制、技能依赖</li>
                <li><strong>机遇：</strong>效率提升、创新思维、全球化合作</li>
            </ul>
            
            <h2>实用工具推荐</h2>
            
            <h3>免费工具</h3>
            <ul>
                <li><strong>ChatGPT：</strong>通用AI写作助手</li>
                <li><strong>Google Scholar：</strong>AI增强的文献搜索</li>
                <li><strong>Zotero：</strong>文献管理（部分AI功能）</li>
            </ul>
            
            <h3>付费工具</h3>
            <ul>
                <li><strong>Grammarly Premium：</strong>高级语法和风格检查</li>
                <li><strong>Writefull：</strong>专业学术写作助手</li>
                <li><strong>Notion AI：</strong>集成写作和项目管理</li>
            </ul>
            
            <h2>总结</h2>
            <p>AI学术写作工具为研究者提供了前所未有的机会来提升写作效率和质量。然而，成功的关键在于理解这些工具的能力和局限性，并将其作为增强而非替代人类智慧的手段。通过合理使用AI工具，研究者可以将更多精力投入到创新思考和深度分析中，从而产出更高质量的学术成果。</p>

            <div class="call-to-action">
                <h3>开始您的AI写作之旅</h3>
                <p>探索我们的AI写作工具，体验智能化学术写作的强大功能。</p>
                <a href="../ai-writing-tools.html" class="cta-button">立即体验</a>
            </div>
        `,
        contentEn: `
            <h2>The New Era of AI Academic Writing</h2>
            <p>In 2024, the application of artificial intelligence technology in academic writing has reached unprecedented heights. From ChatGPT to professional academic writing AI tools, researchers now have powerful assistants to enhance writing efficiency and quality.</p>
            
            <h2>Overview of Major AI Writing Tools</h2>
            
            <h3>1. General AI Assistants</h3>
            <h4>ChatGPT</h4>
            <ul>
                <li><strong>Advantages:</strong> Powerful language understanding and generation capabilities</li>
                <li><strong>Use cases:</strong> Brainstorming, outline creation, draft writing</li>
                <li><strong>Considerations:</strong> Requires manual fact verification</li>
            </ul>
            
            <h4>Claude</h4>
            <ul>
                <li><strong>Advantages:</strong> Better logical reasoning and long-text processing</li>
                <li><strong>Use cases:</strong> Complex argumentation, literature analysis</li>
                <li><strong>Features:</strong> Greater emphasis on safety and accuracy</li>
            </ul>
            
            <h3>2. Professional Academic Tools</h3>
            <h4>Grammarly</h4>
            <ul>
                <li><strong>Functions:</strong> Grammar checking, style optimization</li>
                <li><strong>Academic features:</strong> Academic writing style suggestions</li>
                <li><strong>Integration:</strong> Supports multiple writing platforms</li>
            </ul>
            
            <h4>Writefull</h4>
            <ul>
                <li><strong>Specialization:</strong> Designed specifically for academic writing</li>
                <li><strong>Data foundation:</strong> Based on millions of academic papers</li>
                <li><strong>Functions:</strong> Language usage frequency analysis, sentence suggestions</li>
            </ul>
            
            <h2>AI-Assisted Academic Writing Process</h2>
            
            <h3>Phase 1: Research Preparation</h3>
            <h4>1. Literature Search and Screening</h4>
            <p>Use AI tools to quickly screen relevant literature:</p>
            <ul>
                <li>Use semantic search to find relevant research</li>
                <li>AI summary generation for quick literature understanding</li>
                <li>Automatic classification and tag management</li>
            </ul>
            
            <h4>2. Research Question Refinement</h4>
            <blockquote>
                <p><strong>AI Prompt Example:</strong>"Based on the following literature review, help me refine research questions to ensure innovation and feasibility: [Insert literature review]"</p>
            </blockquote>
            
            <h3>Phase 2: Writing Planning</h3>
            <h4>1. Outline Generation</h4>
            <p>AI can help create structured paper outlines:</p>
            <div class="code-block">
                <h5>Prompt Template:</h5>
                <p>"Please create a detailed outline for an academic paper on [research topic], including:<br>
                - Logical structure of the introduction<br>
                - Organization of literature review<br>
                - Key elements of methodology section<br>
                - Best practices for results presentation<br>
                - Argumentation logic for discussion section"</p>
            </div>
            
            <h4>2. Time Management</h4>
            <p>AI can help create writing schedules, optimizing progress based on paper complexity and personal writing habits.</p>
            
            <h3>Phase 3: Content Creation</h3>
            <h4>1. Introduction Writing</h4>
            <p>Best practices for AI-assisted introduction writing:</p>
            <ul>
                <li><strong>Background introduction:</strong> AI helps organize logical layers of research background</li>
                <li><strong>Literature gaps:</strong> Identify shortcomings in existing research</li>
                <li><strong>Research contributions:</strong> Clearly express research innovations</li>
            </ul>
            
            <h4>2. Methodology Section</h4>
            <p>AI applications in methodology writing:</p>
            <ul>
                <li>Generation of standardized method descriptions</li>
                <li>Suggestions for statistical method selection</li>
                <li>Completeness check for ethical considerations</li>
            </ul>
            
            <h4>3. Results and Discussion</h4>
            <p>AI-assisted data interpretation and discussion:</p>
            <ul>
                <li>Data visualization suggestions</li>
                <li>Academic expression of statistical results</li>
                <li>Analysis of connections between results and theory</li>
            </ul>
            
            <h2>Quality Control in AI Writing</h2>
            
            <h3>1. Fact Checking</h3>
            <div class="warning-box">
                <h4>⚠️ Important Reminder</h4>
                <p>AI-generated content must undergo strict fact-checking. AI may produce seemingly reasonable but actually incorrect information.</p>
            </div>
            
            <h3>2. Originality Assurance</h3>
            <ul>
                <li>Use plagiarism detection tools to check similarity</li>
                <li>Ensure AI assistance doesn't equal plagiarism</li>
                <li>Maintain personal academic voice and viewpoints</li>
            </ul>
            
            <h3>3. Academic Integrity</h3>
            <p>Principles to follow when using AI tools:</p>
            <ul>
                <li>Transparently disclose AI tool usage</li>
                <li>Maintain critical thinking</li>
                <li>Ensure academic responsibility for final content</li>
            </ul>
            
            <h2>Efficient AI Writing Techniques</h2>
            
            <h3>1. Prompt Engineering</h3>
            <h4>Characteristics of effective prompts:</h4>
            <ul>
                <li><strong>Specificity:</strong> Provide detailed background information</li>
                <li><strong>Structure:</strong> Use clear format requirements</li>
                <li><strong>Example-driven:</strong> Provide samples of expected output</li>
            </ul>
            
            <h4>Prompt Template Library:</h4>
            <div class="template-box">
                <h5>Literature Review Prompt:</h5>
                <p>"Please write a literature review paragraph on [topic] based on the following literature list, requirements:<br>
                1. Organize chronologically<br>
                2. Highlight research development trends<br>
                3. Identify research gaps<br>
                4. Use academic writing style"</p>
            </div>
            
            <h3>2. Iterative Optimization</h3>
            <p>AI writing is an iterative process:</p>
            <ol>
                <li>Initial generation</li>
                <li>Manual review and modification</li>
                <li>AI further optimization</li>
                <li>Final manual proofreading</li>
            </ol>
            
            <h2>Future Prospects</h2>
            
            <h3>Technology Development Trends</h3>
            <ul>
                <li><strong>Multimodal AI:</strong> Integrated analysis of text, images, and data</li>
                <li><strong>Personalized assistants:</strong> AI tools customized to individual writing styles</li>
                <li><strong>Real-time collaboration:</strong> Seamless collaborative writing between AI and humans</li>
            </ul>
            
            <h3>Challenges and Opportunities</h3>
            <ul>
                <li><strong>Challenges:</strong> Academic integrity, quality control, skill dependency</li>
                <li><strong>Opportunities:</strong> Efficiency improvement, innovative thinking, global collaboration</li>
            </ul>
            
            <h2>Practical Tool Recommendations</h2>
            
            <h3>Free Tools</h3>
            <ul>
                <li><strong>ChatGPT:</strong> General AI writing assistant</li>
                <li><strong>Google Scholar:</strong> AI-enhanced literature search</li>
                <li><strong>Zotero:</strong> Reference management (partial AI features)</li>
            </ul>
            
            <h3>Paid Tools</h3>
            <ul>
                <li><strong>Grammarly Premium:</strong> Advanced grammar and style checking</li>
                <li><strong>Writefull:</strong> Professional academic writing assistant</li>
                <li><strong>Notion AI:</strong> Integrated writing and project management</li>
            </ul>
            
            <h2>Summary</h2>
            <p>AI academic writing tools provide researchers with unprecedented opportunities to enhance writing efficiency and quality. However, the key to success lies in understanding the capabilities and limitations of these tools and using them as enhancements rather than replacements for human intelligence. By properly using AI tools, researchers can devote more energy to innovative thinking and in-depth analysis, thereby producing higher-quality academic achievements.</p>

            <div class="call-to-action">
                <h3>Start Your AI Writing Journey</h3>
                <p>Explore our AI writing tools and experience the powerful features of intelligent academic writing.</p>
                <a href="../ai-writing-tools.html" class="cta-button">Try Now</a>
            </div>
        `
     },
    3: {
        title: "定性研究方法：从理论到实践",
        titleEn: "Qualitative Research Methods: From Theory to Practice",
        excerpt: "深入探讨定性研究的核心方法论，包括现象学、扎根理论、案例研究等方法的应用场景、数据收集技巧和分析策略。",
        excerptEn: "In-depth exploration of core qualitative research methodologies, including phenomenology, grounded theory, case studies, and their applications, data collection techniques, and analysis strategies.",
        category: "research-methods",
        categoryName: "研究方法",
        categoryNameEn: "Research Methods",
        author: "Dr. 李研究员",
        authorEn: "Dr. Li Researcher",
        authorTitle: "定性研究专家",
        authorTitleEn: "Qualitative Research Expert",
        date: "2024-01-12",
        readTime: "8分钟",
        readTimeEn: "8 min read",
        tags: ["定性研究", "现象学", "扎根理论", "案例研究", "研究方法"],
        tagsEn: ["Qualitative Research", "Phenomenology", "Grounded Theory", "Case Study", "Research Methods"],
        content: `
            <h2>什么是定性研究？</h2>
            <p>定性研究是一种探索性的研究方法，旨在深入理解人类行为、经验和社会现象的复杂性。与定量研究不同，定性研究关注的是"为什么"和"如何"的问题，而不是"多少"的问题。</p>
            
            <h2>主要定性研究方法</h2>
            
            <h3>1. 现象学研究</h3>
            <p>现象学研究关注个体对特定现象的主观体验和意义建构。</p>
            
            <h4>适用场景：</h4>
            <ul>
                <li>探索个体的生活体验</li>
                <li>理解特定现象的本质</li>
                <li>研究意识和感知过程</li>
            </ul>
            
            <h4>数据收集方法：</h4>
            <ul>
                <li>深度访谈</li>
                <li>参与观察</li>
                <li>日记分析</li>
            </ul>
            
            <h3>2. 扎根理论</h3>
            <p>扎根理论是一种系统的定性研究方法，旨在从数据中发现和构建理论。</p>
            
            <h4>核心特点：</h4>
            <ul>
                <li>理论从数据中"扎根"产生</li>
                <li>采用持续比较分析</li>
                <li>理论饱和为停止标准</li>
            </ul>
            
            <h4>分析步骤：</h4>
            <ol>
                <li>开放性编码</li>
                <li>轴心编码</li>
                <li>选择性编码</li>
            </ol>
            
            <h3>3. 案例研究</h3>
            <p>案例研究是对一个或多个案例进行深入、全面分析的研究方法。</p>
            
            <h4>案例研究类型：</h4>
            <ul>
                <li><strong>单案例研究：</strong>深入分析单一案例</li>
                <li><strong>多案例研究：</strong>比较分析多个案例</li>
                <li><strong>嵌入式案例研究：</strong>案例内包含多个分析单位</li>
            </ul>
            
            <h2>数据收集技巧</h2>
            
            <h3>1. 深度访谈</h3>
            <h4>访谈准备：</h4>
            <ul>
                <li>制定访谈大纲</li>
                <li>选择合适的访谈环境</li>
                <li>建立信任关系</li>
            </ul>
            
            <h4>访谈技巧：</h4>
            <div class="tips-box">
                <h5>💡 实用技巧</h5>
                <ul>
                    <li>使用开放性问题</li>
                    <li>适时追问和澄清</li>
                    <li>保持中立态度</li>
                    <li>注意非语言信息</li>
                </ul>
            </div>
            
            <h3>2. 参与观察</h3>
            <p>参与观察是研究者深入研究情境，通过直接观察和参与来收集数据的方法。</p>
            
            <h4>观察层次：</h4>
            <ul>
                <li><strong>完全参与者：</strong>研究者完全融入研究情境</li>
                <li><strong>参与观察者：</strong>既参与又保持观察者身份</li>
                <li><strong>观察参与者：</strong>主要观察，适度参与</li>
                <li><strong>完全观察者：</strong>纯粹观察，不参与活动</li>
            </ul>
            
            <h2>数据分析策略</h2>
            
            <h3>1. 主题分析</h3>
            <p>主题分析是识别、分析和报告数据中模式（主题）的方法。</p>
            
            <h4>分析步骤：</h4>
            <ol>
                <li>熟悉数据</li>
                <li>生成初始编码</li>
                <li>搜索主题</li>
                <li>审查主题</li>
                <li>定义和命名主题</li>
                <li>撰写报告</li>
            </ol>
            
            <h3>2. 内容分析</h3>
            <p>内容分析是对文本内容进行系统、客观分析的研究方法。</p>
            
            <h4>分析类型：</h4>
            <ul>
                <li><strong>传统内容分析：</strong>从数据中归纳出类别</li>
                <li><strong>定向内容分析：</strong>基于理论框架分析</li>
                <li><strong>总结内容分析：</strong>压缩数据保留核心信息</li>
            </ul>
            
            <h2>质量保证策略</h2>
            
            <h3>1. 可信度（Credibility）</h3>
            <ul>
                <li>三角验证法</li>
                <li>成员检验</li>
                <li>同行审查</li>
                <li>持续观察</li>
            </ul>
            
            <h3>2. 可转移性（Transferability）</h3>
            <ul>
                <li>详细描述研究情境</li>
                <li>提供丰富的数据</li>
                <li>明确研究边界</li>
            </ul>
            
            <h3>3. 可依赖性（Dependability）</h3>
            <ul>
                <li>详细记录研究过程</li>
                <li>建立审计轨迹</li>
                <li>使用多种数据来源</li>
            </ul>
            
            <h2>常见挑战与应对</h2>
            
            <h3>1. 研究者偏见</h3>
            <div class="challenge-box">
                <h4>挑战：</h4>
                <p>研究者的主观性可能影响数据收集和分析</p>
                <h4>应对策略：</h4>
                <ul>
                    <li>反思性日记</li>
                    <li>同行讨论</li>
                    <li>多重编码</li>
                </ul>
            </div>
            
            <h3>2. 数据饱和</h3>
            <div class="challenge-box">
                <h4>挑战：</h4>
                <p>如何判断数据收集的充分性</p>
                <h4>应对策略：</h4>
                <ul>
                    <li>理论饱和标准</li>
                    <li>数据三角验证</li>
                    <li>持续比较分析</li>
                </ul>
            </div>
            
            <h2>软件工具推荐</h2>
            
            <h3>1. NVivo</h3>
            <ul>
                <li>强大的编码功能</li>
                <li>支持多种数据格式</li>
                <li>可视化分析工具</li>
            </ul>
            
            <h3>2. Atlas.ti</h3>
            <ul>
                <li>直观的用户界面</li>
                <li>网络视图功能</li>
                <li>团队协作支持</li>
            </ul>
            
            <h3>3. MAXQDA</h3>
            <ul>
                <li>混合方法研究支持</li>
                <li>统计分析集成</li>
                <li>多媒体数据处理</li>
            </ul>
            
            <h2>总结</h2>
            <p>定性研究方法为理解复杂的社会现象提供了强有力的工具。成功的定性研究需要研究者具备敏锐的观察力、深入的分析能力和严谨的研究态度。通过掌握这些方法和技巧，研究者可以产出有价值的研究成果，为理论发展和实践改进做出贡献。</p>
            
            <div class="call-to-action">
                <h3>深入学习定性研究</h3>
                <p>参加我们的定性研究方法工作坊，获得实践指导和专家建议。</p>
                <a href="../qualitative-research-workshop.html" class="cta-button">报名工作坊</a>
            </div>
        `,
        contentEn: `
            <h2>What is Qualitative Research?</h2>
            <p>Qualitative research is an exploratory research method aimed at deeply understanding the complexity of human behavior, experiences, and social phenomena. Unlike quantitative research, qualitative research focuses on "why" and "how" questions rather than "how much" questions.</p>
            
            <h2>Main Qualitative Research Methods</h2>
            
            <h3>1. Phenomenological Research</h3>
            <p>Phenomenological research focuses on individuals' subjective experiences and meaning construction of specific phenomena.</p>
            
            <h4>Application Scenarios:</h4>
            <ul>
                <li>Exploring individual life experiences</li>
                <li>Understanding the essence of specific phenomena</li>
                <li>Studying consciousness and perception processes</li>
            </ul>
            
            <h4>Data Collection Methods:</h4>
            <ul>
                <li>In-depth interviews</li>
                <li>Participant observation</li>
                <li>Diary analysis</li>
            </ul>
            
            <h3>2. Grounded Theory</h3>
            <p>Grounded theory is a systematic qualitative research method aimed at discovering and constructing theory from data.</p>
            
            <h4>Core Features:</h4>
            <ul>
                <li>Theory emerges "grounded" in data</li>
                <li>Uses constant comparative analysis</li>
                <li>Theoretical saturation as stopping criterion</li>
            </ul>
            
            <h4>Analysis Steps:</h4>
            <ol>
                <li>Open coding</li>
                <li>Axial coding</li>
                <li>Selective coding</li>
            </ol>
            
            <h3>3. Case Study</h3>
            <p>Case study is a research method that conducts in-depth, comprehensive analysis of one or more cases.</p>
            
            <h4>Types of Case Studies:</h4>
            <ul>
                <li><strong>Single case study:</strong> In-depth analysis of a single case</li>
                <li><strong>Multiple case study:</strong> Comparative analysis of multiple cases</li>
                <li><strong>Embedded case study:</strong> Cases containing multiple units of analysis</li>
            </ul>
            
            <h2>Data Collection Techniques</h2>
            
            <h3>1. In-depth Interviews</h3>
            <h4>Interview Preparation:</h4>
            <ul>
                <li>Develop interview guide</li>
                <li>Choose appropriate interview environment</li>
                <li>Build trust relationships</li>
            </ul>
            
            <h4>Interview Techniques:</h4>
            <div class="tips-box">
                <h5>💡 Practical Tips</h5>
                <ul>
                    <li>Use open-ended questions</li>
                    <li>Follow up and clarify appropriately</li>
                    <li>Maintain neutral attitude</li>
                    <li>Pay attention to non-verbal information</li>
                </ul>
            </div>
            
            <h3>2. Participant Observation</h3>
            <p>Participant observation is a method where researchers immerse themselves in the research setting, collecting data through direct observation and participation.</p>
            
            <h4>Observation Levels:</h4>
            <ul>
                <li><strong>Complete participant:</strong> Researcher fully integrates into research setting</li>
                <li><strong>Participant-observer:</strong> Both participates and maintains observer identity</li>
                <li><strong>Observer-participant:</strong> Primarily observes with moderate participation</li>
                <li><strong>Complete observer:</strong> Pure observation without participation</li>
            </ul>
            
            <h2>Data Analysis Strategies</h2>
            
            <h3>1. Thematic Analysis</h3>
            <p>Thematic analysis is a method for identifying, analyzing, and reporting patterns (themes) within data.</p>
            
            <h4>Analysis Steps:</h4>
            <ol>
                <li>Familiarize with data</li>
                <li>Generate initial codes</li>
                <li>Search for themes</li>
                <li>Review themes</li>
                <li>Define and name themes</li>
                <li>Write report</li>
            </ol>
            
            <h3>2. Content Analysis</h3>
            <p>Content analysis is a research method for systematic, objective analysis of text content.</p>
            
            <h4>Analysis Types:</h4>
            <ul>
                <li><strong>Conventional content analysis:</strong> Categories emerge from data</li>
                <li><strong>Directed content analysis:</strong> Analysis based on theoretical framework</li>
                <li><strong>Summative content analysis:</strong> Compress data while retaining core information</li>
            </ul>
            
            <h2>Quality Assurance Strategies</h2>
            
            <h3>1. Credibility</h3>
            <ul>
                <li>Triangulation</li>
                <li>Member checking</li>
                <li>Peer review</li>
                <li>Prolonged engagement</li>
            </ul>
            
            <h3>2. Transferability</h3>
            <ul>
                <li>Detailed description of research context</li>
                <li>Provide rich data</li>
                <li>Clarify research boundaries</li>
            </ul>
            
            <h3>3. Dependability</h3>
            <ul>
                <li>Detailed documentation of research process</li>
                <li>Establish audit trail</li>
                <li>Use multiple data sources</li>
            </ul>
            
            <h2>Common Challenges and Solutions</h2>
            
            <h3>1. Researcher Bias</h3>
            <div class="challenge-box">
                <h4>Challenge:</h4>
                <p>Researcher subjectivity may affect data collection and analysis</p>
                <h4>Solutions:</h4>
                <ul>
                    <li>Reflexive journaling</li>
                    <li>Peer discussion</li>
                    <li>Multiple coding</li>
                </ul>
            </div>
            
            <h3>2. Data Saturation</h3>
            <div class="challenge-box">
                <h4>Challenge:</h4>
                <p>How to determine adequacy of data collection</p>
                <h4>Solutions:</h4>
                <ul>
                    <li>Theoretical saturation criteria</li>
                    <li>Data triangulation</li>
                    <li>Constant comparative analysis</li>
                </ul>
            </div>
            
            <h2>Software Tool Recommendations</h2>
            
            <h3>1. NVivo</h3>
            <ul>
                <li>Powerful coding features</li>
                <li>Supports multiple data formats</li>
                <li>Visualization analysis tools</li>
            </ul>
            
            <h3>2. Atlas.ti</h3>
            <ul>
                <li>Intuitive user interface</li>
                <li>Network view functionality</li>
                <li>Team collaboration support</li>
            </ul>
            
            <h3>3. MAXQDA</h3>
            <ul>
                <li>Mixed methods research support</li>
                <li>Statistical analysis integration</li>
                <li>Multimedia data processing</li>
            </ul>
            
            <h2>Summary</h2>
            <p>Qualitative research methods provide powerful tools for understanding complex social phenomena. Successful qualitative research requires researchers to have keen observation skills, deep analytical abilities, and rigorous research attitudes. By mastering these methods and techniques, researchers can produce valuable research outcomes that contribute to theoretical development and practical improvement.</p>
            
            <div class="call-to-action">
                <h3>Deepen Your Qualitative Research Skills</h3>
                <p>Join our qualitative research methods workshop for practical guidance and expert advice.</p>
                <a href="../qualitative-research-workshop.html" class="cta-button">Register for Workshop</a>
            </div>
        `
     },
    // 可以继续添加更多文章数据
};

// 页面初始化
document.addEventListener('DOMContentLoaded', function() {
    initializeArticle();
});

// 初始化文章页面
function initializeArticle() {
    const urlParams = new URLSearchParams(window.location.search);
    const articleId = urlParams.get('id');
    
    let article = null;
    
    // 首先检查预定义的文章数据
    if (articleId && articleData[articleId]) {
        article = articleData[articleId];
    } else if (articleId) {
        // 检查用户发布的文章
        const userArticles = JSON.parse(localStorage.getItem('userArticles') || '[]');
        article = userArticles.find(a => a.id === articleId);
    }
    
    if (article) {
        loadArticle(article);
        generateTableOfContents();
        loadRelatedArticles(article.category, articleId);
        setupScrollSpy();
    } else {
        showArticleNotFound();
    }
}

// 加载文章内容
function loadArticle(article) {
    // 更新页面标题和元数据
    updatePageMetadata(article);
    
    // 更新文章头部信息
    updateArticleHeader(article);
    
    // 加载文章内容
    const contentWrapper = document.getElementById('articleContent');
    
    // 获取当前语言
    const currentLang = localStorage.getItem('language') || 'zh';
    
    // 根据语言选择内容，优先使用对应语言的内容
    let content = '';
    if (currentLang === 'en' && article.contentEn) {
        content = article.contentEn;
    } else if (currentLang === 'zh' && article.content) {
        content = article.content;
    } else {
        // 如果没有对应语言的内容，使用默认内容
        content = article.content || article.contentEn || '';
    }
    
    // 如果内容为空，显示默认消息
    if (!content) {
        content = '<p>文章内容正在加载中...</p>';
    }
    
    contentWrapper.innerHTML = content;
    
    // 更新文章标签
    updateArticleTags(article.tags || article.tagsEn || []);
    
    // 更新结构化数据
    updateStructuredData(article);
    
    // 添加代码高亮（如果需要）
    highlightCode();
    
    // 设置文章导航
    setupArticleNavigation(article);
}

// 更新页面元数据
function updatePageMetadata(article) {
    // 更新标题
    document.title = `${article.title} - AI学术写作助手`;
    document.getElementById('articleTitle').textContent = `${article.title} - AI学术写作助手`;
    
    // 更新描述
    const description = article.excerpt;
    document.getElementById('articleDescription').setAttribute('content', description);
    
    // 更新关键词
    const keywords = article.tags.join(',') + ',学术写作,AI工具';
    document.getElementById('articleKeywords').setAttribute('content', keywords);
    
    // 更新Open Graph标签
    document.getElementById('ogTitle').setAttribute('content', article.title);
    document.getElementById('ogDescription').setAttribute('content', description);
    document.getElementById('ogUrl').setAttribute('content', window.location.href);
    
    // 更新Twitter Card
    document.getElementById('twitterTitle').setAttribute('content', article.title);
    document.getElementById('twitterDescription').setAttribute('content', description);
}

// 更新文章头部信息
function updateArticleHeader(article) {
    document.getElementById('breadcrumbCategory').textContent = article.categoryName;
    document.getElementById('articleCategory').textContent = article.categoryName;
    document.getElementById('articleDate').innerHTML = `<i class="fas fa-calendar"></i> ${formatDate(article.date)}`;
    document.getElementById('articleReadTime').innerHTML = `<i class="fas fa-clock"></i> ${article.readTime}`;
    document.getElementById('mainTitle').textContent = article.title;
    document.getElementById('mainExcerpt').textContent = article.excerpt;
    document.getElementById('authorName').textContent = article.author;
    document.getElementById('authorTitle').textContent = article.authorTitle;
}

// 更新文章标签
function updateArticleTags(tags) {
    const tagsContainer = document.getElementById('articleTags');
    tagsContainer.innerHTML = '<h4>标签：</h4>';
    
    const tagsList = document.createElement('div');
    tagsList.className = 'tags-list';
    
    tags.forEach(tag => {
        const tagElement = document.createElement('span');
        tagElement.className = 'tag';
        tagElement.textContent = tag;
        tagElement.onclick = () => searchByTag(tag);
        tagsList.appendChild(tagElement);
    });
    
    tagsContainer.appendChild(tagsList);
}

// 生成目录
function generateTableOfContents() {
    const contentWrapper = document.getElementById('articleContent');
    const headings = contentWrapper.querySelectorAll('h2, h3, h4');
    const tocContainer = document.getElementById('tableOfContents');
    
    if (headings.length === 0) {
        tocContainer.innerHTML = '<p>本文暂无目录</p>';
        return;
    }
    
    const tocList = document.createElement('ul');
    tocList.className = 'toc-list';
    
    headings.forEach((heading, index) => {
        // 为标题添加ID
        const headingId = `heading-${index}`;
        heading.id = headingId;
        
        // 创建目录项
        const tocItem = document.createElement('li');
        tocItem.className = `toc-item toc-${heading.tagName.toLowerCase()}`;
        
        const tocLink = document.createElement('a');
        tocLink.href = `#${headingId}`;
        tocLink.textContent = heading.textContent;
        tocLink.onclick = (e) => {
            e.preventDefault();
            scrollToHeading(headingId);
        };
        
        tocItem.appendChild(tocLink);
        tocList.appendChild(tocItem);
    });
    
    tocContainer.appendChild(tocList);
}

// 滚动到指定标题
function scrollToHeading(headingId) {
    const heading = document.getElementById(headingId);
    if (heading) {
        heading.scrollIntoView({ behavior: 'smooth', block: 'start' });
        
        // 更新活跃状态
        const tocLinks = document.querySelectorAll('.toc-list a');
        tocLinks.forEach(link => link.classList.remove('active'));
        
        const activeLink = document.querySelector(`a[href="#${headingId}"]`);
        if (activeLink) {
            activeLink.classList.add('active');
        }
    }
}

// 设置滚动监听
function setupScrollSpy() {
    const headings = document.querySelectorAll('#articleContent h2, #articleContent h3, #articleContent h4');
    const tocLinks = document.querySelectorAll('.toc-list a');
    
    if (headings.length === 0) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const headingId = entry.target.id;
                
                // 移除所有活跃状态
                tocLinks.forEach(link => link.classList.remove('active'));
                
                // 添加当前活跃状态
                const activeLink = document.querySelector(`a[href="#${headingId}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    }, {
        rootMargin: '-20% 0px -70% 0px'
    });
    
    headings.forEach(heading => observer.observe(heading));
}

// 加载相关文章
function loadRelatedArticles(category, currentId) {
    const relatedContainer = document.getElementById('relatedArticles');
    
    // 从articleData中筛选相关文章
    const relatedArticles = Object.entries(articleData)
        .filter(([id, article]) => id !== currentId && article.category === category)
        .slice(0, 3)
        .map(([id, article]) => ({ id, ...article }));
    
    if (relatedArticles.length === 0) {
        relatedContainer.innerHTML = '<p>暂无相关文章</p>';
        return;
    }
    
    const relatedList = document.createElement('div');
    relatedList.className = 'related-list';
    
    relatedArticles.forEach(article => {
        const relatedItem = document.createElement('div');
        relatedItem.className = 'related-item';
        relatedItem.onclick = () => window.location.href = `article.html?id=${article.id}`;
        
        relatedItem.innerHTML = `
            <h5 class="related-title">${article.title}</h5>
            <div class="related-meta">
                <span class="related-date">${formatDate(article.date)}</span>
                <span class="related-read-time">${article.readTime}</span>
            </div>
        `;
        
        relatedList.appendChild(relatedItem);
    });
    
    relatedContainer.appendChild(relatedList);
}

// 设置文章导航
function setupArticleNavigation(currentArticle) {
    const allArticleIds = Object.keys(articleData).sort((a, b) => {
        return new Date(articleData[b].date) - new Date(articleData[a].date);
    });
    
    const currentIndex = allArticleIds.findIndex(id => 
        articleData[id].title === currentArticle.title
    );
    
    const prevArticleElement = document.getElementById('prevArticle');
    const nextArticleElement = document.getElementById('nextArticle');
    
    // 设置上一篇文章
    if (currentIndex > 0) {
        const prevArticle = articleData[allArticleIds[currentIndex - 1]];
        prevArticleElement.style.display = 'block';
        prevArticleElement.onclick = () => window.location.href = `article.html?id=${allArticleIds[currentIndex - 1]}`;
        prevArticleElement.querySelector('.nav-title').textContent = prevArticle.title;
    } else {
        prevArticleElement.style.display = 'none';
    }
    
    // 设置下一篇文章
    if (currentIndex < allArticleIds.length - 1) {
        const nextArticle = articleData[allArticleIds[currentIndex + 1]];
        nextArticleElement.style.display = 'block';
        nextArticleElement.onclick = () => window.location.href = `article.html?id=${allArticleIds[currentIndex + 1]}`;
        nextArticleElement.querySelector('.nav-title').textContent = nextArticle.title;
    } else {
        nextArticleElement.style.display = 'none';
    }
}

// 更新结构化数据
function updateStructuredData(article) {
    const structuredData = {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": article.title,
        "description": article.excerpt,
        "author": {
            "@type": "Person",
            "name": article.author
        },
        "publisher": {
            "@type": "Organization",
            "name": "AI学术写作助手",
            "logo": {
                "@type": "ImageObject",
                "url": "https://aigrantwriter.xyz/logo.svg"
            }
        },
        "datePublished": article.date,
        "dateModified": article.date,
        "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": window.location.href
        }
    },
    4: {
        title: {
            zh: "顶级学术数据库使用指南",
            en: "Guide to Top Academic Databases"
        },
        excerpt: {
            zh: "详细介绍Web of Science、Scopus、PubMed等主流学术数据库的使用方法，帮助研究者高效检索文献。",
            en: "Detailed introduction to using mainstream academic databases like Web of Science, Scopus, PubMed, helping researchers efficiently search literature."
        },
        category: "academic-resources",
        categoryName: {
            zh: "学术资源",
            en: "Academic Resources"
        },
        author: {
            zh: "Dr. 李信息专家",
            en: "Dr. Li Information Expert"
        },
        date: "2024-01-08",
        readTime: {
            zh: "8分钟",
            en: "8 min read"
        },
        tags: ["学术数据库", "文献检索", "研究工具", "Academic Database", "Literature Search", "Research Tools"],
        content: {
            zh: `
                <h2>学术数据库概述</h2>
                <p>学术数据库是现代学术研究的重要基础设施，为研究者提供了海量的学术文献资源。本文将详细介绍几个最重要的学术数据库及其使用方法。</p>
                
                <h3>Web of Science</h3>
                <p>Web of Science是全球最权威的学术数据库之一，收录了高质量的学术期刊文章。其特色功能包括：</p>
                <ul>
                    <li>引文分析功能</li>
                    <li>影响因子查询</li>
                    <li>研究热点追踪</li>
                    <li>作者合作网络分析</li>
                </ul>
                
                <h3>Scopus数据库</h3>
                <p>Scopus是Elsevier出版社推出的综合性学术数据库，覆盖面广，更新及时。主要特点：</p>
                <ul>
                    <li>多学科覆盖</li>
                    <li>实时更新</li>
                    <li>强大的分析工具</li>
                    <li>开放获取资源标识</li>
                </ul>
                
                <h3>PubMed医学数据库</h3>
                <p>PubMed是生物医学领域最重要的数据库，由美国国立医学图书馆维护。特色功能：</p>
                <ul>
                    <li>MeSH主题词检索</li>
                    <li>临床试验数据</li>
                    <li>免费全文链接</li>
                    <li>相关文章推荐</li>
                </ul>
                
                <h3>检索策略与技巧</h3>
                <p>有效的检索策略是获得高质量文献的关键：</p>
                <ol>
                    <li>明确研究问题和关键词</li>
                    <li>使用布尔逻辑操作符</li>
                    <li>设置合适的时间范围</li>
                    <li>利用高级检索功能</li>
                    <li>定期更新检索策略</li>
                </ol>
                
                <h3>文献管理建议</h3>
                <p>建立良好的文献管理习惯对研究工作至关重要：</p>
                <ul>
                    <li>使用文献管理软件（如EndNote、Zotero）</li>
                    <li>建立分类标签系统</li>
                    <li>定期备份文献库</li>
                    <li>记录检索历史</li>
                </ul>
            `,
            en: `
                <h2>Overview of Academic Databases</h2>
                <p>Academic databases are essential infrastructure for modern academic research, providing researchers with vast academic literature resources. This article will detail several of the most important academic databases and their usage methods.</p>
                
                <h3>Web of Science</h3>
                <p>Web of Science is one of the world's most authoritative academic databases, collecting high-quality academic journal articles. Its key features include:</p>
                <ul>
                    <li>Citation analysis functionality</li>
                    <li>Impact factor queries</li>
                    <li>Research hotspot tracking</li>
                    <li>Author collaboration network analysis</li>
                </ul>
                
                <h3>Scopus Database</h3>
                <p>Scopus is a comprehensive academic database launched by Elsevier, with broad coverage and timely updates. Main characteristics:</p>
                <ul>
                    <li>Multidisciplinary coverage</li>
                    <li>Real-time updates</li>
                    <li>Powerful analytical tools</li>
                    <li>Open access resource identification</li>
                </ul>
                
                <h3>PubMed Medical Database</h3>
                <p>PubMed is the most important database in the biomedical field, maintained by the U.S. National Library of Medicine. Special features:</p>
                <ul>
                    <li>MeSH subject heading search</li>
                    <li>Clinical trial data</li>
                    <li>Free full-text links</li>
                    <li>Related article recommendations</li>
                </ul>
                
                <h3>Search Strategies and Techniques</h3>
                <p>Effective search strategies are key to obtaining high-quality literature:</p>
                <ol>
                    <li>Clarify research questions and keywords</li>
                    <li>Use Boolean logic operators</li>
                    <li>Set appropriate time ranges</li>
                    <li>Utilize advanced search functions</li>
                    <li>Regularly update search strategies</li>
                </ol>
                
                <h3>Literature Management Recommendations</h3>
                <p>Establishing good literature management habits is crucial for research work:</p>
                <ul>
                    <li>Use reference management software (such as EndNote, Zotero)</li>
                    <li>Establish classification tag systems</li>
                    <li>Regularly backup literature libraries</li>
                    <li>Record search history</li>
                </ul>
            `
        }
    },
    5: {
        title: {
            zh: "SCI期刊投稿策略与技巧",
            en: "SCI Journal Submission Strategies and Techniques"
        },
        excerpt: {
            zh: "分享SCI期刊投稿的实用策略，包括期刊选择、稿件准备、投稿流程和审稿意见回复等关键环节。",
            en: "Share practical strategies for SCI journal submissions, including journal selection, manuscript preparation, submission process, and responding to reviewer comments."
        },
        category: "publication-guide",
        categoryName: {
            zh: "发表指南",
            en: "Publication Guide"
        },
        author: {
            zh: "Dr. 王发表专家",
            en: "Dr. Wang Publication Expert"
        },
        date: "2024-01-06",
        readTime: {
            zh: "10分钟",
            en: "10 min read"
        },
        tags: ["SCI期刊", "学术发表", "投稿策略", "SCI Journal", "Academic Publishing", "Submission Strategy"],
        content: {
            zh: `
                <h2>SCI期刊投稿概述</h2>
                <p>SCI期刊发表是学术研究成果传播的重要途径。成功的投稿需要系统的策略和精心的准备。</p>
                
                <h3>期刊选择策略</h3>
                <p>选择合适的期刊是投稿成功的第一步：</p>
                <ul>
                    <li>研究期刊的影响因子和声誉</li>
                    <li>分析期刊的主题范围和读者群体</li>
                    <li>查看期刊的审稿周期和接收率</li>
                    <li>考虑开放获取政策</li>
                </ul>
                
                <h3>稿件准备要点</h3>
                <p>高质量的稿件是投稿成功的基础：</p>
                <ol>
                    <li>确保研究的原创性和重要性</li>
                    <li>遵循期刊的格式要求</li>
                    <li>撰写清晰的摘要和关键词</li>
                    <li>提供高质量的图表</li>
                    <li>完善的参考文献列表</li>
                </ol>
                
                <h3>投稿流程管理</h3>
                <p>了解并掌握投稿流程有助于提高效率：</p>
                <ul>
                    <li>在线投稿系统操作</li>
                    <li>Cover Letter撰写</li>
                    <li>推荐审稿人建议</li>
                    <li>利益冲突声明</li>
                </ul>
                
                <h3>审稿意见回复</h3>
                <p>专业的审稿意见回复是修改稿件的关键：</p>
                <ol>
                    <li>仔细分析每条审稿意见</li>
                    <li>逐条回复并说明修改情况</li>
                    <li>保持礼貌和专业的语调</li>
                    <li>提供充分的论证和证据</li>
                </ol>
                
                <h3>常见问题与解决方案</h3>
                <p>投稿过程中可能遇到的问题及应对策略：</p>
                <ul>
                    <li>稿件被拒绝后的处理</li>
                    <li>审稿周期过长的应对</li>
                    <li>版权和伦理问题</li>
                    <li>数据共享要求</li>
                </ul>
            `,
            en: `
                <h2>Overview of SCI Journal Submission</h2>
                <p>SCI journal publication is an important avenue for disseminating academic research results. Successful submission requires systematic strategies and careful preparation.</p>
                
                <h3>Journal Selection Strategy</h3>
                <p>Choosing the right journal is the first step to successful submission:</p>
                <ul>
                    <li>Research the journal's impact factor and reputation</li>
                    <li>Analyze the journal's scope and readership</li>
                    <li>Check the journal's review cycle and acceptance rate</li>
                    <li>Consider open access policies</li>
                </ul>
                
                <h3>Manuscript Preparation Key Points</h3>
                <p>High-quality manuscripts are the foundation of successful submission:</p>
                <ol>
                    <li>Ensure originality and importance of research</li>
                    <li>Follow journal formatting requirements</li>
                    <li>Write clear abstracts and keywords</li>
                    <li>Provide high-quality figures and tables</li>
                    <li>Complete reference list</li>
                </ol>
                
                <h3>Submission Process Management</h3>
                <p>Understanding and mastering the submission process helps improve efficiency:</p>
                <ul>
                    <li>Online submission system operation</li>
                    <li>Cover letter writing</li>
                    <li>Reviewer recommendations</li>
                    <li>Conflict of interest statements</li>
                </ul>
                
                <h3>Responding to Reviewer Comments</h3>
                <p>Professional responses to reviewer comments are key to manuscript revision:</p>
                <ol>
                    <li>Carefully analyze each reviewer comment</li>
                    <li>Respond point-by-point and explain modifications</li>
                    <li>Maintain polite and professional tone</li>
                    <li>Provide sufficient arguments and evidence</li>
                </ol>
                
                <h3>Common Issues and Solutions</h3>
                <p>Problems that may be encountered during submission and coping strategies:</p>
                <ul>
                    <li>Handling manuscript rejection</li>
                    <li>Dealing with long review cycles</li>
                    <li>Copyright and ethical issues</li>
                    <li>Data sharing requirements</li>
                </ul>
            `
        }
    }
};  
    document.getElementById('structuredData').textContent = JSON.stringify(structuredData);
}

// 显示文章未找到
function showArticleNotFound() {
    const contentWrapper = document.getElementById('articleContent');
    contentWrapper.innerHTML = `
        <div class="article-not-found">
            <i class="fas fa-exclamation-triangle"></i>
            <h2>Article Not Found</h2>
            <p>Sorry, the article you are looking for does not exist or has been deleted.</p>
            <a href="seo-articles.html" class="back-to-blog">Back to Blog</a>
        </div>
    `;
    
    document.getElementById('mainTitle').textContent = 'Article Not Found';
    document.getElementById('mainExcerpt').textContent = 'The article you are looking for does not exist';
}

// 分享文章
function shareArticle() {
    if (navigator.share) {
        navigator.share({
            title: document.title,
            text: document.getElementById('mainExcerpt').textContent,
            url: window.location.href
        });
    } else {
        // 复制链接到剪贴板
        navigator.clipboard.writeText(window.location.href).then(() => {
            showNotification('文章链接已复制到剪贴板', 'success');
        });
    }
}

// 收藏文章
function bookmarkArticle() {
    const articleId = new URLSearchParams(window.location.search).get('id');
    const bookmarks = JSON.parse(localStorage.getItem('bookmarkedArticles') || '[]');
    
    if (!bookmarks.includes(articleId)) {
        bookmarks.push(articleId);
        localStorage.setItem('bookmarkedArticles', JSON.stringify(bookmarks));
        showNotification('文章已收藏', 'success');
    } else {
        showNotification('文章已在收藏夹中', 'info');
    }
}

// 按标签搜索
function searchByTag(tag) {
    window.location.href = `index.html?search=${encodeURIComponent(tag)}`;
}

// 侧边栏订阅
function subscribeNewsletter(source = 'main') {
    const emailInput = document.getElementById(source === 'sidebar' ? 'sidebarEmailInput' : 'emailInput');
    const email = emailInput.value.trim();

    if (!email) {
        showNotification('请输入邮箱地址', 'error');
        return;
    }

    if (!isValidEmail(email)) {
        showNotification('请输入有效的邮箱地址', 'error');
        return;
    }

    // 这里可以添加实际的邮件订阅逻辑
    showNotification('订阅成功！感谢您的关注', 'success');
    emailInput.value = '';
}

// 验证邮箱格式
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// 显示通知
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <span>${message}</span>
        <button onclick="this.parentElement.remove()">×</button>
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 5000);
}

// 格式化日期
function formatDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

// 代码高亮（如果需要）
function highlightCode() {
    // 如果使用了代码高亮库，在这里初始化
    // 例如：hljs.highlightAll();
}