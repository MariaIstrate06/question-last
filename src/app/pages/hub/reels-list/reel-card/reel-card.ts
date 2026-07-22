import { Component, input } from '@angular/core';
import { Reel } from '../../../../core/models';
import { parseInstagramUsername } from '../../../../core/utils';

@Component({
  selector: 'app-reel-card',
  templateUrl: './reel-card.html',
  styleUrl: './reel-card.css',
})
export class ReelCard {
  readonly reel = input.required<Reel>();

  get username(): string | null {
    return parseInstagramUsername(this.reel().url);
  }

  open(): void {
    window.open(this.reel().url, '_blank', 'noopener');
  }
}
