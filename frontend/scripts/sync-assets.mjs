// Синхронизирует артefакты дизайна-системы в src (источник истины — корень репо):
// tokens/tokens.css + tokens/motion.css + эталонный сценарий docs/09.
import { copyFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const repo = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
const dest = join(repo, 'frontend', 'src');

mkdirSync(join(dest, 'styles'), { recursive: true });
mkdirSync(join(dest, 'data'), { recursive: true });
copyFileSync(join(repo, 'tokens', 'tokens.css'), join(dest, 'styles', 'tokens.css'));
copyFileSync(join(repo, 'tokens', 'motion.css'), join(dest, 'styles', 'motion.css'));
copyFileSync(join(repo, 'scenarios', 'exam-anxiety.json'), join(dest, 'data', 'exam-anxiety.json'));
console.log('sync-assets: tokens.css, motion.css, exam-anxiety.json → src/');
