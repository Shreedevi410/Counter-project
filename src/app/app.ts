import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  count = 0;
  step = 1;
  min = 0;

  setStep(nextStep: number) {
    this.step = Math.max(1, Number.isFinite(nextStep) ? nextStep : 1);
  }

  handleCounter(action: 'increment' | 'decrement' | 'reset', by = this.step) {
    if (action === 'increment') {
      this.count += by;
    } else if (action === 'decrement') {
      this.count = Math.max(this.min, this.count - by);
    } else if (action === 'reset') {
      this.count = this.min;
    }
  }
}