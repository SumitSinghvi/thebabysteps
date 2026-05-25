const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
    fs.readdirSync(dir).forEach(f => {
        let dirPath = path.join(dir, f);
        let isDirectory = fs.statSync(dirPath).isDirectory();
        if (isDirectory) {
            walkDir(dirPath, callback);
        } else {
            if (dirPath.endsWith('.tsx') || dirPath.endsWith('.ts')) {
                callback(path.join(dirPath));
            }
        }
    });
}

function processFiles(directory) {
    walkDir(directory, function(filePath) {
        let content = fs.readFileSync(filePath, 'utf8');
        let originalContent = content;

        // Replace $ followed by digit
        content = content.replace(/\$(\d+)/g, '₹$1');

        // Replace $ followed by { variable_name } where variable_name suggests money
        // e.g. ${p.price}, ${totalAmount.toFixed(2)}, ${val}k
        content = content.replace(/\$\{\s*(p\.price|desk\.price|item\.price|seat\.price|totalAmount|val|p\.mrp|product\.price|amount)\b/g, '₹{$1');

        if (content !== originalContent) {
            fs.writeFileSync(filePath, content, 'utf8');
            console.log(`Updated ${filePath}`);
        }
    });
}

processFiles(path.join(__dirname, 'src'));
console.log('Done');
