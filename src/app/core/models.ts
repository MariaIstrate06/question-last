export interface Ganduri {
  id: string;
  title: string;
  date: string; // ISO date
  tags: string[];
  fullText: string;
}

export interface Reel {
  id: string;
  url: string; // full instagram reel URL
  caption?: string;
}

export interface Track {
  id: string;
  url: string; // spotify or youtube link
  addedDate: string;
}

export interface Place {
  id: string;
  mapsUrl: string; // full google maps share link
  name: string;
  note?: string;
}

export interface AppData {
  ganduri: Ganduri[];
  reels: Reel[];
  muzica: Track[];
  locuri: Place[];
}

export type Category = 'ganduri' | 'reels' | 'muzica' | 'locuri';
