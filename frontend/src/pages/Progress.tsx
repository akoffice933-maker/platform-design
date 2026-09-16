import { api, PROGRESS_WEEKS, WEEK_ACTIVITY } from '../lib/api';
import { MiniBars, ProgressLine, SkillBars } from '../components/charts';
import { Card, SectionTitle, Stat } from '../components/ui';

export default function Progress() {
  const avg = api.getAverages();
  const total = Object.values(avg).reduce((a, b) => a + b, 0);
  return (
    <div className="p-4 lg:p-8 max-w-6xl mx-auto m-fade-in">
      <SectionTitle sub="динамика по неделям и радар навыков (E-28)">Прогресс навыков</SectionTitle>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Stat label="Индекс навыков" value={Math.round(total)} hint="сумма средних, цель 40+" />
        <Stat label="Тренд" value="+25%" hint="за 5 недель" tone="text-ok" />
        <Stat label="Серия" value="5 дней" hint="игры и чек-ины клиентов" />
        <Stat label="Разборов с супервизором" value="3" hint="из 9 сессий" />
      </div>

      <div className="grid lg:grid-cols-[1.4fr_1fr] gap-4">
        <Card>
          <SectionTitle sub="агрегат по сессиям, 0–100">Индекс по неделям</SectionTitle>
          <ProgressLine data={PROGRESS_WEEKS} />
        </Card>
        <Card>
          <SectionTitle sub="минуты практики">Неделя</SectionTitle>
          <MiniBars data={WEEK_ACTIVITY} />
        </Card>
      </div>

      <Card className="mt-4">
        <SectionTitle sub="средние за последние сессии · белая риска — среднее">Навыки</SectionTitle>
        <SkillBars skills={avg} />
      </Card>
    </div>
  );
}
