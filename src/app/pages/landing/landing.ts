import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { EmailjsService } from '../../core/emailjs.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.html',
  styleUrl: './landing.css',
})
export class Landing {
  constructor(
    private router: Router,
    private emailjs: EmailjsService,
  ) {}

  onWhatIsThis(): void {
    this.emailjs.notifyButtonClicked('What is this?');
    this.router.navigateByUrl('/what-is-this');
  }

  onLetsGetIntoIt(): void {
    this.emailjs.notifyButtonClicked("Let's get into it");
    this.router.navigateByUrl('/lets-get-into-it');
  }
}
