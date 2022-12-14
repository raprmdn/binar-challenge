require('dotenv').config();
const express = require('express');
const compression = require('compression');
const helmet = require('helmet');
const morgan = require('morgan');
const routes = require('./routes');

const app = express();
const port = process.env.PORT || 5000;

app.use('/storage', express.static('storage'));

app.use(compression());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());

app.use('/api', routes);

app.get('/', (req, res) => {
    res.status(200).json({
        success: true,
        message: "Welcome to Chapter 7 - Binar Challenge - OAuth2 Implementation and Media Handling",
        swagger_docs: {
            message: "Not available yet",
            url: null
        },
        simple_docs: {
            message: "Please refer to the README.md file in the repository. (Navigate Link not working in GitLab)",
            gitlab_url: "https://gitlab.com/raprmdn/binar-challenge/-/blob/master/chapter7/README.md",
            github_url: "https://github.com/raprmdn/binar-challenge/blob/master/chapter7/README.md"
        },
        postman_collection_docs: {
            message: "Postman Collection API Documentation",
            generate_collection: "npm run generate:collection",
            url: "https://documenter.getpostman.com/view/13401148/2s847MsBWh"
        }
    });
});

app.listen(port, () => {
    console.log(`Server running on port http://localhost:${port}`);
});
