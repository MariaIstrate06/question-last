import { Component, input } from '@angular/core';
import { Reel } from '../../../core/models';
import { ReelCard } from './reel-card/reel-card';

@Component({
  selector: 'app-reels-list',
  imports: [ReelCard],
  templateUrl: './reels-list.html',
  styleUrl: './reels-list.css',
})
export class ReelsList {
  readonly items = input.required<Reel[]>();
}
