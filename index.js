const express = require('express');

const server = express();
server.use(express.json());
const users = ['andressa', 'fabi', 'renato', 'joao'];
server.use ((req, res, next) => {
    console.time('tempo');
    next();
    console.timeEnd('tempo');
});

function checkUserExists(req, res, next) {
    if(!req.body.user){
        return res.status(400).json({ error: 'User not found' });
    }
    return next();
}
function checkUserInArray(req,  res,next) {
    if (!users[req.params.index]) {
        return res.status(400).json({ error: "User don't exist" });
    }
}

server.get('/users/:index', checkUserInArray, (req, res) => {
    const {index} = req.params;
    return res.json({message:`${users[index]}`});
});
server.get('/users', (req,res) => {
    return res.json(users);
});
server.post('/users', (req, res) => {
    const {name} = req.body;
    users.push(name);
    return res.json(users);
});
server.put('/users/:index', checkUserExists, (req,res) => {
    const {name} = req.body;
    const {index} = req.params;
    users[index] = name;
    return res.json(users);
});
server.delete('/users/:index', checkUserInArray, (req,res) =>{
    const {index} = req.params;
    users.splice(index,1);
    return res.send();
});
server.listen(3000);
