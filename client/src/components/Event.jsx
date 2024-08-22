export default function Event({key, title, image, description, location, createdBy, id}) {
    return (
        <div className="card size-56 border-2 hover:shadow-weird shadow-none transition-shadow border-black rounded-lg">
            <a href={`/events/${id}`}>
                <div className="img-container">
                    <img className="object-cover rounded-md w-full h-32" src={image} alt={title} />
                </div>
                <div className="p-2 pl-3">
                    <h2 className="text-md font-bold">{title}</h2>
                    <p className="text-sm text-gray-600">{location}</p>
                    <p className="text-sm text-gray-500">Created by: {createdBy}</p>
                </div>
            </a>
           
        </div>
    );
}
