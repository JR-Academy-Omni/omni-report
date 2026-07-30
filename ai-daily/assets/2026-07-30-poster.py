from pathlib import Path
import textwrap

from PIL import Image, ImageDraw, ImageFilter, ImageFont

ROOT = Path(__file__).resolve().parents[3]
W, H = 1054, 1492


def font(size, weight=6):
    return ImageFont.truetype("/System/Library/Fonts/PingFang.ttc", size, index=weight)


def rgb(value):
    value = value.lstrip("#")
    return tuple(int(value[i : i + 2], 16) for i in (0, 2, 4))


def fit_text(draw, text, font_obj, max_width):
    current = ""
    lines = []
    for ch in text:
        trial = current + ch
        if draw.textbbox((0, 0), trial, font=font_obj)[2] <= max_width:
            current = trial
        else:
            if current:
                lines.append(current)
            current = ch
    if current:
        lines.append(current)
    return lines


def draw_centered(draw, box, text, font_obj, fill):
    x1, y1, x2, y2 = box
    bbox = draw.textbbox((0, 0), text, font=font_obj)
    tw = bbox[2] - bbox[0]
    th = bbox[3] - bbox[1]
    draw.text((x1 + (x2 - x1 - tw) / 2, y1 + (y2 - y1 - th) / 2 - 2), text, font=font_obj, fill=fill)


def draw_calendar(draw, x, y, color="#5b5f66"):
    draw.rounded_rectangle((x, y, x + 20, y + 20), 5, outline=color, width=2)
    draw.line((x + 5, y + 8, x + 15, y + 8), fill=color, width=2)
    draw.line((x + 6, y - 2, x + 6, y + 5), fill=color, width=2)
    draw.line((x + 14, y - 2, x + 14, y + 5), fill=color, width=2)


def draw_memory(draw, box, color="white"):
    x1, y1, x2, y2 = box
    cx, cy = (x1 + x2) / 2, (y1 + y2) / 2
    draw.rounded_rectangle((cx - 32, cy - 24, cx + 32, cy + 24), 9, outline=color, width=5)
    for dx in (-20, -8, 8, 20):
        draw.line((cx + dx, cy - 36, cx + dx, cy - 25), fill=color, width=4)
        draw.line((cx + dx, cy + 25, cx + dx, cy + 36), fill=color, width=4)
    draw.line((cx - 20, cy + 2, cx - 7, cy + 14), fill=color, width=5)
    draw.line((cx - 7, cy + 14, cx + 24, cy - 16), fill=color, width=5)


def draw_research(draw, box, color="white"):
    x1, y1, x2, y2 = box
    cx, cy = (x1 + x2) / 2, (y1 + y2) / 2
    draw.rounded_rectangle((cx - 34, cy - 35, cx + 22, cy + 30), 8, outline=color, width=5)
    for yy, w in [(-18, 28), (-3, 32), (12, 22)]:
        draw.line((cx - 22, cy + yy, cx - 22 + w, cy + yy), fill=color, width=4)
    draw.ellipse((cx + 8, cy + 5, cx + 40, cy + 37), outline=color, width=5)
    draw.line((cx + 34, cy + 31, cx + 48, cy + 45), fill=color, width=5)


def draw_review(draw, box, color="white"):
    x1, y1, x2, y2 = box
    cx, cy = (x1 + x2) / 2, (y1 + y2) / 2
    draw.rounded_rectangle((cx - 38, cy - 28, cx + 38, cy + 28), 9, outline=color, width=5)
    draw.line((cx - 20, cy - 4, cx - 6, cy + 12), fill=color, width=5)
    draw.line((cx - 6, cy + 12, cx + 24, cy - 16), fill=color, width=5)
    draw.line((cx - 24, cy + 28, cx - 8, cy + 42), fill=color, width=5)


def draw_speed(draw, box, color="white"):
    x1, y1, x2, y2 = box
    cx, cy = (x1 + x2) / 2, (y1 + y2) / 2
    draw.arc((cx - 38, cy - 28, cx + 38, cy + 48), 200, 340, fill=color, width=5)
    draw.line((cx, cy + 11, cx + 26, cy - 18), fill=color, width=5)
    draw.ellipse((cx - 7, cy + 4, cx + 7, cy + 18), fill=color)
    draw.line((cx - 40, cy + 45, cx + 40, cy + 45), fill=color, width=5)
    draw.line((cx - 36, cy - 16, cx - 14, cy - 16), fill=color, width=5)
    draw.line((cx - 36, cy, cx - 22, cy), fill=color, width=5)


def draw_shield(draw, box, color="white"):
    x1, y1, x2, y2 = box
    cx, cy = (x1 + x2) / 2, (y1 + y2) / 2
    pts = [
        (cx, cy - 42),
        (cx + 36, cy - 25),
        (cx + 30, cy + 18),
        (cx, cy + 45),
        (cx - 30, cy + 18),
        (cx - 36, cy - 25),
    ]
    draw.line(pts + [pts[0]], fill=color, width=5, joint="curve")
    draw.line((cx - 15, cy + 2, cx - 4, cy + 15), fill=color, width=5)
    draw.line((cx - 4, cy + 15, cx + 20, cy - 16), fill=color, width=5)


def draw_icon_tile(draw, box, color, icon_fn):
    x1, y1, x2, y2 = box
    glow = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    gd = ImageDraw.Draw(glow)
    gd.rounded_rectangle((x1 - 6, y1 - 4, x2 + 6, y2 + 4), 18, fill=rgb(color) + (22,))
    glow = glow.filter(ImageFilter.GaussianBlur(8))
    canvas.alpha_composite(glow)
    draw.rounded_rectangle(box, 18, fill=color)
    icon_fn(draw, box, "white")


img = Image.new("RGBA", (W, H), "#fbfaf8")
canvas = Image.new("RGBA", (W, H), (0, 0, 0, 0))
d = ImageDraw.Draw(canvas)

outer = (10, 12, W - 10, H - 10)
d.rounded_rectangle(outer, 28, fill=(255, 255, 255, 248), outline=rgb("e8e0dc"), width=2)

# Header
header = (24, 28, W - 24, 150)
d.rounded_rectangle(header, 24, fill="white", outline=rgb("e6ddd8"), width=2)
logo = Image.open(ROOT / "jr-academy-brand/assets/logo/logo-zh-full.png").convert("RGBA")
logo = logo.crop(logo.getbbox())
logo = logo.resize((int(logo.width * 70 / logo.height), 70), Image.LANCZOS)
canvas.alpha_composite(logo, (48, 52))
d.text((330, 64), "AI", font=font(34, 8), fill="#ff2419")
d.text((390, 60), "日报 · TOP 5", font=font(38, 8), fill="#15161b")
d.rounded_rectangle((650, 48, 802, 102), 18, fill="white", outline=rgb("dfd2cc"), width=2)
draw_centered(d, (650, 48, 802, 102), "学AI来匠人", font(18, 6), "#2f3035")
d.rounded_rectangle((832, 48, 1028, 102), 18, fill="white", outline=rgb("dfd2cc"), width=2)
draw_calendar(d, 854, 66)
d.text((884, 64), "2026 · 07 · 30", font=font(18, 6), fill="#555963")

# Hero
hero = (24, 162, W - 24, 664)
d.rounded_rectangle(hero, 24, fill=(255, 251, 251, 255), outline=rgb("ecded9"), width=2)
soft = Image.new("RGBA", (W, H), (0, 0, 0, 0))
sd = ImageDraw.Draw(soft)
sd.ellipse((520, 190, 1040, 630), fill=(255, 235, 230, 70))
sd.ellipse((20, 170, 520, 600), fill=(255, 245, 245, 55))
soft = soft.filter(ImageFilter.GaussianBlur(40))
canvas.alpha_composite(soft)

d.rounded_rectangle((54, 194, 424, 254), 30, fill="#ff1f13")
d.ellipse((76, 206, 122, 252), fill="white")
d.text((138, 210), "今日 AI 日历 · HIGHLIGHT", font=font(22, 8), fill="white")

d.text((54, 300), "7月30日", font=font(68, 8), fill="#111216")
d.text((54, 416), "AI 新闻榜", font=font(68, 8), fill="#111216")
summary = "OpenAI 连发模型记忆、科研分发和效率栈，GitHub 把团队上下文带进 code review。"
for i, line in enumerate(fit_text(d, summary, font(23, 6), 600)[:2]):
    d.text((56, 504 + i * 31), line, font=font(23, 6), fill="#55575e")
d.rounded_rectangle((56, 586, 64, 636), 4, fill="#f51d14")
highlight = "今日重点：ARC-AGI-3、科研计划、Copilot review、推理降本、Agent 安全"
for i, line in enumerate(fit_text(d, highlight, font(19, 8), 620)[:2]):
    d.text((82, 586 + i * 26), line, font=font(19, 8), fill="#f51d14")

mascot = Image.open(ROOT / "jr-academy-brand/assets/mascot/official/01-hero-fullbody.png").convert("RGBA")
mascot = mascot.crop(mascot.getbbox())
mascot = mascot.resize((int(mascot.width * 410 / mascot.height), 410), Image.LANCZOS)
shadow = Image.new("RGBA", mascot.size, (0, 0, 0, 0))
shadow.paste((0, 0, 0, 22), (8, 10), mascot.getchannel("A"))
shadow = shadow.filter(ImageFilter.GaussianBlur(7))
canvas.alpha_composite(shadow, (710, 206))
canvas.alpha_composite(mascot, (708, 198))
d.text((694, 218), "✦", font=font(42, 8), fill="#ffb51f")

# Cards
items = [
    ("01", "#ff2a1e", "模型能力", "GPT-5.6 Sol 因保留推理与压缩记忆，ARC-AGI-3 分数提升 3 倍", "#ff5b5b", draw_memory),
    ("02", "#1976ff", "科研分发", "OpenAI 向 10 万名科研人员免费开放 ChatGPT 前沿模型与工具", "#2f7df3", draw_research),
    ("03", "#ff8300", "Agent 编程", "Copilot review：Agent skills 与 MCP 正式 GA", "#ff9215", draw_review),
    ("04", "#8b55ff", "模型效率", "GPT-5.6 优化 OpenAI 推理栈，端到端服务成本降 20%", "#9367f5", draw_speed),
    ("05", "#11a66a", "安全治理", "OpenAI 失控研究 Agent 事件扩大：另涉 4 个服务账号", "#20b975", draw_shield),
]

y0 = 686
gap = 16
card_h = 132
for idx, (num, num_color, tag, title, tile_color, icon_fn) in enumerate(items):
    y = y0 + idx * (card_h + gap)
    d.rounded_rectangle((24, y, W - 24, y + card_h), 22, fill="white", outline=rgb("ece4df"), width=2)
    d.text((52, y + 38), num, font=font(46, 8), fill="white", stroke_width=2, stroke_fill=num_color)
    d.line((176, y + 28, 176, y + card_h - 28), fill=rgb("ded6d1"), width=2)
    tag_w = d.textbbox((0, 0), tag, font=font(20, 8))[2] + 32
    d.rounded_rectangle((214, y + 22, 214 + tag_w, y + 56), 17, fill="white", outline=rgb("e7dcd6"), width=2)
    d.text((230, y + 24), tag, font=font(20, 8), fill=num_color)
    lines = fit_text(d, title, font(27, 8), 600)
    ty = y + 70 if len(lines) == 1 else y + 60
    for line in lines[:2]:
        d.text((216, ty), line, font=font(27, 8), fill="#15161b")
        ty += 34
    draw_icon_tile(d, (850, y + 24, 1014, y + 108), tile_color, icon_fn)

# Footer
d.rounded_rectangle((24, H - 68, W - 24, H - 20), 18, fill="white", outline=rgb("eadfd9"), width=2)
d.text((52, H - 55), "AI DAILY", font=font(18, 6), fill="#6b6f76")
d.text((910, H - 55), "TOP 5", font=font(18, 6), fill="#6b6f76")

img = Image.alpha_composite(img, canvas).convert("RGB")
out = ROOT / "omni-report/ai-daily/assets/2026-07-30-poster-generated.png"
img.save(out, quality=95)
print(out)
