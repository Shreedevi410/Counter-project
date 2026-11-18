import { Component, inject } from '@angular/core';
import { CounterAction, CounterService } from './counter.service';
import { CounterKeyboardDirective } from './counter-keyboard.directive';

@Component({
  selector: 'app-root',
  imports: [CounterKeyboardDirective],
  templateUrl: './app.html',
  styleUrls: ['./app.css', './counter.css']
})
export class App {
  private readonly counter = inject(CounterService);

  get count(): number {
    return this.counter.count();
  }

  get step(): number {
    return this.counter.step();
  }

  get min(): number {
    return this.counter.min();
  }

  get counterHistoryLength(): number {
    return this.counter.history().length;
  }

  setStep(nextStep: number) {
    this.counter.setStep(nextStep);
  }

  handleCounter(action: CounterAction, by = this.step) {
    this.counter.handleCounter(action, by);
  }

  undo() {
    this.counter.undo();
  }
}