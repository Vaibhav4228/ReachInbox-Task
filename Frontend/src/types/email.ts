export interface Email {
  messageId: string;
  from: string;
  to: string[];
  subject: string;
  body: string;
  date: string;
  folder?: string;
  account?: string;
  category?: string;
}
