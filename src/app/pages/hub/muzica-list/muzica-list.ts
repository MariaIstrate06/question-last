import { Component, input, OnChanges } from '@angular/core';
import { Track } from '../../../core/models';
import { MusicOembed, MusicOembedService } from '../../../core/music-oembed.service';
import { detectMusicSource, MusicSource } from '../../../core/utils';

interface TrackCardData {
  track: Track;
  source: MusicSource;
  loading: boolean;
  info: MusicOembed | null;
  failed: boolean;
}

@Component({
  selector: 'app-muzica-list',
  templateUrl: './muzica-list.html',
  styleUrl: './muzica-list.css',
})
export class MuzicaList implements OnChanges {
  readonly items = input.required<Track[]>();

  cards: TrackCardData[] = [];

  constructor(private oembed: MusicOembedService) {}

  ngOnChanges(): void {
    this.cards = this.items().map((track) => ({
      track,
      source: detectMusicSource(track.url),
      loading: true,
      info: null,
      failed: false,
    }));

    for (const card of this.cards) {
      this.oembed.fetch(card.track.url).then((info) => {
        card.loading = false;
        if (info) {
          card.info = info;
        } else {
          card.failed = true;
        }
      });
    }
  }

  open(url: string): void {
    window.open(url, '_blank', 'noopener');
  }
}
