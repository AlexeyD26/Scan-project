declare module '*.svg';
declare module '*.module.css' {
  const classes: { [key: string]: string };
  export default classes;
}

interface User {
  eventFiltersInfo: {
    companyLimit: number;
    usedCompanyCount: number;
  };
}
