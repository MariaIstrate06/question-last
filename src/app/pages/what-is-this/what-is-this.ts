import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

interface InfoSection {
  title: string;
  body: string;
}

@Component({
  selector: 'app-what-is-this',
  imports: [RouterLink],
  templateUrl: './what-is-this.html',
  styleUrl: './what-is-this.css',
})
export class WhatIsThis {
  readonly sections: InfoSection[] = [
    {
      title: 'Ce e asta?',
      body: 'O cutie poștală digitală în care vreau să îți las mesaje, gânduri, piese și altele într-o formă în care să nu vezi o notificare sau să te simți obligată să răspunzi.',
    },
    {
      title: 'De ce tho?',
      body: 'Am înțeles că o mare parte din procesul prin care treci acum este să nu trebuiască să te bazezi pe cineva ca să fii bine. Prin această cutie poștală, o ai mereu acolo, însă nu te caută ea niciodată. E mereu acolo pentru tine tho, nu pentru când o să ai nevoie, ci pentru când o să vrei.',
    },
    {
      title: 'Bn dar faci chestia asta și pentru tine, de ce?',
      body: 'Da, o fac evident și pentru mine, pentru că-mi doresc să simt că am o apropiere de tine fără să-ți fiu încurcătură în self journey-ul pe care ți-l propui.',
    },
    {
      title: 'Și care e scopul final?',
      body: 'Pentru că m-ai întrebat des asta vreau să vin cu un răspuns sincer și clar. Scopul e apropierea de departe. Și vreau să îți câștig încrederea fără a te supune la riscul pe care îl simți. Dacă într-o zi alegi să nu mai citești, nu te deranjez. Dacă într-o zi vrei să mâncăm acele clătite, într-un viitor cât ar fi el de departăt, atunci și mai bine!',
    },
  ];
}
