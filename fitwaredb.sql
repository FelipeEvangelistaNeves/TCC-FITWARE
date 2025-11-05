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

--
-- Name: verificar_participantes_mensagem(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.verificar_participantes_mensagem() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
DECLARE
    aluno_id INT;
    professor_id INT;
BEGIN
    -- pega ids da conversa
    SELECT al_id, prof_id INTO aluno_id, professor_id
    FROM conversas
    WHERE co_id = NEW.co_id;

    -- se nÆo encontrou a conversa
    IF aluno_id IS NULL THEN
        RAISE EXCEPTION 'Conversa inexistente com co_id=%', NEW.co_id;
    END IF;

    -- verifica se remetente e destinat rio pertencem … conversa
    IF NOT (NEW.remetente_id IN (aluno_id, professor_id)
         AND NEW.destinatario_id IN (aluno_id, professor_id)) THEN
        RAISE EXCEPTION 'Remetente ou destinat rio nÆo pertencem … conversa %', NEW.co_id;
    END IF;

    -- evita remetente = destinat rio
    IF NEW.remetente_id = NEW.destinatario_id THEN
        RAISE EXCEPTION 'Remetente e destinat rio nÆo podem ser iguais';
    END IF;

    RETURN NEW;
END;
$$;


ALTER FUNCTION public.verificar_participantes_mensagem() OWNER TO postgres;

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
    al_pontos integer NOT NULL,
    al_treinos_completos integer NOT NULL,
    al_status character varying(10) NOT NULL
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
-- Name: alunos_desafios; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.alunos_desafios (
    al_id integer NOT NULL,
    de_id integer NOT NULL
);


ALTER TABLE public.alunos_desafios OWNER TO postgres;

--
-- Name: alunos_treinos; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.alunos_treinos (
    al_id integer NOT NULL,
    tr_id integer NOT NULL
);


ALTER TABLE public.alunos_treinos OWNER TO postgres;

--
-- Name: alunos_turmas; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.alunos_turmas (
    al_id integer NOT NULL,
    tu_id integer NOT NULL
);


ALTER TABLE public.alunos_turmas OWNER TO postgres;

--
-- Name: avisos; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.avisos (
    av_id integer NOT NULL,
    av_titulo character varying(100) NOT NULL,
    av_mensagem text NOT NULL,
    av_tipo character varying(30),
    av_destinatario_tipo character varying(30),
    av_data_inicio timestamp without time zone DEFAULT now(),
    av_data_fim timestamp without time zone,
    av_ativo boolean DEFAULT true,
    av_data_criacao timestamp without time zone DEFAULT now()
);


ALTER TABLE public.avisos OWNER TO postgres;

--
-- Name: avisos_av_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.avisos_av_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.avisos_av_id_seq OWNER TO postgres;

--
-- Name: avisos_av_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.avisos_av_id_seq OWNED BY public.avisos.av_id;


--
-- Name: conversas; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.conversas (
    co_id integer NOT NULL,
    al_id integer NOT NULL,
    prof_id integer NOT NULL
);


ALTER TABLE public.conversas OWNER TO postgres;

--
-- Name: conversas_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.conversas_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.conversas_id_seq OWNER TO postgres;

--
-- Name: conversas_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.conversas_id_seq OWNED BY public.conversas.co_id;


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
    de_end timestamp without time zone NOT NULL,
    de_status character varying(15) NOT NULL
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
    ex_video character varying(300),
    ex_grupo_muscular character varying(60),
    ex_dificuldade character varying(20)
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
-- Name: mensagens; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.mensagens (
    me_id integer NOT NULL,
    co_id integer NOT NULL,
    remetente_id integer NOT NULL,
    destinatario_id integer NOT NULL,
    me_conteudo text NOT NULL,
    me_tempo timestamp without time zone,
    me_lida boolean
);


ALTER TABLE public.mensagens OWNER TO postgres;

--
-- Name: mensagens_me_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.mensagens_me_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.mensagens_me_id_seq OWNER TO postgres;

--
-- Name: mensagens_me_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.mensagens_me_id_seq OWNED BY public.mensagens.me_id;


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
    pd_descricao character varying(200),
    pd_status character varying(15) NOT NULL,
    pd_estoque integer NOT NULL
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
    tr_dificuldade character varying(20)
);


ALTER TABLE public.treinos OWNER TO postgres;

--
-- Name: treinos_exercicios; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.treinos_exercicios (
    tr_id integer NOT NULL,
    ex_id integer NOT NULL,
    te_repeticoes integer,
    te_series integer,
    te_descanso integer
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
-- Name: avisos av_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.avisos ALTER COLUMN av_id SET DEFAULT nextval('public.avisos_av_id_seq'::regclass);


--
-- Name: conversas co_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.conversas ALTER COLUMN co_id SET DEFAULT nextval('public.conversas_id_seq'::regclass);


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
-- Name: mensagens me_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.mensagens ALTER COLUMN me_id SET DEFAULT nextval('public.mensagens_me_id_seq'::regclass);


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

COPY public.alunos (al_id, al_nome, al_email, al_senha, al_cpf, al_telefone, al_dtnasc, al_pontos, al_treinos_completos, al_status) FROM stdin;
1	João Silva	joao@email.com	$2b$10$paAh3y2QYxqoSzSIfTM0Ieaf0ImjBqGprntqHszh49xc5PhZFKrdm	12345678901	11988887777	2000-05-14	50	5	Inativo
2	Maria Souza	maria@email.com	$2b$10$zFMVIU9jg2w50mzqy2Pg7OsytpuuKdUUfV.PWxxZZ8P.qoU4vxk1i	98765432100	11977776666	1998-10-22	80	13	Ativo
\.


--
-- Data for Name: alunos_desafios; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.alunos_desafios (al_id, de_id) FROM stdin;
\.


--
-- Data for Name: alunos_treinos; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.alunos_treinos (al_id, tr_id) FROM stdin;
\.


--
-- Data for Name: alunos_turmas; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.alunos_turmas (al_id, tu_id) FROM stdin;
1	1
2	2
\.


--
-- Data for Name: avisos; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.avisos (av_id, av_titulo, av_mensagem, av_tipo, av_destinatario_tipo, av_data_inicio, av_data_fim, av_ativo, av_data_criacao) FROM stdin;
1	Promo‡Æo Black Friday	Viemos aqui para anunciar a todos os alunos a abertura dos planos de promo‡Æo da black friday neste mˆs de novembro	promo	aluno	2025-11-04 21:04:40.453406	2025-11-04 21:04:40.453406	t	2025-11-04 21:04:40.453406
\.


--
-- Data for Name: conversas; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.conversas (co_id, al_id, prof_id) FROM stdin;
\.


--
-- Data for Name: desafios; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.desafios (de_id, de_nome, de_descricao, de_pontos, de_tag, de_progresso, de_start, de_end, de_status) FROM stdin;
1	Desafio 30 dias de corrida	Correr 5km por dia durante 30 dias	300	corrida	0	2025-10-01 00:00:00	2025-10-30 23:59:59	Inativo
2	Desafio 100 flexäes	Realizar 100 flexäes no menor tempo poss¡vel	150	for‡a	0	2025-09-01 00:00:00	2025-09-15 23:59:59	Ativo
\.


--
-- Data for Name: exercicios; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.exercicios (ex_id, ex_nome, ex_instrucao, ex_video, ex_grupo_muscular, ex_dificuldade) FROM stdin;
1	Supino Reto	Deite no banco e empurre a barra para cima	https://video.com/supino	Peitoral	Iniciante
2	Agachamento Livre	Agache mantendo a postura ereta	https://video.com/agachamento	Pernas	Intermediário
\.


--
-- Data for Name: funcionarios; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.funcionarios (fu_id, fu_nome, fu_email, fu_senha, fu_cpf, fu_telefone, fu_dtnasc, fu_cargo, fu_cref) FROM stdin;
2	Fernanda Lima	fernanda@fitware.com	$2b$10$BEEI9yo3tSbcCm5MUUWNRuaMlf05ZBsHH5zWlOSRBazpkcPO2r3Ce	98765432199	11955554444	1990-08-20	Secretario	\N
1	Carlos Mendes	carlos@fitware.com	$2b$10$dnjF2bPqLmax/unOFRbnle./Mtu2FvnBLk04/.HJBOAzboMoAw4Ve	12345678911	11966665555	1985-03-10	Professor	CREF123456
\.


--
-- Data for Name: horarios; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.horarios (hor_id, hor_start, hor_end, hor_dia) FROM stdin;
1	08:00:00	09:00:00	Segunda
2	19:00:00	20:00:00	Quarta
\.


--
-- Data for Name: mensagens; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.mensagens (me_id, co_id, remetente_id, destinatario_id, me_conteudo, me_tempo, me_lida) FROM stdin;
\.


--
-- Data for Name: modalidades; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.modalidades (mo_id, mo_nome, mo_descricao) FROM stdin;
1	Musculação	Treinos para força e hipertrofia
2	Pilates	Exercícios de flexibilidade e fortalecimento do core
\.


--
-- Data for Name: pagamentos; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.pagamentos (pa_id, pa_al_id, pa_valor, pa_metodo, pa_status, pa_data) FROM stdin;
1	1	150.00	C	Pago	2025-09-01
2	2	200.00	P	Pendente	2025-09-10
\.


--
-- Data for Name: produtos; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.produtos (pd_id, pd_nome, pd_valor, pd_descricao, pd_status, pd_estoque) FROM stdin;
1	Camiseta Dry Fit	79	Camiseta esportiva leve e confortável	Disponível	17
2	Garrafa Térmica	59	Mantém a temperatura da bebida por 12h	Acabando	3
\.


--
-- Data for Name: treinos; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.treinos (tr_id, tr_prof_id, tr_nome, tr_descricao, tr_dificuldade) FROM stdin;
1	1	Treino de Força	Foco em exercícios de musculação	Iniciante
2	1	Treino de Resistência	Exercícios de alta intensidade	Intermediário
\.


--
-- Data for Name: treinos_exercicios; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.treinos_exercicios (tr_id, ex_id, te_repeticoes, te_series, te_descanso) FROM stdin;
1	1	12	4	60
1	2	15	3	75
2	2	10	5	40
\.


--
-- Data for Name: turmas; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.turmas (tu_id, tu_nome, tu_prof_id, tu_mod_id, tu_hor_id) FROM stdin;
1	Turma A - ManhÆ	1	1	1
2	Turma B - Noite	1	2	2
\.


--
-- Name: alunos_al_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.alunos_al_id_seq', 2, true);


--
-- Name: avisos_av_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.avisos_av_id_seq', 1, false);


--
-- Name: conversas_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.conversas_id_seq', 1, false);


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
-- Name: mensagens_me_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.mensagens_me_id_seq', 1, false);


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
-- Name: alunos_desafios alunos_desafios_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.alunos_desafios
    ADD CONSTRAINT alunos_desafios_pkey PRIMARY KEY (al_id, de_id);


--
-- Name: alunos alunos_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.alunos
    ADD CONSTRAINT alunos_pkey PRIMARY KEY (al_id);


--
-- Name: alunos_treinos alunos_treinos_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.alunos_treinos
    ADD CONSTRAINT alunos_treinos_pkey PRIMARY KEY (al_id, tr_id);


--
-- Name: alunos_turmas alunos_turmas_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.alunos_turmas
    ADD CONSTRAINT alunos_turmas_pkey PRIMARY KEY (al_id, tu_id);


--
-- Name: avisos avisos_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.avisos
    ADD CONSTRAINT avisos_pkey PRIMARY KEY (av_id);


--
-- Name: conversas conversas_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.conversas
    ADD CONSTRAINT conversas_pkey PRIMARY KEY (co_id);


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
-- Name: mensagens mensagens_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.mensagens
    ADD CONSTRAINT mensagens_pkey PRIMARY KEY (me_id);


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
-- Name: conversas unique_conversation; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.conversas
    ADD CONSTRAINT unique_conversation UNIQUE (al_id, prof_id);


--
-- Name: mensagens validar_mensagem_participantes; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER validar_mensagem_participantes BEFORE INSERT OR UPDATE ON public.mensagens FOR EACH ROW EXECUTE FUNCTION public.verificar_participantes_mensagem();


--
-- Name: alunos_desafios alunos_desafios_al_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.alunos_desafios
    ADD CONSTRAINT alunos_desafios_al_id_fkey FOREIGN KEY (al_id) REFERENCES public.alunos(al_id) ON DELETE CASCADE;


--
-- Name: alunos_desafios alunos_desafios_de_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.alunos_desafios
    ADD CONSTRAINT alunos_desafios_de_id_fkey FOREIGN KEY (de_id) REFERENCES public.desafios(de_id) ON DELETE CASCADE;


--
-- Name: alunos_treinos alunos_treinos_al_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.alunos_treinos
    ADD CONSTRAINT alunos_treinos_al_id_fkey FOREIGN KEY (al_id) REFERENCES public.alunos(al_id) ON DELETE CASCADE;


--
-- Name: alunos_treinos alunos_treinos_tr_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.alunos_treinos
    ADD CONSTRAINT alunos_treinos_tr_id_fkey FOREIGN KEY (tr_id) REFERENCES public.treinos(tr_id) ON DELETE CASCADE;


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
-- Name: conversas conversas_al_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.conversas
    ADD CONSTRAINT conversas_al_id_fkey FOREIGN KEY (al_id) REFERENCES public.alunos(al_id) ON DELETE CASCADE;


--
-- Name: conversas conversas_prof_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.conversas
    ADD CONSTRAINT conversas_prof_id_fkey FOREIGN KEY (prof_id) REFERENCES public.funcionarios(fu_id) ON DELETE CASCADE;


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

