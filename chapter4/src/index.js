require('dotenv').config();
const express = require('express');
const compression = require('compression');
const helmet = require('helmet');
const morgan = require('morgan');
const routes = require('./routes');

const app = express();
const port = process.env.PORT || 5000;

app.use(compression());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());

app.use('/api', routes);

app.get('/', (req, res) => {
    res.status(200).json({
        success: true,
        message: "Welcome to Chapter 4 - Binar Challenge - ExpressJS RESTful API CRUD",
        swagger_docs: {
            message: "Not available yet",
            url: null
        },
        simple_docs: {
            message: "Please refer to the README.md file in the repository",
            gitlab_url: null,
            github_url: null,
        },
    });
});

app.listen(port, () => {
    console.log(`Server running on port http://localhost:${port}`);
});