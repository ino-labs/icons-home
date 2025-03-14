import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const iconsDir = path.join(__dirname, './public/assets/icons');
const outputFilePath = path.join(__dirname, './public/assets/icons-data.json');
const idNameFilePath = path.join(__dirname, './public/assets/icons-id-name.json');

// Função para ler os ícones existentes no JSON
const readExistingIcons = (): any[] => {
  if (fs.existsSync(outputFilePath)) {
    const data = fs.readFileSync(outputFilePath, 'utf-8');
    return JSON.parse(data);
  }
  return [];
};

// Função para escrever o JSON de ícones com todos os dados
const writeIconsData = (icons: any[]) => {
  const sortedIcons = icons.sort((a, b) => a.name.localeCompare(b.name));
  fs.writeFileSync(outputFilePath, JSON.stringify(sortedIcons, null, 2));
};

// Função para escrever o JSON com apenas id e name
const writeIdNameData = (icons: any[]) => {
  const idNameData = icons.map(icon => ({ id: icon.id, name: icon.name }));
  const sortedIdNameData = idNameData.sort((a, b) => a.name.localeCompare(b.name));
  fs.writeFileSync(idNameFilePath, JSON.stringify(sortedIdNameData, null, 2));
};

fs.readdir(iconsDir, (err, files) => {
  if (err) {
    console.error('Error reading icon folder:', err);
    return;
  }

  const existingIcons = readExistingIcons();
  const currentIconNames = files.map(file => path.parse(file).name);

  // Cria novos ícones apenas para aqueles que ainda não estão no JSON
  const newIcons = files
    .map(file => {
      const name = path.parse(file).name;
      const title = name.replace(/ino|-/g, ' ').trim();
      const keywords = name.split(/-|_/).map(word => word.trim());

      return {
        id: existingIcons.length > 0 ? Math.max(...existingIcons.map(icon => icon.id)) + 1 : 1,
        name,
        title,
        keywords,
      };
    })
    .filter(icon => !existingIcons.some(existingIcon => existingIcon.name === icon.name));

  // Atualiza a lista de ícones removendo os que não existem mais na pasta
  const updatedIcons = [
    ...existingIcons.filter(icon => currentIconNames.includes(icon.name)),
    ...newIcons,
  ];

  // Escreve os arquivos JSON atualizados
  writeIconsData(updatedIcons);
  writeIdNameData(updatedIcons);

  console.log('icons-data.json and icons-id-name.json files updated successfully!');
});
