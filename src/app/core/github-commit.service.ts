import { Injectable } from '@angular/core';
import { AppData, Category } from './models';

const OWNER = 'MariaIstrate06';
const REPO = 'question-last';
const PATH = 'public/data.json';
const BRANCH = 'main';

@Injectable({ providedIn: 'root' })
export class GithubCommitService {
  async addItem(category: Category, item: unknown, pat: string): Promise<void> {
    const apiUrl = `https://api.github.com/repos/${OWNER}/${REPO}/contents/${PATH}`;

    const getRes = await fetch(`${apiUrl}?ref=${BRANCH}`, { headers: this.headers(pat) });
    if (!getRes.ok) {
      throw new Error(`Could not fetch data.json (${getRes.status} ${getRes.statusText})`);
    }
    const getBody = await getRes.json();
    const sha = getBody.sha as string;
    const currentData = JSON.parse(this.decodeBase64(getBody.content)) as AppData;

    (currentData[category] as unknown[]).push(item);

    const updatedContent = this.encodeBase64(JSON.stringify(currentData, null, 2) + '\n');

    const putRes = await fetch(apiUrl, {
      method: 'PUT',
      headers: { ...this.headers(pat), 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: `Add ${category} item via /ilovelips`,
        content: updatedContent,
        sha,
        branch: BRANCH,
      }),
    });

    if (!putRes.ok) {
      const body = await putRes.text().catch(() => '');
      throw new Error(`Could not commit data.json (${putRes.status} ${putRes.statusText}) ${body}`);
    }
  }

  private headers(pat: string): HeadersInit {
    return {
      Authorization: `Bearer ${pat}`,
      Accept: 'application/vnd.github+json',
    };
  }

  private decodeBase64(b64: string): string {
    const binary = atob(b64.replace(/\n/g, ''));
    const bytes = Uint8Array.from(binary, (c) => c.charCodeAt(0));
    return new TextDecoder('utf-8').decode(bytes);
  }

  private encodeBase64(text: string): string {
    const bytes = new TextEncoder().encode(text);
    let binary = '';
    bytes.forEach((b) => (binary += String.fromCharCode(b)));
    return btoa(binary);
  }
}
