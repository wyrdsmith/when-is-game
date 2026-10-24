import { Component, computed, input } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-game-time',
  styleUrl: './game-time.scss',
  templateUrl: './game-time.html',
})
export class GameTimeComponent {
  readonly timeZone = input<string>();
  readonly nextGameTime = input<Date | null>();
  readonly formattedDate = computed(() => {
    try {
      return new Intl.DateTimeFormat(undefined, {
        timeZone: this.timeZone(),
        month: 'short',
        day: '2-digit',
        hour12: true,
      }).format(this.nextGameTime() || new Date());
    } catch {
      return (this.nextGameTime() || new Date()).toLocaleTimeString();
    }
  });
  readonly formattedTime = computed(() => {
    try {
      return new Intl.DateTimeFormat(undefined, {
        timeZone: this.timeZone(),
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      }).format(this.nextGameTime() || new Date());
    } catch {
      return (this.nextGameTime() || new Date()).toLocaleTimeString();
    }
  });
  readonly timeZoneAbbr = computed(() => {
    if (this.nextGameTime() === null) {
      return '';
    }

    try {
      return (
        new Intl.DateTimeFormat(undefined, {
          timeZone: this.timeZone(),
          timeZoneName: 'short',
        })
          .formatToParts(this.nextGameTime() || new Date())
          .find((part) => part.type === 'timeZoneName')?.value || ''
      );
    } catch {
      return '';
    }
  });
}
