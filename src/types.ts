export type Plan = 'free' | 'premium';

export interface User {
  id: string;
  email: string;
  plan: Plan;
  credits: number;
}

export interface Thumbnail {
  id: string;
  url: string;
  prompt: string;
  createdAt: number;
  quality: 'HD' | '4K';
}

export interface AppState {
  user: User | null;
  history: Thumbnail[];
}
