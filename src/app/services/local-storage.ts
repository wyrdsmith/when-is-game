import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class LocalStorageService {

    // Save data to localStorage
    setItem(key: string, value: any): void {
        try {
            const serializedValue = typeof value === 'string' ? value : JSON.stringify(value);
            localStorage.setItem(key, serializedValue);
        } catch (error) {
            console.error('Error saving to localStorage', error);
        }
    }

    // Retrieve data from localStorage
    getItem<T>(key: string): T | null {
        try {
            const item = localStorage.getItem(key);
            if (!item) return null;

            // Attempt to parse as JSON; if it fails, return the raw string
            try {
                return JSON.parse(item) as T;
            } catch {
                return item as unknown as T;
            }
        } catch (error) {
            console.error('Error reading from localStorage', error);
            return null;
        }
    }

    // Remove a specific item
    removeItem(key: string): void {
        try {
            localStorage.removeItem(key);
        } catch (error) {
            console.error('Error removing from localStorage', error);
        }
    }

    // Clear all data managed by this domain
    clear(): void {
        try {
            localStorage.clear();
        } catch (error) {
            console.error('Error clearing localStorage', error);
        }
    }
}