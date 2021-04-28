// Third Party Packages
const express = require('express');
const bodyParser = require('body-parser');

// Core Module
const path = require('path');

// Custom Module
const rootDir = require('./util/path');

// Admin Routes
const adminRoutes = require('./routes/admin');
// Shop Routes
const shopRoutes = require('./routes/shop');

const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'views')));

app.use('/', (req, res, next) => {
    next();
});

// Middleware
app.use('/admin', adminRoutes);
app.use(shopRoutes);


// 404 page
app.use((req, res, next) => {
    res.status(404).sendFile(path.join(rootDir , 'views', '404.html'));
})

app.listen(3000);
