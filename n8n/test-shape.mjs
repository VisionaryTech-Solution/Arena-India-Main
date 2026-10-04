import fs from 'node:fs'
import assert from 'node:assert/strict'
const src = fs.readFileSync(new URL('./shape-events.js', import.meta.url), 'utf8')
const full = (items, origin) => new Function('$input', '$', src)({ all: () => items.map((json) => ({ json })) }, () => ({ first: () => ({ json: { headers: origin ? { origin } : {} } }) }))[0].json
const run = (items) => full(items).events

// 1. realistic rows: extra columns, odd header case, serial dates, blank row, number cells
const out = run([
  { row_number: 2, 'Event ID': 'EVT-001', 'Event Name': ' Demo Swimming Open 2028 ', Sport: 'Swimming', 'Event Category': 'Tournament',
    'Start Date': '2028-03-10', 'End Date': '2028-03-12', City: 'Jamshedpur', State: 'Jharkhand', Venue: 'JRD Tata Sports Complex',
    Organiser: 'Demo Aquatics Association', 'Official URL': '', 'Ticket / Registration URL': '', 'Event Status': 'Upcoming',
    'Verification Status': 'Pending', 'Last Updated': '2026-10-04', 'Source Text': 'SECRET raw announcement', 'Internal Notes': 'do not leak', 'Processing Status': 'done' },
  { 'event name': 'Lower Case Headers Run', 'start date': 46100, 'END DATE': 46101, city: 'Pune', 'ticket/registration url': 'https://x.test/r', 'Event ID': 7 },
  { 'Event ID': '', 'Event Name': '', City: 'spacer row' },
  {},
])
assert.equal(out.length, 2)
const keys = Object.keys(out[0])
assert.deepEqual(keys, ['Event ID','Event Name','Sport','Event Category','Start Date','End Date','City','State','Venue','Organiser','Official URL','Ticket / Registration URL','Event Status','Verification Status','Last Updated'])
assert.equal(out[0]['Event Name'], 'Demo Swimming Open 2028')
assert.ok(!JSON.stringify(out).match(/SECRET|do not leak|row_number|Processing/))
assert.equal(out[1]['Start Date'], '2026-03-08'.replace('2026-03-08', new Date(Date.UTC(1899,11,30)+46100*864e5).toISOString().slice(0,10)))
assert.equal(out[1]['Ticket / Registration URL'], 'https://x.test/r')
assert.equal(out[1]['Event ID'], '7')
assert.ok(Object.values(out[1]).every((v) => typeof v === 'string'))
// 2. empty sheet (Always Output Data gives one empty item) -> []
assert.deepEqual(run([{}]), [])
assert.deepEqual(run([]), [])
assert.equal(full([{}], 'http://localhost:5173').corsOrigin, 'http://localhost:5173')
assert.equal(full([{}], 'https://evil.test').corsOrigin, 'https://YOUR-SITE.example')
assert.equal(full([{}]).corsOrigin, 'https://YOUR-SITE.example')
console.log('Code node tests passed:', JSON.stringify(out[1]['Start Date']), 'from serial 46100')

// 3. the frontend's own normalizer accepts the output
const { normalizeEvents } = await import('../src/services/normalizeEvent.js')
const n = normalizeEvents(out)
assert.equal(n.length, 2)
console.log('Frontend normalizeEvents accepted', n.length, 'rows ->', n[0].event_name, '|', n[0].start_date, '|', n[1].event_name, '|', n[1].start_date)
