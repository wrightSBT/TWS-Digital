// Vercel Web Analytics initialization for static HTML site
// This script must be loaded as a module in HTML files

import { inject } from 'https://cdn.jsdelivr.net/npm/@vercel/analytics@2.0.1/+esm';

// Inject Vercel Web Analytics
// The inject function will automatically load the analytics script
// and start tracking page views
inject({
  mode: 'auto', // 'auto' will use production mode when deployed, development mode locally
  debug: false   // Set to true for debugging
});
