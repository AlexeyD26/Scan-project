export const SIGNS = [
  {
    code: 'maxFullness',
    value: false,
    title: 'Признак максимальной полноты'
  },
  {
    code: 'inBusinessNews',
    value: false,
    title: 'Упоминания в бизнес-контексте'
  },
  {
    code: 'onlyMainRole',
    value: false,
    title: 'Главная роль в публикации'
  },
  {
    code: 'onlyWithRiskFactors',
    value: false,
    title: 'Публикации только с риск-факторами'
  },
  {
    code: 'excludeTechNews',
    value: false,
    title: 'Включать технические новости рынков'
  },
  {
    code: 'excludeAnnouncements',
    value: false,
    title: 'Включать анонсы и календари'
  },
  {
    code: 'excludeDigests',
    value: false,
    title: 'Включать сводки новостей'
  }
];

export const TONALITIES = [
  {
    code: 'any',
    title: 'Любая'
  },
  {
    code: 'positive',
    title: 'Позитивная'
  },
  {
    code: 'negative',
    title: 'Негативная'
  }
];
