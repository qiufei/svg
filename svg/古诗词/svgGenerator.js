class SVGGenerator {
    constructor() {
        this.width = 400;
        this.height = 550;
        this.padding = 20;
    }

    /**
     * 生成古诗词SVG卡片
     * @param {Object} poemData - 包含诗句及相关信息的对象
     * @param {string} size - SVG卡片尺寸，默认为'small'
     * @returns {string} SVG卡片的HTML字符串
     */
    generateSVGCard(poemData, size = 'small') {
        // 设置尺寸
        this.setCardSize(size);

        const backgrounds = [
            'linear-gradient(135deg, #f5efe0 0%, #e8dcc8 100%)',
            'linear-gradient(135deg, #f9f3e9 0%, #e6d7bf 100%)',
            'linear-gradient(135deg, #f0e9d9 0%, #d9c7a9 100%)'
        ];
        
        const randomBg = backgrounds[Math.floor(Math.random() * backgrounds.length)];
        
        // SVG开始标签
        let svg = `<svg width="${this.width}" height="${this.height}" viewBox="0 0 ${this.width} ${this.height}" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style="stop-color:#f5efe0;stop-opacity:1" />
                    <stop offset="100%" style="stop-color:#e8dcc8;stop-opacity:1" />
                </linearGradient>
            </defs>
            
            <!-- 背景 -->
            <rect width="${this.width}" height="${this.height}" rx="10" ry="10" fill="url(#bgGradient)" />
            
            <!-- 装饰纹样 -->
            <rect x="${this.padding}" y="${this.padding}" width="${this.width - this.padding * 2}" height="${this.height - this.padding * 2}" rx="5" ry="5" fill="none" stroke="#8b4513" stroke-width="1" stroke-dasharray="2,2" />
            
            <!-- 标题区域 -->
            <text x="${this.width / 2}" y="50" text-anchor="middle" font-size="24" fill="#8b4513" font-weight="bold">古韵丹青</text>
            
            <!-- 副标题 -->
            <text x="${this.width / 2}" y="80" text-anchor="middle" font-size="16" fill="#8b4513">
                ${poemData.theme} · ${poemData.direction}
            </text>
            
            <!-- 分割线 -->
            <line x1="${this.padding * 2}" y1="100" x2="${this.width - this.padding * 2}" y2="100" stroke="#8b4513" stroke-width="1" />`;
            
        // 诗句区域 - 移除外部的引号，依赖breakPoemLine方法添加的引号
        svg += `
            <!-- 诗句区域 -->
            <text x="${this.width / 2}" y="160" text-anchor="middle" font-size="22" fill="#333">
                ${this.breakPoemLine(poemData.poem)}
            </text>`;
            
        // 水墨画区域 - 这里简化为一个简单的中国风图案
        svg += this.generateDecorativeImage(poemData.theme);
            
        // 诗词解读
        svg += `
            <!-- 诗词解读 -->
            <text x="${this.width / 2}" y="360" text-anchor="middle" font-size="14" fill="#555">
                <tspan x="${this.width / 2}" dy="0">${this.wrapText(poemData.interpretation, 20)[0]}</tspan>`;
            
        // 如果解读文本很长，需要多行显示
        const interpretationLines = this.wrapText(poemData.interpretation, 20);
        for (let i = 1; i < interpretationLines.length; i++) {
            svg += `<tspan x="${this.width / 2}" dy="20">${interpretationLines[i]}</tspan>`;
        }
            
        svg += `</text>`;
            
        // 底部区域
        svg += `
            <!-- 底部区域 -->
            <text x="${this.width / 2}" y="${this.height - 60}" text-anchor="middle" font-size="16" fill="#8b4513">
                ${poemData.author} · ${poemData.dynasty}
            </text>
            <text x="${this.width / 2}" y="${this.height - 40}" text-anchor="middle" font-size="12" fill="#8b4513">
                ${poemData.source}
            </text>`;
            
        // SVG结束标签
        svg += `</svg>`;
            
        return svg;
    }

    /**
     * 设置卡片尺寸
     * @param {string} size - 卡片尺寸
     */
    setCardSize(size) {
        if (size === 'small') {
            // 原始卡片尺寸
            this.width = 400;
            this.height = 550;
        } else if (size === 'custom') {
            this.width = parseInt(document.getElementById('custom-width').value) || 1920;
            this.height = parseInt(document.getElementById('custom-height').value) || 1080;
        } else {
            // 解析预设尺寸
            const dimensions = size.split('x');
            this.width = parseInt(dimensions[0]);
            this.height = parseInt(dimensions[1]);
        }
        
        // 调整padding比例
        this.padding = Math.max(20, Math.round(this.width * 0.05));
    }

    /**
     * 根据主题生成装饰图案
     * @param {string} theme - 主题
     * @returns {string} SVG图案元素
     */
    generateDecorativeImage(theme) {
        const centerX = this.width / 2;
        const centerY = 250;
        
        let image = '';
        
        // 根据主题选择不同的装饰图案
        switch(theme.toLowerCase()) {
            case '春天':
                // 简化的梅花
                image = `
                <g transform="translate(${centerX}, ${centerY}) scale(0.6)">
                    <path d="M0,0 C5,-40 25,-30 0,-60 C-25,-30 -5,-40 0,0" fill="#d88c9a" />
                    <path d="M0,0 C40,-5 30,-25 60,0 C30,25 40,5 0,0" fill="#d88c9a" />
                    <path d="M0,0 C5,40 25,30 0,60 C-25,30 -5,40 0,0" fill="#d88c9a" />
                    <path d="M0,0 C-40,5 -30,25 -60,0 C-30,-25 -40,-5 0,0" fill="#d88c9a" />
                    <circle cx="0" cy="0" r="10" fill="#f0e68c" />
                </g>`;
                break;
                
            case '思乡':
                // 简化的月亮和云朵
                image = `
                <g transform="translate(${centerX}, ${centerY}) scale(0.6)">
                    <circle cx="0" cy="0" r="40" fill="#f5efe0" stroke="#8b4513" stroke-width="1" />
                    <path d="M-20,-20 Q0,-50 20,-20 Q40,-30 50,0 Q40,30 20,20 Q0,50 -20,20 Q-40,30 -50,0 Q-40,-30 -20,-20" 
                          fill="#f5f5f5" stroke="#8b4513" stroke-width="0.5" transform="translate(-50, -60)" />
                </g>`;
                break;
                
            case '月夜':
                // 简化的月亮
                image = `
                <g transform="translate(${centerX}, ${centerY}) scale(0.6)">
                    <circle cx="0" cy="0" r="40" fill="#f5efe0" stroke="#8b4513" stroke-width="1" />
                    <circle cx="15" cy="-15" r="10" fill="#e8dcc8" />
                    <circle cx="-10" cy="10" r="7" fill="#e8dcc8" />
                    <circle cx="5" cy="20" r="5" fill="#e8dcc8" />
                </g>`;
                break;
                
            case '山水':
                // 简化的山水
                image = `
                <g transform="translate(${centerX}, ${centerY}) scale(0.6)">
                    <path d="M-60,40 L-30,-20 L0,30 L30,-30 L60,40 Z" fill="#8b4513" fill-opacity="0.3" />
                    <path d="M-60,40 Q-30,35 0,40 Q30,45 60,40 L60,60 L-60,60 Z" fill="#4682b4" fill-opacity="0.3" />
                </g>`;
                break;
                
            default:
                // 默认图案：简化的中国结
                image = `
                <g transform="translate(${centerX}, ${centerY}) scale(0.6)">
                    <rect x="-30" y="-30" width="60" height="60" rx="5" ry="5" fill="none" stroke="#8b4513" stroke-width="2" />
                    <circle cx="0" cy="0" r="15" fill="none" stroke="#8b4513" stroke-width="2" />
                    <line x1="-30" y1="-30" x2="30" y2="30" stroke="#8b4513" stroke-width="2" />
                    <line x1="30" y1="-30" x2="-30" y2="30" stroke="#8b4513" stroke-width="2" />
                </g>`;
        }
        
        return image;
    }

    /**
     * 分割诗句成多行
     * @param {string} poem - 诗句
     * @returns {string} 格式化后的诗句
     */
    breakPoemLine(poem) {
        // 去除可能存在的引号
        poem = poem.replace(/[""]/g, '');
        
        // 将句子按逗号、句号等分割
        const parts = poem.split(/[，。；？！]/);
        let result = '';
        
        // 只处理非空行
        const validParts = parts.filter(part => part.trim().length > 0);
        
        // 如果没有有效内容，返回空
        if (validParts.length === 0) {
            return '';
        }
        
        // 处理第一行（添加开头引号）
        result += '"' + validParts[0] + (poem.indexOf(validParts[0]) + validParts[0].length < poem.length ? poem[poem.indexOf(validParts[0]) + validParts[0].length] : '');
        
        // 处理中间行
        for (let i = 1; i < validParts.length - 1; i++) {
            const part = validParts[i];
            result += `</text><text x="${this.width / 2}" y="${160 + i*30}" text-anchor="middle" font-size="22" fill="#333">`;
            result += part + (poem.indexOf(part) + part.length < poem.length ? poem[poem.indexOf(part) + part.length] : '');
        }
        
        // 处理最后一行（添加结尾引号）
        if (validParts.length > 1) {
            const lastPart = validParts[validParts.length - 1];
            result += `</text><text x="${this.width / 2}" y="${160 + (validParts.length-1)*30}" text-anchor="middle" font-size="22" fill="#333">`;
            result += lastPart + '"';
        } else {
            // 如果只有一行，直接在第一行末尾添加结尾引号
            result += '"';
        }
        
        return result;
    }

    /**
     * 文本自动换行
     * @param {string} text - 文本
     * @param {number} maxChars - 每行最大字符数
     * @returns {string[]} 分行后的文本数组
     */
    wrapText(text, maxChars) {
        const result = [];
        let line = '';
        
        for (let i = 0; i < text.length; i++) {
            line += text[i];
            if (line.length >= maxChars && i < text.length - 1) {
                result.push(line);
                line = '';
            }
        }
        
        if (line.length > 0) {
            result.push(line);
        }
        
        return result;
    }
}
