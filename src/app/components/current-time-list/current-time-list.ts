import { Component, effect, ElementRef, inject, output, signal, ViewChild } from '@angular/core';
import { CurrentTimeComponent } from '../current-time/current-time';
import { ThemeService } from '../../services/theme';
import { URLService } from '../../services/url';

export interface TimeZoneOption {
  value: string;
  label: string;
}

@Component({
  imports: [CurrentTimeComponent],
  selector: 'app-current-time-list',
  styleUrl: './current-time-list.scss',
  templateUrl: './current-time-list.html',
})
export class CurrentTimeListComponent {
  themeService = inject(ThemeService);
  urlService = inject(URLService);
  protected color = signal(this.themeService.color());
  readonly listedTimeZones = signal<string[]>(this.urlService.getTimeZones());
  readonly addingTimeZone = signal<boolean>(false);
  readonly timeZoneToAdd = signal<string>('');
  readonly timeZones: readonly TimeZoneOption[] = this.buildTimeZoneOptions();
  readonly currentTimeZones = output<string[]>();

  @ViewChild('timeZoneSelect') timeZoneSelect!: ElementRef<HTMLSelectElement>;

  constructor() {
    effect(() => {
      this.color.set(this.themeService.color());
    })
  }

  ngOnInit() {
    this.currentTimeZones.emit(this.listedTimeZones());
  }

  private buildTimeZoneOptions(): TimeZoneOption[] {
    const rawZones = ['UTC', ...Intl.supportedValuesOf('timeZone')];
    const now = new Date();
    return rawZones.map((tz) => {
      if (tz === 'UTC') {
        return { value: 'UTC', label: 'UTC (GMT)' };
      }
      try {
        // 1. Get abbreviation (e.g. "CDT", "EDT")
        const abbr = new Intl.DateTimeFormat('en-US', {
          timeZone: tz,
          timeZoneName: 'short',
        })
          .formatToParts(now)
          .find((p) => p.type === 'timeZoneName')?.value;
        // 2. Get GMT offset (e.g. "GMT-5", "GMT+2")
        const offset = new Intl.DateTimeFormat('en-US', {
          timeZone: tz,
          timeZoneName: 'shortOffset',
        })
          .formatToParts(now)
          .find((p) => p.type === 'timeZoneName')?.value;
        // Combine label: avoid duplicate like "(GMT+9) (GMT+9)"
        let label = tz;
        if (abbr && offset && abbr !== offset) {
          if (abbr == 'GMT' && offset == 'GMT+0') {
            label = `${tz} (${offset})`;
          } else {
            label = `${tz} (${abbr}) (${offset})`;
          }
        } else if (abbr || offset) {
          label = `${tz} (${abbr || offset})`;
        }
        return { value: tz, label };
      } catch {
        return { value: tz, label: tz };
      }
    });
  }

  addTimeZone() {
    this.addingTimeZone.set(true);
  }

  hideTimezoneSelect() {
    this.addingTimeZone.set(false);
    this.timeZoneSelect.nativeElement.value = '';
  }

  deleteTimeZone(timeZone: string) {
    this.listedTimeZones.update((listedTimeZones) => listedTimeZones.filter((t) => t !== timeZone));
    this.currentTimeZones.emit(this.listedTimeZones());
    this.urlService.deleteTimeZone(timeZone);
  }

  onTimeZoneChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const selectedTimeZone = selectElement.value;
    this.timeZoneToAdd.set(selectedTimeZone);
  }

  onTimeZoneSelect() {
    if (this.timeZoneToAdd() === '') return;
    if (this.listedTimeZones().includes(this.timeZoneToAdd())) return;
    this.listedTimeZones.update((listedTimeZones) => [...listedTimeZones, this.timeZoneToAdd()]);
    this.currentTimeZones.emit(this.listedTimeZones());
    this.urlService.addTimeZone(this.timeZoneToAdd());
    this.addingTimeZone.set(false);
    this.timeZoneToAdd.set('');
    this.timeZoneSelect.nativeElement.value = '';
  }
}
