const path = require('path');
const fs = require('fs');

const pdfjsDistPath = path.dirname(require.resolve('pdfjs-dist/package.json'));
const pdfWorker = path.join(pdfjsDistPath, 'build', 'pdf.worker.min.mjs');

fs.copyFileSync(pdfWorker, 'packages/web/public/scripts/pdf.worker.min.mjs');
