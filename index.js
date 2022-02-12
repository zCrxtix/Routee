const http = require('http');

function format_title(str) {
    return str.replace(/[^\w\s]/gi, ' ').replace(/\s{2,}/g, '').replace(/\s/g, '-').toLowerCase().toString();
}

const routee = () => {
    var ctx = {
        path: '/',
        PORT: 0,
        routes: {}
    }
    const req = {
        url : 'localhost:' + ctx.PORT.toString() + ctx.path,
    }
    var res = {
        write: (html) => {
            ctx.routes[ctx.path].html = html;
        }
    }
    start = (PORT, html) => {
        ctx.PORT = PORT
        req.url = 'localhost:' + ctx.PORT.toString() + ctx.path
        http.createServer((rq, rs) => {
            const url = rq.url.split('/')
            const method = rq.method.toLowerCase()
            const route = '/' + url[1]
            const params = url.slice(2)
            ctx.path = route
            if (ctx.routes[route] !== undefined) {
                ctx.routes[route].visited++;
            }
            if (ctx.routes[route]) {
                ctx.routes[route].method(res, req);
                //rs.writeHead(200, {'Content-Type': 'text/html'});
                rs.end(ctx.routes[route].html);
            } else { // TODO: Custom 404 pages
                if (route !== '/') {
                    if (ctx.routes['/404']) {
                        ctx.path = '/404'
                        rs.writeHead(404, {'Content-Type': 'text/html'});
                        ctx.routes['/404'].method(res, req);
                        rs.end(ctx.routes['/404'].html);
                    } else {
                        rs.writeHead(404, {'Content-Type': 'text/html'});
                        rs.end('<h1>404</h1><p>Page not found! :sob:</p>');
                    }
                }
            }
        }).listen(PORT)
        ctx.log('Server listening at http://localhost:' + PORT.toString() + '/')
        ctx.log('Press Ctrl^C to quit')
    },
    log = (...args) => {
        console.log("[ROUTEE]:", ...args)
    },
    listen = (route, func) => {
        ctx.routes[route] = {
            name: route,
            method: func,
            visited: 0
        }
    },

    ctx.start = start
    ctx.listen = listen
    ctx.log = log
    ctx.format_title = format_title
    return ctx
}

module.exports = routee