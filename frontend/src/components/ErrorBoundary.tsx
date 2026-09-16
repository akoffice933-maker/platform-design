import { Component, type ErrorInfo, type ReactNode } from 'react';

/** Граница ошибок: вместо белого экрана — понятное сообщение и путь назад.
 *  Философия v1.1 (docs/12 §8): ошибки не глотаются. */
export default class ErrorBoundary extends Component<{ children: ReactNode }, { err: Error | null }> {
  state = { err: null as Error | null };

  static getDerivedStateFromError(err: Error): { err: Error } {
    return { err };
  }

  componentDidCatch(err: Error, info: ErrorInfo): void {
    // в консоль — полный стек, на экран — короткое сообщение
    console.error('ErrorBoundary:', err, info.componentStack);
  }

  render(): ReactNode {
    if (!this.state.err) return this.props.children;
    return (
      <div className="min-h-screen bg-bg-primary text-ink flex items-center justify-center p-6">
        <div className="max-w-lg w-full rounded-xl border border-err/30 bg-bg-secondary p-6">
          <h1 className="text-h3 text-err mb-2">⚠ Что-то сломалось на этой странице</h1>
          <p className="text-body-sm text-ink-2 mb-1">
            Приложение не упало целиком — остальные разделы работают. Ошибка уже в консоли браузера (F12).
          </p>
          <code className="block text-caption bg-bg-tertiary rounded-md p-3 my-3 break-words whitespace-pre-wrap">
            {this.state.err.message || String(this.state.err)}
          </code>
          <div className="flex gap-2">
            <button onClick={() => location.reload()}
              className="rounded-lg bg-accent px-4 py-2.5 text-body-sm text-ink-inverse hover:bg-accent-hover transition-colors duration-fast">
              Перезагрузить страницу
            </button>
            <button onClick={() => { location.hash = '#/app'; this.setState({ err: null }); }}
              className="rounded-lg border border-line px-4 py-2.5 text-body-sm hover:border-accent transition-colors duration-fast">
              На главную
            </button>
          </div>
        </div>
      </div>
    );
  }
}
