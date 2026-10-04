import EventCard from './EventCard.jsx'

export default function EventGrid({ events }) {
  return (
    <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
      {events.map((e) => <EventCard key={e.id} event={e} />)}
    </div>
  )
}
