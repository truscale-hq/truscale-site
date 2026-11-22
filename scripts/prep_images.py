#!/usr/bin/env python3
"""Prepare product screenshots for the marketing site.

Reads the source screenshots from the app repo output folder, removes every
real business name, person name and real street address, puts the draft brand
name from site.config.json in the app logo, and writes WebP files to
dist/img. Also renders the Open Graph image.

Usage: python3 scripts/prep_images.py <dist_dir>
"""
import json
import os
import sys

from PIL import Image, ImageDraw, ImageFont

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = os.environ.get("SHOTS_SRC", "/home/claude/plandesk/out")
FONTS = os.path.join(ROOT, "scripts", "fonts-ttf")
LIB = "/usr/share/fonts/truetype/liberation"

CONFIG = json.load(open(os.path.join(ROOT, "site.config.json")))
BRAND = CONFIG["brandName"]

# Neutral replacements used across all images.
ADDRESS = "410 Sample Ln"
COMPANY = "Your Company"
COMPANY_INITIALS = "YC"
USER = "Your Name"
USER_INITIALS = "YN"

CHARCOAL = (27, 29, 31)
WHITE = (255, 255, 255)


def font(name, size):
    if name.startswith("lib:"):
        return ImageFont.truetype(os.path.join(LIB, name[4:]), size)
    return ImageFont.truetype(os.path.join(FONTS, name + ".ttf"), size)


def cover(im, box, fill=None):
    d = ImageDraw.Draw(im)
    if fill is None:
        fill = im.getpixel((box[0], box[1]))
    d.rectangle(box, fill=fill)
    return fill


def text(im, xy, s, fnt, size, color, anchor="lm"):
    """Draw text supersampled 4x so it matches browser rendering."""
    k = 4
    f = font(fnt, size * k)
    x, y = xy
    l, t, r, b = f.getbbox(s, anchor=anchor)
    x0 = max(0, int(x + l / k) - 3)
    y0 = max(0, int(y + t / k) - 3)
    x1 = min(im.width, int(x + r / k) + 4)
    y1 = min(im.height, int(y + b / k) + 4)
    patch = im.crop((x0, y0, x1, y1))
    big = patch.resize((patch.width * k, patch.height * k), Image.NEAREST)
    d = ImageDraw.Draw(big)
    d.text(((x - x0) * k, (y - y0) * k), s, font=f, fill=color, anchor=anchor)
    im.paste(big.resize(patch.size, Image.BOX), (x0, y0))


def replace(im, box, s, fnt, size, color, fill=None, anchor="lm", at=None):
    """Cover box, then write s. Default position is left edge, vertical middle."""
    cover(im, box, fill)
    if at is None:
        at = (box[0], (box[1] + box[3]) / 2)
    text(im, at, s, fnt, size, color, anchor)


def circle(im, center, r, fill):
    d = ImageDraw.Draw(im)
    cx, cy = center
    d.ellipse((cx - r, cy - r, cx + r, cy + r), fill=fill)


# Desktop sidebar (1440x900 screens). dy shifts for screens scrolled a pixel.
def sidebar(im, dy=0, recent_vivian=True):
    # Logo word
    replace(im, (50, 14 + dy, 200, 44 + dy), BRAND, "inter-tight-800", 21, WHITE, fill=CHARCOAL, at=(52, 29 + dy))
    # Company switcher
    box_bg = im.getpixel((100, 60 + dy))
    replace(im, (60, 72 + dy, 196, 107 + dy), COMPANY, "inter-600", 13, (240, 240, 240), fill=box_bg, at=(61, 89 + dy))
    # Move the "Company" label down a touch is not needed; badge initials
    cover(im, (26, 72 + dy, 48, 94 + dy), WHITE)
    text(im, (37, 83 + dy), COMPANY_INITIALS, "inter-700", 12, CHARCOAL, "mm")
    # Recent project with a real street address
    if recent_vivian:
        bg = im.getpixel((240, 409 + dy)) if False else im.getpixel((200, 409 + dy))
        replace(im, (71, 401 + dy, 200, 417 + dy), ADDRESS, "inter-500", 13, WHITE, fill=bg, at=(72, 409 + dy))
    # User block
    av = im.getpixel((20, 868 + dy))
    circle(im, (31, 868 + dy), 13, av)
    text(im, (31, 868 + dy), USER_INITIALS, "inter-600", 12, CHARCOAL, "mm")
    replace(im, (55, 852 + dy, 200, 869 + dy), USER, "inter-600", 13, WHITE, fill=CHARCOAL, at=(56, 861 + dy))


def project_header(im, dy=0):
    """Breadcrumb and dark title for the sample project with a real address."""
    crumb_bg = im.getpixel((470, 12))
    replace(im, (348, 14, 470, 37), ADDRESS, "inter-400", 13, (68, 70, 72), fill=crumb_bg, at=(350, 25.5))
    replace(im, (278, 64 + dy, 518, 104 + dy), ADDRESS, "inter-tight-800", 32, WHITE, fill=CHARCOAL, at=(280, 84 + dy))


def mobile_header(im, scale):
    s = scale
    bg = im.getpixel((int(40 * s), int(6 * s)))
    replace(im, (int(44 * s), int(12 * s), int(250 * s), int(40 * s)), COMPANY, "inter-tight-700", int(17 * s), CHARCOAL, fill=bg, at=(int(46 * s), int(26 * s)))
    circle(im, (int(365 * s), int(26 * s)), int(13.5 * s), CHARCOAL)
    text(im, (int(365 * s), int(26 * s)), USER_INITIALS, "inter-700", int(12 * s), WHITE, "mm")


def sheet_title_block(im):
    """Full-size 2592x1728 sheets: project name and design consultant."""
    cover(im, (2372, 44, 2552, 110), WHITE)
    text(im, (2462, 62), ADDRESS.upper(), "lib:LiberationSans-Bold.ttf", 15, (17, 17, 17), "mm")
    text(im, (2462, 82), "Dallas TX", "lib:LiberationSans-Regular.ttf", 9, (40, 40, 40), "mm")
    text(im, (2462, 96), "Example client", "lib:LiberationSans-Regular.ttf", 9, (40, 40, 40), "mm")
    cover(im, (2366, 140, 2552, 160), WHITE)
    text(im, (2369, 150), COMPANY, "lib:LiberationSans-Bold.ttf", 13, (17, 17, 17), "lm")


# Focused crops so text stays readable at page width. "main" drops the app
# sidebar; "focus" frames the part of the screen the copy talks about.
FOCUS = {
    "plans": (264, 286, 1424, 880),
    "takeoff": (264, 286, 1424, 900),
    "site": (264, 286, 1424, 900),
    "compliance": (264, 286, 1424, 900),
    "floor-plan": (264, 222, 1424, 900),
    "selections": (264, 52, 1424, 880),
    "projects": (264, 160, 1424, 900),
    "dashboard": (264, 52, 1424, 900),
    "model-3d": (264, 286, 1424, 900),
}


def crops(im, out_dir, name):
    save(im.crop((248, 0, 1440, 900)), out_dir, name + "-main", quality=84)
    if name in FOCUS:
        save(im.crop(FOCUS[name]), out_dir, name + "-focus", quality=84)


def load(rel):
    return Image.open(os.path.join(SRC, rel)).convert("RGB")


MANIFEST = {}


def save(im, out_dir, name, width=None, quality=82):
    if width and im.width > width:
        h = round(im.height * width / im.width)
        im = im.resize((width, h), Image.LANCZOS)
    path = os.path.join(out_dir, name + ".webp")
    im.save(path, "WEBP", quality=quality, method=6)
    entry = {"w": im.width, "h": im.height, "small": None}
    # Smaller copy for phones
    if im.width >= 1200:
        sw = 720
        small = im.resize((sw, round(im.height * sw / im.width)), Image.LANCZOS)
        small.save(os.path.join(out_dir, name + "-720.webp"), "WEBP", quality=quality, method=6)
        entry["small"] = sw
    MANIFEST[name] = entry
    return path


def build(out_dir):
    os.makedirs(out_dir, exist_ok=True)
    made = []

    # Dashboard, desktop
    im = load("ui_v2/dashboard_1440x900.png")
    sidebar(im)
    bg = im.getpixel((700, 384))
    replace(im, (442, 375, 760, 393), "PO 1422-PLB-001 is blocked", "inter-600", 15, (31, 33, 35), fill=bg, at=(443, 384))
    made.append(save(im, out_dir, "dashboard"))
    crops(im, out_dir, "dashboard")

    # Dashboard, phone (390x844 at 1x, upscale is not needed)
    im = load("ui_v2/dashboard_390x844.png")
    mobile_header(im, 1)
    bg = im.getpixel((340, 723))
    replace(im, (32, 714, 372, 733), "PO 1422-PLB-001 is blocked", "inter-600", 15, (31, 33, 35), fill=bg, at=(33, 723))
    made.append(save(im, out_dir, "dashboard-phone"))

    # Projects list (has the sample address in the table)
    im = load("ui_v2/projects_1440x900.png")
    sidebar(im)
    bg = WHITE
    replace(im, (364, 591, 474, 609), ADDRESS, "inter-600", 14, (31, 33, 35), fill=bg, at=(365, 600))
    made.append(save(im, out_dir, "projects"))
    crops(im, out_dir, "projects")

    # Project tabs on the sample project
    for src, name in [
        ("ui_v2/project-takeoff_1440x900.png", "takeoff"),
        ("ui_v2/project-plans_1440x900.png", "plans"),
        ("ui_v2/project-site_1440x900.png", "site"),
        ("ui_v2/project-compliance_1440x900.png", "compliance"),
        ("ui_v2/project-3d-model_1440x900.png", "model-3d"),
    ]:
        im = load(src)
        sidebar(im)
        project_header(im)
        if name == "takeoff":
            # Verifier name and initials
            replace(im, (1205, 350, 1330, 371), "Lead estimator", "inter-600", 14, WHITE, fill=CHARCOAL, at=(1207, 361))
            circle(im, (1183, 369), 13, WHITE)
            text(im, (1183, 369), "LE", "inter-700", 11, CHARCOAL, "mm")
        if name == "plans":
            bg = im.getpixel((1380, 537))
            replace(im, (842, 528, 1390, 547), "Fireplace on A3 matches the chimney in the exterior rendering. Likely, verify.", "inter-400", 13, (90, 92, 95), fill=bg, at=(843, 537.5))
        if name == "compliance":
            for y in (440, 508):
                bg = im.getpixel((560, y))
                label = "PO-0418-FRM-001" if y == 440 else "PO-0418-RFG-001"
                replace(im, (297, y - 10, 520, y + 10), label, "inter-tight-700", 16, (31, 33, 35), fill=bg, at=(299, y))
        made.append(save(im, out_dir, name))
        crops(im, out_dir, name)

    # Drawing tools (1422 Sample Lake Dr is already sample data)
    for src, name in [
        ("ui_draw/desktop_floor_plan.png", "floor-plan"),
        ("ui_draw/desktop_3d.png", "model-walls"),
    ]:
        im = load(src)
        sidebar(im)
        made.append(save(im, out_dir, name))
        crops(im, out_dir, name)

    # Sheets screen inside the app
    im = load("ui_draw/desktop_sheet_a101.png")
    sidebar(im, dy=-1)
    crumb_bg = im.getpixel((470, 12))
    replace(im, (348, 14, 470, 37), ADDRESS, "inter-400", 13, (68, 70, 72), fill=crumb_bg, at=(350, 25.5))
    cover(im, (1322, 291, 1378, 334), WHITE)
    text(im, (1349, 297), ADDRESS.upper(), "lib:LiberationSans-Bold.ttf", 6, (17, 17, 17), "mm")
    text(im, (1324, 324), COMPANY, "lib:LiberationSans-Bold.ttf", 5, (17, 17, 17), "lm")
    made.append(save(im, out_dir, "sheets"))
    crops(im, out_dir, "sheets")

    # Full construction sheets
    for src, name in [("ui_draw/sheet_A1_01.png", "sheet-a101"), ("ui_draw/sheet_M2_01.png", "sheet-m201")]:
        im = load(src)
        sheet_title_block(im)
        made.append(save(im, out_dir, name, width=1600))

    # Selections grid: cover untranslated button keys
    im = load("ui_selections/desktop_selections_grid.png")
    sidebar(im)
    crumb_bg = im.getpixel((470, 12))
    replace(im, (348, 14, 470, 37), ADDRESS, "inter-400", 13, (68, 70, 72), fill=crumb_bg, at=(350, 25.5))
    border = im.getpixel((604, 508))
    for (x0, y0, x1, y1) in [(604, 494, 718, 521), (306, 833, 420, 860), (604, 833, 718, 860)]:
        cover(im, (x0, y0, x1, y1), WHITE)
        w = 74
        ImageDraw.Draw(im).rounded_rectangle((x0, y0, x0 + w, y1), radius=3, outline=border, width=1)
        text(im, (x0 + w / 2, (y0 + y1) / 2 + 0.5), "Select", "inter-500", 14, (31, 33, 35), "mm")
    made.append(save(im, out_dir, "selections"))
    crops(im, out_dir, "selections")

    # Kitchen 3D views have no names
    for src, name in [("ui_selections/kitchen_3d_premium_island.png", "kitchen-premium"), ("ui_selections/kitchen_3d_standard.png", "kitchen-standard")]:
        made.append(save(load(src), out_dir, name, quality=86))

    # Phone floor plan (2x)
    im = load("ui_draw/mobile_floor_plan.png")
    mobile_header(im, 2)
    made.append(save(im, out_dir, "floor-plan-phone", width=780))

    og_image(out_dir)
    made.append(os.path.join(out_dir, "og.png"))
    return made


def og_image(out_dir):
    W, H = 1200, 630
    im = Image.new("RGB", (W, H), CHARCOAL)
    d = ImageDraw.Draw(im)
    yellow = (242, 194, 27)
    # Dimension string along the top, like a drawing
    d.line((64, 70, 560, 70), fill=yellow, width=2)
    for x in (64, 560):
        d.line((x - 8, 78, x + 8, 62), fill=yellow, width=2)
        d.line((x, 56, x, 84), fill=yellow, width=1)
    d.text((64, 140), BRAND, font=font("inter-tight-800", 84), fill=WHITE, anchor="ls")
    lines = ["Plans, takeoffs, deals and jobs", "for builders in Dallas-Fort Worth."]
    y = 236
    for ln in lines:
        d.text((64, y), ln, font=font("inter-tight-700", 44), fill=WHITE, anchor="ls")
        y += 56
    d.text((64, 380), "Read a plan set, measure without a laser,", font=font("inter-400", 26), fill=(200, 202, 204), anchor="ls")
    d.text((64, 414), "price the whole house and run the job.", font=font("inter-400", 26), fill=(200, 202, 204), anchor="ls")
    d.rectangle((64, 470, 64 + 330, 470 + 60), fill=yellow)
    d.text((64 + 165, 500), "Founding member beta", font=font("inter-700", 22), fill=CHARCOAL, anchor="mm")
    # Product shot on the right, cropped from the takeoff markup
    shot = Image.open(os.path.join(out_dir, "takeoff.webp")).convert("RGB")
    crop = shot.crop((280, 470, 1000, 900))
    crop = crop.resize((int(crop.width * 0.72), int(crop.height * 0.72)), Image.LANCZOS)
    im.paste(crop, (W - crop.width + 40, H - crop.height - 40))
    d.rectangle((W - crop.width + 40, H - crop.height - 40, W, H - 40), outline=(70, 72, 75), width=2)
    im.save(os.path.join(out_dir, "og.png"), "PNG", optimize=True)


if __name__ == "__main__":
    out = sys.argv[1] if len(sys.argv) > 1 else os.path.join(ROOT, "dist", "img")
    manifest_path = sys.argv[2] if len(sys.argv) > 2 else None
    for p in build(out):
        print(p)
    if manifest_path:
        json.dump(MANIFEST, open(manifest_path, "w"), indent=1)
