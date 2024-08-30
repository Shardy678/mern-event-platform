const { MongoClient } = require('mongodb')
const axios = require('axios')

// MongoDB configuration
const MONGO_URI = 'mongodb://localhost:27017' // Update with your MongoDB URI if needed
const DATABASE_NAME = 'event-platform'
const COLLECTION_NAME = 'events'

// Function to fetch a random image URL from Unsplash
const getRandomImage = async () => {
  try {
    const response = await axios.get('https://api.unsplash.com/photos/random', {
      params: {
        client_id: 'RxIH3NClIyowOZvGLYWvfdkTkfoLT0CUBDyHTbPIukU',
        query: 'event',
        count: 1,
        orientation: 'landscape',
      },
    })
    return response.data[0].urls.thumb
  } catch (err) {
    console.error('Error fetching image from Unsplash:', err)
    return ''
  }
}

// Function to create a random event
const createEvent = async () => {
  const image = await getRandomImage()
  return {
    title: 'An event',
    description: 'An event description',
    location: 'Moscow, Russia',
    image: image,
  }
}

// Function to seed the database
const seedDatabase = async () => {
  const client = new MongoClient(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })

  try {
    await client.connect()
    const db = client.db(DATABASE_NAME)
    const collection = db.collection(COLLECTION_NAME)

    // Generate 10 events
    const events = []
    for (let i = 0; i < 10; i++) {
      const event = await createEvent()
      events.push(event)
    }

    // Insert events into MongoDB
    await collection.insertMany(events)
    console.log('Database seeding completed with 10 events!')
  } catch (error) {
    console.error('Error seeding the database:', error)
  } finally {
    await client.close()
  }
}

// Run the seeding function
seedDatabase()
