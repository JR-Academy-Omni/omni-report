from pathlib import Path

ROOT = Path(__file__).resolve().parents[3]

from PIL import Image, ImageDraw, ImageFilter, ImageFont

W, H = 979, 1386
img = Image.new("RGBA", (W, H), "#fcfbf8")
base = Image.new("RGBA", (W, H), (0, 0, 0, 0))
d = ImageDraw.Draw(base)


def rgb(h):
    h = h.lstrip("#")
    return tuple(int(h[i : i + 2], 16) for i in (0, 2, 4))


def font(size, weight=6):
    return ImageFont.truetype("/System/Library/Fonts/PingFang.ttc", size, index=weight)


def draw_calendar(draw, x, y, s, color):
    draw.rounded_rectangle((x, y, x + s, y + s), 6, outline=color, width=2)
    draw.line((x + 6, y + 12, x + s - 6, y + 12), fill=color, width=2)
    draw.line((x + 10, y - 2, x + 10, y + 7), fill=color, width=2)
    draw.line((x + s - 10, y - 2, x + s - 10, y + 7), fill=color, width=2)


def draw_flame_icon(draw, x, y, scale=1.0, color="#ff2619"):
    outer = [
        (x + 12 * scale, y + 1 * scale),
        (x + 17 * scale, y + 6 * scale),
        (x + 18 * scale, y + 12 * scale),
        (x + 15 * scale, y + 18 * scale),
        (x + 12 * scale, y + 22 * scale),
        (x + 8 * scale, y + 18 * scale),
        (x + 6 * scale, y + 13 * scale),
        (x + 6 * scale, y + 8 * scale),
        (x + 9 * scale, y + 4 * scale),
    ]
    inner = [
        (x + 12 * scale, y + 8 * scale),
        (x + 14 * scale, y + 12 * scale),
        (x + 13 * scale, y + 16 * scale),
        (x + 10 * scale, y + 17 * scale),
        (x + 9 * scale, y + 14 * scale),
        (x + 10 * scale, y + 11 * scale),
    ]
    draw.polygon(outer, fill=color)
    draw.polygon(inner, fill="white")
    draw.ellipse((x + 7 * scale, y + 17 * scale, x + 17 * scale, y + 27 * scale), fill=color)
    draw.ellipse((x + 10 * scale, y + 20 * scale, x + 14 * scale, y + 24 * scale), fill="white")


def draw_target_icon(draw, x, y, color="#ff3a2d"):
    draw.ellipse((x, y, x + 22, y + 22), outline=color, width=3)
    draw.ellipse((x + 6, y + 6, x + 16, y + 16), outline=color, width=3)
    draw.line((x + 17, y + 5, x + 26, y - 4), fill=color, width=3)
    draw.line((x + 20, y - 2, x + 27, y - 2), fill=color, width=3)
    draw.line((x + 25, y - 1, x + 25, y + 6), fill=color, width=3)


def draw_star4(draw, cx, cy, r, color):
    pts = [
        (cx, cy - r),
        (cx + r * 0.35, cy - r * 0.35),
        (cx + r, cy),
        (cx + r * 0.35, cy + r * 0.35),
        (cx, cy + r),
        (cx - r * 0.35, cy + r * 0.35),
        (cx - r, cy),
        (cx - r * 0.35, cy - r * 0.35),
    ]
    draw.polygon(pts, fill=color)


def draw_squiggle(draw, x, y, color):
    pts = [
        (x, y + 12),
        (x + 8, y + 20),
        (x + 18, y + 19),
        (x + 28, y + 11),
        (x + 34, y - 2),
        (x + 34, y - 15),
        (x + 27, y - 25),
    ]
    draw.line(pts, fill=color, width=3)
    draw.arc((x - 8, y + 3, x + 6, y + 18), 40, 250, fill=color, width=3)


def outline_text(draw, pos, text, font_obj, outline_color, fill_color, stroke=2):
    draw.text(
        pos,
        text,
        font=font_obj,
        fill=fill_color,
        stroke_width=stroke,
        stroke_fill=outline_color,
    )


def faux_bold_text(draw, pos, text, font_obj, fill, offsets):
    x, y = pos
    for dx, dy in offsets:
        draw.text((x + dx, y + dy), text, font=font_obj, fill=fill)


def draw_model(draw, box, color="white"):
    x1, y1, x2, y2 = box
    cx = (x1 + x2) / 2
    cy = (y1 + y2) / 2
    draw.rounded_rectangle((cx - 28, cy - 22, cx + 28, cy + 22), 10, outline=color, width=4)
    for dx in (-18, 0, 18):
        draw.ellipse((cx + dx - 4, cy - 4, cx + dx + 4, cy + 4), fill=color)
    draw.line((cx - 12, cy - 28, cx - 12, cy - 22), fill=color, width=3)
    draw.line((cx + 12, cy - 28, cx + 12, cy - 22), fill=color, width=3)
    draw.line((cx - 12, cy + 22, cx - 12, cy + 28), fill=color, width=3)
    draw.line((cx + 12, cy + 22, cx + 12, cy + 28), fill=color, width=3)


def draw_chip(draw, box, color="white"):
    x1, y1, x2, y2 = box
    cx = (x1 + x2) / 2
    cy = (y1 + y2) / 2
    draw.rounded_rectangle((cx - 18, cy - 18, cx + 18, cy + 18), 6, outline=color, width=4)
    for offset in (-26, -18, -10, 10, 18, 26):
        draw.line((cx + offset, cy - 28, cx + offset, cy - 18), fill=color, width=3)
        draw.line((cx + offset, cy + 18, cx + offset, cy + 28), fill=color, width=3)
    draw.line((cx - 28, cy - 10, cx - 18, cy - 10), fill=color, width=3)
    draw.line((cx - 28, cy + 10, cx - 18, cy + 10), fill=color, width=3)
    draw.line((cx + 18, cy - 10, cx + 28, cy - 10), fill=color, width=3)
    draw.line((cx + 18, cy + 10, cx + 28, cy + 10), fill=color, width=3)


def draw_image_icon(draw, box, color="white"):
    x1, y1, x2, y2 = box
    pad = 20
    draw.rounded_rectangle((x1 + pad, y1 + pad, x2 - pad, y2 - pad), 10, outline=color, width=4)
    draw.ellipse((x1 + 34, y1 + 30, x1 + 48, y1 + 44), fill=color)
    draw.line((x1 + 34, y2 - 34, x1 + 54, y1 + 58, x1 + 78, y2 - 34), fill=color, width=4)
    draw.line((x1 + 54, y2 - 34, x1 + 68, y1 + 70, x2 - 32, y2 - 34), fill=color, width=4)


page = (8, 10, W - 8, H - 10)
d.rounded_rectangle(page, 26, fill=(255, 255, 255, 246), outline=rgb("e8e3df"), width=2)

header = (20, 26, W - 20, 138)
d.rounded_rectangle(header, 22, fill="white", outline=rgb("ebe5e0"), width=2)
logo = Image.open(
    ROOT / "jr-academy-brand/assets/logo/logo-zh-full.png"
).convert("RGBA")
logo = logo.crop(logo.getbbox())
ratio = 64 / logo.height
logo = logo.resize((int(logo.width * ratio), 64), Image.LANCZOS)
base.alpha_composite(logo, (30, 42))
d.text((300, 48), "AI", font=font(34, 8), fill="#ff2419")
d.text((364, 48), "日报 · TOP 4", font=font(34, 8), fill="#111216")
d.rounded_rectangle((607, 42, 748, 94), 20, fill="white", outline=rgb("e6dfdb"), width=2)
d.text((623, 57), "学AI来匠人", font=font(17, 6), fill="#2b2c31")
d.text((725, 57), "✦", font=font(16, 6), fill="#ff3128")
d.rounded_rectangle((776, 42, 954, 94), 20, fill="white", outline=rgb("e6dfdb"), width=2)
draw_calendar(d, 790, 55, 18, "#6d6f76")
d.text((816, 58), "2026 · 07 · 14", font=font(17, 6), fill="#4f5258")

hero = (20, 152, W - 20, 646)
hero_card = Image.new("RGBA", (hero[2] - hero[0], hero[3] - hero[1]), (0, 0, 0, 0))
hd = ImageDraw.Draw(hero_card)
hd.rounded_rectangle((0, 0, hero_card.size[0], hero_card.size[1]), 24, fill=(255, 250, 250, 255), outline=rgb("f0e4e0"), width=2)
layer = Image.new("RGBA", hero_card.size, (0, 0, 0, 0))
g = ImageDraw.Draw(layer)
g.ellipse((210, 100, 690, 370), fill=(255, 235, 235, 50))
g.ellipse((620, 100, 860, 290), fill=(255, 245, 230, 28))
layer = layer.filter(ImageFilter.GaussianBlur(55))
hero_card = Image.alpha_composite(hero_card, layer)
base.alpha_composite(hero_card, (hero[0], hero[1]))

d.rounded_rectangle((50, 182, 404, 236), 26, fill="#ff1f13", outline="#ff1f13", width=2)
d.ellipse((62, 193, 104, 235), fill="white", outline="#ff4a3d", width=2)
draw_flame_icon(d, 71, 198, 1.1, "#ff2619")
d.text((112, 196), "今日 AI 日历 · HIGHLIGHT", font=font(18, 8), fill="white")
faux_bold_text(d, (48, 258), "7月14日", font(70, 8), "#101114", [(0, 0), (1, 0), (0, 1)])
faux_bold_text(d, (48, 356), "AI 新闻榜", font(76, 8), "#101114", [(0, 0), (1, 0), (0, 1)])
d.text((48, 468), "what changed today, why it matters, and what to watch next.", font=font(25, 1), fill="#5f5a58")
draw_target_icon(d, 50, 520, "#ff3a2d")
d.text((84, 520), "头条：Meta 回撤争议图像 AI，GLM-5.2、WAIC 与 MiniMax 继续发酵。", font=font(18, 6), fill="#2f3034")
d.rounded_rectangle((48, 576, 730, 622), 23, fill="#ef140d", outline="#ef140d", width=2)
d.text((68, 585), "发布潮过后，真正继续发酵的是权限边界、模型价格、会展窗口和算力投入", font=font(17, 8), fill="white")
d.text((770, 590), "4 条", font=font(20, 6), fill="#ff2a1e")

mc = Image.open(
    ROOT / "jr-academy-brand/assets/mascot/official/01-hero-fullbody.png"
).convert("RGBA")
ratio = 410 / mc.height
mc = mc.resize((int(mc.width * ratio), 410), Image.LANCZOS)
shadow = Image.new("RGBA", mc.size, (0, 0, 0, 0))
shadow.paste((0, 0, 0, 14), (5, 7), mc.getchannel("A"))
shadow = shadow.filter(ImageFilter.GaussianBlur(5))
base.alpha_composite(shadow, (642, 178))
base.alpha_composite(mc, (642, 170))
draw_star4(d, 648, 230, 14, "#ffb11d")
draw_squiggle(d, 884, 374, "#ff2a1e")

items = [
    ("01", "#ff2a1e", "后续进展", "Meta 两天内收回 Muse Image 争议能力", "#ff6b6b", draw_image_icon),
    ("02", "#1f6dff", "模型发布", "GLM-5.2 持续出圈，1M 上下文 + 免费开放冲击高价闭源编码模型", "#2d7cf3", draw_model),
    ("03", "#ff8b10", "产品窗口", "WAIC 2026 开幕前冲刺预热，1100+ 企业与 300+ 首发产品入场", "#ff9c1e", draw_calendar),
    ("04", "#18a05e", "AI 基建", "MiniMax 启动约 20 亿美元融资，继续加码 AI 基础设施和研发", "#2eb670", draw_chip),
]
ys = [690, 850, 1010, 1170]
temp = Image.new("RGBA", (10, 10))
td = ImageDraw.Draw(temp)
for (num, nc, tag, title, bc, icon_fn), y in zip(items, ys):
    d.rounded_rectangle((20, y, W - 20, y + 132), 22, fill="white", outline=rgb("ece6e1"), width=2)
    outline_text(d, (44, y + 34), num, font(48, 8), nc, (255, 255, 255, 0), stroke=2)
    d.line((164, y + 28, 164, y + 104), fill=rgb("ddd6d1"), width=2)
    bbox = td.textbbox((0, 0), tag, font=font(19, 8))
    tw = bbox[2] - bbox[0]
    d.rounded_rectangle((192, y + 16, 192 + tw + 24, y + 48), 15, fill="white", outline=rgb("ebe3df"), width=2)
    d.text((204, y + 17), tag, font=font(19, 8), fill=nc)
    maxw = 572
    cur = ""
    lines = []
    for ch in title:
        trial = cur + ch
        if td.textbbox((0, 0), trial, font=font(24, 8))[2] <= maxw:
            cur = trial
        else:
            lines.append(cur)
            cur = ch
    if cur:
        lines.append(cur)
    ty = y + 58
    for line in lines[:2]:
        d.text((196, ty), line, font=font(24, 8), fill="#141518")
        ty += 30
    ix1, iy1, ix2, iy2 = 824, y + 22, 940, y + 110
    glow = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    ImageDraw.Draw(glow).ellipse((ix1 - 5, iy1 - 2, ix2 + 5, iy2 + 5), fill=rgb(bc) + (18,))
    glow = glow.filter(ImageFilter.GaussianBlur(5))
    base.alpha_composite(glow)
    d.rounded_rectangle((ix1, iy1, ix2, iy2), 18, fill=bc, outline=(255, 255, 255, 210), width=2)
    if icon_fn is draw_calendar:
        draw_calendar(d, 860, y + 45, 40, "white")
    else:
        icon_fn(d, (ix1, iy1, ix2, iy2), "white")

footer = (20, 1328, W - 20, 1366)
d.rounded_rectangle(footer, 16, fill="white", outline=rgb("ebe4df"), width=2)
d.text((40, 1338), "AI DAILY", font=font(16, 6), fill="#66676f")
d.text((814, 1338), "TOP 4   ✧", font=font(16, 6), fill="#66676f")

out = ROOT / "omni-report/ai-daily/assets/2026-07-14-poster-generated.png"
Image.alpha_composite(img, base).save(out)
print(out)
