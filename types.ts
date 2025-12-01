export interface NewsData {
  headline: string;
  body: string;
  source?: string;
  caption?: string;
}

export type CardTemplate = 'QUOTE' | 'HEADLINE';

export interface GeneratedContent {
  headline: string;
  body: string;
  caption?: string;
}

export type CardType = 'news' | 'quote';

export type UserRole = 'admin' | 'editor' | 'user';
export type UserStatus = 'pending' | 'approved' | 'blocked';

export interface UserProfile {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  role: UserRole;
  status: UserStatus;
  createdAt: number;
  lastLogin: number;
  phone?: string | null;
}

export type TextToolType = 'translator' | 'proofreader' | 'script-writer' | 'social-manager' | 'headline-generator' | 'thumbnail-prompter' | 'interview-prep' | 'ticker-writer' | 'seo-optimizer';

export interface TextToolOutput {
  title?: string;
  mainContent?: string; 
  notes?: string;
  scriptSegments?: Array<{ visual: string; audio: string }>;
  fbCaption?: string;
  twitterThread?: string;
  tags?: string[];
  headlines?: Array<{ style: string; text: string }>;
  prompts?: Array<string>;
  questions?: Array<{ category: string; question: string }>;
  tickers?: Array<string>;
  seo?: {
    metaTitle: string;
    metaDescription: string;
    keywords: string[];
    focusKeyphrase: string;
  };
}

export type NewsCardTemplate = 
  | 'bk-classic-center' | 'bk-dark-studio' | 'bk-ruby-prime' | 'bk-modern-split' | 'bk-focus-red'
  | 'bk-quote-block-red' | 'bk-quote-soft-gradient' | 'bk-quote-circle-headline' | 'bk-quote-modern';