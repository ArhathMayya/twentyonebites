async function initialHandler(socket){
    socket.on('intialtabledata', (data) => {
        console.log("intialtabledata: ",data)
    })
}

module.exports = {initialHandler}