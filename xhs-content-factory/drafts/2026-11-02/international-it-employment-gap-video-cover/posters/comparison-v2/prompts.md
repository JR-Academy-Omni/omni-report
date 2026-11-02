# 小红书封面·对比版v2

用户反馈：v1“太AI了”，改为对比图。v1保留，不覆盖。

surface: social-video-cover
brand: jr-academy
register: B
extends: jr-academy-brand/APPLICATIONS.md、POSTER_DESIGN.md、DESIGN.md及tokens
overrides: 本次明确改为暖白底平面数据对比，取消摄影拼贴、电脑、地标、立体字与装饰图标；按social-video-cover使用内置Image Model完整生成图文，不后期叠字。

数据延用本题已确认的2024年QILT信息技术本科短期全职就业率：国际毕业生43.5%，本地毕业生67.8%。两组是同年横向对比，不是历史下降，差距约24个百分点。原标题按用户要求保留。没有新增求职承诺或因果归因。

原始模型PNG另存；最终只做等比尺寸规格化至1080×1440，无裁切或补字。未调用公司图片API，内置工具未返回底层版本或费用。不冒称已发布或已获用户认可。

## 完整prompt

```text
Design a completely NEW finished Chinese Xiaohongshu video cover, 3:4 portrait, 1080x1440 target. The user rejected the earlier photorealistic AI-collage cover. This version must look like a restrained professionally typeset comparison infographic, not AI illustration. Generate the complete final image INCLUDING all final text.
Use case: infographic-diagram / editorial social cover.
Visual style: FLAT 2D graphic design, warm-white paper background #FFFAF2, deep ink navy #17182F typography, restrained coral #FF6854 for international graduates and blue #69BFF0 for domestic graduates. Modern Chinese sans serif similar to Source Han Sans Heavy, clean numeral typography. Straight upright letters. No perspective text, no bevels, no thick shadows, no gradients, no glossy plastic, no decorative paint strokes. No photographs, no people, no computers, no landmarks, no flags, no emoji or icons, no logos, no QR code, no URL. No rectangles/card wall. This is graphic design, not a photographed poster.
Keep the user's original headline verbatim, with sensible line breaks in the top third:
“同样读IT，澳洲国际生就业率凭啥低24%？”
Use three balanced lines, e.g. “同样读IT，”“澳洲国际生就业率”“凭啥低24%？”. The whole headline must fit comfortably, not touch edges. Main headline visual size about 80–100px, fully legible on a phone.
The main visual task is an immediate LEFT-RIGHT comparison. Two spacious open columns separated by a fine vertical rule (not two bordered cards).
Left exact label “国际毕业生”, large exact number “43.5%” in coral.
Right exact label “本地毕业生”, large exact number “67.8%” in deep navy with blue accent.
The percentages must be equally sized, visually 135–160px, on exactly the same baseline. Labels visually 48–56px. Do not add any fake student or staff persona, employment prediction or guarantee.
Below the numbers show two simple vertical SOLID FLAT bars with equal width, precisely the same bottom baseline and the same 0–100% scale: left height 43.5 units, right 67.8 units (height ratio exactly 43.5/67.8 = 0.6415929). Left coral, right blue. No 3D, no isometric, no pictograms, no decorative arrow falsely implying a historical decline. Both bars are same-year different groups.
A compact clear black text line above the comparison must state “2024年·信息技术本科”.
Below the comparison, place one bold conclusion “相差约24个百分点” in ink navy at 50–58px, with the 24 emphasized through weight rather than a box.
At the bottom keep just two neat readable lines, not internal production notes:
“毕业后约4—6个月的全职就业率”
“来源：QILT2024”
These are the only other allowed texts. Render them in dark ink, not tiny faint grey, about 32–38px. Do not add 24.3, new statistics, commentary, a CTA, a slogan, an AI label, a watermark, or additional text.
Composition should be simple, precise and intentionally designed: strong title > two percentage figures > proportional bars > concise context/source. Leave 64px side margins and at least 70px top/bottom margins. Every Chinese character must be correct simplified Chinese. No broken glyphs, no clipped text. The comparison, not decorative effects, should create impact. Output one complete polished flat cover.
```
