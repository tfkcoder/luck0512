const fs = require('fs');
const axios = require('axios');
const { promisify } = require('util');
const writeFileAsync = promisify(fs.writeFile);

async function generateGitHubStats() {
  try {
    // Make API requests to fetch GitHub statistics
    const response = await axios.get('https://api.github.com/users/tfkcodes');
    const userData = response.data;

    // Customize the statistics you want to display
    const stats = {
      name: userData.name,
      username: userData.login,
      followers: userData.followers,
      following: userData.following,
      stars: userData.public_repos,
      contributions: userData.contributions,
    };

    // Generate the markdown content for your README
    const markdownContent = `
      ## GitHub Stats

      - Name: ${stats.name}
      - Username: ${stats.username}
      - Followers: ${stats.followers}
      - Following: ${stats.following}
      - Stars: ${stats.stars}
      - Contributions: ${stats.contributions}
    `;

    // Write the markdown content to the README.md file
    await writeFileAsync('README.md', markdownContent);

    console.log('GitHub Stats updated successfully!');
  } catch (error) {
    console.error('Error updating GitHub Stats:', error.message);
  }
}

generateGitHubStats();

