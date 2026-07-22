import { AfterViewInit, Component, ElementRef, OnDestroy, effect, input, signal } from '@angular/core';
import { Reel } from '../../../../core/models';
import { InstagramEmbedService } from '../../../../core/instagram-embed.service';

@Component({
  selector: 'app-reel-card',
  templateUrl: './reel-card.html',
  styleUrl: './reel-card.css',
})
export class ReelCard implements AfterViewInit, OnDestroy {
  readonly reel = input.required<Reel>();

  readonly visible = signal(false);
  private observer?: IntersectionObserver;

  constructor(
    private el: ElementRef<HTMLElement>,
    private embeds: InstagramEmbedService,
  ) {
    effect(() => {
      if (this.visible()) {
        this.mountEmbed();
      }
    });
  }

  ngAfterViewInit(): void {
    this.observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            this.visible.set(true);
            this.observer?.disconnect();
          }
        }
      },
      { rootMargin: '200px' },
    );
    this.observer.observe(this.el.nativeElement);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }

  private async mountEmbed(): Promise<void> {
    await this.embeds.loadScript();
    // Double rAF: wait for Angular to actually paint the blockquote before
    // asking Instagram's script to scan the DOM for it.
    requestAnimationFrame(() => requestAnimationFrame(() => this.embeds.process()));
  }
}
