class PoemGenerator {
    constructor() {
        // 诗词库：主题 -> 方向 -> [诗句, 作者, 朝代, 出处, 解读]
        this.poemDatabase = {
            "春天": {
                "生机": [
                    "草长莺飞二月天，拂堤杨柳醉春烟。",
                    "白居易",
                    "唐",
                    "《钱塘湖春行》",
                    "春日的勃勃生机，草长莺飞，杨柳拂堤，生命力蓬勃而富有活力。"
                ],
                "希望": [
                    "春风又绿江南岸，明月何时照我还？",
                    "王安石",
                    "宋",
                    "《泊船瓜洲》",
                    "春风带来万物复苏，寄托诗人对新生与希望的憧憬。"
                ]
            },
            "思乡": {
                "离别": [
                    "春草明年绿，王孙归不归？",
                    "白居易",
                    "唐",
                    "《赋得古原草送别》",
                    "借春草年年重生表达对远行友人的思念，寄托归期的期盼。"
                ],
                "感伤": [
                    "独在异乡为异客，每逢佳节倍思亲。",
                    "王维",
                    "唐",
                    "《九月九日忆山东兄弟》",
                    "异乡游子在佳节之时对家乡亲人的思念之情。"
                ]
            },
            "月夜": {
                "思念": [
                    "举头望明月，低头思故乡。",
                    "李白",
                    "唐",
                    "《静夜思》",
                    "借明月寄托对故乡的思念之情，表达游子思乡之切。"
                ],
                "孤独": [
                    "床前明月光，疑是地上霜。",
                    "李白",
                    "唐",
                    "《静夜思》",
                    "月光如霜，映射出诗人内心的清冷与孤独。"
                ]
            },
            "山水": {
                "隐逸": [
                    "青山横北郭，白水绕东城。",
                    "王维",
                    "唐",
                    "《终南别业》",
                    "描绘山水环抱的隐居之所，展现诗人对隐逸生活的向往。"
                ],
                "宁静": [
                    "空山新雨后，天气晚来秋。",
                    "王维",
                    "唐",
                    "《山居秋暝》",
                    "雨后山林的宁静氛围，展现大自然的纯净之美。"
                ]
            }
        };
        
        // 备用通用诗句库
        this.genericPoems = [
            ["人闲桂花落，夜静春山空。", "王维", "唐", "《鸟鸣涧》", "意境宁静幽远，描绘出一种超凡脱俗的闲适之美。"],
            ["千山鸟飞绝，万径人踪灭。", "柳宗元", "唐", "《江雪》", "展现出一种冷寂、空旷而深邃的氛围。"],
            ["水光潋滟晴方好，山色空蒙雨亦奇。", "苏轼", "宋", "《饮湖上初晴后雨》", "捕捉自然景色的变化，意境开阔。"],
            ["莫愁前路无知己，天下谁人不识君。", "高适", "唐", "《别董大》", "饱含真挚的友情和对未来的乐观期许。"]
        ];
    }

    /**
     * 根据主题和方向生成诗词
     * @param {string} theme - 主题
     * @param {string} direction - 方向
     * @returns {Object} 包含诗句及相关信息的对象
     */
    generatePoem(theme, direction) {
        // 尝试找到精确匹配的诗句
        if (this.poemDatabase[theme] && this.poemDatabase[theme][direction]) {
            return {
                poem: this.poemDatabase[theme][direction][0],
                author: this.poemDatabase[theme][direction][1],
                dynasty: this.poemDatabase[theme][direction][2],
                source: this.poemDatabase[theme][direction][3],
                interpretation: this.poemDatabase[theme][direction][4],
                theme: theme,
                direction: direction
            };
        }
        
        // 尝试匹配主题下的任意方向
        if (this.poemDatabase[theme]) {
            const directions = Object.keys(this.poemDatabase[theme]);
            const randomDirection = directions[Math.floor(Math.random() * directions.length)];
            return {
                poem: this.poemDatabase[theme][randomDirection][0],
                author: this.poemDatabase[theme][randomDirection][1],
                dynasty: this.poemDatabase[theme][randomDirection][2],
                source: this.poemDatabase[theme][randomDirection][3],
                interpretation: this.poemDatabase[theme][randomDirection][4],
                theme: theme,
                direction: randomDirection
            };
        }
        
        // 使用通用诗句
        const randomPoem = this.genericPoems[Math.floor(Math.random() * this.genericPoems.length)];
        return {
            poem: randomPoem[0],
            author: randomPoem[1],
            dynasty: randomPoem[2],
            source: randomPoem[3],
            interpretation: randomPoem[4],
            theme: theme,
            direction: direction
        };
    }
}
