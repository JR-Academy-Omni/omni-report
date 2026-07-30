from pathlib import Path
import textwrap

from PIL import Image, ImageDraw, ImageFilter, ImageFont

ROOT = Path(__file__).resolve().parents[3]
W, H = 1024, 1536


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


def draw_arc_score_art(draw, box, color):
    x1, y1, x2, y2 = box
    cx, cy = (x1 + x2) / 2, (y1 + y2) / 2
    draw.rounded_rectangle((cx - 72, cy - 28, cx - 2, cy + 28), 10, outline=color, width=4)
    draw.text((cx - 60, cy - 17), "ARC", font=font(16, 8), fill=color)
    draw.line((cx - 58, cy + 9, cx - 18, cy + 9), fill=color, width=4)
    draw.line((cx - 58, cy + 20, cx - 30, cy + 20), fill=color, width=4)
    draw.rounded_rectangle((cx + 18, cy - 28, cx + 82, cy + 28), 12, outline=color, width=4)
    draw.text((cx + 34, cy - 18), "3x", font=font(26, 8), fill=color)
    draw.line((cx + 34, cy + 17, cx + 68, cy - 12), fill=color, width=4)
    draw.line((cx + 68, cy - 12, cx + 68, cy + 5), fill=color, width=4)


def draw_research_art(draw, box, color):
    x1, y1, x2, y2 = box
    cx, cy = (x1 + x2) / 2, (y1 + y2) / 2
    draw.rounded_rectangle((cx - 82, cy - 34, cx - 30, cy + 34), 8, outline=color, width=4)
    draw.line((cx - 70, cy - 16, cx - 43, cy - 16), fill=color, width=4)
    draw.line((cx - 70, cy - 1, cx - 38, cy - 1), fill=color, width=4)
    draw.line((cx - 70, cy + 14, cx - 50, cy + 14), fill=color, width=4)
    draw.ellipse((cx - 18, cy - 20, cx + 24, cy + 22), outline=color, width=4)
    draw.line((cx + 17, cy + 16, cx + 42, cy + 40), fill=color, width=4)
    draw.text((cx + 46, cy - 22), "10万", font=font(20, 8), fill=color)
    draw.line((cx + 48, cy + 8, cx + 82, cy + 8), fill=color, width=4)


def draw_mcp_review_art(draw, box, color):
    x1, y1, x2, y2 = box
    cx, cy = (x1 + x2) / 2, (y1 + y2) / 2
    draw.rounded_rectangle((cx - 86, cy - 30, cx - 28, cy + 18), 8, outline=color, width=4)
    draw.line((cx - 72, cy - 6, cx - 60, cy + 7), fill=color, width=4)
    draw.line((cx - 60, cy + 7, cx - 41, cy - 14), fill=color, width=4)
    draw.line((cx - 64, cy + 18, cx - 48, cy + 34), fill=color, width=4)
    nodes = [(cx + 2, cy - 23), (cx + 56, cy - 23), (cx + 30, cy + 24)]
    for nx, ny in nodes:
        draw.ellipse((nx - 9, ny - 9, nx + 9, ny + 9), outline=color, width=4)
    draw.line((nodes[0][0] + 9, nodes[0][1], nodes[1][0] - 9, nodes[1][1]), fill=color, width=4)
    draw.line((nodes[0][0] + 6, nodes[0][1] + 7, nodes[2][0] - 6, nodes[2][1] - 7), fill=color, width=4)
    draw.line((nodes[1][0] - 6, nodes[1][1] + 7, nodes[2][0] + 6, nodes[2][1] - 7), fill=color, width=4)


def draw_cost_drop_art(draw, box, color):
    x1, y1, x2, y2 = box
    cx, cy = (x1 + x2) / 2, (y1 + y2) / 2
    draw.arc((cx - 82, cy - 42, cx - 18, cy + 22), 205, 340, fill=color, width=5)
    draw.line((cx - 50, cy - 3, cx - 23, cy - 30), fill=color, width=5)
    draw.ellipse((cx - 57, cy - 10, cx - 43, cy + 4), fill=color)
    draw.line((cx - 84, cy + 33, cx - 10, cy + 33), fill=color, width=5)
    draw.text((cx + 2, cy - 26), "-20%", font=font(27, 8), fill=color)
    draw.line((cx + 56, cy - 18, cx + 56, cy + 24), fill=color, width=5)
    draw.polygon([(cx + 42, cy + 12), (cx + 70, cy + 12), (cx + 56, cy + 32)], outline=color, fill=None)


def draw_security_accounts_art(draw, box, color):
    x1, y1, x2, y2 = box
    cx, cy = (x1 + x2) / 2, (y1 + y2) / 2
    pts = [(cx - 66, cy - 38), (cx - 32, cy - 23), (cx - 38, cy + 20), (cx - 66, cy + 42), (cx - 94, cy + 20), (cx - 100, cy - 23)]
    draw.line(pts + [pts[0]], fill=color, width=4)
    draw.line((cx - 78, cy + 1, cx - 66, cy + 15), fill=color, width=4)
    draw.line((cx - 66, cy + 15, cx - 46, cy - 13), fill=color, width=4)
    for i, (dx, dy) in enumerate([(0, -26), (42, -26), (0, 24), (42, 24)]):
        px, py = cx + dx, cy + dy
        draw.ellipse((px - 10, py - 10, px + 10, py + 10), outline=color, width=4)
        draw.line((px - 16, py + 18, px + 16, py + 18), fill=color, width=4)
    draw.text((cx + 72, cy - 18), "4", font=font(32, 8), fill=color)


def draw_icon_tile(draw, box, color, icon_fn):
    x1, y1, x2, y2 = box
    glow = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    gd = ImageDraw.Draw(glow)
    gd.rounded_rectangle((x1 - 6, y1 - 4, x2 + 6, y2 + 4), 18, fill=rgb(color) + (22,))
    glow = glow.filter(ImageFilter.GaussianBlur(8))
    canvas.alpha_composite(glow)
    draw.rounded_rectangle(box, 18, fill=color)
    icon_fn(draw, box, "white")


def rounded_gradient(box, start_hex, end_hex, radius=22):
    x1, y1, x2, y2 = box
    w, h = x2 - x1, y2 - y1
    grad = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    gd = ImageDraw.Draw(grad)
    sr, sg, sb = rgb(start_hex)
    er, eg, eb = rgb(end_hex)
    for x in range(w):
        t = x / max(1, w - 1)
        r = int(sr * (1 - t) + er * t)
        g = int(sg * (1 - t) + eg * t)
        b = int(sb * (1 - t) + eb * t)
        gd.line((x, 0, x, h), fill=(r, g, b, 255))
    mask = Image.new("L", (w, h), 0)
    ImageDraw.Draw(mask).rounded_rectangle((0, 0, w, h), radius, fill=255)
    grad.putalpha(mask)
    return grad


img = Image.new("RGBA", (W, H), "#fbfaf8")
canvas = Image.new("RGBA", (W, H), (0, 0, 0, 0))
d = ImageDraw.Draw(canvas)

outer = (10, 12, W - 10, H - 10)
d.rounded_rectangle(outer, 28, fill=(255, 255, 255, 248), outline=rgb("e8e0dc"), width=2)

# Header
header = (24, 28, W - 24, 158)
d.rounded_rectangle(header, 24, fill="white", outline=rgb("e6ddd8"), width=2)
logo = Image.open(ROOT / "jr-academy-brand/assets/logo/logo-zh-full.png").convert("RGBA")
logo = logo.crop(logo.getbbox())
logo = logo.resize((int(logo.width * 70 / logo.height), 70), Image.LANCZOS)
canvas.alpha_composite(logo, (48, 52))
d.text((330, 64), "AI", font=font(34, 8), fill="#ff2419")
d.text((390, 60), "日报 · TOP 5", font=font(38, 8), fill="#15161b")
d.rounded_rectangle((804, 54, 988, 104), 25, fill="#f7f7fb")
d.text((834, 64), "2026 · 07 · 30", font=font(22, 8), fill="#132199")
d.line((24, 164, W - 24, 164), fill=rgb("eee8e4"), width=1)

# Hero
hero = (36, 184, W - 36, 782)
d.rounded_rectangle(hero, 24, fill=(255, 250, 250, 255), outline=rgb("ecdeda"), width=2)
soft = Image.new("RGBA", (W, H), (0, 0, 0, 0))
sd = ImageDraw.Draw(soft)
sd.ellipse((560, 210, 1040, 740), fill=(255, 232, 230, 86))
sd.ellipse((20, 190, 610, 740), fill=(255, 247, 247, 60))
soft = soft.filter(ImageFilter.GaussianBlur(40))
canvas.alpha_composite(soft)

d.rounded_rectangle((54, 194, 226, 248), 27, fill="#ff1f13")
d.ellipse((70, 206, 112, 248), fill="white")
d.ellipse((80, 216, 102, 238), outline="#ff1f13", width=5)
d.line((91, 206, 91, 248), fill="#ff1f13", width=4)
d.text((124, 209), "今日主线", font=font(23, 8), fill="white")

headline_lines = ["OpenAI 把模型", "记忆、科研分发", "和效率栈连续公开"]
for i, line in enumerate(headline_lines):
    d.text((74, 280 + i * 82), line, font=font(64, 8), fill="#050506")

summary_lines = ["GitHub 把团队上下文带进 code review，", "Agent 安全事件提醒治理不能事后补丁"]
for i, line in enumerate(summary_lines):
    d.text((76, 545 + i * 35), line, font=font(24, 4), fill="#111827")

d.rounded_rectangle((76, 662, 84, 740), 4, fill="#ff1f13")
insight_lines = ["今天主线不是单一模型榜单，", "而是 AI 产品继续变成真实系统。"]
for i, line in enumerate(insight_lines):
    d.text((102, 662 + i * 36), line, font=font(25, 8), fill="#111216")

mascot = Image.open(ROOT / "jr-academy-brand/assets/mascot/official/01-hero-fullbody.png").convert("RGBA")
mascot = mascot.crop(mascot.getbbox())
mascot = mascot.resize((int(mascot.width * 500 / mascot.height), 500), Image.LANCZOS)
shadow = Image.new("RGBA", mascot.size, (0, 0, 0, 0))
shadow.paste((0, 0, 0, 22), (8, 10), mascot.getchannel("A"))
shadow = shadow.filter(ImageFilter.GaussianBlur(7))
canvas.alpha_composite(shadow, (650, 232))
canvas.alpha_composite(mascot, (646, 222))

# Cards
items = [
    ("01", "#ff2a1e", "模型能力", "GPT-5.6 Sol：记忆机制让分数提升 3 倍", "#fffafa", "#ffe7e7", draw_arc_score_art),
    ("02", "#1976ff", "科研分发", "OpenAI 向 10 万科研人员开放前沿工具", "#fbfdff", "#e7f0ff", draw_research_art),
    ("03", "#ff8300", "Agent 编程", "Copilot review 接入 Agent skills 与 MCP", "#fffdf9", "#fff0df", draw_mcp_review_art),
    ("04", "#8b55ff", "模型效率", "GPT-5.6 优化推理栈，服务成本降 20%", "#fdfbff", "#efe6ff", draw_cost_drop_art),
    ("05", "#11a66a", "安全治理", "OpenAI 研究 Agent 失控，波及 4 个账号", "#fbfffd", "#dcf5ee", draw_security_accounts_art),
]

y0 = 806
gap = 14
card_h = 120
for idx, (num, num_color, tag, title, grad_a, grad_b, icon_fn) in enumerate(items):
    y = y0 + idx * (card_h + gap)
    canvas.alpha_composite(rounded_gradient((36, y, W - 36, y + card_h), grad_a, grad_b, 22), (36, y))
    d.rounded_rectangle((24, y, W - 24, y + card_h), 22, fill="white", outline=rgb("ece4df"), width=2)
    canvas.alpha_composite(rounded_gradient((36, y + 2, W - 36, y + card_h - 2), grad_a, grad_b, 22), (36, y + 2))
    d.text((52, y + 30), num, font=font(46, 8), fill="white", stroke_width=2, stroke_fill=num_color)
    d.line((176, y + 28, 176, y + card_h - 28), fill=rgb("ded6d1"), width=2)
    tag_w = d.textbbox((0, 0), tag, font=font(20, 8))[2] + 32
    d.rounded_rectangle((214, y + 22, 214 + tag_w, y + 56), 17, fill="white", outline=rgb("e7dcd6"), width=2)
    d.text((230, y + 24), tag, font=font(20, 8), fill=num_color)
    lines = fit_text(d, title, font(24, 8), 470)
    ty = y + 70 if len(lines) == 1 else y + 59
    for line in lines[:2]:
        d.text((216, ty), line, font=font(24, 8), fill="#15161b")
        ty += 31
    icon_fn(d, (700, y + 22, 974, y + 102), num_color)

# Footer
d.rounded_rectangle((24, H - 68, W - 24, H - 20), 18, fill="white", outline=rgb("eadfd9"), width=2)
d.text((52, H - 55), "AI DAILY", font=font(18, 6), fill="#6b6f76")
d.text((910, H - 55), "TOP 5", font=font(18, 6), fill="#6b6f76")

img = Image.alpha_composite(img, canvas).convert("RGB")
out = ROOT / "omni-report/ai-daily/assets/2026-07-30-poster-generated.png"
img.save(out, quality=95)
print(out)
