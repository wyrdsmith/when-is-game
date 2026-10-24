import { Component, computed, input } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { map, timer } from 'rxjs';

@Component({
  imports: [],
  selector: 'app-countdown',
  styleUrl: './countdown.scss',
  templateUrl: './countdown.html',
})
export class CountdownComponent {
  readonly nextGameTime = input<Date | null>();

  // Emits the current timestamp every second
  private readonly now = toSignal(
    timer(0, 1000).pipe(map(() => Date.now())),
    { initialValue: Date.now() }
  );
  // Computes the remaining time broken into days, hours, minutes, and seconds
  readonly timeLeft = computed(() => {
    const target = this.nextGameTime();
    if (!target) return null;
    const diffMs = target.getTime() - this.now();
    if (diffMs <= 0) {
      return { days: 0, hours: '00', minutes: '00', seconds: '00', isGameTime: true };
    }
    const totalSeconds = Math.floor(diffMs / 1000);
    const days = Math.floor(totalSeconds / 86400);
    const hours = Math.floor((totalSeconds % 86400) / 3600).toString().padStart(2, '0');
    const minutes = Math.floor((totalSeconds % 3600) / 60).toString().padStart(2, '0');
    const seconds = (totalSeconds % 60).toString().padStart(2, '0');
    return { days, hours, minutes, seconds, isGameTime: false };
  });
}
