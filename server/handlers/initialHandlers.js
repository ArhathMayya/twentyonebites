const {setToRedis, getFromRedis, removeFromRedis} = require('../services/redisService')
$
async function initialHandler(socket){
    socket.on('intialtabledata', (data) => {
        console.log("intialtabledata: ",data, socket.id)
        setToRedis(`${data.phonenumber}_table_${data.table}`, )
        
    })
}

module.exports = {initialHandler}