import { IBlog } from '@/types';

export const blog: IBlog = {
    title: 'Building Real-time Applications with WebSockets and Redis',
    slug: 'realtime-websockets-redis',
    year: 2024,
    description:
        'Learn how to build real-time applications using WebSockets and Redis for instant data synchronization.',
    readTime: '7 min read',
    tags: ['WebSockets', 'Redis', 'Real-time', 'Node.js', 'Socket.io'],
    thumbnail: '/projects/long/yt.png',
    publishedAt: '2024-06-05',
    excerpt:
        'Discover how to implement real-time features in your applications using WebSockets and Redis pub/sub patterns.',
    content: `# Building Real-time Applications with WebSockets and Redis

Real-time applications have become essential in modern web development. From chat applications to live dashboards, users expect instant updates. This guide explores building real-time features using WebSockets and Redis.

## Understanding Real-time Communication

Traditional HTTP follows a request-response pattern, which isn't ideal for real-time updates. WebSockets provide full-duplex communication, allowing servers to push data to clients instantly.

### Use Cases for Real-time Applications:
- **Chat Applications**: Instant messaging
- **Live Dashboards**: Real-time analytics
- **Collaborative Tools**: Document editing
- **Gaming**: Multiplayer interactions
- **Trading Platforms**: Live price updates

## WebSocket Fundamentals

WebSockets establish a persistent connection between client and server, enabling bidirectional communication.

### Basic WebSocket Server (Node.js)

\`\`\`javascript
const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', (ws) => {
    console.log('Client connected');
    
    ws.on('message', (message) => {
        console.log('Received:', message);
        
        // Broadcast to all clients
        wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        });
    });
    
    ws.on('close', () => {
        console.log('Client disconnected');
    });
});
\`\`\`

### Client-side WebSocket

\`\`\`javascript
const socket = new WebSocket('ws://localhost:8080');

socket.onopen = () => {
    console.log('Connected to server');
    socket.send('Hello Server!');
};

socket.onmessage = (event) => {
    console.log('Message from server:', event.data);
    updateUI(event.data);
};

socket.onclose = () => {
    console.log('Disconnected from server');
};
\`\`\`

## Redis for Scalability

Redis pub/sub enables scaling WebSocket applications across multiple servers, ensuring all connected clients receive updates regardless of which server they're connected to.

### Redis Pub/Sub Setup

\`\`\`javascript
const redis = require('redis');
const publisher = redis.createClient();
const subscriber = redis.createClient();

// Publishing messages
const publishUpdate = (channel, data) => {
    publisher.publish(channel, JSON.stringify(data));
};

// Subscribing to messages
subscriber.subscribe('chat_messages');
subscriber.on('message', (channel, message) => {
    const data = JSON.parse(message);
    
    // Broadcast to WebSocket clients
    wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify(data));
        }
    });
});
\`\`\`

## Socket.IO for Enhanced Features

Socket.IO provides additional features like rooms, namespaces, and automatic fallbacks.

### Socket.IO Server

\`\`\`javascript
const io = require('socket.io')(server);

io.on('connection', (socket) => {
    console.log('User connected:', socket.id);
    
    // Join a room
    socket.on('join_room', (room) => {
        socket.join(room);
        socket.to(room).emit('user_joined', socket.id);
    });
    
    // Handle messages
    socket.on('send_message', (data) => {
        io.to(data.room).emit('receive_message', {
            message: data.message,
            sender: socket.id,
            timestamp: new Date()
        });
    });
    
    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
    });
});
\`\`\`

### Socket.IO Client

\`\`\`javascript
const socket = io('http://localhost:3000');

// Join a chat room
socket.emit('join_room', 'general');

// Send message
const sendMessage = (message) => {
    socket.emit('send_message', {
        room: 'general',
        message: message
    });
};

// Receive messages
socket.on('receive_message', (data) => {
    displayMessage(data);
});
\`\`\`

## Building a Real-time Chat Application

### Backend Implementation

\`\`\`javascript
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const redis = require('redis');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const redisClient = redis.createClient();
const redisSubscriber = redis.createClient();

io.on('connection', (socket) => {
    socket.on('join_room', async (room) => {
        socket.join(room);
        
        // Load chat history from Redis
        const messages = await redisClient.lrange(\`chat:\${room}\`, 0, -1);
        socket.emit('chat_history', messages.map(JSON.parse));
    });
    
    socket.on('send_message', async (data) => {
        const message = {
            id: Date.now(),
            user: data.user,
            message: data.message,
            timestamp: new Date(),
            room: data.room
        };
        
        // Store in Redis
        await redisClient.lpush(\`chat:\${data.room}\`, JSON.stringify(message));
        await redisClient.ltrim(\`chat:\${data.room}\`, 0, 99); // Keep last 100 messages
        
        // Broadcast to room
        io.to(data.room).emit('new_message', message);
    });
});

server.listen(3000, () => {
    console.log('Server running on port 3000');
});
\`\`\`

### Frontend Implementation

\`\`\`javascript
class ChatApp {
    constructor() {
        this.socket = io();
        this.currentRoom = 'general';
        this.initializeEventListeners();
    }
    
    initializeEventListeners() {
        // Join room on connect
        this.socket.on('connect', () => {
            this.socket.emit('join_room', this.currentRoom);
        });
        
        // Handle chat history
        this.socket.on('chat_history', (messages) => {
            this.displayMessages(messages);
        });
        
        // Handle new messages
        this.socket.on('new_message', (message) => {
            this.displayMessage(message);
        });
        
        // Send message on form submit
        document.getElementById('messageForm').addEventListener('submit', (e) => {
            e.preventDefault();
            const input = document.getElementById('messageInput');
            this.sendMessage(input.value);
            input.value = '';
        });
    }
    
    sendMessage(message) {
        this.socket.emit('send_message', {
            room: this.currentRoom,
            user: 'User',
            message: message
        });
    }
    
    displayMessage(message) {
        const messagesContainer = document.getElementById('messages');
        const messageElement = document.createElement('div');
        messageElement.innerHTML = \`
            <div class="message">
                <strong>\${message.user}:</strong> \${message.message}
                <small>\${new Date(message.timestamp).toLocaleTimeString()}</small>
            </div>
        \`;
        messagesContainer.appendChild(messageElement);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
}

// Initialize chat app
const chat = new ChatApp();
\`\`\`

## Performance Optimization

### Connection Management
- Implement connection pooling
- Handle reconnection logic
- Use heartbeat/ping-pong for connection health

\`\`\`javascript
// Heartbeat implementation
const heartbeat = () => {
    clearTimeout(this.pingTimeout);
    this.pingTimeout = setTimeout(() => {
        this.terminate();
    }, 30000 + 1000);
};

ws.on('open', heartbeat);
ws.on('ping', heartbeat);
ws.on('pong', heartbeat);
\`\`\`

### Message Optimization
- Compress large messages
- Batch multiple updates
- Use binary protocols when appropriate

### Scaling Strategies
- Use Redis Cluster for high availability
- Implement sticky sessions for load balancing
- Consider using message queues for complex workflows

## Security Considerations

### Authentication
\`\`\`javascript
io.use((socket, next) => {
    const token = socket.handshake.auth.token;
    
    if (isValidToken(token)) {
        socket.userId = getUserIdFromToken(token);
        next();
    } else {
        next(new Error('Authentication error'));
    }
});
\`\`\`

### Rate Limiting
\`\`\`javascript
const rateLimiter = new Map();

socket.on('send_message', (data) => {
    const userId = socket.userId;
    const now = Date.now();
    
    if (!rateLimiter.has(userId)) {
        rateLimiter.set(userId, []);
    }
    
    const userRequests = rateLimiter.get(userId);
    const recentRequests = userRequests.filter(time => now - time < 60000);
    
    if (recentRequests.length >= 10) {
        socket.emit('rate_limit_exceeded');
        return;
    }
    
    recentRequests.push(now);
    rateLimiter.set(userId, recentRequests);
    
    // Process message
    handleMessage(data);
});
\`\`\`

## Monitoring and Debugging

### Connection Monitoring
\`\`\`javascript
io.engine.on('connection_error', (err) => {
    console.log('Connection error:', err.req);
    console.log('Error code:', err.code);
    console.log('Error message:', err.message);
    console.log('Error context:', err.context);
});
\`\`\`

### Performance Metrics
- Track connection count
- Monitor message throughput
- Measure latency
- Alert on error rates

## Conclusion

WebSockets and Redis provide a powerful combination for building real-time applications. Start with basic WebSocket connections, then add Redis for scalability and persistence. Focus on security, performance, and user experience to create engaging real-time features.

Remember to handle edge cases like connection drops, implement proper error handling, and monitor your application's performance in production.`,
};
