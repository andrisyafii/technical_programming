export const calculatePotentialScore = (
    rating: number,
    rentCount: number,
    recentlyActive: number
  ): number => {
    // This formula is used to calculate a combined potential score
    // It weighs totalAverageWeightRatings highest, then numberOfRents, then recentlyActive
    
    // Normalize rating (assuming max is 5.0)
    const normalizedRating = rating / 5.0;
    
    // Normalize rent count (assuming a reasonable max is 100)
    const normalizedRentCount = Math.min(rentCount / 100, 1.0);
    
    // Normalize recency (assuming 30 days as reference)
    const currentTime = Math.floor(Date.now() / 1000);
    const daysDiff = (currentTime - recentlyActive) / (60 * 60 * 24);
    const recencyScore = Math.max(0, 1 - (daysDiff / 30));
    
    // Calculate combined score with weights
    return (normalizedRating * 0.6) + 
           (normalizedRentCount * 0.3) + 
           (recencyScore * 0.1);
  };