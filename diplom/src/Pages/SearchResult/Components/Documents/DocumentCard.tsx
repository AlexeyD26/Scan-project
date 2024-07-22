import React from 'react';
import { Document } from './types';
import DOMPurify from 'dompurify';
import { xml2json } from 'xml-js';

interface DocumentCardProps {
  document: Document;
}

function getNoun(num: number, one: string, two: string, five: string) {
  let n = Math.abs(num);
  n %= 100;

  if (n >= 5 && n <= 20) {
    return five;
  }

  n %= 10;
  if (n === 1) {
    return one;
  }

  if (n >= 2 && n <= 4) {
    return two;
  }
  return five;
}

function truncateWords(text: string, maxWords: number): string {
  const words = text.split(' ');
  if (words.length > maxWords) {
    return words.slice(0, maxWords).join(' ') + '...';
  }
  return text;
}

export const DocumentCard = ({ document }: DocumentCardProps) => {
  const truncatedMarkup = truncateWords(document.content.markup, 100);
  const sanitizedMarkup = DOMPurify.sanitize(truncatedMarkup);

  // const jsonResult = xml2json(truncatedMarkup, { compact: true, spaces: 2 });
  // const json = JSON.parse(jsonResult).scandoc

  const handleReadMoreClick = () => {
    window.location.href = document.url;
  };

  return (
    <div className={`news`}>
      <div className="topInfo">
        <p>{document.issueDate}</p>
        <a href={document.url}>{document.source.name}</a>
      </div>
      <h4>{document.title.text}</h4>
      <p className="underTitleText">
        {document.attributes.isAnnouncement && 'isAnnouncement'}
        {document.attributes.isTechNews && 'isTechNews'}
        {document.attributes.isDigest && 'isDigest'}
      </p>
      <div dangerouslySetInnerHTML={{ __html: sanitizedMarkup }} className="documentText"></div>
      <div className="buttonWithText">
        <button onClick={handleReadMoreClick}>Читать далее</button>
        <p>
          {document.attributes.wordCount}{' '}
          {getNoun(document.attributes.wordCount, 'слово', 'слова', 'слов')}
        </p>
      </div>
    </div>
  );
};
