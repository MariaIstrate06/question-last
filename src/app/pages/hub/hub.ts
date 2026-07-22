import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DataService } from '../../core/data.service';
import { Category } from '../../core/models';
import { GanduriList } from './ganduri-list/ganduri-list';
import { ReelsList } from './reels-list/reels-list';
import { MuzicaList } from './muzica-list/muzica-list';
import { LocuriList } from './locuri-list/locuri-list';
import { QuestionLastProgress } from './question-last-progress/question-last-progress';

type TabId = Category | 'questionLast';

interface Tab {
  id: TabId;
  label: string;
}

const TABS: Tab[] = [
  { id: 'ganduri', label: 'Gânduri' },
  { id: 'reels', label: 'Reels' },
  { id: 'muzica', label: 'Muzică' },
  { id: 'locuri', label: 'Iași vs. Elips' },
  { id: 'questionLast', label: 'Question Last' },
];

@Component({
  selector: 'app-hub',
  imports: [RouterLink, GanduriList, ReelsList, MuzicaList, LocuriList, QuestionLastProgress],
  templateUrl: './hub.html',
  styleUrl: './hub.css',
})
export class Hub {
  private readonly dataService = inject(DataService);

  readonly hubTitle = 'Lorem Ipsum';
  readonly tabs = TABS;
  readonly selectedTab = signal<TabId>('ganduri');

  readonly data = this.dataService.data;
  readonly loading = this.dataService.loading;
  readonly error = this.dataService.error;

  constructor() {
    this.dataService.load();
  }

  selectTab(tab: TabId): void {
    this.selectedTab.set(tab);
  }
}
