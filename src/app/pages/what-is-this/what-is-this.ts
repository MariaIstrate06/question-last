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
      title: 'Lorem Ipsum Dolor',
      body: 'Sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. Ut euismod nulla nec dui tincidunt, ac fermentum arcu tempor.',
    },
    {
      title: 'Sed Ut Perspiciatis',
      body: 'Unde omnis iste natus error sit voluptatem accusantium doloremque laudantium. Totam rem aperiam eaque ipsa quae ab illo inventore veritatis.',
    },
    {
      title: 'Ut Enim Ad Minima',
      body: 'Veniam quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur. Quis autem vel eum iure reprehenderit.',
    },
    {
      title: 'Nemo Enim Ipsam',
      body: 'Voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.',
    },
    {
      title: 'Neque Porro Quisquam',
      body: 'Est qui dolorem ipsum quia dolor sit amet consectetur adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam.',
    },
  ];
}
