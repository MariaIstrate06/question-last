import { Injectable } from '@angular/core';

declare global {
  interface Window {
    instgrm?: { Embeds: { process: () => void } };
  }
}

@Injectable({ providedIn: 'root' })
export class InstagramEmbedService {
  private scriptPromise: Promise<void> | null = null;

  loadScript(): Promise<void> {
    if (window.instgrm) return Promise.resolve();
    if (!this.scriptPromise) {
      this.scriptPromise = new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = '//www.instagram.com/embed.js';
        script.async = true;
        script.onload = () => resolve();
        script.onerror = () => reject(new Error('Failed to load Instagram embed script'));
        document.body.appendChild(script);
      });
    }
    return this.scriptPromise;
  }

  process(): void {
    window.instgrm?.Embeds.process();
  }
}
