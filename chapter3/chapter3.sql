-- Table `users`
CREATE TABLE users
(
    id       BIGSERIAL PRIMARY KEY,
    name     VARCHAR(255) NOT NULL,
    username VARCHAR(255) NOT NULL UNIQUE,
    email    VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);

-- Table `topics`
CREATE TABLE topics
(
    id          BIGSERIAL PRIMARY KEY,
    name        VARCHAR(255) NOT NULL,
    slug        VARCHAR(255) NOT NULL UNIQUE,
    description TEXT,
    picture     VARCHAR(255),
    is_archived BOOLEAN DEFAULT TRUE
);

-- Table `series`
CREATE TABLE series
(
    id             BIGSERIAL PRIMARY KEY,
    title          VARCHAR(255) NOT NULL,
    slug           VARCHAR(255) NOT NULL UNIQUE,
    description    TEXT,
    episodes       INT     DEFAULT 0,
    levels         VARCHAR(255),
    price          DOUBLE PRECISION,
    discount_price DOUBLE PRECISION,
    thumbnail      VARCHAR(255),
    is_discount    BOOLEAN DEFAULT FALSE,
    is_free        BOOLEAN DEFAULT FALSE,
    is_archived    BOOLEAN DEFAULT TRUE
);

-- Table `videos`
CREATE TABLE videos
(
    id          BIGSERIAL PRIMARY KEY,
    series_id   BIGINT REFERENCES series (id),
    title       VARCHAR(255) NOT NULL,
    source      VARCHAR(255) NOT NULL,
    episode     INT          NOT NULL,
    runtime     VARCHAR(255) NOT NULL,
    description TEXT,
    is_free     BOOLEAN DEFAULT FALSE,
    is_archived BOOLEAN DEFAULT TRUE
);

-- Table `series_topics`
CREATE TABLE series_topics
(
    series_id BIGINT REFERENCES series (id) ON DELETE CASCADE,
    topic_id  BIGINT REFERENCES topics (id) ON DELETE CASCADE,
    PRIMARY KEY (series_id, topic_id)
);

-- Table `purchased_series`
CREATE TABLE purchased_series
(
    user_id    BIGINT REFERENCES users (id) ON DELETE CASCADE,
    series_id  BIGINT REFERENCES series (id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (user_id, series_id)
);

-- Insert Data
INSERT INTO users (name, username, email, password)
VALUES ('Rafi', 'raprmdn', 'raprmdn@gmail.com', 'password'),
       ('John Doe', 'johndoe', 'johndoe@email.com', 'password'),
       ('Jane Doe', 'janedoe', 'janedoe@email.com', 'password'),
       ('John Smith', 'johnsmith', 'johnsmith@email.com', 'password'),
       ('Jane Smith', 'janesmith', 'janesmith@email.com', 'password');

INSERT INTO topics (name, slug, description, picture, is_archived)
VALUES ('Laravel', 'laravel', 'Laravel Description', 'laravel.svg', false),
       ('React', 'react', 'React Description', 'react.svg', false),
       ('Vue', 'vue', 'Vue Description', 'vue.svg', false),
       ('Angular', 'angular', 'Angular Description', 'angular.svg', false),
       ('Node JS', 'node-js', 'Node JS Description', 'node-js.svg', false),
       ('JavaScript', 'javascript', 'JavaScript Description', 'javascript.svg', false),
       ('Express JS', 'express-js', 'Express JS Description', 'express-js.svg', false),
       ('Inertia JS', 'inertia-js', 'Inertia JS Description', 'inertia-js.svg', false),
       ('Tailwind CSS', 'tailwind-css', 'Tailwind CSS Description', 'tailwind-css.svg', false),
       ('Go', 'go', 'Go Description', 'go.svg', false),
       ('Java', 'java', 'Java Description', 'java.svg', false),
       ('PHP', 'php', 'PHP Description', 'php.svg', false),
       ('MySQL', 'mysql', 'MySQL Description', 'mysql.svg', false),
       ('PostgreSQL', 'postgresql', 'PostgreSQL Description', 'postgresql.svg', false),
       ('MongoDB', 'mongodb', 'MongoDB Description', 'mongodb.svg', false);

INSERT INTO series (title, slug, description, episodes, levels, price, discount_price, thumbnail, is_discount, is_free,
                    is_archived)
VALUES ('Laravel 9 from Scratch', 'laravel-9-from-scratch', 'Course Laravel 9 from Scratch', 28, 'Begginer', 75000, 0,
        'laravel-9-from-scratch.png', false, false, false),
       ('MERN Stack CRUD', 'mern-stack-crud', 'Course MERN (MongoDB, Express, React, NodeJS) Stack CRUD', 15,
        'Intermediate', 0, 0, 'mern-stack-crud.png', false, true, false),
       ('MEAN Stack CRUD', 'mean-stack-crud', 'Course MEAN (MongoDB, Express, Angular, NodeJS Stack CRUD', 17,
        'Intermediate', 0, 0, 'mean-stack-crud.png', false, true, false),
       ('Laravel Inertia React', 'laravel-inertia-react', 'Course Laravel Inertia React with Tailwind CSS', 20,
        'Intermediate', 150000, 140000, 'laravel-inertia-react.png', true, false, false),
       ('JWT Auth Access Token and Refresh Token with Express', 'jwt-auth-access-token-and-refresh-token-with-express',
        'Course JWT Auth Access Token and Refresh Token with Express', 7, 'Advanced', 150000, 0,
        'jwt-auth-access-token-and-refresh-token-with-express.png', false, false, false);

INSERT INTO series_topics (series_id, topic_id)
VALUES (1, 1),
       (1, 12),
       (2, 15),
       (2, 7),
       (2, 2),
       (2, 5),
       (2, 9),
       (3, 15),
       (3, 7),
       (3, 4),
       (3, 5),
       (4, 1),
       (4, 12),
       (4, 9),
       (4, 8),
       (5, 7),
       (5, 5),
       (5, 14);

INSERT INTO videos (series_id, title, source, episode, runtime, description, is_free, is_archived)
VALUES (1, 'Introduction', '-UzsoR6z-vg', 1, '00:14:02', 'Video 1', true, false),
       (1, 'Installation & Setup', '-UzsoR6z-vg', 2, '00:17:20', 'Video 2', true, false),
       (1, 'Routing', '-UzsoR6z-vg', 3, '00:11:12', 'Video 3', false, false),
       (1, 'Controllers', '-UzsoR6z-vg', 4, '00:15:21', 'Video 4', false, false),
       (1, 'Views', '-UzsoR6z-vg', 5, '00:25:59', 'Video 5', false, false),
       (2, 'Introduction the Project', '-UzsoR6z-vg', 1, '00:09:51', 'Video 1', true, false),
       (2, 'Install MongoDB, Express, React, NodeJS', '-UzsoR6z-vg', 2, '00:18:21', 'Video 2', false, false),
       (2, 'Init Models', '-UzsoR6z-vg', 3, '00:10:52', 'Video 3', false, false),
       (3, 'Introduction the Project', '-UzsoR6z-vg', 1, '00:09:51', 'Video 1', true, false),
       (3, 'Install MongoDB, Express, Angular, NodeJS', '-UzsoR6z-vg', 2, '00:18:21', 'Video 2', false, false),
       (3, 'Init Models', '-UzsoR6z-vg', 3, '00:10:52', 'Video 3', false, false),
       (4, 'What we will create?', '-UzsoR6z-vg', 1, '00:05:24', 'Video 1', true, false),
       (4, 'Install Laravel, Breeze, React, and Inertia', '-UzsoR6z-vg', 2, '00:07:11', 'Video 2', false, false),
       (4, 'Setup Inertia, React SSR, and Tailwind CSS', '-UzsoR6z-vg', 3, '00:12:15', 'Video 3', false, false),
       (5, 'What it is JWT?', '-UzsoR6z-vg', 1, '00:05:24', 'Video 1', true, false),
       (5, 'Install Express, JWT, and Sequelize ORM', '-UzsoR6z-vg', 2, '00:03:11', 'Video 2', false, false),
       (5, 'Setup Express, JWT, and Sequelize ORM', '-UzsoR6z-vg', 3, '00:15:11', 'Video 3', false, false);

INSERT INTO purchased_series (user_id, series_id)
VALUES (1, 1),
       (1, 2),
       (1, 3),
       (1, 4),
       (1, 5),
       (2, 2),
       (2, 3),
       (3, 1),
       (3, 4),
       (4, 5);

-- Read
SELECT * FROM users;

SELECT * FROM topics;

SELECT * FROM series
ORDER BY id DESC;

SELECT *FROM series_topics;

SELECT *
FROM videos
ORDER BY id ASC;

SELECT * FROM purchased_series;

SELECT s.*,
       t.name AS topic_name,
       t.slug AS topic_slug
FROM series s
         LEFT OUTER JOIN series_topics st ON st.series_id = s.id
         LEFT OUTER JOIN topics t ON t.id = st.topic_id;

SELECT v.*,
       s.title AS series_title,
       s.slug  AS series_slug
FROM videos v
         LEFT JOIN series s ON s.id = v.series_id;

SELECT s.*,
       t.name        AS topic_name,
       t.slug        AS topic_slug,
       v.title       AS video_title,
       v.source      AS video_source,
       v.episode     AS video_episode,
       v.runtime     AS video_runtime,
       v.description AS video_description,
       v.is_free     AS video_is_free,
       v.is_archived AS video_is_archived
FROM series s
         LEFT OUTER JOIN series_topics st ON st.series_id = s.id
         LEFT OUTER JOIN topics t ON t.id = st.topic_id
         LEFT OUTER JOIN videos v ON v.series_id = s.id;

SELECT u.*,
       s.*
FROM users u
         LEFT JOIN purchased_series ps ON ps.user_id = u.id
         LEFT JOIN series s ON s.id = ps.series_id;

SELECT u.*,
       s.id             AS series_id,
       s.title          AS series_title,
       s.slug           AS series_slug,
       s.description    AS series_description,
       s.episodes       AS series_episodes,
       s.levels         AS series_level,
       s.price          AS series_price,
       s.discount_price AS series_discount_price,
       s.thumbnail      AS series_thumbnail,
       s.is_discount    AS series_is_discount,
       s.is_free        AS series_is_free,
       s.is_archived    AS series_is_archived

FROM users u
         LEFT JOIN purchased_series ps ON ps.user_id = u.id
         LEFT JOIN series s ON s.id = ps.series_id
WHERE u.id = 1;

-- Update
UPDATE videos
SET title = 'The preview project will be created'
WHERE id = 12;

UPDATE series
SET title = 'Laravel, Inertia, React, and Tailwind CSS',
    slug  = 'laravel-inertia-react-and-tailwind-css'
WHERE id = 4;

-- Delete

-- Will automatically delete related data in series_topics, ON DELETE CASCADE
DELETE
FROM topics
WHERE id = 15;

-- Return Error: Cannot delete violates foreign key constraint on table `videos`
DELETE
FROM series
WHERE id = 5;

-- Will automatically delete related data in purchased_series, ON DELETE CASCADE
DELETE
FROM users
WHERE id = 4;