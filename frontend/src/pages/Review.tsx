import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { api } from '../lib/api';
import { Badge, Btn, Card, Chip, EmotionBar, SectionTitle, Textarea } from '../components/ui';

export default function Review() {
  const { rid } = useParams();
  const s = api.getSession(rid ?? '');
  const [comment, setComment] = useState('');
  const [saved, setSaved] = useState<string[]>([]);
  const [sent, setSent] = useState(false);

  if (!s) {
    return (
      <div className="p-8 max-w-3xl mx-auto">
        <Card className="text-center py-12">
          <p className="text-h3 mb-2">Сессия не найдена</p>
          <Link to="/supervisor"><Btn>К очереди супервизии</Btn></Link>
        </Card>
      </div>
    );
  }

  const comments = [...api.getComments(s.id), ...saved.map((t, i) => ({ id: 'tmp' + i, author: 'супервизор М.Т.', text: t, date: 'только что' }))];

  return (
    <div className="p-4 lg:p-8 max-w-6xl mx-auto m-fade-in">
      <Link to="/supervisor" className="text-body-sm text-accent">← Очередь</Link>
      <div className="flex items-center gap-3 flex-wrap mt-2 mb-6">
        <h1 className="text-h2">Разбор · {s.scenarioTitle}</h1>
        <Badge completed={s.completed} />
      </div>

      <div className="grid lg:grid-cols-[1.5fr_1fr] gap-4">
        {/* Хронология шагов */}
        <div>
          <SectionTitle sub={`${s.steps.length} шагов · ход сессии по узлам графа`}>Хронология</SectionTitle>
          <div className="flex flex-col gap-3">
            {s.steps.map((st, i) => (
              <Card key={i} className="m-fade-in" >
                <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                  <Chip>шаг {i + 1}</Chip>
                  <Chip tone="info">{st.kind}</Chip>
                  {st.nodeId && <span className="text-caption text-ink-3">узел {st.nodeId}</span>}
                </div>
                {st.clientLine && <p className="text-body-sm mb-1.5">«{st.clientLine}»</p>}
                {st.answer && (
                  <p className="text-body-sm rounded-md bg-accent/5 border border-accent/20 px-3 py-2 mb-1.5">Ответ психолога: {st.answer}</p>
                )}
                {st.feedback && (
                  <p className={`text-caption ${st.feedbackKind === 'strength' ? 'text-ok' : 'text-warn'}`}>
                    {st.feedbackKind === 'strength' ? '✓' : '▲'} {st.feedback}
                  </p>
                )}
                {st.emotionAfter && <p className="text-caption text-ink-3 mt-1">эмоция после: {st.emotionAfter.value}/10 · {st.emotionAfter.label}</p>}
              </Card>
            ))}
            {s.steps.length === 0 && <Card><p className="text-body-sm text-ink-2 text-center py-6">Для этой записи детальная хронология не сохранена (демо-сиды).</p></Card>}
          </div>
        </div>

        {/* Панель супервизора */}
        <aside className="flex flex-col gap-4">
          <Card>
            <SectionTitle>Итоги</SectionTitle>
            <EmotionBar value={s.emotionTo} label={`было ${s.emotionFrom}`} compact />
            <p className="text-body-sm text-ink-2 mt-3">{s.summary}</p>
          </Card>

          <Card>
            <SectionTitle sub={`${comments.length}`}>Комментарий к разбору</SectionTitle>
            {comments.map((c) => (
              <div key={c.id} className="rounded-md bg-bg-secondary px-3 py-2.5 mb-2">
                <div className="flex justify-between text-caption text-ink-3"><b className="text-ink-2">{c.author}</b>{c.date}</div>
                <p className="text-body-sm mt-0.5">{c.text}</p>
              </div>
            ))}
            <Textarea rows={3} value={comment} onChange={(e) => setComment(e.target.value)} placeholder="Что обсудить с психологом на встрече…" />
            <Btn className="mt-3" full disabled={!comment.trim()} onClick={() => {
              api.addComment(s.id, comment.trim());
              setSaved([comment.trim(), ...saved]);
              setComment('');
            }}>Сохранить комментарий</Btn>
            <Btn className="mt-2" full variant="secondary" disabled={sent} onClick={() => setSent(true)}>
              {sent ? '✓ Отчёт отправлен психологу' : 'Отправить отчёт'}
            </Btn>
          </Card>
        </aside>
      </div>
    </div>
  );
}
