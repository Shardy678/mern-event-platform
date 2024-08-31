import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined'
import CircleIcon from '@mui/icons-material/Circle'

export default function EventCard({ title, image, location, date, time, id }) {
  return (
    <div className="w-full h-full border-2 hover:shadow-weird shadow-none border-black rounded-lg transform hover:-translate-y-1 hover:-translate-x-1 transition bg-white">
      <a href={`/events/${id}`}>
        <div className="img-container">
          <img
            className="object-cover rounded-t-md w-full h-32"
            src={image}
            alt={title}
          />
        </div>
        <div className="p-2 pl-3">
          <h2 className="text-lg md:text-sm font-bold">{title}</h2>
          <p className="text-base md:text-sm">
            <CalendarMonthIcon sx={{ paddingRight: '2px', color: 'gray' }} />
            {date}
            <CircleIcon
              sx={{ fontSize: '0.5rem', color: 'gray', marginX: '4px' }}
            />
            {time}
          </p>
          <p className="text-base md:text-sm text-gray-600">
            <PlaceOutlinedIcon sx={{ color: 'gray' }} /> {location}
          </p>
        </div>
      </a>
    </div>
  )
}
