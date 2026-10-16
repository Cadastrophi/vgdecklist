import { preview } from 'vite';

async function start() {
  const server = await preview({
    preview: {
      port: 5173,
      host: '0.0.0.0',
      open: false,
    }
  });

  server.printUrls();
  
  // Keep process alive indefinitely
  setInterval(() => {}, 1000000);
}

start().catch(err => {
  console.error('Failed to start preview server:', err);
  process.exit(1);
});
