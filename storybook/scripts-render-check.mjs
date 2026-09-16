// Smoke: каждый компонент рендерится в строку без исключений.
import React from 'react';
import { renderToStaticMarkup as r } from 'react-dom/server';
import { Button } from './src/components/Button.jsx';
import { Input } from './src/components/Input.jsx';
import { ScenarioCard } from './src/components/ScenarioCard.jsx';
import { GameCard } from './src/components/GameCard.jsx';
import { EmotionIndicator } from './src/components/EmotionIndicator.jsx';

const cases = {
  Button: () => r(React.createElement(Button, { variant: 'primary', size: 'lg', full: true }, 'MainButton · TMA')),
  Input: () => r(React.createElement(Input, { label: 'Email', error: 'Проверьте адрес' })),
  ScenarioCard: () => r(React.createElement(ScenarioCard, {
    title: 'Тревога перед экзаменом', description: 'Описание', difficulty: 2,
    durationMin: 25, skills: ['listening', 'emotion_work'], progress: 0.4 })),
  GameCard: () => r(React.createElement(GameCard, { title: 'Дыхание 4-7-8', meta: 'Упражнение · 5 мин', status: 'progress', step: 3, total: 6 })),
  EmotionIndicator: () => r(React.createElement(EmotionIndicator, { label: 'Тревога', value: 8 })),
};
let fails = 0;
for (const [name, fn] of Object.entries(cases)) {
  try { const html = fn(); if (!html || html.length < 20) throw new Error('пустой вывод'); console.log('OK  ', name, '(' + html.length + ' chars)'); }
  catch (e) { console.log('FAIL', name, '-', e.message); fails++; }
}
process.exit(fails ? 1 : 0);
