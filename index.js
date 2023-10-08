const fs = require('fs');
const axios = require('axios');
const { promisify } = require('util');
const writeFileAsync = promisify(fs.writeFile);
const readFileAsync = promisify(fs.readFile);

async function generateGitHubStats() {
  try {
    // Make API requests to fetch GitHub statistics
    const userResponse = await axios.get('https://api.github.com/users/tfkcodes');

    // Customize the statistics you want to display
    const stats = {
      username: userResponse.data.login,
    };

    // Read the existing content of the README.md file
    const existingReadmeContent = await readFileAsync('README.md', 'utf8');

    // Generate the markdown content for the new UI/UX statistics card
    const uiUxCard = `
      ## UI/UX Statistics

      <!-- UI/UX Card -->
      <!-- You can add your UI/UX statistics card here -->
    `;

    // Combine the existing content and the new UI/UX card
    const updatedReadmeContent = existingReadmeContent.replace('<!-- Additional Custom Cards -->', uiUxCard);

    // Write the combined markdown content back to the README.md file
    await writeFileAsync('README.md', updatedReadmeContent);

    console.log('GitHub Stats updated successfully!');
  } catch (error) {
    console.error('Error updating GitHub Stats:', error.message);
  }
}

generateGitHubStats();
