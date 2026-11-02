# 恢复用户选定圆形版v7

用户澄清“我不是用的饼图那张吗”，撤销此前对“第2张”的错误底稿识别。实际选定为橙蓝斜切圆形版本，而非胶囊/横条。本次从v5圆形模型原图直接编辑，没有继承v6横条版。

需求：保留斜切圆形；标题删逗号；国际生改留学生；主标题加大；调整圆形在封面中的大小，删除过的结论/统计说明/来源不恢复。圆形的两区域仍为群体比较版式，非共享分母的实际饼图；43.5%和67.8%为独立就业率，不相加、不归一成39%/61%。

surface: social-video-cover
brand: jr-academy
register: B
extends: jr-academy-brand/APPLICATIONS.md、POSTER_DESIGN.md、DESIGN.md
scoped-overrides: 按社媒封面skill使用模型生成全部文字与画面、无JR Logo；用户选定橙蓝圆形对比分区，不换图表类型。

内置Image Model整图编辑一次，未使用外部收费API；具体模型版本和费用未由工具返回。生成原图1086×1448，保留并复制Downloads。成品仅等比尺寸导出1080×1440，另有270×360手机预览；无后期叠字、重绘或裁切。所有旧版本保留，但v6为选图误会产物，不作为当前选定方向。

## 完整提示词

编辑目标：C:/Users/1/.codex/generated_images/01a1861b-1ba1-7520-a351-43fc9871f1d2/exec-28e27811-ee36-4be2-8974-651297981528.png

Use case: precise-object-edit. This attached ORIGINAL ORANGE/CYAN DIAGONAL SPLIT-CIRCLE cover is the user-selected design. It was incorrectly replaced with bars previously. Correct that mistake: PRESERVE this ONE LARGE DIAGONALLY BISECTED CIRCLE, do not turn it into any bar chart, progress bars, donut pair, separate small pies, capsule comparison or another design. Retain original cream background, black flat graduate portraits, orange upperleft and cyan lowerright circle panels, horizontal white text inside the panels.
Make these exact changes only:
1. Headline must read EXACTLY “同样读IT澳洲留学生就业率凭啥低24%？” with NO COMMA. Replace国际生with留学生. Three large lines: “同样读IT” / “澳洲留学生就业率” / “凭啥低24%？”. Enlarge headline font noticeably over input (roughly120px glyph height on1086widecanvas, boldblack,24%orange); title is dominant, safe nearfullwidth, top~450px. Do not shrink the text to preserve enormous circle.
2. Inside orange panel change “国际毕业生” to “留学生”; keep43.5%. Cyan panel keeps “本地毕业生” and67.8%. Keep exact numbers, correct associations, equallyprominent.
3. Rebalance the CIRCLE'S SHARE OF THE COVER to give the enlarged headline room: circle remains a true circle, approx800–820px diameter centered horizontally, top near570px and bottomnear1380px of1448pxcanvas, comfortable clearances. Not an ellipse, not cropped. Shrink/reposition its whole content together, then adjust labels and numbers for readability, no overlap with diagonal or headline.
4. Keep the single dark short “全职就业率” badge between headline and circle, slightly more compact so it does not compete with title.
Factual invariant: this circle's two equal-color diagonal PANELS compare TWO INDEPENDENT graduate groups. It is a grouping medallion, not literal percentages of a single100%whole; do NOT distort its two region areas to43.5%/67.8% or normalize them to39%/61%. Preserve the straight diagonal diameter and two equal halfpanels, independent rates rendered as text. No angle scales, percentage arcs or total100%. Do NOT claim sharedtotal.
The ONLY visible words are the headline above, 留学生, 本地毕业生,43.5%,67.8%,全职就业率. Preserve ABSENCE of “相差约24个百分点”,2024,methodologicalcaption,QILT,source/footerlines,logo/匠人学院/JRAcademy,URL,QR,watermark,notes,CTA. No comma anywhere. All text and image modified by image model directly, finished full3:4portrait cover.

## 结果

模型原图：C:/Users/1/.codex/generated_images/01a1861b-1ba1-7520-a351-43fc9871f1d2/exec-cd99cfe9-1844-455f-96dc-cbb1a5654702.png
Downloads成品：C:/Users/1/Downloads/同样读IT-留学生-圆形版-20261102-v7.png
SHA256：ddf3c125518ca375fe4877a9256fdeaefed4b02fb952a8444db3cc47c4c1aca5
尚待用户对本次修订确认，无平台上传。
