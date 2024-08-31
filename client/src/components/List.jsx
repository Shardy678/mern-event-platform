import EventCard from './EventCard'
export default function List({ events }) {
  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6">
      {events.length ? (
        events.map((event) => (
          <li key={event._id}>
            <EventCard
              id={event._id}
              title={event.title}
              image={event.image}
              location={event.location}
              date={event.date}
              time={event.time}
              className="h-full bg-white rounded-lg shadow-md p-4"
            />
          </li>
        ))
      ) : (
        <li className="col-span-full text-center text-gray-600">
          No events found
        </li>
      )}
    </ul>
  )
}
