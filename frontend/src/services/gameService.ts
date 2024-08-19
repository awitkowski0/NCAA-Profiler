import { Play } from "../types/play";
import data from "../data/game.json";

const isDevelopment = process.env.NODE_ENV === 'development';

export const fetchGameData = async (): Promise<Play[]> => {
  try {
    if (isDevelopment) {
      // If in development mode, return the imported JSON data directly
      console.log('Development mode: Returning local JSON data');
      return data as unknown as Play[];
    } else {
      // In production, fetch the data from the server
      console.log('Production mode: Fetching data from API');
      const response = await fetch('http://localhost:89/api/game/?game_id');
      if (!response.ok) {
        throw new Error(`Failed to fetch data: ${response.status} ${response.statusText}`);
      }

      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        const data: Play[] = await response.json();
        console.log('Successfully fetched and parsed data:', data);
        return data;
      } else {
        throw new Error('Received non-JSON response');
      }
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(`Error fetching data in ${isDevelopment ? 'development' : 'production'} mode:`, error.message);
    } else {
      console.error('An unknown error occurred:', error);
    }
    throw error;  // Re-throw the error so that it can be caught by higher-level error handlers
  }
};
