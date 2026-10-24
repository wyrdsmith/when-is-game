import { Component, input, signal } from '@angular/core';
import { CurrentTimeListComponent } from '../current-time-list/current-time-list';
import { GameTimeListComponent } from '../game-time-list/game-time-list';
import { CountdownComponent } from '../countdown/countdown';

@Component({
  imports: [CurrentTimeListComponent, GameTimeListComponent, CountdownComponent],
  selector: 'app-core',
  styleUrl: './core.scss',
  templateUrl: './core.html',
})
export class CoreComponent {
  readonly listedTimeZones = signal<string[]>([]);
  readonly nextGameTime = input<Date | null>();

  updateListedTimeZones(listedTimeZones: string[]) {
    this.listedTimeZones.set(listedTimeZones);
  }
}
