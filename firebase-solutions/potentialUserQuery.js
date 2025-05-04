// Tertiary weight for recency (unix timestamp in seconds)
    // This is actually inverse - older timestamps (smaller numbers) should rank lower
    // The division helps normalize large timestamps
    
    // Calculate the composite potential score
    // This formula maintains the ordering: User A → User B → User C
    // It heavily weights the rating, then number of rents, then recency
    const potentialScore = 
      (totalAverageWeightRatings * ratingWeight) + 
      (numberOfRents * rentsWeight) + 
      (recentlyActive / 10000);
    
    // Update the document with the calculated score
    return change.after.ref.set({
      potentialScore: potentialScore
    }, { merge: true });
  });

// Step 2: Query users sorted by this composite score with pagination
// This query can be used in your application code

/**
 * Function to get the most potential users with pagination
 * @param {number} limit - Number of users to return per page
 * @param {any} lastDoc - Last document from previous batch for pagination
 * @returns {Promise<Array>} - Array of user documents
 */
async function getMostPotentialUsers(limit = 10, lastDoc = null) {
  const db = admin.firestore();
  let query = db.collection('USERS')
    .orderBy('potentialScore', 'desc') // Sort by our pre-calculated score
    .limit(limit);
  
  // Apply pagination if we have a starting point
  if (lastDoc) {
    query = query.startAfter(lastDoc);
  }
  
  const snapshot = await query.get();
  const users = [];
  
  snapshot.forEach(doc => {
    users.push({
      id: doc.id,
      ...doc.data()
    });
  });
  
  // Return both the users and the last document for pagination
  return {
    users,
    lastDoc: snapshot.docs[snapshot.docs.length - 1]
  };
}