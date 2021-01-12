export const environment = {
  production: true
};

export interface organisations {
  id?: string;
  name?: string;
  logoUrl?: string;
  url?: string;
}

export const hiringOrganisations: organisations[] = [
  {
    id: 'E91B9E84-CB99-4154-81ED-CAB2BEEC83BD',
    name: 'Matalan',
    logoUrl: 'https://matalan.jobs/images/logo.png',
    url: 'http://matalan.jobs'
  }
];