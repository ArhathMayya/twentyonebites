const { CategoryModel, FoodModel } = require('./../models');

function WsGateway(socket, io) {
    // Notify when a new kitchen client connects
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

    // Notify when a user disconnects
    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
    });
}

module.exports = WsGateway;
