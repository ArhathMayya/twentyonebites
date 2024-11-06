const { initialHandler } = require('../handlers/initialHandlers');
const { CategoryModel, FoodModel } = require('./../models');

function generateRandomId(){
    result = 'foodID_'
    chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    for(let i = 0; i < 10; i++){
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result

}
function WsGateway(socket, io) {
    // Notify when a new kitchen client connects
    initialHandler(socket)
    socket.on('kitchen', (data) => {
        console.log("Kitchen: ", data);
    });

    // Handle message sending
    socket.on('send_message', (data) => {
        console.log('Received message:', data);
        
        // Response from bot
        const returnData = {
            type: "text",
            from: "bot",
            message: "yoooooo",
            time: new Date().toLocaleTimeString(),
        };

        io.emit('receive_message', returnData);
        console.log("Emitting preparefood with data:", data.orderdetails);
        data.orderdetails.id = generateRandomId();
        io.emit('preparefood', data.orderdetails);

    });

    // Cleanup and listener for retrieving food information
    socket.removeAllListeners('getfoodinfo');
    socket.on('getfoodinfo', async () => {
        try {
            const results = await CategoryModel.find({ available: 'True' });
            const response = results.map((result) => result.name);
            socket.emit('menu', { response });
            console.log('Categories available:', response);
        } catch (err) {
            console.error('Error fetching food info:', err);
            socket.emit('error', { message: 'Error fetching food info', error: err.message });
        }
    });

    socket.on('startcooking', (data)=>{
        console.log("Start Cooking of: ", data)
    })

    socket.on('foodprepared', (data)=>{
        console.log("Food preparation completed: ", data)
    })

    // Notify when a user disconnects
    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
    });
}

module.exports = WsGateway;
