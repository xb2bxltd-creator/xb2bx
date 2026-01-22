const axios = require('axios');

// Function to fetch a random joke
async function getRandomJoke() {
    try {
        const response = await axios.get('https://official-joke-api.appspot.com/random_joke');
        const joke = response.data;
        console.log(`\n${joke.setup}\n${joke.punchline}\n`);
        return joke;
    } catch (error) {
        console.error('Error fetching joke:', error.message);
    }
}

// Function to fetch jokes by type
async function getJokeByType(type) {
    try {
        const response = await axios.get(`https://official-joke-api.appspot.com/jokes/${type}/random`);
        const joke = response.data;
        console.log(`\n${joke.setup}\n${joke.punchline}\n`);
        return joke;
    } catch (error) {
        console.error('Error fetching joke:', error.message);
    }
}

// Function to fetch multiple random jokes
async function getMultipleJokes(count = 5) {
    try {
        const response = await axios.get(`https://official-joke-api.appspot.com/jokes/random/${count}`);
        console.log('\n--- Random Jokes ---\n');
        response.data.forEach((joke, index) => {
            console.log(`${index + 1}. ${joke.setup}`);
            console.log(`   ${joke.punchline}\n`);
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching jokes:', error.message);
    }
}

// Main execution
(async () => {
    console.log('=== Random Joke Generator ===\n');
    // Get a single random joke
    await getRandomJoke();
    // Get a joke by type (e.g., 'knock-knock', 'general')
    await getJokeByType('knock-knock');
    // Get multiple jokes
    await getMultipleJokes(3);
})();

module.exports = { getRandomJoke, getJokeByType, getMultipleJokes };