// Дизайн-токены и motion-пресет — те же файлы, что идут в продакшн
import '../../tokens/tokens.css';
import '../../tokens/motion.css';
import '../src/components/components.css';

export default {
  parameters: {
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: '#FFFFFF' },
        { name: 'canvas', value: '#F7F8FA' },
        { name: 'dark · TMA', value: '#0B1220' },
      ],
    },
    layout: 'centered',
  },
};
