## Setup

### Dependencies

- Go to project directory (KEEN-CHALLENGE). Run `npm install` in project directory. This will install server-related dependencies such as `express`.
- `cd client` and run `npm install`. This will install client dependencies (React).

### Development

- Run `npm start` in project directory (my-express-app) to start the Express server on port 5000
- In another terminal, do `cd client` and run `npm start` to start the client in development mode with hot reloading in port 3000.

### Notes

- If you want to fecth more planets to manage, comment out the current getPlanets() function, and uncomment de following (also called getPlanets). The API has limited requests, so the second getPlanets function can exhaust all the requests. 