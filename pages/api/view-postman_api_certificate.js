import fs from "fs";
import path from "path";

export default function handler(req, res) {
  const filePath = path.join(process.cwd(), "pdfs", "postman_api_certificate.pdf");

  if (!fs.existsSync(filePath)) {
    return res.status(404).send("PDF not found");
  }

  const fileBuffer = fs.readFileSync(filePath);

  res.setHeader("Content-Type", "application/pdf");
  res.setHeader("Content-Disposition", "inline; filename=postman_api_certificate.pdf");

  res.send(fileBuffer);
}