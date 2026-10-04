const pad = (n) => String(n).padStart(2, '0')
const ymd = (iso) => iso.replaceAll('-', '')
const esc = (s) => String(s).replace(/\\/g, '\\\\').replace(/;/g, '\\;').replace(/,/g, '\\,').replace(/\r?\n/g, '\\n')

// All-day ICS event. DTEND is exclusive in iCalendar, so we add one day to the end date.
export function buildICS(e, pageUrl) {
  const end = new Date(`${e.end_date}T00:00:00`)
  end.setDate(end.getDate() + 1)
  const dtend = `${end.getFullYear()}${pad(end.getMonth() + 1)}${pad(end.getDate())}`
  const now = new Date().toISOString().replace(/[-:]/g, '').replace(/\.\d+/, '')
  return [
    'BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Arena India//Events//EN', 'CALSCALE:GREGORIAN',
    'BEGIN:VEVENT',
    `UID:${e.id}@arena-india`,
    `DTSTAMP:${now}`,
    `DTSTART;VALUE=DATE:${ymd(e.start_date)}`,
    `DTEND;VALUE=DATE:${dtend}`,
    `SUMMARY:${esc(e.event_name)}`,
    `LOCATION:${esc(`${e.venue}, ${e.city}, ${e.state}`)}`,
    `DESCRIPTION:${esc(`${e.sport} ${e.event_category} by ${e.organiser}. Details: ${pageUrl}`)}`,
    'END:VEVENT', 'END:VCALENDAR',
  ].join('\r\n')
}

export function downloadICS(e) {
  const blob = new Blob([buildICS(e, window.location.href)], { type: 'text/calendar;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `${e.id}.ics`
  document.body.appendChild(a)
  a.click()
  a.remove()
  setTimeout(() => URL.revokeObjectURL(url), 1000)
}

// Returns 'shared', 'copied' or 'failed'. Uses the Web Share API when present, else the clipboard.
export async function shareEvent(e) {
  const url = window.location.href
  if (navigator.share) {
    try {
      await navigator.share({ title: e.event_name, text: `${e.event_name} in ${e.city}`, url })
      return 'shared'
    } catch (err) {
      if (err?.name === 'AbortError') return 'cancelled'
    }
  }
  try {
    await navigator.clipboard.writeText(url)
    return 'copied'
  } catch {
    window.prompt('Copy this link', url)
    return 'copied'
  }
}
