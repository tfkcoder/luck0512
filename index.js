const fs = require('fs');
const axios = require('axios');
const { promisify } = require('util');
const writeFileAsync = promisify(fs.writeFile);

async function generateGitHubStats() {
  try {
    // Make API requests to fetch GitHub statistics
    const userResponse = await axios.get('https://api.github.com/users/tfkcodes');
    const reposResponse = await axios.get('https://api.github.com/users/tfkcodes/repos');

    const userData = userResponse.data;
    const reposData = reposResponse.data;

    // Calculate the total number of commits
    let totalCommits = 0;
    for (const repo of reposData) {
      const commitsResponse = await axios.get(repo.commits_url.replace('{/sha}', ''));
      totalCommits += commitsResponse.data.length;
    }

    // Customize the statistics you want to display
    const stats = {
      name: userData.name,
      username: userData.login,
      followers: userData.followers,
      following: userData.following,
      stars: userData.public_repos,
      contributions: userData.contributions,
      totalCommits: totalCommits,
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
      - Total Commits: ${stats.totalCommits}
    `;

    // Write the markdown content to the README.md file
    await writeFileAsync('README.md', markdownContent);

    console.log('GitHub Stats updated successfully!');
  } catch (error) {
    console.error('Error updating GitHub Stats:', error.message);
  }
}

generateGitHubStats();
