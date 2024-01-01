import { Injectable } from '@angular/core';

interface IDataAccessLayer {
  setItem(key: string, value: string): void;
  getItem(key: string): string | null;
  removeItem(key: string): void;
  clear(): void;
}

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService implements IDataAccessLayer {
  constructor() {}

  // Set a value in local storage
  setItem(key: string, value: string): void {
    localStorage.setItem(key, value);
  }

  // Get a value from local storage
  getItem(key: string): string | null {
    return localStorage.getItem(key);
  }

  // Remove a value from local storage
  removeItem(key: string): void {
    localStorage.removeItem(key);
  }

  getAll(prefix?: string): string[] {
    const keys = Object.keys(localStorage);
    return !prefix ? keys : keys.filter((k) => k.startsWith(prefix));
  }

  // Clear all items from local storage
  clear(): void {
    localStorage.clear();
  }
}
