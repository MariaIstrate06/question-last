import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { AppData } from './models';

const EMPTY_DATA: AppData = {
  ganduri: [],
  reels: [],
  muzica: [],
  locuri: [],
};

@Injectable({ providedIn: 'root' })
export class DataService {
  private readonly _data = signal<AppData>(EMPTY_DATA);
  private readonly _loading = signal(true);
  private readonly _error = signal<string | null>(null);
  private loadPromise: Promise<void> | null = null;

  readonly data = this._data.asReadonly();
  readonly loading = this._loading.asReadonly();
  readonly error = this._error.asReadonly();

  constructor(private http: HttpClient) {}

  load(): Promise<void> {
    if (!this.loadPromise) {
      this.loadPromise = this.fetchData();
    }
    return this.loadPromise;
  }

  private async fetchData(): Promise<void> {
    this._loading.set(true);
    this._error.set(null);
    try {
      const data = await firstValueFrom(this.http.get<AppData>(`data.json?t=${Date.now()}`));
      this._data.set(data);
    } catch {
      this._error.set('Could not load content. Please check your connection and try again.');
    } finally {
      this._loading.set(false);
    }
  }
}
