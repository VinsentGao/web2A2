const express = require('express');
const cors = require('cors');
const { pool, testConnection } = require('./event_db');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// 静态文件服务配置 - 放在路由前面
app.use(express.static(path.join(__dirname, '../client')));

// API 路由
// Test connection endpoint
app.get('/api/test', async (req, res) => {
    const isConnected = await testConnection();
    res.json({ 
        message: 'API server is running', 
        database: isConnected ? 'Connected' : 'Connection failed' 
    });
});

// Get homepage events
app.get('/api/events/home', async (req, res) => {
    try {
        const [rows] = await pool.query(`
            SELECT e.*, c.name as category_name, o.name as organization_name
            FROM events e
            LEFT JOIN categories c ON e.category_id = c.id
            LEFT JOIN organizations o ON e.organization_id = o.id
            WHERE e.is_active = TRUE 
            AND e.event_date >= CURDATE()
            ORDER BY e.event_date ASC
        `);
        res.json(rows);
    } catch (error) {
        console.error('Homepage API error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Search events
app.get('/api/events/search', async (req, res) => {
    try {
        const { date, location, category } = req.query;
        
        let query = `
            SELECT e.*, c.name as category_name, o.name as organization_name
            FROM events e
            LEFT JOIN categories c ON e.category_id = c.id
            LEFT JOIN organizations o ON e.organization_id = o.id
            WHERE e.is_active = TRUE
        `;
        
        const params = [];
        
        if (date) {
            query += ' AND e.event_date = ?';
            params.push(date);
        }
        
        if (location) {
            query += ' AND e.location LIKE ?';
            params.push(`%${location}%`);
        }
        
        if (category) {
            query += ' AND c.name = ?';
            params.push(category);
        }
        
        query += ' ORDER BY e.event_date ASC';
        
        const [rows] = await pool.query(query, params);
        res.json(rows);
    } catch (error) {
        console.error('Search API error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Get event details
app.get('/api/events/:id', async (req, res) => {
    try {
        const eventId = req.params.id;
        
        const [rows] = await pool.query(`
            SELECT e.*, c.name as category_name, o.name as organization_name
            FROM events e
            LEFT JOIN categories c ON e.category_id = c.id
            LEFT JOIN organizations o ON e.organization_id = o.id
            WHERE e.id = ? AND e.is_active = TRUE
        `, [eventId]);
        
        if (rows.length === 0) {
            return res.status(404).json({ error: 'Event not found' });
        }
        
        res.json(rows[0]);
    } catch (error) {
        console.error('Event details API error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Get all categories
app.get('/api/categories', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM categories ORDER BY name');
        res.json(rows);
    } catch (error) {
        console.error('Categories API error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// 页面路由 - 修复路径
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/index.html"));
});

app.get("/search", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/search.html"));
});

app.get("/event-details", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/event-details.html"));
});

// 启动服务器
app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
    console.log(`📁 Serving static files from: ${path.join(__dirname, '../client')}`);
    console.log(`🏠 Homepage: http://localhost:${PORT}/`);
    console.log(`🔍 Search page: http://localhost:${PORT}/search`);
    console.log(`📋 Event details: http://localhost:${PORT}/event-details`);
    testConnection();
});
