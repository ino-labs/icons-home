import { zip } from "zip-a-folder";
import path from "path";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function zipFolder() {
  const srcFolder = path.resolve(__dirname, "../src/font");
  const zipPath = path.resolve(__dirname, "../public/assets/font/ino-icons.zip");

  try {
    await zip(srcFolder, zipPath);
    console.log("✔ Arquivo ZIP criado com sucesso:", zipPath);
  } catch (err) {
    console.error("❌ Erro ao criar o ZIP:", err);
  }
}

zipFolder();
