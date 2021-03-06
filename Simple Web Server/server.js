const http = require('http'); // For creating server, we need http module
const fs = require('fs'); // For file system

const server = http.createServer((req, res) => {
    /** 
     * Creating the server and execute that anonymous function
     * for every request through the port in localhost  
     * So, we should do everything into this function 
    */
   const url = req.url, method = req.method;
   res.writeHead(200,{'Content-Type':'text/html'}); // status code 200 is everything ok
   if(url === '/favicon.ico' && method === 'GET') {
       res.statusCode = 204;
       return res.end();
   } else {
       if(url === '/') { // Checking the home page
           fs.readFile('./home.html', (err, data) => {
               res.write(data);
               return res.end();
           });
       } else {
           fs.readFile('.'+url, (err, data) => {
                if(err) { // If error occurs, then can not be able to read file, so there is no such file
                    return res.end('No Such File!');
                } else { // else reading successful and write the data as response
                    res.write(data);
                    return res.end(); // send the response
                }
           });
       }
    }
});

server.listen(3000, () => { // Listening on port 3000
    /**
     * Open terminal in current working directory
     * and write 'npm start'
     * Then go to browser and write 'localhost:3000'
     * because your server is running on this port 
    */
    console.log('Listening...'); 
});