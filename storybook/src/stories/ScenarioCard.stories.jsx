import { ScenarioCard } from '../components/ScenarioCard.jsx';

export default {
  title: 'Domain/ScenarioCard',
  component: ScenarioCard,
  tags: ['autodocs'],
};

export const Default = {
  args: {
    title: 'Тревога перед экзаменом',
    description: 'Проговаривание страха, техника 5-4-3-2-1 и план на день экзамена.',
    difficulty: 2,
    durationMin: 25,
    skills: ['listening', 'emotion_work'],
  },
};
export const InProgress = {
  args: {
    title: 'Первичная консультация',
    description: 'Сбор жалоб, контакт, структура первой встречи.',
    difficulty: 1,
    durationMin: 20,
    skills: ['structuring', 'questioning'],
    progress: 0.4,
  },
};
export const Hard = {
  args: {
    title: 'Сопротивление и молчание',
    description: 'Работа с защитами: пауза, отражение, граница.',
    difficulty: 3,
    durationMin: 40,
    skills: ['resistance', 'boundaries', 'reflection'],
  },
};
