const TAG_ACCENTS = ['blue', 'pink', 'neutral'] as const;
export type TagAccent = (typeof TAG_ACCENTS)[number];

/** Deterministically rotates a tag through the accent palette so the same tag always gets the same color. */
export function tagAccentClass(tag: string): TagAccent {
  let hash = 0;
  for (let i = 0; i < tag.length; i++) {
    hash = (hash * 31 + tag.charCodeAt(i)) | 0;
  }
  return TAG_ACCENTS[Math.abs(hash) % TAG_ACCENTS.length];
}

export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trimEnd() + '…';
}

export function formatDate(iso: string): string {
  const date = new Date(iso);
  if (isNaN(date.getTime())) return iso;
  return date.toLocaleDateString('ro-RO', { year: 'numeric', month: 'long', day: 'numeric' });
}

/** Best-effort extraction of a place name from a Google Maps share URL, e.g. .../maps/place/Place+Name/@... */
export function parsePlaceNameFromMapsUrl(mapsUrl: string): string | null {
  const match = mapsUrl.match(/\/maps\/place\/([^/@]+)/);
  if (!match) return null;
  try {
    return decodeURIComponent(match[1].replace(/\+/g, ' '));
  } catch {
    return match[1].replace(/\+/g, ' ');
  }
}

const NON_USERNAME_PATH_SEGMENTS = new Set(['reel', 'reels', 'p', 'tv']);

/** Best-effort extraction of the poster's @handle from an Instagram reel URL, e.g. instagram.com/<username>/reel/<code>/. */
export function parseInstagramUsername(url: string): string | null {
  try {
    const segments = new URL(url).pathname.split('/').filter(Boolean);
    const first = segments[0]?.toLowerCase();
    if (first && !NON_USERNAME_PATH_SEGMENTS.has(first)) {
      return segments[0];
    }
    return null;
  } catch {
    return null;
  }
}

export type MusicSource = 'spotify' | 'youtube' | 'unknown';

export function detectMusicSource(url: string): MusicSource {
  if (/open\.spotify\.com/.test(url)) return 'spotify';
  if (/youtube\.com|youtu\.be/.test(url)) return 'youtube';
  return 'unknown';
}
