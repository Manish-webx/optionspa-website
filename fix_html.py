import re

# Read the file
with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Remove literal escape sequences
content = content.replace('`r`n', '\r\n')

# Find and fix the insurance section structure
# The insurance-reassurance div should be followed by proper closing tags
content = re.sub(
    r'(<div class="insurance-reassurance">.*?</div>\s*</div>)(\s*)(<section id="relax-cta")',
    r'\1\r\n            </div>\r\n        </section>\r\n\r\n        <!-- Section 6: Relaxing CTA -->\r\n        \3',
    content,
    flags=re.DOTALL
)

# Fix indentation for sections that should be at main level
sections = ['testimonials', 'contact', 'faq']
for section in sections:
    content = re.sub(
        rf'(\s*)<section id="{section}"',
        r'\r\n\r\n        <section id="' + section + '"',
        content
    )

# Fix footer
content = re.sub(
    r'(\s*)<footer class="footer">',
    r'\r\n\r\n        <footer class="footer">',
    content
)

# Write the fixed content
with open('index.html', 'w', encoding='utf-8') as f:
    f.write(content)

print("HTML structure fixed successfully!")
