import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { environment } from '../../../environments/environment';
import { Category } from '../../core/models';
import { GithubCommitService } from '../../core/github-commit.service';

type SubmitState = 'idle' | 'submitting' | 'success' | 'error';

const PAT_SESSION_KEY = 'ilovelips_pat';

interface GanduriForm {
  title: string;
  date: string;
  tags: string;
  fullText: string;
}
interface ReelsForm {
  url: string;
  caption: string;
}
interface MuzicaForm {
  url: string;
  addedDate: string;
}
interface LocuriForm {
  mapsUrl: string;
  name: string;
  note: string;
}

@Component({
  selector: 'app-admin',
  imports: [FormsModule],
  templateUrl: './admin.html',
  styleUrl: './admin.css',
})
export class Admin {
  readonly unlocked = signal(false);
  pinInput = '';
  pinError = false;

  readonly categories: { id: Category; label: string }[] = [
    { id: 'ganduri', label: 'Gânduri' },
    { id: 'reels', label: 'Reels' },
    { id: 'muzica', label: 'Muzică' },
    { id: 'locuri', label: 'Iași vs. Elips' },
  ];
  readonly category = signal<Category>('ganduri');

  pat = sessionStorage.getItem(PAT_SESSION_KEY) ?? '';

  ganduriForm: GanduriForm = { title: '', date: '', tags: '', fullText: '' };
  reelsForm: ReelsForm = { url: '', caption: '' };
  muzicaForm: MuzicaForm = { url: '', addedDate: '' };
  locuriForm: LocuriForm = { mapsUrl: '', name: '', note: '' };

  readonly submitState = signal<SubmitState>('idle');
  readonly submitError = signal<string | null>(null);

  constructor(private github: GithubCommitService) {}

  checkPin(): void {
    if (this.pinInput === environment.adminPin) {
      this.unlocked.set(true);
      this.pinError = false;
    } else {
      this.pinError = true;
    }
  }

  onPatChange(value: string): void {
    this.pat = value;
    sessionStorage.setItem(PAT_SESSION_KEY, value);
  }

  async submit(): Promise<void> {
    if (!this.pat) {
      this.submitState.set('error');
      this.submitError.set('Enter a GitHub personal access token first.');
      return;
    }

    const category = this.category();
    let item: unknown;
    try {
      item = this.buildItem(category);
    } catch (e) {
      this.submitState.set('error');
      this.submitError.set((e as Error).message);
      return;
    }

    this.submitState.set('submitting');
    this.submitError.set(null);

    try {
      await this.github.addItem(category, item, this.pat);
      this.submitState.set('success');
      this.resetForm(category);
    } catch (e) {
      this.submitState.set('error');
      this.submitError.set((e as Error).message);
    }
  }

  private buildItem(category: Category): unknown {
    const id = crypto.randomUUID();
    switch (category) {
      case 'ganduri': {
        const f = this.ganduriForm;
        if (!f.title || !f.date || !f.fullText) {
          throw new Error('Title, date and full text are required.');
        }
        return {
          id,
          title: f.title,
          date: f.date,
          tags: f.tags
            .split(',')
            .map((t) => t.trim())
            .filter(Boolean),
          fullText: f.fullText,
        };
      }
      case 'reels': {
        const f = this.reelsForm;
        if (!f.url) throw new Error('URL is required.');
        return { id, url: f.url, caption: f.caption || undefined };
      }
      case 'muzica': {
        const f = this.muzicaForm;
        if (!f.url) throw new Error('URL is required.');
        return { id, url: f.url, addedDate: f.addedDate || new Date().toISOString() };
      }
      case 'locuri': {
        const f = this.locuriForm;
        if (!f.mapsUrl || !f.name) throw new Error('Maps URL and name are required.');
        return { id, mapsUrl: f.mapsUrl, name: f.name, note: f.note || undefined };
      }
    }
  }

  private resetForm(category: Category): void {
    switch (category) {
      case 'ganduri':
        this.ganduriForm = { title: '', date: '', tags: '', fullText: '' };
        break;
      case 'reels':
        this.reelsForm = { url: '', caption: '' };
        break;
      case 'muzica':
        this.muzicaForm = { url: '', addedDate: '' };
        break;
      case 'locuri':
        this.locuriForm = { mapsUrl: '', name: '', note: '' };
        break;
    }
  }
}
