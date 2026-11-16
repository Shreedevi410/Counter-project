import { TestBed } from '@angular/core/testing';
import { App } from './app';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render the counter heading', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Counter App');
  });

  it('should increment and decrement using the current step', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;

    app.handleCounter('increment', 3);
    expect(app.count).toBe(3);

    app.handleCounter('decrement', 2);
    expect(app.count).toBe(1);

    app.setStep(5);
    app.handleCounter('increment');
    expect(app.count).toBe(6);
  });
});
