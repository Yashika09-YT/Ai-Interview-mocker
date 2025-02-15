import { createClient } from '@neondatabase/client';

// Initialize the Neon client
const client = createClient({
  connectionString: process.env.NEON_DATABASE_URL, // Ensure this is set in .env
});

export default client;