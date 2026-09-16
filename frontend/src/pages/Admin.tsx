import { useState } from 'react';
import { api } from '../lib/api';
import type { Verification } from '../lib/api';
import { Avatar, Btn, Card, Chip, SectionTitle } from '../components/ui';

const CHECK = ['Документы читаемы и полны', 'Данные совпадают с профилем', 'Образование подтверждено', 'Нет дублей аккаунта'];

export default function Admin() {
  const [tab, setTab] = useState<'queue' | 'audit'>('queue');
  const [queue, setQueue] = useState<Verification[]>(api.getVerifications());
  const [audit, setAudit] = useState(api.getAudit());
  const [sel, setSel] = useState<Verification | null>(queue[0] ?? null);
  const [check, setCheck] = useState<boolean[]>(sel?.checklist ?? [true, false, false, false]);
  const [toast, setToast] = useState('');

  const pick = (v: Verification) => { setSel(v); setCheck(v.checklist); };

  const resolve = (approve: boolean) => {
    if (!sel) return;
    api.resolveVerification(sel.id, approve);
    setQueue(api.getVerifications());
    setAudit(api.getAudit());
    setSel(null);
    setToast(`${sel.name}: заявка ${approve ? 'одобрена' : 'отклонена'} · запись в аудите`);
    setTimeout(() => setToast(''), 3500);
  };

  return (
    <div className="p-4 lg:p-8 max-w-6xl mx-auto m-fade-in relative">
      {toast && <div className="fixed bottom-6 right-6 z-30 rounded-lg bg-ink text-white text-body-sm px-4 py-3 shadow-lg m-slide-up">{toast}</div>}

      <div className="flex items-center gap-4 mb-6">
        <h1 className="text-h2">Верификация специалистов</h1>
        <span className="grow" />
        {(['queue', 'audit'] as const).map((t) => (
          <button key={t} onClick={() => setTab(t)}
            className={`px-3 py-1.5 rounded-md text-body-sm font-medium transition-colors duration-fast ${tab === t ? 'bg-accent/10 text-accent' : 'text-ink-2 hover:bg-bg-tertiary'}`}>
            {t === 'queue' ? `Очередь (${queue.length})` : 'Аудит-лог'}
          </button>
        ))}
      </div>

      {tab === 'queue' && (
        <div className="grid lg:grid-cols-[1fr_1fr] gap-4">
          <Card pad={false} className="overflow-hidden h-fit">
            {queue.length === 0 && <p className="p-6 text-body-sm text-ink-2 text-center">Очередь пуста — все заявки обработаны ✓</p>}
            {queue.map((v) => (
              <button key={v.id} onClick={() => pick(v)}
                className={`w-full text-left flex items-center gap-3 px-4 py-3.5 border-b border-line last:border-0 transition-colors duration-fast ${sel?.id === v.id ? 'bg-accent/5' : 'hover:bg-bg-secondary'}`}>
                <Avatar name={v.name} />
                <div className="min-w-0">
                  <b className="text-body-sm block">{v.name}</b>
                  <span className="text-caption text-ink-3 block truncate">{v.email} · заявка {v.submitted}</span>
                </div>
                <span className="grow" />
                <Chip tone={v.checklist.every(Boolean) ? 'ok' : 'warn'}>{v.checklist.filter(Boolean).length}/{v.checklist.length}</Chip>
              </button>
            ))}
          </Card>

          {sel ? (
            <Card className="m-slide-right">
              <div className="flex items-center gap-3 mb-4">
                <Avatar name={sel.name} size="lg" />
                <div>
                  <b className="text-h3 block">{sel.name}</b>
                  <span className="text-caption text-ink-3">{sel.email}</span>
                </div>
              </div>
              <div className="text-caption uppercase text-ink-3 mb-1">Образование</div>
              <p className="text-body-sm text-ink-2 mb-4">{sel.edu}</p>
              <div className="text-caption uppercase text-ink-3 mb-2">Чек-лист проверки</div>
              <div className="flex flex-col gap-2 mb-5">
                {CHECK.map((c, i) => (
                  <label key={c} className="flex items-center gap-2.5 text-body-sm cursor-pointer">
                    <input type="checkbox" checked={check[i] ?? false} onChange={(e) => setCheck(check.map((x, j) => (j === i ? e.target.checked : x)))} className="w-4 h-4 accent-[#2563EB]" />
                    {c}
                  </label>
                ))}
              </div>
              <div className="flex gap-3">
                <Btn variant="secondary" onClick={() => resolve(false)}>Отклонить</Btn>
                <Btn onClick={() => resolve(true)} disabled={!check.every(Boolean)} title={check.every(Boolean) ? '' : 'Отметьте все пункты чек-листа'}>Одобрить ✓</Btn>
              </div>
              {!check.every(Boolean) && <p className="text-caption text-ink-3 mt-2">Одобрение доступно после полного чек-листа (демо-политика).</p>}
            </Card>
          ) : (
            <Card className="flex items-center justify-center text-body-sm text-ink-3 min-h-48">Выберите заявку слева</Card>
          )}
        </div>
      )}

      {tab === 'audit' && (
        <Card pad={false} className="overflow-hidden">
          <table className="w-full text-body-sm">
            <thead>
              <tr className="text-left text-caption uppercase text-ink-3 border-b border-line">
                <th className="px-4 py-3">Когда</th><th className="px-4 py-3">Кто</th><th className="px-4 py-3">Действие</th><th className="px-4 py-3">Объект</th>
              </tr>
            </thead>
            <tbody>
              {audit.map((a) => (
                <tr key={a.id} className="border-b border-line last:border-0">
                  <td className="px-4 py-3 text-ink-2 whitespace-nowrap">{a.time}</td>
                  <td className="px-4 py-3 font-medium">{a.actor}</td>
                  <td className="px-4 py-3">{a.action}</td>
                  <td className="px-4 py-3 text-ink-2">{a.target}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      )}
    </div>
  );
}
