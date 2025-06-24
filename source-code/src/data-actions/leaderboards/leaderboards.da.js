/**
 * @param {any} currentUser
 * @param {any} users
 */
export async function getTopCandidates(currentUser, users) {
  return new Promise((resolve) => {
    // Sort users by total points (descending)
    let sortedUsers = [...users].sort(
      (a, b) => b.total_points - a.total_points,
    );
    // Get the top 3 users
    let topUsers = sortedUsers.slice(0, 3);
    // console.log(topUsers, "topUsers");

    // If currentUser is null, return top 3 without further checks
    if (!currentUser) {
      resolve(topUsers);
      return;
    }

    // Check if the current user is in the top 3
    let isCurrentUserInTop = topUsers.some(
      (user) => user.username === currentUser.username,
    );

    // If not in top 3, check if the current user's rank or points are eligible
    if (!isCurrentUserInTop) {
      // Find the lowest-ranked user in the top 3
      let lowestTopUser = topUsers[topUsers.length - 1];

      // Check if the current user has more points than the lowest in the top 3
      if (currentUser.total_points > lowestTopUser.total_points) {
        // Remove the lowest user and insert the current user
        topUsers.pop();
        topUsers.push(currentUser);
      }
    }

    // Remove duplicates (ensuring unique usernames)
    topUsers = [
      ...new Map(topUsers.map((user) => [user.username, user])).values(),
    ];

    // Ensure only 3 users are returned
    resolve(topUsers.slice(0, 3));
  });
}
