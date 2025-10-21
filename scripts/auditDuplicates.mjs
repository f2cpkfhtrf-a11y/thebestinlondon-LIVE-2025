import fs from "fs";
import path from "path";
import crypto from "crypto";

const ROOT = process.cwd();
const REPORT_DIR = path.join(ROOT, "reports");

function getFileHash(filePath) {
  try {
    const buffer = fs.readFileSync(filePath);
    return crypto.createHash('md5').update(buffer).digest('hex');
  } catch {
    return null;
  }
}

function getTextContent(filePath) {
  try {
    const content = fs.readFileSync(filePath, "utf8");
    // Extract text content (simplified)
    return content.replace(/[^\w\s]/g, ' ').replace(/\s+/g, ' ').trim();
  } catch {
    return "";
  }
}

function calculateJaccardSimilarity(text1, text2) {
  const words1 = new Set(text1.toLowerCase().split(/\s+/));
  const words2 = new Set(text2.toLowerCase().split(/\s+/));
  
  const intersection = new Set([...words1].filter(x => words2.has(x)));
  const union = new Set([...words1, ...words2]);
  
  return intersection.size / union.size;
}

function scanImages(dir) {
  const images = [];
  if (!fs.existsSync(dir)) return images;
  
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      images.push(...scanImages(fullPath));
    } else if (entry.name.match(/\.(webp|jpg|jpeg|png)$/i)) {
      images.push(fullPath);
    }
  }
  return images;
}

function scanContent(dir, extension) {
  const files = [];
  if (!fs.existsSync(dir)) return files;
  
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...scanContent(fullPath, extension));
    } else if (entry.name.endsWith(extension)) {
      files.push(fullPath);
    }
  }
  return files;
}

function analyzeDuplicates() {
  const report = {
    timestamp: new Date().toISOString(),
    imageDuplicates: {},
    blogDuplicates: {},
    faqDuplicates: {},
    summary: {}
  };

  console.log("🔍 Scanning for duplicate images...");
  const images = scanImages(path.join(ROOT, "public/images"));
  
  const imageHashes = new Map();
  const duplicates = new Map();

  for (const imagePath of images) {
    const hash = getFileHash(imagePath);
    if (!hash) continue;

    if (imageHashes.has(hash)) {
      const original = imageHashes.get(hash);
      if (!duplicates.has(hash)) {
        duplicates.set(hash, [original]);
      }
      duplicates.get(hash).push(imagePath);
    } else {
      imageHashes.set(hash, imagePath);
    }
  }

  report.imageDuplicates = {
    totalDuplicates: duplicates.size,
    duplicateGroups: Array.from(duplicates.entries()).map(([hash, files]) => ({
      hash: hash.substring(0, 8),
      files: files.map(f => path.relative(ROOT, f)),
      count: files.length
    }))
  };

  console.log("🔍 Scanning for duplicate blog content...");
  const blogFiles = scanContent(path.join(ROOT, "content/blog"), ".json");
  
  const blogTexts = [];
  for (const file of blogFiles) {
    try {
      const content = JSON.parse(fs.readFileSync(file, "utf8"));
      const text = content.content || content.body || content.text || "";
      blogTexts.push({
        file: path.relative(ROOT, file),
        text: text,
        slug: content.slug || path.basename(file, ".json")
      });
    } catch (error) {
      console.log(`Error reading blog file ${file}:`, error.message);
    }
  }

  const blogDuplicates = [];
  for (let i = 0; i < blogTexts.length; i++) {
    for (let j = i + 1; j < blogTexts.length; j++) {
      const similarity = calculateJaccardSimilarity(blogTexts[i].text, blogTexts[j].text);
      if (similarity > 0.9) {
        blogDuplicates.push({
          file1: blogTexts[i].file,
          file2: blogTexts[j].file,
          similarity: Math.round(similarity * 100)
        });
      }
    }
  }

  report.blogDuplicates = {
    totalDuplicates: blogDuplicates.length,
    duplicates: blogDuplicates
  };

  console.log("🔍 Scanning for duplicate FAQ content...");
  const faqFiles = scanContent(path.join(ROOT, "content/faq"), ".json");
  
  const faqTexts = [];
  for (const file of faqFiles) {
    try {
      const content = JSON.parse(fs.readFileSync(file, "utf8"));
      const text = content.content || content.body || content.text || "";
      faqTexts.push({
        file: path.relative(ROOT, file),
        text: text,
        slug: content.slug || path.basename(file, ".json")
      });
    } catch (error) {
      console.log(`Error reading FAQ file ${file}:`, error.message);
    }
  }

  const faqDuplicates = [];
  for (let i = 0; i < faqTexts.length; i++) {
    for (let j = i + 1; j < faqTexts.length; j++) {
      const similarity = calculateJaccardSimilarity(faqTexts[i].text, faqTexts[j].text);
      if (similarity > 0.9) {
        faqDuplicates.push({
          file1: faqTexts[i].file,
          file2: faqTexts[j].file,
          similarity: Math.round(similarity * 100)
        });
      }
    }
  }

  report.faqDuplicates = {
    totalDuplicates: faqDuplicates.length,
    duplicates: faqDuplicates
  };

  report.summary = {
    imageDuplicateGroups: report.imageDuplicates.totalDuplicates,
    blogDuplicatePairs: report.blogDuplicates.totalDuplicates,
    faqDuplicatePairs: report.faqDuplicates.totalDuplicates,
    totalIssues: report.imageDuplicates.totalDuplicates + report.blogDuplicates.totalDuplicates + report.faqDuplicates.totalDuplicates
  };

  return report;
}

function saveReports(report) {
  fs.mkdirSync(REPORT_DIR, { recursive: true });
  
  // JSON report
  fs.writeFileSync(
    path.join(REPORT_DIR, "audit_duplicates.json"),
    JSON.stringify(report, null, 2)
  );

  // Markdown report
  const markdown = `# Duplicates Audit Report

**Timestamp:** ${report.timestamp}

## Summary
- **Image Duplicate Groups:** ${report.summary.imageDuplicateGroups}
- **Blog Duplicate Pairs:** ${report.summary.blogDuplicatePairs}
- **FAQ Duplicate Pairs:** ${report.summary.faqDuplicatePairs}
- **Total Issues:** ${report.summary.totalIssues}

## Image Duplicates (${report.imageDuplicates.totalDuplicates} groups)
${report.imageDuplicates.duplicateGroups.map(group => 
  `### Group ${group.hash} (${group.count} files)
${group.files.map(file => `- ${file}`).join('\n')}`
).join('\n\n')}

## Blog Content Duplicates (${report.blogDuplicates.totalDuplicates} pairs)
${report.blogDuplicates.duplicates.map(dup => 
  `- **${dup.similarity}% similarity:** ${dup.file1} ↔ ${dup.file2}`
).join('\n')}

## FAQ Content Duplicates (${report.faqDuplicates.totalDuplicates} pairs)
${report.faqDuplicates.duplicates.map(dup => 
  `- **${dup.similarity}% similarity:** ${dup.file1} ↔ ${dup.file2}`
).join('\n')}
`;

  fs.writeFileSync(
    path.join(REPORT_DIR, "audit_duplicates.md"),
    markdown
  );
}

(async () => {
  try {
    const report = analyzeDuplicates();
    saveReports(report);
    console.log("✅ Duplicates audit complete:", report.summary);
  } catch (error) {
    console.error("❌ Duplicates audit failed:", error);
    process.exit(1);
  }
})();
