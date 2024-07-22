import { DetailedHTMLProps, HTMLAttributes } from 'react';

interface Source {
  name: string;
}

export interface Document {
  id: string;
  title: {
    text: string;
  };
  issueDate: string;
  source: Source;
  url: string;
  attributes: {
    isAnnouncement: boolean;
    isTechNews: boolean;
    isDigest: boolean;
    wordCount: number;
  };
  content: {
    markup: string;
  };
}
