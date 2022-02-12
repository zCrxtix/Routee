const routee = require('../index');
const app = routee();

app.listen('/', (res, req) => {
    res.write(`
    <title>Routee</title>
    <h1 class="title">Hello world from Routee!</h1>
    <p id="text"></p>
    <a href="/secret">Secret</a>
    <style>
        .title {
            color: darkblue;
        }
    </style>
    <noscript>No JavaScript in 2022 :skull:</noscript>
    <script>
        const text = document.getElementById('text');
        const value = ${app.routes['/'].visited};
        if (value === 1) {
            text.innerHTML = 'Visited this page ' + value + ' time';
        } else {
            text.innerHTML = 'Visited this page ' + value + ' times';
        }
    </script>
    `);
    console.log("URL: " + req.url);
});

app.listen('/secret', (res, req) => {
    res.write('<h1>Secret!!!</h1><p>Huh? How\'d you get here?</p>');
});

app.listen('/404', (res, req) => {
    res.write('<h1>404</h1><p>Custom 404 page, page not found!</p>');
});
app.start(3000);