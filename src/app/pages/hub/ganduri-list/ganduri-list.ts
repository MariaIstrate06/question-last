import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Ganduri } from '../../../core/models';
import { formatDate, tagAccentClass, truncate } from '../../../core/utils';

@Component({
  selector: 'app-ganduri-list',
  imports: [RouterLink],
  templateUrl: './ganduri-list.html',
  styleUrl: './ganduri-list.css',
})
export class GanduriList {
  readonly items = input.required<Ganduri[]>();

  readonly formatDate = formatDate;
  readonly tagAccentClass = tagAccentClass;

  preview(text: string): string {
    return truncate(text, 140);
  }
}
