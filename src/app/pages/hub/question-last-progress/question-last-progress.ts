import { Component } from '@angular/core';

@Component({
  selector: 'app-question-last-progress',
  templateUrl: './question-last-progress.html',
  styleUrl: './question-last-progress.css',
})
export class QuestionLastProgress {
  // Change this whenever — it's the only thing that drives the bar below.
  readonly progress = 35;
}
