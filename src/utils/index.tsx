import tinycolor from "tinycolor2";

/**
 * 根据文字生成颜色（用于头像背景等）
 * @param inputText 文字
 * @returns
 */
export const generateColorFromString = (inputText: string): string => {
  // 将文本转换为哈希值
  let hash = 0;
  for (let i = 0; i < inputText.length; i++) {
    hash = inputText.charCodeAt(i) + ((hash << 5) - hash);
  }

  // 生成颜色
  const baseColor = `#${((hash & 0x00ffffff) | 0x808080)
    .toString(16)
    .slice(0, 6)}`;

  // 创建 tinycolor 对象
  const color = tinycolor(baseColor);
  // 如果亮度太高，降低亮度
  if (color.getBrightness() > 200) {
    color.darken(40);
  }

  return color.toHexString();
};
