"""
使用Python将SVG转换为PNG的示例脚本
"""
import os
import sys
import cairosvg  # 需要先安装: pip install cairosvg

def svg_to_png(svg_file, png_file=None, width=None, height=None):
    """
    将SVG文件转换为PNG
    
    参数:
    svg_file -- 输入的SVG文件路径
    png_file -- 输出的PNG文件路径（默认为同名.png文件）
    width -- 输出PNG的宽度（可选）
    height -- 输出PNG的高度（可选）
    """
    if png_file is None:
        png_file = os.path.splitext(svg_file)[0] + '.png'
    
    # 准备转换选项
    options = {}
    if width:
        options['width'] = width
    if height:
        options['height'] = height
    
    # 执行转换
    try:
        cairosvg.svg2png(url=svg_file, write_to=png_file, **options)
        print(f"转换成功: {svg_file} -> {png_file}")
        return True
    except Exception as e:
        print(f"转换失败: {e}")
        return False

def batch_convert(directory, width=None, height=None):
    """批量转换目录中的所有SVG文件"""
    count = 0
    for file in os.listdir(directory):
        if file.lower().endswith('.svg'):
            svg_path = os.path.join(directory, file)
            if svg_to_png(svg_path, width=width, height=height):
                count += 1
    print(f"共转换 {count} 个文件")

if __name__ == "__main__":
    import argparse
    
    # 命令行参数解析
    parser = argparse.ArgumentParser(description='将SVG文件转换为PNG')
    parser.add_argument('input', help='输入SVG文件或包含SVG文件的目录')
    parser.add_argument('-o', '--output', help='输出PNG文件（仅单文件转换时有效）')
    parser.add_argument('-w', '--width', type=int, help='输出PNG宽度（像素）')
    parser.add_argument('-h', '--height', type=int, help='输出PNG高度（像素）')
    
    args = parser.parse_args()
    
    if os.path.isdir(args.input):
        # 目录模式 - 批量转换
        batch_convert(args.input, width=args.width, height=args.height)
    elif os.path.isfile(args.input) and args.input.lower().endswith('.svg'):
        # 单文件模式
        svg_to_png(args.input, args.output, width=args.width, height=args.height)
    else:
        print("无效的输入文件。请提供.svg文件或包含.svg文件的目录。")
        sys.exit(1)
```

# 使用方法:
python programming_method.py input.svg -o output.png -w 1000
python programming_method.py /path/to/svg/directory -w 1000

# 其他编程语言
还可以使用其他编程语言如JavaScript(Node.js)、Java或C#等转换SVG。
每种语言都有相应的库可以完成此任务。
