# USYD课代表｜悉大CS学习路线图｜配图制作记录

## 视觉设定

- 比例：3:4，最终尺寸 `1080×1440`
- 强调色：USYD橙红 `#EE5D31`
- 辅助色：炭黑 `#252525`、暖白 `#FFFDFC`、浅桃色 `#FBE9E2`
- 风格：悉尼校园编辑感、粗体无衬线、矩形色块、路线节点和细线框
- 品牌边界：仅使用色彩语言，不使用或仿制USYD Logo、校徽、旗帜或官方模板

## 背景生成提示词

```text
Create one clean 3:4 portrait background asset for a Chinese Xiaohongshu university study-roadmap carousel. No text, no letters, no numbers, no logos, no crests, no flags, no watermarks. Warm white background with a minimal editorial line-art illustration inspired by generic Sydney sandstone Gothic university architecture: arched windows, a clock-tower silhouette without identifying marks, subtle campus pathway perspective. Use a restrained palette: exact University of Sydney inspired orange-red #EE5D31 as the only strong accent, charcoal #252525, warm white #FFFDFC, and very pale peach #FBE9E2. Keep the central 65% mostly empty for text cards. Bold modern editorial composition with thin diagonal route lines, small rectangular blocks, refined rather than childish. Flat vector look, crisp edges, high contrast, no gradients, no photorealism. Output exactly 1080x1440 pixels.
```

正文、课号、箭头、阶段标签和检查点均由 `carousel.html` 确定性排版，以避免中文错字；使用 `render.cjs` 导出。
