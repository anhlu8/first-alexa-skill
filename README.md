## Technologies used:

- Node.js
- Express
- Ngrok (for development, to securely expose Express server (localhost) to the web instead of using AWS Lambda)

## How to start:

- Install Ngrok in your machine by running `brew cask install ngrok`
- Install Nodemon globally in your machine by running `npm install -g nodemon`
- `cd` to this project
- Run `nodemon index.js`
- In another terminal, run `ngrok http 3000`
- In your Alexa Developer Console, configure HTTPS and use Ngrok's Forwarding URI as the Endpoint:

  ![Alexa Endpoint Configuration]("./public/images/Screen Shot 2019-03-27 at 9.03.48 PM.png")
