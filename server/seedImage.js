const { MongoClient } = require('mongodb');
const axios = require('axios');

// MongoDB configuration
const MONGO_URI = 'mongodb://localhost:27017'; // Update with your MongoDB URI if needed
const DATABASE_NAME = 'event-platform';
const COLLECTION_NAME = 'events';

// Function to fetch a random image URL from Unsplash using the first word of the title as the query
const getRandomImage = async (query) => {
    try {
        const response = await axios.get('https://api.unsplash.com/photos/random', {
            params: {
                client_id: 'RxIH3NClIyowOZvGLYWvfdkTkfoLT0CUBDyHTbPIukU', // Replace with your Unsplash API client_id
                query: query,
                count: 1,
                orientation: 'landscape'
            }
        });
        return response.data[0].urls.thumb;
    } catch (err) {
        console.error('Error fetching image from Unsplash:', err);
        return '';
    }
};

// Function to update each event with a random image based on the first word of its title
const updateEventImages = async () => {
    const client = new MongoClient(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

    try {
        await client.connect();
        const db = client.db(DATABASE_NAME);
        const collection = db.collection(COLLECTION_NAME);

        // Fetch all events from the database
        const events = await collection.find({}).toArray();

        // Update each event with a new image URL
        for (const event of events) {
            const firstWord = event.title.split(' ')[0]; // Extract the first word of the title
            const image = await getRandomImage(firstWord);
            
            // Update the event with the fetched image URL
            await collection.updateOne(
                { _id: event._id },
                { $set: { image: image } }
            );
            
            console.log(`Updated event ${event.title} with image: ${image}`);
        }

        console.log('All events updated with images!');
    } catch (error) {
        console.error('Error updating event images:', error);
    } finally {
        await client.close();
    }
};

// Run the update function
updateEventImages();
