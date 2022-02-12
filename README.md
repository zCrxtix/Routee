# Routee
*Site routing and front-end assist*
***
Routee is an project that I started because I was bored. It's inspired by express, and depends on HTTP for the server. It is early indev, so expect bugs and changes. Nothing here is finalized yet.

## Plans
*These plans are things that I want to be achieved before I finalize this project*
- HTML file reading []
- GET and POST requests to other websites []
- Organized code []

## Examples
***
### Setup app
```javascript
    const routee = require('./path_to_routee');
    const app = routee();
```

### Start server with PORT
```javascript
    app.start(3000); // Replace 3000 with your PORT
```

### "Hello World" displayed on "/", while printing the URL
```javascript
    app.listen('/', (res, req) => {
        res.write("<h1>Hello World</h1");
        console.log("URL: " + req.url);
    });
```
### Format a title (removes special characters, removes repeated whitespace, replaces all whitespace with dashes, lowers string)
```javascript
    app.format_title("My cool page!!!") // my-cool-page
```