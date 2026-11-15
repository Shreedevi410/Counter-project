import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  count:number = 0

  handleIncrement() {
    this.count++
}
handleDecrement() {
    this.count--
}

handleReset() {
this.count = 0
}
}