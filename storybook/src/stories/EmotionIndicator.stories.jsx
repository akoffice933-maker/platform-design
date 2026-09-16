import { EmotionIndicator } from '../components/EmotionIndicator.jsx';

export default {
  title: 'Domain/EmotionIndicator',
  component: EmotionIndicator,
  tags: ['autodocs'],
  argTypes: { value: { control: { type: 'range', min: 0, max: 10, step: 1 } } },
};

export const Low =  { args: { label: 'Тревога', value: 2 } };
export const Mid =  { args: { label: 'Тревога', value: 5 } };
export const High = { args: { label: 'Тревога', value: 8 } };
export const ScaleOnly = { args: { label: 'Спокойствие', value: 7, showScale: false } };
