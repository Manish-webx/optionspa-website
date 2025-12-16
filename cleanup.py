import re

# Read HTML
with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()
html = html.replace('`r`n', '\r\n')
with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html)

# Read CSS
with open('style.css', 'r', encoding='utf-8') as f:
    css = f.read()
css = css.replace('`r`n', '\r\n')
with open('style.css', 'w', encoding='utf-8') as f:
    f.write(css)

print("Files cleaned successfully!")
