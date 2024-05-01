/* eslint-disable no-console */
import { Server } from 'http';
import app from './app';
import config from './app/config';

let server: Server;

function main() {
  server = app.listen(config.port, () => {
    console.log(`app is listening on port ${config.port}`);
  });
}

main();

process.on('unhandledRejection', (err) => {
  console.log(`😈 unahandledRejection is detected , shutting down ...`, err);
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});

process.on('uncaughtException', () => {
  console.log(`😈 uncaughtException is detected , shutting down ...`);
  process.exit(1);
});
