import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class URLService {
    getURLParameters(): URLSearchParams {
        const queryString = window.location.search;
        const urlParameters = new URLSearchParams(queryString);
        return urlParameters;
    }

    setURLParameters(urlParameters: URLSearchParams) {
        const queryString = urlParameters.toString();
        window.history.pushState({}, '', `?${queryString}`);
    }

    setURLParameter(key: string, value: string) {
        const urlParameters = this.getURLParameters();
        urlParameters.set(key, value);
        this.setURLParameters(urlParameters);
    }

    getURLParameter(key: string): string | null {
        const urlParameters = this.getURLParameters();
        return urlParameters.get(key);
    }

    deleteURLParameter(key: string) {
        const urlParameters = this.getURLParameters();
        urlParameters.delete(key);
        this.setURLParameters(urlParameters);
    }

    hasURLParameter(key: string): boolean {
        const urlParameters = this.getURLParameters();
        return urlParameters.has(key);
    }

    getGameTime(): string | null {
        if (!this.hasURLParameter('gameTime')) {
            return null;
        }
        return this.getURLParameter('gameTime');
    }

    setGameTime(gameTime: string) {
        this.setURLParameter('gameTime', gameTime);
    }

    getGameRepeat(): string {
        if (!this.hasURLParameter('gameRepeat')) {
            return "";
        }
        return this.getURLParameter('gameRepeat')!;
    }

    setGameRepeat(gameRepeat: string) {
        this.setURLParameter('gameRepeat', gameRepeat);
    }

    getTimeZones(): string[] {
        let timeZones: string[] = [];
        if (this.hasURLParameter('timeZones')) {
            timeZones = this.getURLParameter('timeZones')!.split(',');
        }
        return timeZones;
    }

    addTimeZone(timeZone: string) {
        if (this.hasURLParameter('timeZones')) {
            let currentTimeZones = this.getURLParameter('timeZones')!.split(',');
            if (currentTimeZones.includes(timeZone)) {
                return;
            }
            currentTimeZones.push(timeZone);
            this.setURLParameter('timeZones', currentTimeZones.join(','));
        } else {
            this.setURLParameter('timeZones', timeZone);
        }
    }

    deleteTimeZone(timeZone: string) {
        if (this.hasURLParameter('timeZones')) {
            let currentTimeZones = this.getURLParameter('timeZones')!.split(',');
            if (!currentTimeZones.includes(timeZone)) {
                return;
            }
            currentTimeZones = currentTimeZones.filter((t) => t !== timeZone);
            if (currentTimeZones.length === 0) {
                this.deleteURLParameter('timeZones');
            } else {
                this.setURLParameter('timeZones', currentTimeZones.join(','));
            }
        }
    }
}
