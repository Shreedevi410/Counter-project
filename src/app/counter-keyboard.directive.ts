import { Directive, HostListener, output } from '@angular/core';

@Directive({
  selector: '[appCounterKeyboard]',
})
export class CounterKeyboardDirective {
  readonly increment = output<void>();
  readonly decrement = output<void>();
  readonly reset = output<void>();
  readonly undo = output<void>();

  @HostListener('window:keydown', ['$event'])
  handleKeydown(event: KeyboardEvent): void {
    if (event.ctrlKey || event.metaKey || event.altKey) {
      if (event.key.toLowerCase() === 'z') {
        event.preventDefault();
        this.undo.emit();
      }
      return;
    }

    if (event.key === '+' || event.key === '=') {
      event.preventDefault();
      this.increment.emit();
    } else if (event.key === '-' || event.key === '_') {
      event.preventDefault();
      this.decrement.emit();
    } else if (event.key.toLowerCase() === 'r' || event.key === '0') {
      event.preventDefault();
      this.reset.emit();
    }
  }
}
