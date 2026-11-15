import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  count: number = 0

  handleCounter(action: 'increment' | 'decrement' | 'reset') {
    if (action === 'increment') {
      this.count++;
    } else if (action === 'decrement') {
      if (this.count > 0) {
        this.count--;
      }
    } else if (action === 'reset') {
      this.count = 0;
    }
  }
}