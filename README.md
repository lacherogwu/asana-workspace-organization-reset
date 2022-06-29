# How to use?

Clone the repo

Run `npm i`

Setup the environment values in `.env` file
Generate access token [here](https://app.asana.com/0/my-apps), and paste it for `ACCESS_TOKEN` key

and find the workspace you are want to reset and paste the id on `WORKSPACE_ID` key, you can find the workspace id in the url in your browser tab, it looks something like `https://app.asana.com/0/home/WORKSPACE_ID`

On the `index.js` file, you will see set of function on the bottom of the file, you can comment/uncomment depends on your needs, and then just simply run the file

npm start

## Delete Teams Script

There's no option to remove team using the api, so I used their ws connection to send messages to their server

run the `generateDeleteTeamCode` piece of code and copy the output from `ws-scripts/delete-teams-code.js` and paste it on your browser. before you paste the code in your browser console, make sure to set the WS_SESSION_ID in the `.env` file, read below how to get the session id

It might not catch all if you have many teams, so once it's stop working just refresh your browser and generate the code again and paste it.

If it's not working, open the browser console first and hit refresh while the console is open, then paste and run the code.

## Get WS_SESSION_ID

type `page_load_globals.session_id` in the console and paste the value in the `.env` file to the `WS_SESSION_ID` key

## Delete Members Script

I couldn't achieve to do it with api call or ws message, so I created a script that will run on your browser while you are on the members page and it will just click for you on the html elements. check it out `remove-members-code.js`
