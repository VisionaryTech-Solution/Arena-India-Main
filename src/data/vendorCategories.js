// Centralized vendor category configuration.
// Replace each GOOGLE_FORM_URL_* placeholder with the actual Google Form URL for that category.
// Google Forms support pre-filling fields via URL params, e.g.:
//   https://docs.google.com/forms/d/e/FORM_ID/viewform?usp=pp_url&entry.FIELD_ID=VALUE
// Set the entry.FIELD_ID for the "Vendor Category" field in each form URL below.

export const VENDOR_FORM_URLS = {
  Housekeeping:       'GOOGLE_FORM_URL_HOUSEKEEPING',
  Security:           'GOOGLE_FORM_URL_SECURITY',
  ACT:                'GOOGLE_FORM_URL_ACT',
  EMA:                'GOOGLE_FORM_URL_EMA',
  'Freelance Managers': 'GOOGLE_FORM_URL_FREELANCE_MANAGERS',
  Volunteer:          'GOOGLE_FORM_URL_VOLUNTEER',
  ICT:                'GOOGLE_FORM_URL_ICT',
  Branding:           'GOOGLE_FORM_URL_BRANDING',
  Designers:          'GOOGLE_FORM_URL_DESIGNERS',
  Accreditation:      'GOOGLE_FORM_URL_ACCREDITATION',
}

export const VENDOR_CATEGORIES = [
  {
    name: 'Housekeeping',
    description: 'Venue cleaning, waste management, and facility upkeep services.',
    icon: 'M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z M9 22V12h6v10',
  },
  {
    name: 'Security',
    description: 'Event security, crowd management, and access control.',
    icon: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z',
  },
  {
    name: 'ACT',
    description: 'Activity coordination and technical support services.',
    icon: 'M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5',
  },
  {
    name: 'EMA',
    description: 'Event management and administration support.',
    icon: 'M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2M9 5a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2M9 5a2 2 0 0 0-1-1h4a2 2 0 0 0-1 1',
  },
  {
    name: 'Freelance Managers',
    description: 'Independent event managers and project coordinators.',
    icon: 'M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z',
  },
  {
    name: 'Volunteer',
    description: 'Volunteer coordination and community engagement.',
    icon: 'M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75',
  },
  {
    name: 'ICT',
    description: 'Information and communication technology solutions.',
    icon: 'M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v18m0 0h10a2 2 0 0 0 2-2V9M9 21H5a2 2 0 0 1-2-2V9m0 0h18',
  },
  {
    name: 'Branding',
    description: 'Brand activation, signage, and promotional materials.',
    icon: 'M12 20h9M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z',
  },
  {
    name: 'Designers',
    description: 'Graphic design, visual identity, and creative services.',
    icon: 'M2 13.5V19a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-5.5M22 8l-10 5L2 8M2 8l10-5 10 5',
  },
  {
    name: 'Accreditation',
    description: 'Credential management, badge printing, and access verification.',
    icon: 'M10 6H5a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-5m-4 0V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v1m-4 0h4',
  },
]
