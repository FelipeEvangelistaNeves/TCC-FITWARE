--
-- PostgreSQL database dump
--

-- Dumped from database version 17.5
-- Dumped by pg_dump version 17.5

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
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
-- Name: alunos; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.alunos (
    al_id integer NOT NULL,
    al_nome character varying(120) NOT NULL,
    al_email character varying(120) NOT NULL,
    al_senha character varying(60) NOT NULL,
    al_cpf character varying(11) NOT NULL,
    al_telefone character varying(11),
    al_dtnasc date NOT NULL,
    al_pontos integer NOT NULL
);


ALTER TABLE public.alunos OWNER TO postgres;

--
-- Name: alunos_al_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.alunos_al_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.alunos_al_id_seq OWNER TO postgres;

--
-- Name: alunos_al_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.alunos_al_id_seq OWNED BY public.alunos.al_id;


--
-- Name: alunos_turmas; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.alunos_turmas (
    al_id integer NOT NULL,
    tu_id integer NOT NULL
);


ALTER TABLE public.alunos_turmas OWNER TO postgres;

--
-- Name: desafios; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.desafios (
    de_id integer NOT NULL,
    de_nome character varying(80) NOT NULL,
    de_descricao character varying(150),
    de_pontos integer NOT NULL,
    de_tag character varying(60) NOT NULL,
    de_progresso integer NOT NULL,
    de_start timestamp without time zone NOT NULL,
    de_end timestamp without time zone NOT NULL
);


ALTER TABLE public.desafios OWNER TO postgres;

--
-- Name: desafios_de_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.desafios_de_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.desafios_de_id_seq OWNER TO postgres;

--
-- Name: desafios_de_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.desafios_de_id_seq OWNED BY public.desafios.de_id;


--
-- Name: exercicios; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.exercicios (
    ex_id integer NOT NULL,
    ex_nome character varying(80) NOT NULL,
    ex_instrucao character varying(150),
    ex_video character varying(300)
);


ALTER TABLE public.exercicios OWNER TO postgres;

--
-- Name: exercicios_ex_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.exercicios_ex_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.exercicios_ex_id_seq OWNER TO postgres;

--
-- Name: exercicios_ex_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.exercicios_ex_id_seq OWNED BY public.exercicios.ex_id;


--
-- Name: funcionarios; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.funcionarios (
    fu_id integer NOT NULL,
    fu_nome character varying(120) NOT NULL,
    fu_email character varying(120) NOT NULL,
    fu_senha character varying(60) NOT NULL,
    fu_cpf character varying(11) NOT NULL,
    fu_telefone character varying(11) NOT NULL,
    fu_dtnasc date NOT NULL,
    fu_cargo character varying(50) NOT NULL,
    fu_cref character varying(13)
);


ALTER TABLE public.funcionarios OWNER TO postgres;

--
-- Name: funcionarios_fu_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.funcionarios_fu_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.funcionarios_fu_id_seq OWNER TO postgres;

--
-- Name: funcionarios_fu_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.funcionarios_fu_id_seq OWNED BY public.funcionarios.fu_id;


--
-- Name: horarios; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.horarios (
    hor_id integer NOT NULL,
    hor_start time without time zone NOT NULL,
    hor_end time without time zone NOT NULL,
    hor_dia character varying(7) NOT NULL
);


ALTER TABLE public.horarios OWNER TO postgres;

--
-- Name: horarios_hor_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.horarios_hor_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.horarios_hor_id_seq OWNER TO postgres;

--
-- Name: horarios_hor_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.horarios_hor_id_seq OWNED BY public.horarios.hor_id;


--
-- Name: modalidades; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.modalidades (
    mo_id integer NOT NULL,
    mo_nome character varying(30) NOT NULL,
    mo_descricao character varying(200)
);


ALTER TABLE public.modalidades OWNER TO postgres;

--
-- Name: modalidades_mo_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.modalidades_mo_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.modalidades_mo_id_seq OWNER TO postgres;

--
-- Name: modalidades_mo_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.modalidades_mo_id_seq OWNED BY public.modalidades.mo_id;


--
-- Name: pagamentos; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.pagamentos (
    pa_id integer NOT NULL,
    pa_al_id integer NOT NULL,
    pa_valor numeric(6,2) NOT NULL,
    pa_metodo character(1) NOT NULL,
    pa_status character varying(20) NOT NULL,
    pa_data date NOT NULL
);


ALTER TABLE public.pagamentos OWNER TO postgres;

--
-- Name: pagamentos_pa_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.pagamentos_pa_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.pagamentos_pa_id_seq OWNER TO postgres;

--
-- Name: pagamentos_pa_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.pagamentos_pa_id_seq OWNED BY public.pagamentos.pa_id;


--
-- Name: produtos; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.produtos (
    pd_id integer NOT NULL,
    pd_nome character varying(120) NOT NULL,
    pd_valor integer NOT NULL,
    pd_descricao character varying(200)
);


ALTER TABLE public.produtos OWNER TO postgres;

--
-- Name: produtos_pd_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.produtos_pd_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.produtos_pd_id_seq OWNER TO postgres;

--
-- Name: produtos_pd_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.produtos_pd_id_seq OWNED BY public.produtos.pd_id;


--
-- Name: treinos; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.treinos (
    tr_id integer NOT NULL,
    tr_prof_id integer NOT NULL,
    tr_nome character varying(80) NOT NULL,
    tr_descricao character varying(150),
    tr_repeticoes character varying(4)
);


ALTER TABLE public.treinos OWNER TO postgres;

--
-- Name: treinos_exercicios; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.treinos_exercicios (
    tr_id integer NOT NULL,
    ex_id integer NOT NULL
);


ALTER TABLE public.treinos_exercicios OWNER TO postgres;

--
-- Name: treinos_tr_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.treinos_tr_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.treinos_tr_id_seq OWNER TO postgres;

--
-- Name: treinos_tr_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.treinos_tr_id_seq OWNED BY public.treinos.tr_id;


--
-- Name: turmas; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.turmas (
    tu_id integer NOT NULL,
    tu_nome character varying(50) NOT NULL,
    tu_prof_id integer NOT NULL,
    tu_mod_id integer NOT NULL,
    tu_hor_id integer NOT NULL
);


ALTER TABLE public.turmas OWNER TO postgres;

--
-- Name: turmas_tu_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.turmas_tu_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.turmas_tu_id_seq OWNER TO postgres;

--
-- Name: turmas_tu_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.turmas_tu_id_seq OWNED BY public.turmas.tu_id;


--
-- Name: alunos al_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.alunos ALTER COLUMN al_id SET DEFAULT nextval('public.alunos_al_id_seq'::regclass);


--
-- Name: desafios de_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.desafios ALTER COLUMN de_id SET DEFAULT nextval('public.desafios_de_id_seq'::regclass);


--
-- Name: exercicios ex_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.exercicios ALTER COLUMN ex_id SET DEFAULT nextval('public.exercicios_ex_id_seq'::regclass);


--
-- Name: funcionarios fu_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.funcionarios ALTER COLUMN fu_id SET DEFAULT nextval('public.funcionarios_fu_id_seq'::regclass);


--
-- Name: horarios hor_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.horarios ALTER COLUMN hor_id SET DEFAULT nextval('public.horarios_hor_id_seq'::regclass);


--
-- Name: modalidades mo_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.modalidades ALTER COLUMN mo_id SET DEFAULT nextval('public.modalidades_mo_id_seq'::regclass);


--
-- Name: pagamentos pa_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pagamentos ALTER COLUMN pa_id SET DEFAULT nextval('public.pagamentos_pa_id_seq'::regclass);


--
-- Name: produtos pd_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.produtos ALTER COLUMN pd_id SET DEFAULT nextval('public.produtos_pd_id_seq'::regclass);


--
-- Name: treinos tr_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.treinos ALTER COLUMN tr_id SET DEFAULT nextval('public.treinos_tr_id_seq'::regclass);


--
-- Name: turmas tu_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.turmas ALTER COLUMN tu_id SET DEFAULT nextval('public.turmas_tu_id_seq'::regclass);


--
-- Data for Name: alunos; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.alunos VALUES (1, 'JoÆo Silva', 'joao@email.com', '123456', '12345678901', '11988887777', '2000-05-14', 50);
INSERT INTO public.alunos VALUES (2, 'Maria Souza', 'maria@email.com', 'abcdef', '98765432100', '11977776666', '1998-10-22', 80);


--
-- Data for Name: alunos_turmas; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.alunos_turmas VALUES (1, 1);
INSERT INTO public.alunos_turmas VALUES (2, 2);


--
-- Data for Name: desafios; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.desafios VALUES (1, 'Desafio 30 dias de corrida', 'Correr 5km por dia durante 30 dias', 300, 'corrida', 0, '2025-10-01 00:00:00', '2025-10-30 23:59:59');
INSERT INTO public.desafios VALUES (2, 'Desafio 100 flexäes', 'Realizar 100 flexäes no menor tempo poss¡vel', 150, 'for‡a', 0, '2025-09-01 00:00:00', '2025-09-15 23:59:59');


--
-- Data for Name: exercicios; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.exercicios VALUES (1, 'Supino Reto', 'Deite no banco e empurre a barra para cima', 'https://video.com/supino');
INSERT INTO public.exercicios VALUES (2, 'Agachamento Livre', 'Agache mantendo a postura ereta', 'https://video.com/agachamento');


--
-- Data for Name: funcionarios; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.funcionarios VALUES (2, 'Fernanda Lima', 'fernanda@fitware.com', 'def456', '98765432199', '11955554444', '1990-08-20', 'Secretario', NULL);
INSERT INTO public.funcionarios VALUES (1, 'Carlos Mendes', 'carlos@fitware.com', 'abc123', '12345678911', '11966665555', '1985-03-10', 'Professor', 'CREF123456');


--
-- Data for Name: horarios; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.horarios VALUES (1, '08:00:00', '09:00:00', 'Segunda');
INSERT INTO public.horarios VALUES (2, '19:00:00', '20:00:00', 'Quarta');


--
-- Data for Name: modalidades; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.modalidades VALUES (1, 'Muscula‡Æo', 'Treinos para for‡a e hipertrofia');
INSERT INTO public.modalidades VALUES (2, 'Pilates', 'Exerc¡cios de flexibilidade e fortalecimento do core');


--
-- Data for Name: pagamentos; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.pagamentos VALUES (1, 1, 150.00, 'C', 'Pago', '2025-09-01');
INSERT INTO public.pagamentos VALUES (2, 2, 200.00, 'P', 'Pendente', '2025-09-10');


--
-- Data for Name: produtos; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.produtos VALUES (1, 'Camiseta Dry Fit', 79, 'Camiseta esportiva leve e confort vel');
INSERT INTO public.produtos VALUES (2, 'Garrafa T‚rmica', 59, 'Mant‚m a temperatura da bebida por 12h');


--
-- Data for Name: treinos; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.treinos VALUES (1, 1, 'Treino de For‡a', 'Foco em exerc¡cios de muscula‡Æo', '4x12');
INSERT INTO public.treinos VALUES (2, 1, 'Treino de Resistˆncia', 'Exerc¡cios de alta intensidade', '3x15');


--
-- Data for Name: treinos_exercicios; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.treinos_exercicios VALUES (1, 1);
INSERT INTO public.treinos_exercicios VALUES (1, 2);
INSERT INTO public.treinos_exercicios VALUES (2, 2);


--
-- Data for Name: turmas; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.turmas VALUES (1, 'Turma A - ManhÆ', 1, 1, 1);
INSERT INTO public.turmas VALUES (2, 'Turma B - Noite', 1, 2, 2);


--
-- Name: alunos_al_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.alunos_al_id_seq', 2, true);


--
-- Name: desafios_de_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.desafios_de_id_seq', 2, true);


--
-- Name: exercicios_ex_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.exercicios_ex_id_seq', 2, true);


--
-- Name: funcionarios_fu_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.funcionarios_fu_id_seq', 2, true);


--
-- Name: horarios_hor_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.horarios_hor_id_seq', 2, true);


--
-- Name: modalidades_mo_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.modalidades_mo_id_seq', 2, true);


--
-- Name: pagamentos_pa_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.pagamentos_pa_id_seq', 2, true);


--
-- Name: produtos_pd_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.produtos_pd_id_seq', 2, true);


--
-- Name: treinos_tr_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.treinos_tr_id_seq', 2, true);


--
-- Name: turmas_tu_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.turmas_tu_id_seq', 2, true);


--
-- Name: alunos alunos_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.alunos
    ADD CONSTRAINT alunos_pkey PRIMARY KEY (al_id);


--
-- Name: alunos_turmas alunos_turmas_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.alunos_turmas
    ADD CONSTRAINT alunos_turmas_pkey PRIMARY KEY (al_id, tu_id);


--
-- Name: desafios desafios_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.desafios
    ADD CONSTRAINT desafios_pkey PRIMARY KEY (de_id);


--
-- Name: exercicios exercicios_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.exercicios
    ADD CONSTRAINT exercicios_pkey PRIMARY KEY (ex_id);


--
-- Name: funcionarios funcionarios_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.funcionarios
    ADD CONSTRAINT funcionarios_pkey PRIMARY KEY (fu_id);


--
-- Name: horarios horarios_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.horarios
    ADD CONSTRAINT horarios_pkey PRIMARY KEY (hor_id);


--
-- Name: modalidades modalidades_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.modalidades
    ADD CONSTRAINT modalidades_pkey PRIMARY KEY (mo_id);


--
-- Name: pagamentos pagamentos_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pagamentos
    ADD CONSTRAINT pagamentos_pkey PRIMARY KEY (pa_id);


--
-- Name: produtos produtos_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.produtos
    ADD CONSTRAINT produtos_pkey PRIMARY KEY (pd_id);


--
-- Name: treinos_exercicios treinos_exercicios_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.treinos_exercicios
    ADD CONSTRAINT treinos_exercicios_pkey PRIMARY KEY (tr_id, ex_id);


--
-- Name: treinos treinos_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.treinos
    ADD CONSTRAINT treinos_pkey PRIMARY KEY (tr_id);


--
-- Name: turmas turmas_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.turmas
    ADD CONSTRAINT turmas_pkey PRIMARY KEY (tu_id);


--
-- Name: alunos_turmas alunos_turmas_al_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.alunos_turmas
    ADD CONSTRAINT alunos_turmas_al_id_fkey FOREIGN KEY (al_id) REFERENCES public.alunos(al_id) ON DELETE CASCADE;


--
-- Name: alunos_turmas alunos_turmas_tu_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.alunos_turmas
    ADD CONSTRAINT alunos_turmas_tu_id_fkey FOREIGN KEY (tu_id) REFERENCES public.turmas(tu_id) ON DELETE CASCADE;


--
-- Name: treinos_exercicios treinos_exercicios_ex_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.treinos_exercicios
    ADD CONSTRAINT treinos_exercicios_ex_id_fkey FOREIGN KEY (ex_id) REFERENCES public.exercicios(ex_id) ON DELETE CASCADE;


--
-- Name: treinos_exercicios treinos_exercicios_tr_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.treinos_exercicios
    ADD CONSTRAINT treinos_exercicios_tr_id_fkey FOREIGN KEY (tr_id) REFERENCES public.treinos(tr_id) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

