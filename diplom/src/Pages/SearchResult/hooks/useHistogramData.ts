import { useState } from 'react';
import moment from 'moment';
import { useLocation } from 'react-router-dom';

export enum HistogramType {
  RiskFactors = 'riskFactors',
  TotalDocuments = 'totalDocuments'
}

interface HistogramData {
  date: string;
  value: number;
}

interface Histogram {
  data: HistogramData[];
  histogramType: HistogramType.RiskFactors | HistogramType.TotalDocuments;
}

export interface HistogramColumn {
  date: string;
  totalDocuments: number;
  riskFactors: number;
}

const transformData = (data: Histogram[]) => {
  const result: HistogramColumn[] = [];

  data[0]?.data?.map(({ date, value }) => {
    const formattedDate = moment(date).format('DD.MM.YYYY');
    const riskFactors = data[1]?.data?.find((riskData) => riskData.date === date)?.value || 0;

    result.push({
      date: formattedDate,
      totalDocuments: value,
      riskFactors: riskFactors
    });
  });

  return result;
};

export const useHistogramData = () => {
  const [data, setData] = useState<Histogram[]>([]);
  const { state } = useLocation();

  const fetchData = () => {
    if (!state) {
      return;
    }

    fetch('https://gateway.scan-interfax.ru/api/v1/objectsearch/histograms', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`
      },
      body: JSON.stringify({
        issueDateInterval: {
          startDate: state.startDate,
          endDate: state.endDate
        },
        searchContext: {
          targetSearchEntitiesContext: {
            targetSearchEntities: [
              {
                type: 'company',
                sparkId: null,
                entityId: null,
                inn: state.inn,
                maxFullness: state.maxFullness,
                inBusinessNews: state.inBusinessNews
              }
            ],
            onlyMainRole: state.onlyMainRole,
            tonality: state.tonality,
            onlyWithRiskFactors: state.onlyWithRiskFactors,
            riskFactors: {
              and: [],
              or: [],
              not: []
            },
            themes: {
              and: [],
              or: [],
              not: []
            }
          },
          themesFilter: {
            and: [],
            or: [],
            not: []
          }
        },
        searchArea: {
          includedSources: [],
          excludedSources: [],
          includedSourceGroups: [],
          excludedSourceGroups: []
        },
        attributeFilters: {
          excludeTechNews: state.excludeTechNews,
          excludeAnnouncements: state.excludeAnnouncements,
          excludeDigests: state.excludeDigests
        },
        similarMode: 'duplicates',
        limit: state.limit,
        sortType: 'sourceInfluence',
        sortDirectionType: 'desc',
        intervalType: 'month',
        histogramTypes: ['totalDocuments', 'riskFactors']
      })
    })
      .then((response) => {
        return response.json();
      })
      .then((responseData) => {
        setData(responseData?.data);
      })
      .catch((err) => console.error(err));
  };
  return {
    data: transformData(data),
    fetchData
  };
};
