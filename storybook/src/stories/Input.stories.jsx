import { Input } from '../components/Input.jsx';

export default {
  title: 'UI Kit/Input',
  component: Input,
  tags: ['autodocs'],
};

export const Default = {
  args: { label: 'Email', placeholder: 'name@example.com', hint: 'Рабочая почта предпочтительна' },
};
export const Error = {
  args: { label: 'Пароль', type: 'password', value: '123', error: 'Минимум 8 символов' },
};
export const Disabled = {
  args: { label: 'Телефон', value: '+7 900 000-00-00', disabled: true },
};
