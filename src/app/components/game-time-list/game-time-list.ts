import { Component, input } from '@angular/core';
import { GameTimeComponent } from '../game-time/game-time';

@Component({
  imports: [GameTimeComponent],
  selector: 'app-game-time-list',
  styleUrl: './game-time-list.scss',
  templateUrl: './game-time-list.html',
})
export class GameTimeListComponent {
  readonly listedTimeZones = input<string[]>([]);
  readonly nextGameTime = input<Date | null>();
}
