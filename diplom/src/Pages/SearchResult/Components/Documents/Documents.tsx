import React, { useEffect } from 'react';
import { DocumentCard } from './DocumentCard';
import { Document } from './types';
import { useDocumentsData } from '../../hooks/useDocumentsData';

interface DocumentsProps {
  visibleCount: number;
}

function Documents({ visibleCount }: DocumentsProps) {
  const { data, isLoading, fetchData } = useDocumentsData();

  useEffect(() => {
    fetchData();
  }, []);

  if (isLoading) {
    return <div>Загрузка...</div>;
  }

  if (!data?.length) {
    return <div>Документов нет</div>;
  }

  return (
    <>
      {data.slice(0, visibleCount).map((document: Document) => (
        <DocumentCard key={document.id} document={document} />
      ))}
    </>
  );
}

export default Documents;
