document.addEventListener('DOMContentLoaded', function() {
    // 获取元素
    const themeInput = document.getElementById('theme');
    const directionInput = document.getElementById('direction');
    const sizeSelect = document.getElementById('size');
    const customSizeDiv = document.getElementById('custom-size');
    const generateBtn = document.getElementById('generate-btn');
    const cardContainer = document.getElementById('card-container');
    const loadingIndicator = document.getElementById('loading');
    const downloadBtn = document.getElementById('download-btn');
    const examples = document.querySelectorAll('.example');
    
    const poemGenerator = new PoemGenerator();
    const svgGenerator = new SVGGenerator();
    
    // 尺寸选择逻辑
    sizeSelect.addEventListener('change', function() {
        if (this.value === 'custom') {
            customSizeDiv.classList.remove('hidden');
        } else {
            customSizeDiv.classList.add('hidden');
        }
    });
    
    // 生成诗词卡片的函数
    function generatePoemCard() {
        const theme = themeInput.value.trim();
        const direction = directionInput.value.trim();
        const size = sizeSelect.value;
        
        if (!theme || !direction) {
            alert('请输入主题和方向');
            return;
        }
        
        // 显示加载指示器
        loadingIndicator.classList.remove('hidden');
        cardContainer.classList.add('hidden');
        downloadBtn.classList.add('hidden');
        
        // 模拟异步操作
        setTimeout(() => {
            try {
                // 生成诗词数据
                const poemData = poemGenerator.generatePoem(theme, direction);
                
                // 生成SVG卡片，正确传入尺寸参数
                const svgCard = svgGenerator.generateSVGCard(poemData, size);
                
                // 显示卡片
                cardContainer.innerHTML = svgCard;
                cardContainer.classList.remove('hidden');
                downloadBtn.classList.remove('hidden');
                
                // 隐藏加载指示器
                loadingIndicator.classList.add('hidden');
            } catch (error) {
                console.error('生成诗词卡片时出错:', error);
                alert('生成诗词卡片时出错，请重试');
                loadingIndicator.classList.add('hidden');
            }
        }, 500);
    }
    
    // 点击生成按钮时生成诗词卡片
    generateBtn.addEventListener('click', generatePoemCard);
    
    // 按回车键也可以生成
    directionInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            generatePoemCard();
        }
    });
    
    // 点击示例填充输入框
    examples.forEach(example => {
        example.addEventListener('click', () => {
            themeInput.value = example.dataset.theme;
            directionInput.value = example.dataset.direction;
            generatePoemCard();
        });
    });
    
    // 下载SVG卡片
    downloadBtn.addEventListener('click', function() {
        const svg = cardContainer.querySelector('svg');
        const svgData = new XMLSerializer().serializeToString(svg);
        const svgBlob = new Blob([svgData], {type: 'image/svg+xml;charset=utf-8'});
        
        // 获取当前尺寸
        let size = sizeSelect.value;
        let filename;
        
        if (size === 'small') {
            filename = '古诗词卡片.svg';
        } else if (size === 'custom') {
            const width = document.getElementById('custom-width').value;
            const height = document.getElementById('custom-height').value;
            filename = `古诗词背景_${width}x${height}.svg`;
        } else {
            filename = `古诗词背景_${size}.svg`;
        }
        
        // 创建下载链接
        const downloadLink = document.createElement('a');
        downloadLink.href = URL.createObjectURL(svgBlob);
        downloadLink.download = filename;
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
        URL.revokeObjectURL(svgBlob);
    });
});
