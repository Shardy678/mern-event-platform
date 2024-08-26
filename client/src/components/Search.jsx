export default function Search({setSearchTitle, setCategory, searchTitle, category}) {
    return (
        <div className="mb-6">
                    <input
                        type="text"
                        value={searchTitle}
                        onChange={(e) => setSearchTitle(e.target.value)}
                        placeholder="Search by title..."
                        className="px-4 py-2 border border-gray-300 rounded-lg w-full"
                    />
                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="px-4 py-2 border border-gray-300 rounded-lg mt-4 w-full"
                    >
                        <option value="All">All Categories</option>
                        <option value="Technology">Technology</option>
                        <option value="Arts">Arts</option>
                        <option value="Music">Music</option>
                        <option value="Sports">Sports</option>
                        <option value="Food">Food</option>
                        <option value="Business">Business</option>
                        <option value="Technology">Technology</option>
                        <option value="Family">Family</option>
                        <option value="Health">Health</option>
                        <option value="Community">Community</option>
                        <option value="Education">Education</option>
                    </select>
        </div>
    )
}