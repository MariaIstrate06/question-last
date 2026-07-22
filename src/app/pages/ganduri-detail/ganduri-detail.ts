import { Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { DataService } from '../../core/data.service';
import { formatDate } from '../../core/utils';

@Component({
  selector: 'app-ganduri-detail',
  imports: [RouterLink],
  templateUrl: './ganduri-detail.html',
  styleUrl: './ganduri-detail.css',
})
export class GanduriDetail {
  private readonly route = inject(ActivatedRoute);
  private readonly data = inject(DataService);

  private readonly id = toSignal(this.route.paramMap.pipe(map((p) => p.get('id'))), {
    initialValue: null,
  });

  readonly loading = signal(true);
  readonly formatDate = formatDate;

  readonly item = computed(() => {
    const id = this.id();
    return this.data.data().ganduri.find((g) => g.id === id) ?? null;
  });

  constructor() {
    this.data.load().finally(() => this.loading.set(false));
  }
}
