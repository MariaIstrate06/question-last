import { Injectable } from '@angular/core';
import emailjs from '@emailjs/browser';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class EmailjsService {
  private initialized = false;

  private ensureInit(): void {
    if (!this.initialized) {
      emailjs.init(environment.emailjs.publicKey);
      this.initialized = true;
    }
  }

  /** Fire-and-forget notification email. Never throws. */
  notifyButtonClicked(buttonClicked: string): void {
    try {
      this.ensureInit();
      emailjs
        .send(environment.emailjs.serviceId, environment.emailjs.templateId, {
          button_clicked: buttonClicked,
          timestamp: new Date().toISOString(),
        })
        .catch((err) => console.error('EmailJS send failed:', err));
    } catch (err) {
      console.error('EmailJS send failed:', err);
    }
  }
}
