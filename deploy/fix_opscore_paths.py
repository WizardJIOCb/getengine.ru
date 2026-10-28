from pathlib import Path

ROOT = Path("/var/www/opscore.getengine.ru")

REPLACEMENTS = {
    "/tg/ozna/app/manifest.json": "/manifest.json",
    "/tg/ozna/app/icon-192.png": "/icon-192.png",
    "/tg/ozna/app/icon-512.png": "/icon-512.png",
    "/tg/ozna/app/sw.js": "/sw.js",
    "/tg/ozna/app/index.html": "/index.html",
    "/tg/ozna/app/assets/": "/assets/",
    "/tg/ozna/api": "/api",
    "RewriteBase /tg/ozna/app/": "RewriteBase /",
    '"start_url": "/tg/ozna/app/#/"': '"start_url": "/#/"',
    "CACHE_NAME = 'ozna-pwa-v14'": "CACHE_NAME = 'ozna-pwa-v15'",
}

TEXT_SUFFIXES = {".html", ".json", ".js", ".css"}

updated = []

for path in ROOT.rglob("*"):
    if not path.is_file():
        continue
    if "/tg/" in path.as_posix():
        continue
    if path.suffix.lower() not in TEXT_SUFFIXES and path.name != ".htaccess":
        continue

    text = path.read_text(encoding="utf-8")
    new_text = text

    for old, new in REPLACEMENTS.items():
        new_text = new_text.replace(old, new)

    if new_text != text:
        path.write_text(new_text, encoding="utf-8")
        updated.append(path.as_posix())

print(f"updated={len(updated)}")
for item in updated:
    print(item)
