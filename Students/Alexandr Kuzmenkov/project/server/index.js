
let express = require('express');
let fs = require('fs');

let server = express();

server.use(express.json());

server.get('/catalog', (req, res) => {
    fs.readFile('./server/db/catalog.json', 'utf-8', (err, data) => {
        if (!err) {
            res.send(data);
//            res.json(data);
        }
    })
});

// server.post();
// server.put();
// server.delete();

server.listen(3000, () => {
    console.log('Server is running at port 3000')
});