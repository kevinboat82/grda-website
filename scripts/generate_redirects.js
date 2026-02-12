import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.join(__dirname, '..');
const publicDir = path.join(projectRoot, 'public');

// List of legacy paths to fix (from Google Sitelinks or old site structure)
// Format: [legacyPath, newHashPath]
const redirects = [
    ['/contact', '/contact'],
    ['/about', '/about'],
    ['/directorates', '/directorates'],
    ['/projects', '/projects'],
    ['/ongoing-projects', '/projects'], // Alias
    ['/chief-executive-officer', '/about/executives'],
    ['/ceo', '/about/executives'], // Alias
    ['/railway-master-plan', '/projects'], // Best fallback
    ['/master-plan', '/projects'], // Alias
    ['/services', '/services'],
    ['/media', '/media']
];

const template = (destination) => `<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Redirecting...</title>
    <meta http-equiv="refresh" content="0;url=/#${destination}">
    <script>
        window.location.replace('/#${destination}');
    </script>
</head>
<body>
    <p>Redirecting to <a href="/#${destination}">page</a>...</p>
</body>
</html>`;

console.log('Generating redirect files...');

redirects.forEach(([legacyPath, newPath]) => {
    // legacyPath is like '/contact'
    // We need to create public/contact/index.html

    // Remove leading slash for path joining
    const relativePath = legacyPath.startsWith('/') ? legacyPath.slice(1) : legacyPath;
    const targetDir = path.join(publicDir, relativePath);

    if (!fs.existsSync(targetDir)) {
        fs.mkdirSync(targetDir, { recursive: true });
        console.log(`Created directory: ${targetDir}`);
    }

    const filePath = path.join(targetDir, 'index.html');
    fs.writeFileSync(filePath, template(newPath));
    console.log(`Generated redirect: ${legacyPath} -> /#${newPath}`);
});

console.log('Done!');
