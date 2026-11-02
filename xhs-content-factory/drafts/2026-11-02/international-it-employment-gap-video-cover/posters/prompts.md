# 小红书视频封面 · 2026-11-02

原标题：同样读IT，澳洲国际生就业率凭啥低24%？

使用内置Image Model生成完整封面和全部标题文字；未调用公司后端图片API，未后期补字。未返回具体底层模型版本或费用，不自行填报为某个收费型号。

surface: social-video-cover
brand: jr-academy
register: B
extends: jr-academy-brand/APPLICATIONS.md、POSTER_DESIGN.md、DESIGN.md及tokens
overrides: 沿用本话题视频的深墨/白/黄高反差；用户原标题不改；按更具体的social-video-cover要求完整图文由模型一次生成，覆盖通用海报的确定性叠字流程；不放JR Logo，不堆方框。

本次只生成一张小红书封面，不新做视频、正文图或平台发布。原始输出1086×1448，精确3:4；最终仅等比规格化导出1080×1440，无裁切、无加字、无改变构图。模型原图另存，Downloads交付不覆盖旧文件。

参考照片：
- 电脑/真实代码摄影：既有项目本地developer-laptop.jpg，luis gomes / Pexels 546819同题材素材，https://www.pexels.com/photo/close-up-photo-of-programming-of-codes-546819/ 。只作通用IT情境，不是学员作品或招聘证据。
- 悉尼歌剧院：David Dibert / Pexels 1086852，https://www.pexels.com/photo/sidney-opera-house-1086852/ 。
- 许可：https://www.pexels.com/license/ 。创意封面参考这些真实照片进行模型合成，不把最终图片冒称原始现场照或原始网页截图。屏内代码仅作情境，不用于证明就业事实。
- 数字依据：本题已确认的2024年QILT短期全职就业率43.5%与67.8%，差24.3个百分点。标题沿用用户明确要求的“低24%？”问题表达，不新增相对下降或因果断言；正文保留口径。

## 完整原始prompt

```text
Create one finished Xiaohongshu VIDEO COVER, exactly 1080x1440 pixels, strict 3:4 portrait. Use case ads-marketing. This is the complete final cover INCLUDING every final Chinese headline character, not a blank background. Render all text within the image model. No later text compositing.
Use the two supplied photographs as photographic compositing inputs: image 1 is a REAL laptop closeup with actual code on its screen, preserve the natural hardware and real screen content; image 2 is a REAL Sydney Opera House / harbour photograph, preserve recognisable architecture. Do not draw cartoon computers, invent another screen/UI or forge any official report. This is an editorial cover about international IT graduate employment in Australia, not a documentary scene of a particular student.
Art direction: premium, sharp, confident adult career editorial cover with deep ink navy #17182F, warm-white title and vivid warm-yellow #FFD65A emphasis. Strong, modern Source Han Sans Heavy-like simplified Chinese typography; absolutely not a PowerPoint slide or a grid of rectangular boxes. Restrained texture, sophisticated photographic depth, clean but impactful. One laptop only. No duplicate icons, no magnifying glass, no emoji, no AI robots, no gold glossy 3D plastic, no neon futuristic circuits, no random badges.
The exact full original title MUST be present, once only, no rewriting, no abbreviations beyond the original IT:
“同样读IT，澳洲国际生就业率凭啥低24%？”
Arrange it into visually deliberate lines, for example:
同样读IT，
澳洲国际生
就业率凭啥
低24%？
The 24% should be the dominant large yellow focal point, but '就业率' and the question meaning must remain instantly legible. All headline text comfortably readable at 270px-wide phone preview, main Chinese text visually 90–140px, 24% visually 240–300px. Keep all text within 70px side margins and 90px top/bottom margins, including punctuation. Do not crop any Chinese character. Use generous intentional spacing without wasteful blank areas. The upper and middle area primarily carries headline, the lower area integrates the real laptop closeup and Sydney harbour, with clear hierarchy and no rectangles around them. Photography should enrich the story, not compete with the headline. Keep photographs naturally proportioned.
Only the exact title is allowed as designed text. No small grey notes, no fake source lines, no extra numbers, no additional subtitles, no URLs, no QR codes, no JR Academy or 匠人学院 logos or branding, no employer logos, no watermarks or signatures. No charts or fabricated evidence. Do not interpret the 24% as a relative decline or fabricate causality; preserve the user's original question wording.
Chinese text character-perfect, simplified Chinese, high contrast, mature editorial quality. Output just one complete polished cover.
```
