import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { detectMusicSource } from './utils';

export interface MusicOembed {
  title: string;
  artist: string;
  thumbnail: string | null;
}

interface SpotifyOembedResponse {
  title: string;
  thumbnail_url?: string;
}

interface YoutubeOembedResponse {
  title: string;
  author_name: string;
  thumbnail_url?: string;
}

const DASH_SPLIT = /\s+[-–—]\s+/;

@Injectable({ providedIn: 'root' })
export class MusicOembedService {
  private cache = new Map<string, Promise<MusicOembed | null>>();

  constructor(private http: HttpClient) {}

  fetch(url: string): Promise<MusicOembed | null> {
    if (!this.cache.has(url)) {
      this.cache.set(url, this.doFetch(url));
    }
    return this.cache.get(url)!;
  }

  private async doFetch(url: string): Promise<MusicOembed | null> {
    const source = detectMusicSource(url);
    try {
      if (source === 'spotify') {
        const res = await firstValueFrom(
          this.http.get<SpotifyOembedResponse>(
            `https://open.spotify.com/oembed?url=${encodeURIComponent(url)}`,
          ),
        );
        const [title, artist] = this.splitTitle(res.title);
        return { title, artist, thumbnail: res.thumbnail_url ?? null };
      }
      if (source === 'youtube') {
        const res = await firstValueFrom(
          this.http.get<YoutubeOembedResponse>(
            `https://www.youtube.com/oembed?url=${encodeURIComponent(url)}&format=json`,
          ),
        );
        return { title: res.title, artist: res.author_name, thumbnail: res.thumbnail_url ?? null };
      }
      return null;
    } catch {
      return null;
    }
  }

  private splitTitle(raw: string): [string, string] {
    const parts = raw.split(DASH_SPLIT);
    if (parts.length >= 2) {
      return [parts[0].trim(), parts.slice(1).join(' - ').trim()];
    }
    return [raw.trim(), ''];
  }
}
