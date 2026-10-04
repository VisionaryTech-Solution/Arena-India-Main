// Arena India - "Shape Events" Code node (mode: Run Once for All Items)
// Keeps ONLY the 15 columns the website uses, in a fixed order, as plain text.
// Anything else in the sheet (internal notes, source text, row_number, etc.) is dropped and never leaves n8n.
const COLUMNS = [
  'Event ID', 'Event Name', 'Sport', 'Event Category', 'Start Date', 'End Date',
  'City', 'State', 'Venue', 'Organiser', 'Official URL', 'Ticket / Registration URL',
  'Event Status', 'Verification Status', 'Last Updated',
];
// Websites allowed to read this API from a browser (CORS). Put your real site(s) here. No trailing slash.
// Use ['*'] to allow every site (fine for public read-only data, but exact origins are tidier).
const ALLOWED_ORIGINS = ['https://YOUR-SITE.example', 'http://localhost:5173'];

const DATE_COLUMNS = ['Start Date', 'End Date', 'Last Updated'];

// Header matching ignores case, spaces and punctuation, so "start date" or "Ticket/Registration URL" still match.
const norm = (s) => String(s == null ? '' : s).toLowerCase().replace(/[^a-z0-9]/g, '');
const byHeader = Object.fromEntries(COLUMNS.map((c) => [norm(c), c]));

// A date that Google stored as a number (serial) becomes yyyy-mm-dd. Everything else is passed through as text.
function toText(value, column) {
  if (value == null) return '';
  if (typeof value === 'number' && DATE_COLUMNS.includes(column) && value > 20000 && value < 80000) {
    return new Date(Date.UTC(1899, 11, 30) + Math.round(value) * 864e5).toISOString().slice(0, 10);
  }
  return String(value).trim();
}

const events = [];
for (const item of $input.all()) {
  const row = Object.fromEntries(COLUMNS.map((c) => [c, '']));
  for (const [header, value] of Object.entries(item.json || {})) {
    const column = byHeader[norm(header)];
    if (column && row[column] === '') row[column] = toText(value, column);
  }
  if (row['Event Name'] !== '') events.push(row); // skip blank / spacer rows
}

// Pick the CORS value for this request. NOTE: this reads the trigger node by name ("Events Webhook"); don't rename it.
const requestOrigin = (($('Events Webhook').first().json.headers || {}).origin) || '';
const corsOrigin = ALLOWED_ORIGINS.includes('*') ? '*'
  : ALLOWED_ORIGINS.includes(requestOrigin) ? requestOrigin : ALLOWED_ORIGINS[0];

// ONE item: `events` is sent as the JSON array, `corsOrigin` goes into the response header.
return [{ json: { events, corsOrigin } }];
