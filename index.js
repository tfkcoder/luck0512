const fs = require('fs');
const axios = require('axios');
const { promisify } = require('util');
const writeFileAsync = promisify(fs.writeFile);

async function generateGitHubStats() {
  try {
    // Make API requests to fetch GitHub statistics
    const userResponse = await axios.get('https://api.github.com/users/yourusername');

    // Customize the statistics you want to display
    const stats = {
      username: userResponse.data.login,
    };

    // Generate the markdown content for your README
    const markdownContent = `
      # Hi there! 👋

      Welcome to my GitHub profile! I'm passionate about coding and ui/ux.

      ## GitHub Stats

      <!-- GitHub Stats Card -->
      ![GitHub Stats Card](https://github-readme-stats.vercel.app/api?username=${stats.tfkcodes})

      <!-- Additional Custom Cards -->
      <!-- Insert more cards here for additional statistics -->
    `;

    // Write the markdown content to the README.md file
    await writeFileAsync('README.md', markdownContent);

    console.log('GitHub Stats updated successfully!');
  } catch (error) {
    console.error('Error updating GitHub Stats:', error.message);
  }
}

generateGitHubStats();
