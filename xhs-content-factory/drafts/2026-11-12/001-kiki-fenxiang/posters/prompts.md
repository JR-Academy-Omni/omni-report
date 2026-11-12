# 小红书封面生成记录

- 账号：KIKI的分享日记
- 主题：澳洲已经被 FDE 岗位包围了
- 类型：封面图
- 模式：built-in image generation
- 参考图用途：仅参考“地图被密集彩色坐标点覆盖”的视觉结构，不复制原地图、道路、标签或地图品牌元素
- 最终尺寸：1080×1440（3:4）

## Cover A

```text
Use case: ads-marketing
Asset type: 3:4 portrait Xiaohongshu cover, final social media bitmap
Input image: use the supplied San Francisco Bay map only as a visual-composition reference for a map densely covered by hundreds of colorful location pins; do not copy its geography, labels, Google branding, roads, UI, or exact design.
Primary request: Create a high-impact cover about the rise of Forward Deployed Engineer jobs in Australia. Show a clearly recognizable map of Australia surrounded and densely covered by hundreds of colorful map pins, creating an unmistakable feeling that the country is being “包围” by FDE opportunities.
Scene/backdrop: clean editorial map illustration of Australia with ocean blue, pale green land, subtle terrain texture, no real map-provider branding. Dense pins around Sydney, Melbourne, Brisbane, Perth, Adelaide and Canberra, with especially overwhelming density along the east and southeast coasts; additional scattered pins nationwide. Pins may extend slightly beyond the coastline for visual pressure, but the Australian silhouette must remain clear.
Style/medium: energetic Chinese social-media editorial cover for “KIKI的分享日记”; warm, excited, approachable, high-click-through; colorful map-pin density like the reference image, crisp professional infographic illustration, not a corporate institutional poster.
Composition/framing: strict 3:4 portrait, 1080×1440. Australia map occupies the lower 72% of the canvas and is large enough to read instantly. Reserve the upper 28% for a bold headline block. Strong contrast and clear phone-screen hierarchy. The pins are the dominant visual proof and must look extremely numerous.
Color palette: bright ocean blue, soft pale green land, dense red/pink/orange/blue/purple pins; warm coral and cream headline accents; deep navy/black text.
Text (verbatim, exact Chinese, no other large text): “澳洲已经被FDE岗位包围了！” Arrange as 2–3 compact lines. Make “FDE” the largest word. Use a bold rounded Chinese sans-serif; headline text minimum 200pt visual size. All supporting text minimum 40pt visual size.
Small footer text (verbatim): “岗位分布趋势示意｜非精确数量”
Optional tiny city labels only if they remain correct and readable: Sydney, Melbourne, Brisbane, Perth, Adelaide.
Constraints: Chinese text must be character-perfect; preserve the exact letters FDE; no company logos; no fake salary numbers; no job-count claims; no QR code; no watermark; no map-provider branding; no UI chrome. Ensure Chinese readability on a phone screen at scroll distance. High production polish.
Avoid: watermarks, signatures, Google branding, fake logos, distorted text, Chinese typos, English spelling errors, AI artifacts, messy overlapping headline, tiny unreadable copy, dull corporate look, excessive empty space, photorealism, 3D globe, mascots, cartoon characters, stickers, emoji, NSFW content.
```

## 验收记录

- 标题逐字核对：`澳洲已经被FDE岗位包围了！`
- 城市英文核对：Sydney / Melbourne / Brisbane / Perth / Adelaide
- 免责声明核对：`岗位分布趋势示意｜非精确数量`
- 不含公司 Logo、薪资数字、岗位数量或地图平台品牌
- 图片模型原图为非 3:4，最终仅补宽并高质量缩放至 1080×1440；主体、文字和地图内容未改写

## Cover B｜专业编辑版

用户反馈后对 Cover A 做定点修改：

- 删除 `KIKI的分享日记`
- 删除 `岗位分布趋势示意｜非精确数量`
- 删除黄色涂鸦、奶油色贴纸底和卡通描边
- 保留澳洲地图、密集彩色岗位点及五个城市英文标签
- 主标题改为深海军蓝现代黑体，`FDE` 使用克制的珊瑚红强调
- 图片模型负责重构底图，最终标题使用 Microsoft YaHei UI 确定性排版，避免近似字形

最终可见文字：

```text
澳洲已经被
FDE岗位包围了！
```

最终尺寸：`1080×1440`。

## Cover D｜大字压屏版

- 保留 Cover C 的标题、澳大利亚国旗、地图与岗位点
- 标题区扩大到画布上方约三分之一
- `澳洲要被`、`FDE`、`岗位包围了！`整体恢复到第一版的大字比例
- `FDE` 为最大视觉锚点，缩短手机信息流里的识别时间
- 最终标题继续使用 Microsoft YaHei UI 确定性排版

最终尺寸：`1080×1440`。

## Cover C｜标题精简＋澳大利亚国旗

- 将 `澳洲已经被` 改为 `澳洲要被`
- 标题区右上角加入小尺寸澳大利亚国旗
- 保持专业编辑排版、地图、岗位点和城市标签不变
- 国旗由图片模型完成局部编辑，标题继续使用 Microsoft YaHei UI 确定性排版

最终可见标题：

```text
澳洲要被
FDE岗位包围了！
```

最终尺寸：`1080×1440`。
