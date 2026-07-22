import { Component, input } from '@angular/core';
import { Place } from '../../../core/models';
import { parsePlaceNameFromMapsUrl } from '../../../core/utils';

@Component({
  selector: 'app-locuri-list',
  templateUrl: './locuri-list.html',
  styleUrl: './locuri-list.css',
})
export class LocuriList {
  readonly items = input.required<Place[]>();

  displayName(place: Place): string {
    return place.name || parsePlaceNameFromMapsUrl(place.mapsUrl) || 'Unnamed place';
  }
}
