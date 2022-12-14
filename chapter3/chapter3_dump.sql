--
-- PostgreSQL database dump
--

-- Dumped from database version 13.1
-- Dumped by pg_dump version 13.1

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: purchased_series; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.purchased_series (
    user_id bigint NOT NULL,
    series_id bigint NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.purchased_series OWNER TO postgres;

--
-- Name: series; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.series (
    id bigint NOT NULL,
    title character varying(255) NOT NULL,
    slug character varying(255) NOT NULL,
    description text,
    episodes integer DEFAULT 0,
    levels character varying(255),
    price double precision,
    discount_price double precision,
    thumbnail character varying(255),
    is_discount boolean DEFAULT false,
    is_free boolean DEFAULT false,
    is_archived boolean DEFAULT true
);


ALTER TABLE public.series OWNER TO postgres;

--
-- Name: series_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.series_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.series_id_seq OWNER TO postgres;

--
-- Name: series_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.series_id_seq OWNED BY public.series.id;


--
-- Name: series_topics; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.series_topics (
    series_id bigint NOT NULL,
    topic_id bigint NOT NULL
);


ALTER TABLE public.series_topics OWNER TO postgres;

--
-- Name: topics; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.topics (
    id bigint NOT NULL,
    name character varying(255) NOT NULL,
    slug character varying(255) NOT NULL,
    description text,
    picture character varying(255),
    is_archived boolean DEFAULT true
);


ALTER TABLE public.topics OWNER TO postgres;

--
-- Name: topics_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.topics_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.topics_id_seq OWNER TO postgres;

--
-- Name: topics_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.topics_id_seq OWNED BY public.topics.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id bigint NOT NULL,
    name character varying(255) NOT NULL,
    username character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    password character varying(255) NOT NULL
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_id_seq OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: videos; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.videos (
    id bigint NOT NULL,
    series_id bigint,
    title character varying(255) NOT NULL,
    source character varying(255) NOT NULL,
    episode integer NOT NULL,
    runtime character varying(255) NOT NULL,
    description text,
    is_free boolean DEFAULT false,
    is_archived boolean DEFAULT true
);


ALTER TABLE public.videos OWNER TO postgres;

--
-- Name: videos_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.videos_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.videos_id_seq OWNER TO postgres;

--
-- Name: videos_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.videos_id_seq OWNED BY public.videos.id;


--
-- Name: series id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.series ALTER COLUMN id SET DEFAULT nextval('public.series_id_seq'::regclass);


--
-- Name: topics id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.topics ALTER COLUMN id SET DEFAULT nextval('public.topics_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Name: videos id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.videos ALTER COLUMN id SET DEFAULT nextval('public.videos_id_seq'::regclass);


--
-- Data for Name: purchased_series; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.purchased_series (user_id, series_id, created_at) FROM stdin;
1	1	2022-09-09 06:37:28.267199
1	2	2022-09-09 06:37:28.267199
1	3	2022-09-09 06:37:28.267199
1	4	2022-09-09 06:37:28.267199
1	5	2022-09-09 06:37:28.267199
2	2	2022-09-09 06:37:28.267199
2	3	2022-09-09 06:37:28.267199
3	1	2022-09-09 06:37:28.267199
3	4	2022-09-09 06:37:28.267199
4	5	2022-09-09 06:37:28.267199
\.


--
-- Data for Name: series; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.series (id, title, slug, description, episodes, levels, price, discount_price, thumbnail, is_discount, is_free, is_archived) FROM stdin;
1	Laravel 9 from Scratch	laravel-9-from-scratch	Course Laravel 9 from Scratch	28	Begginer	75000	0	laravel-9-from-scratch.png	f	f	f
2	MERN Stack CRUD	mern-stack-crud	Course MERN (MongoDB, Express, React, NodeJS) Stack CRUD	15	Intermediate	0	0	mern-stack-crud.png	f	t	f
3	MEAN Stack CRUD	mean-stack-crud	Course MEAN (MongoDB, Express, Angular, NodeJS Stack CRUD	17	Intermediate	0	0	mean-stack-crud.png	f	t	f
4	Laravel Inertia React	laravel-inertia-react	Course Laravel Inertia React with Tailwind CSS	20	Intermediate	150000	140000	laravel-inertia-react.png	t	f	f
5	JWT Auth Access Token and Refresh Token with Express	jwt-auth-access-token-and-refresh-token-with-express	Course JWT Auth Access Token and Refresh Token with Express	7	Advanced	150000	0	jwt-auth-access-token-and-refresh-token-with-express.png	f	f	f
\.


--
-- Data for Name: series_topics; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.series_topics (series_id, topic_id) FROM stdin;
1	1
1	12
2	15
2	7
2	2
2	5
2	9
3	15
3	7
3	4
3	5
4	1
4	12
4	9
4	8
5	7
5	5
5	14
\.


--
-- Data for Name: topics; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.topics (id, name, slug, description, picture, is_archived) FROM stdin;
1	Laravel	laravel	Laravel Description	laravel.svg	f
2	React	react	React Description	react.svg	f
3	Vue	vue	Vue Description	vue.svg	f
4	Angular	angular	Angular Description	angular.svg	f
5	Node JS	node-js	Node JS Description	node-js.svg	f
6	JavaScript	javascript	JavaScript Description	javascript.svg	f
7	Express JS	express-js	Express JS Description	express-js.svg	f
8	Inertia JS	inertia-js	Inertia JS Description	inertia-js.svg	f
9	Tailwind CSS	tailwind-css	Tailwind CSS Description	tailwind-css.svg	f
10	Go	go	Go Description	go.svg	f
11	Java	java	Java Description	java.svg	f
12	PHP	php	PHP Description	php.svg	f
13	MySQL	mysql	MySQL Description	mysql.svg	f
14	PostgreSQL	postgresql	PostgreSQL Description	postgresql.svg	f
15	MongoDB	mongodb	MongoDB Description	mongodb.svg	f
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, name, username, email, password) FROM stdin;
1	Rafi	raprmdn	raprmdn@gmail.com	password
2	John Doe	johndoe	johndoe@email.com	password
3	Jane Doe	janedoe	janedoe@email.com	password
4	John Smith	johnsmith	johnsmith@email.com	password
5	Jane Smith	janesmith	janesmith@email.com	password
\.


--
-- Data for Name: videos; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.videos (id, series_id, title, source, episode, runtime, description, is_free, is_archived) FROM stdin;
1	1	Introduction	-UzsoR6z-vg	1	00:14:02	Video 1	t	f
2	1	Installation & Setup	-UzsoR6z-vg	2	00:17:20	Video 2	t	f
3	1	Routing	-UzsoR6z-vg	3	00:11:12	Video 3	f	f
4	1	Controllers	-UzsoR6z-vg	4	00:15:21	Video 4	f	f
5	1	Views	-UzsoR6z-vg	5	00:25:59	Video 5	f	f
6	2	Introduction the Project	-UzsoR6z-vg	1	00:09:51	Video 1	t	f
7	2	Install MongoDB, Express, React, NodeJS	-UzsoR6z-vg	2	00:18:21	Video 2	f	f
8	2	Init Models	-UzsoR6z-vg	3	00:10:52	Video 3	f	f
9	3	Introduction the Project	-UzsoR6z-vg	1	00:09:51	Video 1	t	f
10	3	Install MongoDB, Express, Angular, NodeJS	-UzsoR6z-vg	2	00:18:21	Video 2	f	f
11	3	Init Models	-UzsoR6z-vg	3	00:10:52	Video 3	f	f
12	4	What we will create?	-UzsoR6z-vg	1	00:05:24	Video 1	t	f
13	4	Install Laravel, Breeze, React, and Inertia	-UzsoR6z-vg	2	00:07:11	Video 2	f	f
14	4	Setup Inertia, React SSR, and Tailwind CSS	-UzsoR6z-vg	3	00:12:15	Video 3	f	f
15	5	What it is JWT?	-UzsoR6z-vg	1	00:05:24	Video 1	t	f
16	5	Install Express, JWT, and Sequelize ORM	-UzsoR6z-vg	2	00:03:11	Video 2	f	f
17	5	Setup Express, JWT, and Sequelize ORM	-UzsoR6z-vg	3	00:15:11	Video 3	f	f
\.


--
-- Name: series_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.series_id_seq', 5, true);


--
-- Name: topics_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.topics_id_seq', 15, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 5, true);


--
-- Name: videos_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.videos_id_seq', 17, true);


--
-- Name: purchased_series purchased_series_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.purchased_series
    ADD CONSTRAINT purchased_series_pkey PRIMARY KEY (user_id, series_id);


--
-- Name: series series_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.series
    ADD CONSTRAINT series_pkey PRIMARY KEY (id);


--
-- Name: series series_slug_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.series
    ADD CONSTRAINT series_slug_key UNIQUE (slug);


--
-- Name: series_topics series_topics_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.series_topics
    ADD CONSTRAINT series_topics_pkey PRIMARY KEY (series_id, topic_id);


--
-- Name: topics topics_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.topics
    ADD CONSTRAINT topics_pkey PRIMARY KEY (id);


--
-- Name: topics topics_slug_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.topics
    ADD CONSTRAINT topics_slug_key UNIQUE (slug);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: users users_username_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key UNIQUE (username);


--
-- Name: videos videos_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.videos
    ADD CONSTRAINT videos_pkey PRIMARY KEY (id);


--
-- Name: purchased_series purchased_series_series_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.purchased_series
    ADD CONSTRAINT purchased_series_series_id_fkey FOREIGN KEY (series_id) REFERENCES public.series(id) ON DELETE CASCADE;


--
-- Name: purchased_series purchased_series_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.purchased_series
    ADD CONSTRAINT purchased_series_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: series_topics series_topics_series_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.series_topics
    ADD CONSTRAINT series_topics_series_id_fkey FOREIGN KEY (series_id) REFERENCES public.series(id) ON DELETE CASCADE;


--
-- Name: series_topics series_topics_topic_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.series_topics
    ADD CONSTRAINT series_topics_topic_id_fkey FOREIGN KEY (topic_id) REFERENCES public.topics(id) ON DELETE CASCADE;


--
-- Name: videos videos_series_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.videos
    ADD CONSTRAINT videos_series_id_fkey FOREIGN KEY (series_id) REFERENCES public.series(id);


--
-- PostgreSQL database dump complete
--

