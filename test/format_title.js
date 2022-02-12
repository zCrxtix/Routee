const routee = require('../index');
const app = routee();

app.listen('/', (res, req) => {
    res.write('<a href="/my-page">My page</a>');
})

app.listen(app.format_title('my page'), (res, req) => {
    res.write("My page!");
});

app.start(8000)