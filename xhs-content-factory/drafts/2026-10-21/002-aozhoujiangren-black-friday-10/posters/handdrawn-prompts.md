# 手写攻略版视觉生成记录

## 参考图角色

- 用户提供图片仅作为视觉风格参考：暖白纸张、黑色粗手写、橙色荧光笔、手绘表格和小图标。
- 不复制参考图的文字、商品、结构、猫咪图案或水印。

## ImageGen 底图 prompt

> Create a clean 3:4 hand-drawn study-guide paper background inspired by the reference image's tactile marker-and-pencil visual language, without copying its content or layout. Warm off-white fibrous paper, authentic black ink and colored pencil, orange highlighter strokes. Keep the center uncluttered. Around the margins add a hand-drawn Australia map filled with Australian flag motifs, Southern Cross stars, graduation cap, open book, laptop, coupon tag and curved arrows. No readable text, letters, numbers, logos, QR codes, brand marks or watermark.

## 确定性排版

- 输出：7 张，1242 × 1660 px。
- 字体：KaiTi / 楷体为主，关键数字和品牌信息使用系统黑体。
- 结构：封面 1 张 + JR 课程 2 张 + 平台优惠 1 张 + 学生福利 1 张 + 选择指南 1 张 + 事实边界 1 张。
- 所有中文、价格、数量、日期与来源均由 HTML/CSS 渲染，不交给图片模型生成。
