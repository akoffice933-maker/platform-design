import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Btn, Card, Chip, Field, Input, Logo } from '../components/ui';

function AuthWrap({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-bg-secondary flex flex-col items-center justify-center px-4 py-10">
      <Link to="/" className="mb-6"><Logo /></Link>
      {children}
      <p className="text-caption text-ink-3 mt-6">Демо-фронтенд · данные хранятся только в вашем браузере</p>
    </div>
  );
}

export function Login() {
  const nav = useNavigate();
  const [email, setEmail] = useState('irina@psy.ru');
  const [pass, setPass] = useState('demo1234');
  const [err, setErr] = useState<{ email?: string; pass?: string }>({});

  const submit = () => {
    const e: typeof err = {};
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) e.email = 'Проверьте адрес';
    if (pass.length < 8) e.pass = 'Минимум 8 символов';
    setErr(e);
    if (!Object.keys(e).length) nav('/app');
  };

  return (
    <AuthWrap>
      <Card className="w-full max-w-md m-scale-in">
        <h1 className="text-h2">Вход</h1>
        <p className="text-body-sm text-ink-2 mt-1 mb-5">Демо: данные уже подставлены — просто нажмите «Войти».</p>
        <div className="flex flex-col gap-4">
          <Field label="Email" error={err.email}>
            <Input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="name@example.com" className={err.email ? 'error' : ''} />
          </Field>
          <Field label="Пароль" error={err.pass}>
            <Input type="password" value={pass} onChange={(e) => setPass(e.target.value)} className={err.pass ? 'error' : ''} />
          </Field>
          <Btn size="lg" full onClick={submit}>Войти</Btn>
          <p className="text-body-sm text-ink-2 text-center">Нет аккаунта? <Link to="/register" className="text-accent font-medium">Регистрация</Link></p>
        </div>
      </Card>
    </AuthWrap>
  );
}

export function Register() {
  const nav = useNavigate();
  const [role, setRole] = useState('Психолог');
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [agree, setAgree] = useState(true);
  const [err, setErr] = useState<{ email?: string; pass?: string; agree?: string }>({});
  const [done, setDone] = useState(false);

  const submit = () => {
    const e: typeof err = {};
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) e.email = 'Проверьте адрес';
    if (pass.length < 8) e.pass = 'Минимум 8 символов';
    if (!agree) e.agree = 'Нужно принять условия';
    setErr(e);
    if (!Object.keys(e).length) setDone(true);
  };

  return (
    <AuthWrap>
      <Card className="w-full max-w-md m-scale-in">
        {done ? (
          <div className="text-center py-4">
            <div className="w-14 h-14 rounded-full bg-ok/10 text-ok flex items-center justify-center text-2xl mx-auto mb-3">✓</div>
            <h1 className="text-h2">Аккаунт создан</h1>
            <p className="text-body-sm text-ink-2 mt-2 mb-5">В демо верификация психолога отключена — входите сразу.</p>
            <Btn full size="lg" onClick={() => nav('/login')}>Перейти к входу</Btn>
          </div>
        ) : (
          <>
            <h1 className="text-h2">Регистрация</h1>
            <div className="grid grid-cols-3 gap-2 my-4">
              {['Психолог', 'Студент', 'Супервизор'].map((r) => (
                <button key={r} onClick={() => setRole(r)}
                  className={`rounded-md border px-2 py-2 text-body-sm font-medium transition-colors duration-fast ${role === r ? 'border-accent text-accent bg-accent/5' : 'border-line text-ink-2 hover:bg-bg-tertiary'}`}>
                  {r}
                </button>
              ))}
            </div>
            {role === 'Супервизор' && <Chip className="mb-3">по приглашению коллеги</Chip>}
            <div className="flex flex-col gap-4">
              <Field label="Email" error={err.email}>
                <Input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="name@example.com" className={err.email ? 'error' : ''} />
              </Field>
              <Field label="Пароль" error={err.pass} hint="минимум 8 символов">
                <Input type="password" value={pass} onChange={(e) => setPass(e.target.value)} className={err.pass ? 'error' : ''} />
              </Field>
              <label className="flex items-start gap-2 text-caption text-ink-2">
                <input type="checkbox" checked={agree} onChange={(e) => setAgree(e.target.checked)} className="mt-0.5 accent-[#2563EB]" />
                <span>Принимаю условия и политику конфиденциальности {err.agree && <b className="text-err">· {err.agree}</b>}</span>
              </label>
              <Btn size="lg" full onClick={submit}>Создать аккаунт</Btn>
              <p className="text-body-sm text-ink-2 text-center">Уже есть аккаунт? <Link to="/login" className="text-accent font-medium">Войти</Link></p>
            </div>
          </>
        )}
      </Card>
    </AuthWrap>
  );
}
