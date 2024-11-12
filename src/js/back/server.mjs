import http from 'http';
import { main } from './client.mjs';

const server = http.createServer((req, res) => {
    res.end('hello')
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
    res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    main()
    .then(r => console.log(r))

})
const PORT = 5000


server.listen(PORT, () => {
    console.log(`🏃‍♀️ Server is running at http://localhost:${PORT}`)
})