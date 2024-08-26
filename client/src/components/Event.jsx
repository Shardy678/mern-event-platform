import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import CircleIcon from '@mui/icons-material/Circle';
export default function Event({title, image, location, date, time, category, id}) {
    return (
        <div className="card max-w-60 h-full border-2 hover:shadow-weird shadow-none transition-shadow border-black rounded-lg transform hover:-translate-y-1 hover:-translate-x-1 transition">
            <a href={`/events/${id}`}>
                <div className="img-container">
                    <img className="object-cover rounded-t-md w-full h-32" src={image} alt={title} />
                </div>
                <div className="p-2 pl-3">
                    <h2 className="text-md font-bold">{title}</h2>
                    <p className="text-sm"><CalendarMonthIcon sx={{paddingRight:'2px', color: 'gray'}}/>{date} <CircleIcon sx={{fontSize: "0.5rem", color: 'gray'}}/> {time}</p>
                    <p className="text-sm text-gray-600">{location}</p>
                </div>
            </a>
           
        </div>
    );
}
