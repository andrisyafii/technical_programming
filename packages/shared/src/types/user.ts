export interface User {
    id: string;
    name: string;
    email: string;
    totalAverageWeightRatings: number;
    numberOfRents: number;
    recentlyActive: number; // epoch time
    // Add other user fields as needed
  }