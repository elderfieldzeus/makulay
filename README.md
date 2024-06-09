# makulay
A Nodejs project for inputting, storing, and displaying colors that users would like to remember.

### Notes:
- body-parser is used to parse json to make it available in the req.body. Without this req.body is undefined.
    - functions used are ```app.use(bodyParser.json())``` and ```app.use(bodyParser.urlencoded( {extended: true} ))```.
- Store static files like css and script files in one folder (public) so the express.static can send them all ( **IMPORTANT!** ).
- ```fetch()``` is used here to send data json to the backend, while receiving the response at the same time.
    - ```{method: ..., header: {"Content-Type: "application/json"}, body: JSON.stringify(<nameofdataobject>)}``` 
- "middleware" is used as a middle-man function to check whether it should continue or exit the route process. It must end with '```next();```' if it can successfully continue.