const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
    // console.log(req.url, req.method, req.headers);
    const url = req.url;
    const method = req.method;

    if(url === '/') {
        const formHTML = `
            <html>
                <head><title>User Form</title></head>
                <body>
                    <form action="/message" method="POST">
                        <input type="text" name="message">
                        <button type="submit">SEND</button>
                    </form>
                </body>
            </html>
        `;
        res.setHeader('Content-Type', 'text/html');
        res.write(formHTML);
        return res.end();
    }

    if(url === '/message' && method === 'POST') {
      const data = [];
      req.on("data", (chunk) => {
        data.push(chunk);
      });

      return req.on("end", () => {
        const parsedBody = Buffer.concat(data).toString();
        // console.log(parsedBody);
        fs.writeFileSync("message.txt", parsedBody.split('=')[1]);
        res.writeHead(302, {'Location': '/'});
        // res.statusCode = 302;
        // res.setHeader("Location", "/");
        return res.end();
      });
    }

    res.setHeader('Content-Type', 'text/html');
    res.write('Noting Match');
    res.end();
});

server.listen(3000, () => {
    console.log('Server is running');
});
