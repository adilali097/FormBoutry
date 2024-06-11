const http = require('http');
const { sendEmail } = require('./sendEmail');

function createServer(port) {
    const server = http.createServer((req, res) => {
        if (req.method === 'POST' && req.url === '/contact') {
            let body = '';
            req.on('data', chunk => {
                body += chunk.toString();
            });

            req.on('end', async () => {
                const { name, email, message } = JSON.parse(body);

                try {
                    await sendEmail(name, email, message);
                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ success: true, message: 'Your message has been sent successfully!' }));
                } catch (error) {
                    res.writeHead(500, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ success: false, message: 'There was an error sending your message.' }));
                }
            });
        } else {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ success: false, message: 'Not Found' }));
        }
    });

    server.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`);
    });
}

module.exports = { createServer };
