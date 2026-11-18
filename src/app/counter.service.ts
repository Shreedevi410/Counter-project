import { Injectable, signal } from '@angular/core';

export type CounterAction = 'increment' | 'decrement' | 'reset';

@Injectable({ providedIn: 'root' })
export class CounterService {
  private readonly storageKey = 'counter-project-state';

  readonly count = signal(0);
  readonly step = signal(1);
  readonly min = signal(0);
  readonly history = signal<number[]>([]);

  constructor() {
    this.restore();
  }

  setStep(nextStep: number): void {
    const normalizedStep = Number.isFinite(nextStep) ? Math.max(1, Math.floor(nextStep)) : 1;
    this.step.set(normalizedStep);
  }

  handleCounter(action: CounterAction, by = this.step()): void {
    if (action === 'reset') {
      this.updateCount(this.min());
      return;
    }

    const safeStep = Number.isFinite(by) ? Math.max(0, Math.floor(by)) : 0;
    const nextCount =
      action === 'increment'
        ? this.count() + safeStep
        : Math.max(this.min(), this.count() - safeStep);

    this.updateCount(nextCount);
  }

  undo(): void {
    const previous = this.history().at(-1);
    if (previous === undefined) {
      return;
    }

    this.history.update((values) => values.slice(0, -1));
    this.count.set(previous);
    this.save();
  }

  private updateCount(nextCount: number): void {
    const currentCount = this.count();
    if (nextCount === currentCount) {
      return;
    }

    this.history.update((values) => [...values.slice(-19), currentCount]);
    this.count.set(nextCount);
    this.save();
  }

  private save(): void {
    if (typeof localStorage === 'undefined') {
      return;
    }

    localStorage.setItem(
      this.storageKey,
      JSON.stringify({
        count: this.count(),
        step: this.step(),
        min: this.min(),
        history: this.history(),
      }),
    );
  }

  private restore(): void {
    if (typeof localStorage === 'undefined') {
      return;
    }

    try {
      const saved = localStorage.getItem(this.storageKey);
      if (!saved) {
        return;
      }

      const state = JSON.parse(saved) as {
        count?: number;
        step?: number;
        min?: number;
        history?: number[];
      };

      if (Number.isFinite(state.count)) {
        this.count.set(Math.max(state.min ?? 0, state.count ?? 0));
      }
      if (Number.isFinite(state.step)) {
        this.setStep(state.step ?? 1);
      }
      if (Number.isFinite(state.min)) {
        this.min.set(state.min ?? 0);
      }
      if (Array.isArray(state.history)) {
        this.history.set(state.history.filter((value) => Number.isFinite(value)));
      }
    } catch {
      localStorage.removeItem(this.storageKey);
    }
  }
}
