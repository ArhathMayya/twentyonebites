const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const { use } = require('./foodroutes')


const data = [
    {
        'id': '1',
        'name': 'arhath',
        'password': 'int123$%^',
        'role': 'kitchenhead'
    },
    {
        'id': '2',
        'name': 'arun',
        'password': 'int123$%^',
        'role': 'cashier'
    },
    {
        'id': '3',
        'name': 'alex',
        'password': 'int123$%^',
        'role':'employee'
    }
]




router.post('/kitchenlogin', (req, res) => {
    const {name, password} = req.body
    if(!name || !password){
        res.status(400).json({message: "Incomplete Data provided"})
        return
    }
    const user = data.find((u) => {
        return u.name === name && u.password == password
    })

    if (user){
        const accessToken = jwt.sign({id: user.id, name: user.name, role: user.role}, "mySecretKey")
        res.status(200).json({
            name: user.name,
            role: user.role,
            accessToken
        });
    } else {
        res.status(400).json({message:"Username or Passworsd Wrong"})
    }


})

module.exports = router