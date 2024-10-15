const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const WsGateway = require('./routes/WsGateway');
const connectToMongoDb = require('./dbconfig/mongooseDB');

const app = express();

// Use CORS middleware
app.use(cors());

// Middleware to parse JSON bodies
app.use(express.json());

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "*", // React client origin
        methods: "*",
    },
    path: "/twentyonesocket"
});

// Connect to MongoDB
connectToMongoDb().catch(err => {
    console.error('Failed to connect to MongoDB:', err);
    process.exit(1);
});

// Handle WebSocket connections
io.on('connection', (socket) => WsGateway(socket, io));

// Start server
server.listen(4000, () => {
    console.log('Server is running on port 4000');
});

// Routes
app.use('/21bites', require('./routes/foodroutes'));
