import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const oldSchemaPath = path.join(__dirname, 'schema.prisma');
const schemaFolderDir = path.join(__dirname, 'schema');
const mainFilePath = path.join(schemaFolderDir, 'main.prisma');

async function splitPrismaSchema() {
  try {
    let sourceContent = '';

    if (fs.existsSync(oldSchemaPath)) {
      sourceContent = fs.readFileSync(oldSchemaPath, 'utf8');
    } else if (fs.existsSync(mainFilePath)) {
      sourceContent = fs.readFileSync(mainFilePath, 'utf8');
    } else {
      console.error(
        `❌ Error: Schema file not found.\nChecked:\n- ${oldSchemaPath}\n- ${mainFilePath}`,
      );
      process.exit(1);
    }

    if (!fs.existsSync(schemaFolderDir)) {
      fs.mkdirSync(schemaFolderDir, { recursive: true });
    }

    const blockRegex = /(?<block>(?:model|enum|view)\s+(?<name>\w+)\s+\{(?:[^{}]|\{[^{}]*\})*\})/g;

    let match;
    let count = 0;
    let modifiedContent = sourceContent;

    while ((match = blockRegex.exec(sourceContent)) !== null) {
      const fullBlock = match.groups.block;
      const blockName = match.groups.name;

      if (!fullBlock || !blockName) continue;

      const fileName = `${blockName.toLowerCase()}.prisma`;
      const targetPath = path.join(schemaFolderDir, fileName);

      fs.writeFileSync(targetPath, fullBlock.trim() + '\n', 'utf8');

      modifiedContent = modifiedContent.replace(fullBlock, '');
      count++;
    }

    const cleanMainContent = modifiedContent.replace(/\n{3,}/g, '\n\n').trim();
    fs.writeFileSync(mainFilePath, cleanMainContent + '\n', 'utf8');

    if (fs.existsSync(oldSchemaPath)) {
      fs.unlinkSync(oldSchemaPath);
    }

    console.log(`\n🎉 Success! Created model files: ${count}`);
    console.log(`📁 Saved to directory: ./prisma/schema/`);
    console.log(`⚙️ Base configuration updated in: ./prisma/schema/main.prisma`);
  } catch (error) {
    console.error('❌ An unexpected error occurred during processing:', error);
  }
}

splitPrismaSchema();
