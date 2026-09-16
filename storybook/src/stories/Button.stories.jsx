import { Button } from '../components/Button.jsx';

export default {
  title: 'UI Kit/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'radio', options: ['primary', 'secondary', 'ghost', 'danger'] },
    size: { control: 'radio', options: ['sm', 'md', 'lg'] },
  },
};

export const Primary = { args: { variant: 'primary', size: 'md', children: 'Начать сессию' } };
export const Secondary = { args: { variant: 'secondary', size: 'md', children: 'Отмена' } };
export const Ghost = { args: { variant: 'ghost', size: 'md', children: 'Подробнее' } };
export const Danger = { args: { variant: 'danger', size: 'md', children: 'Прервать сценарий' } };
export const Disabled = { args: { variant: 'primary', size: 'md', children: 'Ответить', disabled: true } };
export const FullWidth = { args: { variant: 'primary', size: 'lg', full: true, children: 'MainButton · TMA' } };
export const Sizes = {
  render: () => (
    <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
      <Button size="sm">32px</Button>
      <Button size="md">40px</Button>
      <Button size="lg">48px</Button>
    </div>
  ),
};
