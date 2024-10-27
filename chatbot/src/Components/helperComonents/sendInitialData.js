
const generateAlphanumeric = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < 10; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  };
  
  console.log(generateAlphanumeric()); // Example output: "aB3dE5Gh2J"
  


export default function sendInitialData(socket, table, phonenumber){
    socket.emit('intialtabledata',{uuid: generateAlphanumeric(), table, phonenumber})
}