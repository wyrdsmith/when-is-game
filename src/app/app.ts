import { Component, effect, inject, signal } from '@angular/core';
import { ThemeService } from './services/theme';
import { URLService } from './services/url';
import { DatePipe } from '@angular/common';
import { CoreComponent } from './components/core/core';

@Component({
  selector: 'app-root',
  imports: [DatePipe, CoreComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  themeService = inject(ThemeService)
  urlService = inject(URLService);
  protected color = signal(this.themeService.color());
  readonly gameTime = signal(this.urlService.getGameTime());
  readonly gameRepeat = signal(this.urlService.getGameRepeat());
  readonly editingGameTime = signal(false);

  gameTimeToSet: string | null = null;
  gameMonthToSet: number | null = null;
  gameDayToSet: number | null = null;
  gameRepeatToSet: string | null = null;

  constructor() {
    effect(() => {
      this.color.set(this.themeService.color());
    })
  }

  setColor(event: Event) {
    const color = (event.currentTarget as HTMLSelectElement).value;
    this.themeService.setColor(color);
  }

  editGameTime() {
    this.editingGameTime.set(true);
  }

  closeEditGameTime() {
    this.editingGameTime.set(false);
  }

  timeInputChanged(event: Event) {
    this.gameTimeToSet = (event.currentTarget as HTMLInputElement).value;
  }

  gameMonthChanged(event: Event) {
    this.gameMonthToSet = Number.parseInt((event.currentTarget as HTMLSelectElement).value);
  }

  gameDayChanged(event: Event) {
    this.gameDayToSet = Number.parseInt((event.currentTarget as HTMLInputElement).value);
  }

  gameRepeatChanged(event: Event) {
    this.gameRepeatToSet = (event.currentTarget as HTMLSelectElement).value;
  }

  saveGameTime() {
    if (!this.gameTimeToSet || this.gameMonthToSet === null || this.gameDayToSet === null) {
      return;
    }
    const gameTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const now = new Date();
    const year = now.getFullYear();
    const month = this.gameMonthToSet;
    const day = this.gameDayToSet;
    const [hours, minutes] = this.gameTimeToSet.split(':').map(Number);
    let targetDate = new Date(year, month, day, hours, minutes, 0, 0);
    if (targetDate <= now) {
      return;
    }
    const isoString = targetDate.toISOString();
    this.urlService.setGameTime(isoString);
    this.gameTime.set(isoString);
    if (this.gameRepeatToSet) {
      this.urlService.setGameRepeat(this.gameRepeatToSet);
      this.gameRepeat.set(this.gameRepeatToSet);
    }
    this.closeEditGameTime();
  }

  getNextGameTime() {
    const gameTime = this.gameTime();
    const gameRepeat = this.gameRepeat();
    if (!gameTime || !gameRepeat) {
      return null;
    }
    const now = new Date();
    const targetDate = new Date(gameTime);
    while (targetDate <= now) {
      if (gameRepeat === '1') {
        targetDate.setDate(targetDate.getDate() + 7);
      } else if (gameRepeat === '2') {
        targetDate.setDate(targetDate.getDate() + 14);
      } else if (gameRepeat === '3') {
        targetDate.setDate(targetDate.getDate() + 21);
      } else if (gameRepeat === '4') {
        targetDate.setDate(targetDate.getDate() + 28);
      }
    }
    return targetDate;
  }
}
