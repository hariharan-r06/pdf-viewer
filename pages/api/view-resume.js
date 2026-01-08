import fs from "fs";
import path from "path";

export default function handler(req, res) {
  // Prefer pdfs/resume.pdf, fallback to public/resume.pdf
  const candidates = [
    path.join(process.cwd(), "pdfs", "resume.pdf"),
    path.join(process.cwd(), "public", "resume.pdf"),
  ];

  const found = candidates.find((p) => fs.existsSync(p));

  if (!found) {
    return res
      .status(404)
      .send(
        "PDF not found. Place resume.pdf in /pdfs or /public and retry."
      );
  }

  const fileBuffer = fs.readFileSync(found);

  res.setHeader("Content-Type", "application/pdf");
  res.setHeader("Content-Disposition", "inline; filename=resume.pdf");
  res.setHeader("Cache-Control", "public, max-age=3600, s-maxage=3600");

  res.send(fileBuffer);
}
