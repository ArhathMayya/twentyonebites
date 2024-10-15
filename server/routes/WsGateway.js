const {CategoryModel, FoodModel} = require('./../models')

function WsGateway(socket, io) {
    // Remove any previously attached listeners to avoid duplicate logs
    // socket.removeAllListeners('send_message');
    

    socket.on('send_message', (data) => {
        console.log('Received message: ', data);
        const returnData = {
            type: "text",
            from: "bot",
            message: "yoooooo",
            time: new Date(Date.now()).toLocaleTimeString(),
        };
        io.emit('receive_message', returnData);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected: ', socket.id);
    });
    socket.removeAllListeners('getfoodinfo');
    socket.on('getfoodinfo', async (data) => {
        let model = CategoryModel;
        const results = await model.find({ 'available': 'True' });
        const response = results.map((result) => result.name);
        socket.emit('menu', { response });
        console.log(response);
    });

    // socket.on('getsubmenu', async (data) => {
    //     try {
    //         console.log(data.message);
            
    //         // Fetch all food items under the specified category
    //         const results = await FoodModel.find({ 'category': data.message });
    //         console.log(results);
    
    //         // If the intent is to return only the name of the items, map over the results
    //         const response = results
    //         .filter(res => res.available === 'True')  // Filter only those with available === 'True'
    //         .map(res => res.name);  //
    
    //         // Emit the filtered response back to the client
    //         socket.emit('submenu', { items: response });
    //     } catch (err) {
    //         console.error('Error while fetching submenus:', err);
    //         socket.emit('error', { message: 'Error while fetching submenus', error: err.message });
    //     }
    // });
}

module.exports = WsGateway;
