# v9：澳洲IT蓝色强调与独立饼图修正

日期：2026-11-03（Asia/Singapore）。延续原项目，目录仍在2026-11-02项目下，不代表本次制作日期。

用户要求：“澳洲IT也要用其他的颜色来突出”“饼图的比例不对，一个不是六十多吗”。原来把两组数字放在五五分色的单个圆里，会被误读为实际饼图比例。因此保留圆形信息图风格，改为两张等尺寸、各自代表100%的独立饼图，橙色43.5%/浅灰56.5%、青色67.8%/浅灰32.2%。不是将43.5%与67.8%相加归一，也不再声称五五分区能表示这两个值。灰色仅表示本组其余比例，不写成失业率。

surface: social-video-cover
brand: jr-academy
register: B
extends: jr-academy-brand/APPLICATIONS.md、POSTER_DESIGN.md、DESIGN.md
scoped-overrides: 社媒封面skill要求内置Image Model整图含文字、无JR Logo；保留用户固定标题三行与已删去页脚的精简版；本轮澳洲IT蓝色强调，修正独立比例表示。

新标题文字不改，第一行“同样读澳洲IT”，其中“澳洲IT”为蓝色；第二行“留学生就业率”，第三行“凭啥低24%？”，24%继续橙色。数据仍来自已核验视频的2024年QILT信息技术本科短期全职就业率；本轮不改数据口径或视频文案，不把它表述为2026年最新数据。

## 完整生成提示词

编辑目标：C:/Users/1/.codex/generated_images/01a1861b-1ba1-7520-a351-43fc9871f1d2/exec-3ce867f0-fe6e-43a6-8eae-ae01d647466c.png

Use case: precise-object-edit / infographic-diagram. Correct this Chinese Xiaohongshu cover. Preserve its huge exact3lineheadline, creambackground, orangeversuscyan, flat graduate portraits, dark rounded全职就业率badge and tightphone-readablecomposition. There are TWO REQUIRED CHANGES:
A. On headline line1 change ONLY substring “澳洲IT” to a saturated royalblue e.g.#0075C9, keep “同样读” black. Line1 exact “同样读澳洲IT”; line2 exact “留学生就业率” allblack; line3 exact “凭啥低24%？” with24%orange andrestblack. Nocomma. Keep hugeextraboldtype around125pxglyphheight, fullsafe-width3lines, top~430px. No titleword/orderchange.
B. REPAIR THE ACTUAL PIE PROPORTIONS, do NOT keep misleading50/50orange/cyan singlepie. These are two independent group employmentrates. Replace the ONE diagonalsplitcircle with TWO EQUAL-SIZED INDEPENDENT SOLID PIE CHARTS side-by-side, one beneath eachgraduate. This is required to depict43.5%and67.8%truthfully; do not normalize43.5+67.8into100%. NOTbars, notdonuts, notrings, notonecombinedpie.
Precise chart geometry: Eachpieis one fullcircle representing100%of its own group. Same radius~215px (diameter430) on1086widecanvas. Centers approximately(285,1170)and(800,1170); bottomabout1385leaving~60pxmargin. Bothbegin their coloredsector at12o'clock and fill CLOCKWISE.
LEFTpie: ORANGE43.5% =156.6degrees, from-90degrees through+66.6degrees (endpointaround5:13onclock). Orange onrightupper-and-lower-right43.5%ofcircle, remaining56.5%LIGHTGRAY#DEDAD6. It MUST be visibly LESS THAN HALF. Do not draw exact semicircle or50%.
RIGHTpie: CYAN67.8% =244.08degrees, from-90degrees through+154.08degrees (endpointaround8:08onclock). Cyan onright andlower-and-lower-left67.8%ofcircle, remaining32.2%LIGHTGRAY#DEDAD6upper-left. It MUST be visibly OVER TWO THIRDS ofcircle, NOT50%.
Sector boundaries are straight radiallines meetingat eachtruecirclecenter, perfectlyflatpie, no explodedsegments, no angled3D,nodistortedellipses. Leave piegeometry unobstructed bypeople/text so it canbemeasured. Grayremainder has NO label or number; do NOT call itunemployed because non-full-timeisbroader.
Composition afterheadline: fulltimeemploymentbadge~y460–530; paired equalgraduatebusts~y560–780, leftoriginalfemale-likegradientfreeillustrationandrightoriginalmale-likeillustration, equalstatus; group labels “留学生” orange and “本地毕业生”cyan above their respectivepies, bigpercent “43.5%”orange and“67.8%”cyan directly above respectivepies. Place labels andpercent aroundy790–940 with clear hierarchy, no overlap. Piecenters canadjustslightly to fit but keep sectors exact. Use allthelowercanvas efficiently, no giantblankfooter. Onlytwograduates, twolabels, twopercentages, twopies, oneheadingbadge.
Allowed visibletext ONLY: “同样读澳洲IT”“留学生就业率”“凭啥低24%？”“全职就业率”“留学生”“本地毕业生”“43.5%”“67.8%”. Noextraaxis,legends,remainderlabels,source/QILT/year/footer/summary/Logo/匠人学院/JRAcademy/URL/QR/watermark/notes/CTA. All finaltext generated withinimage. Finished3:4portraitcover. The coloredpieangles WILLBE CHECKED, precisiontakespriorityoverfillerstyling.

## 结果与导出

使用内置Image Model整图编辑一次，无外部收费API；工具未返回具体模型版本与费用。全部文字与图形由模型完成，无代码绘图、后期叠字、扇区重绘或裁切。
模型原图：C:/Users/1/.codex/generated_images/01a1861b-1ba1-7520-a351-43fc9871f1d2/exec-a337226f-5556-41e3-9a16-a6581f70efe2.png
原始1086×1448保留并复制Downloads；成品仅等比规格化1080×1440，另导出270×360预览。
Downloads：C:/Users/1/Downloads/同样读澳洲IT-蓝色标题-双饼图比例修正-20261103-v9.png
成品SHA256：bfbf5e5a1de0ba238004e28a332dc76c6bdc3ec052ad16c44eb9e2652c1c3daf
原版均保留。本次变更待用户最终确认，不自动上传/发布到社交平台。
