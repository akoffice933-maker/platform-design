import { GameCard } from '../components/GameCard.jsx';

export default {
  title: 'Domain/GameCard',
  component: GameCard,
  tags: ['autodocs'],
};

export const New = {
  args: { title: 'Заземление 5-4-3-2-1', meta: 'Техника · 3 мин', thumb: '🌱', status: 'new', tint: '#FDF6E3' },
};
export const InProgress = {
  args: { title: 'Дыхание 4-7-8', meta: 'Упражнение · 5 мин', thumb: '🫁', status: 'progress', step: 3, total: 6, tint: '#EAF2FE' },
};
export const Done = {
  args: { title: 'Скрипт сна', meta: 'Медитация · 10 мин', thumb: '🌙', status: 'done', tint: '#EEF0F4' },
};
