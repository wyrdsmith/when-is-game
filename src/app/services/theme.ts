import { Injectable, inject, signal } from '@angular/core';
import { LocalStorageService } from './local-storage';

@Injectable({
    providedIn: 'root'
})
export class ThemeService {
    localStorageService = inject(LocalStorageService)
    color = signal(this.localStorageService.getItem<string>('theme') || 'white');

    setColor(color: string) {
        this.color.set(color);
        this.localStorageService.setItem('theme', color);
    }
}
