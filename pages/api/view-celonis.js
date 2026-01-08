import fs from "fs";
import path from "path";

export default function handler(req, res) {
  const filePath = path.join(process.cwd(), "pdfs", "celonis.pdf");

  if (!fs.existsSync(filePath)) {
    return res.status(404).send("PDF not found");
  }

  const fileBuffer = fs.readFileSync(filePath);

  res.setHeader("Content-Type", "application/pdf");
  res.setHeader("Content-Disposition", "inline; filename=celonis.pdf");

  res.send(fileBuffer);
}
