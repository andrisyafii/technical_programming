export const formatEpochTime = (epochTime: number): string => {
    return new Date(epochTime * 1000).toLocaleString();
  };
  
  export const getCurrentEpochTime = (): number => {
    return Math.floor(Date.now() / 1000);
  };