import { Component, computed, input } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { timer, map } from 'rxjs';

@Component({
  imports: [],
  selector: 'app-current-time',
  styleUrl: './current-time.scss',
  templateUrl: './current-time.html',
})
export class CurrentTimeComponent {
  readonly currentTime = toSignal(
    timer(0, 1000).pipe(map(() => new Date())),
    { initialValue: new Date() }
  );

  readonly timeZone = input(Intl.DateTimeFormat().resolvedOptions().timeZone, {
    transform: (value: string | undefined | null) =>
      value || Intl.DateTimeFormat().resolvedOptions().timeZone,
  });

  readonly formattedTime = computed(() => {
    try {
      return new Intl.DateTimeFormat(undefined, {
        timeZone: this.timeZone(),
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
      }).format(this.currentTime());
    } catch {
      return this.currentTime().toLocaleTimeString();
    }
  });

  readonly timeZoneAbbr = computed(() => {
    try {
      return (
        new Intl.DateTimeFormat(undefined, {
          timeZone: this.timeZone(),
          timeZoneName: 'short',
        })
          .formatToParts(this.currentTime())
          .find((part) => part.type === 'timeZoneName')?.value || ''
      );
    } catch {
      return '';
    }
  });
}
