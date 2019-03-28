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
- In your Alexa Developer Console, configure Alexa skill's Endpoint by choosing HTTPS option and use Ngrok's Forwarding URI as the Endpoint (please note, everytime you start/restart a new Ngrok, you'll need to update Alexa skill's Endpoint):

  ![Alexa Endpoint Configuration](./public/images/Screen Shot 2019-03-27 at 9.03.48 PM.png?raw=true "Optional Title")
