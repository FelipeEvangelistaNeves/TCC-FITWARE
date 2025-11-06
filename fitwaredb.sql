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
    -- Busca os participantes da conversa
    SELECT al_id, prof_id INTO aluno_id, professor_id
    FROM conversas
    WHERE co_id = NEW.co_id;

    -- Verifica se a conversa existe
    IF aluno_id IS NULL THEN
        RAISE EXCEPTION 'Conversa inexistente com co_id=%', NEW.co_id;
    END IF;

    -- Verifica se remetente e destinat rio pertencem … conversa
    IF NOT (
        (NEW.remetente_tipo = 'aluno' AND NEW.remetente_id = aluno_id AND
         NEW.destinatario_tipo = 'professor' AND NEW.destinatario_id = professor_id)
        OR
        (NEW.remetente_tipo = 'professor' AND NEW.remetente_id = professor_id AND
         NEW.destinatario_tipo = 'aluno' AND NEW.destinatario_id = aluno_id)
    ) THEN
        RAISE EXCEPTION 'Remetente ou destinat rio nÆo pertencem … conversa %', NEW.co_id;
    END IF;

    -- Evita remetente e destinat rio iguais do mesmo tipo
    IF NEW.remetente_tipo = NEW.destinatario_tipo
       AND NEW.remetente_id = NEW.destinatario_id THEN
        RAISE EXCEPTION 'Remetente e destinat rio nÆo podem ser iguais do mesmo tipo';
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
    me_lida boolean,
    remetente_tipo character varying(20) DEFAULT 'aluno'::character varying NOT NULL,
    destinatario_tipo character varying(20) DEFAULT 'professor'::character varying NOT NULL
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
1	JoÆo Pedro Silva	joao@email.com	$2b$10$F2yrJde1n6/.XtXPQ1JYFOoZ21Nizo1aD00JyPtV1hMsrGbYwBOS2	12345678901	11999999999	1998-03-10	150	5	ativo
2	Maria Clara Souza	maria@email.com	$2b$10$riY3y/4AK5xVECSXC7hjs.NcT.dU8U5lhWjDpc29h5PEYa6tApBQW	23456789012	11988888888	1995-07-21	200	8	ativo
3	Lucas Almeida	lucas@email.com	$2b$10$90uJejb9BaA9zzvEyou7ueVtERs00KEjYR68n6KT90HIdi8Fwj.c6	34567890123	11977777777	1999-02-18	100	3	ativo
4	Ana Beatriz Ramos	ana@email.com	$2b$10$Y9sW05D0kaEQAgUvWhx2n.ZZveul6yjCB9Hr2R3ZrzfauF0HbCV0S	45678901234	11966666666	2000-11-09	250	10	ativo
5	Carlos Henrique Dias	carlos@email.com	$2b$10$deBbNrfkaX8oa6/qKOtW2.dWl9pjwzbiaGypwU/ui3zBD.5AHZaPq	56789012345	11955555555	1997-05-25	180	6	ativo
\.


--
-- Data for Name: alunos_desafios; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.alunos_desafios (al_id, de_id) FROM stdin;
1	1
1	5
2	2
2	7
3	1
3	6
4	4
4	5
5	3
5	8
\.


--
-- Data for Name: alunos_treinos; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.alunos_treinos (al_id, tr_id) FROM stdin;
1	1
1	3
1	7
2	2
2	4
2	3
3	1
3	5
3	6
4	3
4	4
4	7
5	5
5	6
5	8
\.


--
-- Data for Name: alunos_turmas; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.alunos_turmas (al_id, tu_id) FROM stdin;
1	1
1	3
1	6
2	1
2	4
2	7
3	2
3	5
3	8
4	3
4	6
4	7
5	2
5	4
5	8
\.


--
-- Data for Name: avisos; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.avisos (av_id, av_titulo, av_mensagem, av_tipo, av_destinatario_tipo, av_data_inicio, av_data_fim, av_ativo, av_data_criacao) FROM stdin;
1	Bem-vindo … Academia FitLife!	Seja bem-vindo(a) … nossa academia! Aproveite todas as funcionalidades do sistema e mantenha seu progresso em dia.	Informativo	Geral	2025-11-01 08:00:00	2025-12-01 23:59:00	t	2025-11-06 20:18:44.756931
2	Desafio do Mˆs: Resistˆncia 100%	Participe do nosso desafio de resistˆncia e acumule pontos extras! Fale com seu professor para se inscrever.	Evento	Alunos	2025-11-05 00:00:00	2025-12-05 23:59:00	t	2025-11-06 20:18:44.756931
3	ReuniÆo de Professores	Lembramos que a reuniÆo mensal dos professores ocorrer  na pr¢xima sexta-feira …s 14h na sala de conferˆncias.	Interno	Professores	2025-11-04 00:00:00	2025-11-10 23:59:00	t	2025-11-06 20:18:44.756931
4	Feriado - Academia Fechada	A academia estar  fechada no dia 15 de novembro (Proclama‡Æo da Rep£blica). As aulas retornarÆo normalmente no dia seguinte.	Aviso	Geral	2025-11-10 00:00:00	2025-11-16 23:59:00	t	2025-11-06 20:18:44.756931
5	Nova Modalidade: Spinning Noturno	Agora vocˆ pode participar das aulas de Spinning … noite! Consulte a recep‡Æo para hor rios e turmas dispon¡veis.	An£ncio	Alunos	2025-11-02 00:00:00	2025-12-15 23:59:00	t	2025-11-06 20:18:44.756931
6	Campanha Solid ria de Natal	Estamos arrecadando brinquedos e roupas infantis at‚ o dia 20 de dezembro. Contribua com a nossa a‡Æo solid ria!	Campanha	Geral	2025-11-20 00:00:00	2025-12-20 23:59:00	t	2025-11-06 20:18:44.756931
7	Atualiza‡Æo do Sistema	Nosso sistema passar  por uma manuten‡Æo programada no dia 8 de novembro, das 22h …s 23h59. Durante este per¡odo, o acesso ser  temporariamente suspenso.	Manuten‡Æo	Geral	2025-11-08 22:00:00	2025-11-08 23:59:00	t	2025-11-06 20:18:44.756931
8	Nova Turma de HIIT Abertas	As vagas para a nova turma de HIIT noturno estÆo abertas! Inscreva-se na recep‡Æo ou pelo aplicativo.	An£ncio	Alunos	2025-11-03 00:00:00	2025-12-03 23:59:00	t	2025-11-06 20:18:44.756931
\.


--
-- Data for Name: conversas; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.conversas (co_id, al_id, prof_id) FROM stdin;
1	1	1
2	1	2
3	1	3
4	1	4
5	1	5
6	2	1
7	2	2
8	2	3
9	2	4
10	2	5
11	3	1
12	3	2
13	3	3
14	3	4
15	3	5
16	4	1
17	4	2
18	4	3
19	4	4
20	4	5
21	5	1
22	5	2
23	5	3
24	5	4
25	5	5
\.


--
-- Data for Name: desafios; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.desafios (de_id, de_nome, de_descricao, de_pontos, de_tag, de_progresso, de_start, de_end, de_status) FROM stdin;
1	Primeiros Passos	Complete seu primeiro treino com sucesso.	50	iniciacao	0	2025-11-01 00:00:00	2025-12-01 00:00:00	ativo
2	Foco Total	Conclua 5 treinos em uma semana.	120	consistencia	0	2025-11-01 00:00:00	2025-11-30 00:00:00	ativo
3	Corpo em Movimento	Participe de 3 turmas diferentes.	100	participacao	0	2025-11-05 00:00:00	2025-12-05 00:00:00	ativo
4	Desafio do Core	Complete todos os exerc¡cios abdominais do mˆs.	150	core	0	2025-11-10 00:00:00	2025-12-10 00:00:00	ativo
5	Energia M xima	Participe de uma aula de HIIT sem pausas.	200	hiit	0	2025-11-10 00:00:00	2025-12-10 00:00:00	ativo
6	Alongue-se	Fa‡a 4 sessäes de alongamento nesta semana.	80	flexibilidade	0	2025-11-03 00:00:00	2025-11-30 00:00:00	ativo
7	Funcional Power	Complete 3 treinos funcionais no mˆs.	130	funcional	0	2025-11-01 00:00:00	2025-12-01 00:00:00	ativo
8	Resistˆncia 100%	Treine 4 dias seguidos sem faltar.	160	resistencia	0	2025-11-15 00:00:00	2025-12-15 00:00:00	ativo
\.


--
-- Data for Name: exercicios; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.exercicios (ex_id, ex_nome, ex_instrucao, ex_video, ex_grupo_muscular, ex_dificuldade) FROM stdin;
1	Agachamento Livre	Mantenha os p‚s afastados e des‡a at‚ 90 graus.	https://videos.academia.com/agachamento.mp4	Pernas	Intermedi rio
2	Supino Reto	Deite no banco e empurre a barra at‚ estender os bra‡os.	https://videos.academia.com/supino.mp4	Peito	Intermedi rio
3	Puxada Frontal	Segure a barra e puxe at‚ o peito, mantendo postura.	https://videos.academia.com/puxada.mp4	Costas	Intermedi rio
4	Prancha Abdominal	Mantenha o corpo reto apoiado nos antebra‡os.	https://videos.academia.com/prancha.mp4	Core	Iniciante
5	Afundo	Dˆ um passo … frente e abaixe o corpo at‚ 90 graus.	https://videos.academia.com/afundo.mp4	Pernas	Intermedi rio
6	FlexÆo de Bra‡o	Mantenha o corpo reto e flexione os cotovelos at‚ o chÆo.	https://videos.academia.com/flexao.mp4	Peito	Iniciante
7	Remada Curvada	Com barra ou halteres, puxe at‚ o abd“men.	https://videos.academia.com/remada.mp4	Costas	Avan‡ado
8	B¡ceps com Halteres	Flexione os cotovelos controlando o movimento.	https://videos.academia.com/biceps.mp4	Bra‡os	Iniciante
9	Eleva‡Æo Lateral	Levante os bra‡os at‚ a altura dos ombros.	https://videos.academia.com/elevacao-lateral.mp4	Ombros	Iniciante
10	Abdominal Supra	Eleve o tronco at‚ contrair o abd“men.	https://videos.academia.com/abdominal.mp4	Core	Iniciante
\.


--
-- Data for Name: funcionarios; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.funcionarios (fu_id, fu_nome, fu_email, fu_senha, fu_cpf, fu_telefone, fu_dtnasc, fu_cargo, fu_cref) FROM stdin;
1	Felipe Evangelista	felipe@fitware.com	$2b$10$CSeDQRkzagkk9HrHj9L9beh962l2Zv7Z6osmLcTwXRbYZYGsamAqm	11122233344	11988887777	1985-03-14	Professor	CREF123456-SP
2	Filipe Mello	filipe@fitware.com	$2b$10$4Oo0sdwc1peMQ54NjPxR6eMrAmloG9pBwEJ.05N/bGIkv.JVDu8DO	22233344455	11999998888	1990-06-22	Professor	CREF987654-SP
3	Thiago William	thiago@fitware.com	$2b$10$FayQtTKNseroOqrxTTdjv.qv0khRTEfp1gDEAtbg/0tkFVPmpwPHq	33344455566	11977776666	1988-11-09	Professor	CREF456789-SP
4	Pedro Nogueira	pedro@fitware.com	$2b$10$OTtMQu8sj9jI6P0i3ck2ju9/MnqGZUwco7MeygZikm9/5pLX82sr2	44455566677	11955554444	1992-09-18	Professor	CREF321654-SP
5	Bruno Almeida	bruno@fitware.com	$2b$10$EvRjPP0oWvt0qSHeSt9xd.6KwsK8I1sJRGX6kNbm.rBzTLqF8iVMW	55566677788	11933332222	1986-02-10	Professor	CREF654987-SP
6	Anthony Dias	anthony@fitware.com	$2b$10$3pP1qM81cg/94RBhCha6GuoOuOEaDacznqBfrRnTWx0KHcwMcSiNW	66677788899	11922221111	1995-08-25	Secretario	\N
7	Marcus Vinicius	marcus@fitware.com	$2b$10$CuDRFDSfuN7XRhC0hp.7YeOyUnRjfxXFmzZyATbmzCtJULjF5gKi6	77788899900	11911110000	1993-12-04	Secretario	\N
8	Samyra Herculano	samyra@fitware.com	$2b$10$IVEBdU7qwueV3mLgJMHRxeGlr5epHt.GyPxyVmaNXIHE9de5NZEwG	88899900011	11955553333	1998-05-19	Secretario	\N
9	Ermyone Vieira	ermyone@fitware.com	$2b$10$/6IVJ4NTCBAn.bStkkaGdO1bYhBOs3Z3H99Z6GSpqYdqRW/pGG2w6	99900011122	11977774444	1991-10-07	Secretario	\N
10	Ana Leonel	ana@fitware.com	$2b$10$1fuxqKYzcc0B35xl6nYWkeUQjUx8ClArg7DJCUojqKcLF10gJQyBG	00011122233	11966665555	1997-01-30	Secretario	\N
\.


--
-- Data for Name: horarios; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.horarios (hor_id, hor_start, hor_end, hor_dia) FROM stdin;
1	06:00:00	07:00:00	Segunda
2	07:00:00	08:00:00	Ter‡a
3	08:00:00	09:00:00	Quarta
4	09:00:00	10:00:00	Quinta
5	10:00:00	11:00:00	Sexta
6	18:00:00	19:00:00	Segunda
7	19:00:00	20:00:00	Ter‡a
8	20:00:00	21:00:00	Quarta
9	21:00:00	22:00:00	Quinta
10	17:00:00	18:00:00	Sexta
\.


--
-- Data for Name: mensagens; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.mensagens (me_id, co_id, remetente_id, destinatario_id, me_conteudo, me_tempo, me_lida, remetente_tipo, destinatario_tipo) FROM stdin;
1	1	1	1	Ol  professor Paulo, gostaria de tirar uma d£vida sobre o treino.	2025-11-06 20:18:33.860968	f	aluno	professor
2	1	1	1	Ol  JoÆo, claro! Qual sua d£vida?	2025-11-06 20:18:33.860968	f	professor	aluno
3	2	1	2	Oi professora Juliana, o exerc¡cio de perna est  certo?	2025-11-06 20:18:33.860968	f	aluno	professor
4	2	2	1	Oi JoÆo! Sim, o agachamento est  correto. Continue assim!	2025-11-06 20:18:33.860968	f	professor	aluno
5	3	1	3	Ol  Ricardo, posso trocar o treino de hoje?	2025-11-06 20:18:33.860968	f	aluno	professor
6	3	3	1	Pode sim, JoÆo. Apenas mantenha o aquecimento.	2025-11-06 20:18:33.860968	f	professor	aluno
7	4	1	4	Oi Fernanda, fiz o treino errado ontem.	2025-11-06 20:18:33.860968	f	aluno	professor
8	4	4	1	Tudo bem JoÆo, amanhÆ compensamos com outro exerc¡cio.	2025-11-06 20:18:33.860968	f	professor	aluno
9	5	1	5	Professor Bruno, o alongamento ‚ antes ou depois?	2025-11-06 20:18:33.860968	f	aluno	professor
10	5	5	1	Oi JoÆo! Sempre antes e depois, para evitar lesäes.	2025-11-06 20:18:33.860968	f	professor	aluno
11	6	2	1	Oi Paulo, finalizei meu treino hoje.	2025-11-06 20:18:33.860968	f	aluno	professor
12	6	1	2	Excelente Maria! Continue mantendo o ritmo.	2025-11-06 20:18:33.860968	f	professor	aluno
13	7	2	2	Professora Juliana, posso aumentar o peso no agachamento?	2025-11-06 20:18:33.860968	f	aluno	professor
14	7	2	2	Pode sim Maria, mas aumente com cuidado.	2025-11-06 20:18:33.860968	f	professor	aluno
15	8	2	3	Ol  Ricardo, o treino de costas foi ¢timo!	2025-11-06 20:18:33.860968	f	aluno	professor
16	8	3	2	Fico feliz, Maria! Continue com essa energia.	2025-11-06 20:18:33.860968	f	professor	aluno
17	9	2	4	Oi Fernanda, estou com dor no bra‡o.	2025-11-06 20:18:33.860968	f	aluno	professor
18	9	4	2	Maria, evite sobrecarga hoje. Vamos ajustar o treino.	2025-11-06 20:18:33.860968	f	professor	aluno
19	10	2	5	Professor Bruno, adorei o novo circuito!	2025-11-06 20:18:33.860968	f	aluno	professor
20	10	5	2	Que bom, Maria! Esse circuito ‚ ¢timo para resistˆncia.	2025-11-06 20:18:33.860968	f	professor	aluno
21	11	3	1	Paulo, terminei meu treino mais cedo.	2025-11-06 20:18:33.860968	f	aluno	professor
22	11	1	3	àtimo, Lucas! Aproveite para alongar bem.	2025-11-06 20:18:33.860968	f	professor	aluno
23	12	3	2	Juliana, posso adicionar corrida ao treino?	2025-11-06 20:18:33.860968	f	aluno	professor
24	12	2	3	Sim, Lucas. Corrida leve ajuda bastante no condicionamento.	2025-11-06 20:18:33.860968	f	professor	aluno
25	13	3	3	Ricardo, quanto tempo deve durar o treino?	2025-11-06 20:18:33.860968	f	aluno	professor
26	13	3	3	Cerca de 45 minutos, Lucas.	2025-11-06 20:18:33.860968	f	professor	aluno
27	14	3	4	Fernanda, fiquei com d£vida sobre a respira‡Æo.	2025-11-06 20:18:33.860968	f	aluno	professor
28	14	4	3	Lucas, respire sempre pelo nariz e solte pela boca.	2025-11-06 20:18:33.860968	f	professor	aluno
29	15	3	5	Bruno, gostei da aula de hoje.	2025-11-06 20:18:33.860968	f	aluno	professor
30	15	5	3	Que bom, Lucas! Vamos evoluir juntos.	2025-11-06 20:18:33.860968	f	professor	aluno
31	16	4	1	Oi Paulo, como sei se estou evoluindo bem?	2025-11-06 20:18:33.860968	f	aluno	professor
32	16	1	4	Ana, acompanhe suas cargas e tempos de descanso.	2025-11-06 20:18:33.860968	f	professor	aluno
33	17	4	2	Juliana, minha alimenta‡Æo est  afetando meu desempenho?	2025-11-06 20:18:33.860968	f	aluno	professor
34	17	2	4	Sim, Ana. Tente incluir mais prote¡nas nas refei‡äes.	2025-11-06 20:18:33.860968	f	professor	aluno
35	18	4	3	Ricardo, qual o melhor hor rio pra treinar?	2025-11-06 20:18:33.860968	f	aluno	professor
36	18	3	4	Depende da sua rotina, Ana. O importante ‚ manter constƒncia.	2025-11-06 20:18:33.860968	f	professor	aluno
37	19	4	4	Fernanda, posso trocar a esteira pela bike?	2025-11-06 20:18:33.860968	f	aluno	professor
38	19	4	4	Claro, Ana! A bike tamb‚m trabalha bem as pernas.	2025-11-06 20:18:33.860968	f	professor	aluno
39	20	4	5	Bruno, aumentei o peso e senti dor.	2025-11-06 20:18:33.860968	f	aluno	professor
40	20	5	4	Ana, reduza um pouco e ajuste sua postura.	2025-11-06 20:18:33.860968	f	professor	aluno
41	21	5	1	Oi Paulo, posso treinar duas vezes por dia?	2025-11-06 20:18:33.860968	f	aluno	professor
42	21	1	5	Carlos, s¢ se houver bom descanso entre as sessäes.	2025-11-06 20:18:33.860968	f	professor	aluno
43	22	5	2	Juliana, qual melhor treino pra for‡a?	2025-11-06 20:18:33.860968	f	aluno	professor
44	22	2	5	Carlos, o treino de resistˆncia muscular ‚ ¢timo pra isso.	2025-11-06 20:18:33.860968	f	professor	aluno
45	23	5	3	Ricardo, esqueci minha ficha de treino.	2025-11-06 20:18:33.860968	f	aluno	professor
46	23	3	5	Sem problema, Carlos. Te envio uma nova versÆo.	2025-11-06 20:18:33.860968	f	professor	aluno
47	24	5	4	Fernanda, posso fazer treino leve no domingo?	2025-11-06 20:18:33.860968	f	aluno	professor
48	24	4	5	Pode sim, Carlos. Domingo ‚ ¢timo pra treino regenerativo.	2025-11-06 20:18:33.860968	f	professor	aluno
49	25	5	5	Bruno, quando ‚ o pr¢ximo desafio da academia?	2025-11-06 20:18:33.860968	f	aluno	professor
50	25	5	5	Na pr¢xima semana, Carlos! Prepare-se!	2025-11-06 20:18:33.860968	f	professor	aluno
\.


--
-- Data for Name: modalidades; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.modalidades (mo_id, mo_nome, mo_descricao) FROM stdin;
1	Muscula‡Æo	Treinos com foco em for‡a, resistˆncia e hipertrofia.
2	Pilates	Atividade voltada para flexibilidade, respira‡Æo e postura.
3	Funcional	Exerc¡cios de alta intensidade com movimentos corporais.
4	Alongamento	Sessäes leves voltadas para mobilidade e flexibilidade.
5	Cross Training	Treinos intensos que misturam for‡a e cardio.
6	HIIT	Treinos intervalados de alta intensidade.
7	Yoga	Pr tica voltada ao equil¡brio, concentra‡Æo e bem-estar.
8	Spinning	Aulas de ciclismo indoor com alta queima cal¢rica.
9	Zumba	Dan‡a aer¢bica com ritmos latinos para condicionamento f¡sico.
10	Abdominal Express	Aulas r pidas com foco na regiÆo abdominal.
\.


--
-- Data for Name: pagamentos; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.pagamentos (pa_id, pa_al_id, pa_valor, pa_metodo, pa_status, pa_data) FROM stdin;
1	1	120.00	P	Pago	2025-10-05
2	1	120.00	P	Pago	2025-11-05
3	2	130.00	D	Pago	2025-09-10
4	2	130.00	D	Pendente	2025-11-01
5	3	100.00	E	Pago	2025-10-02
6	3	100.00	E	Atrasado	2025-11-01
7	4	150.00	C	Pago	2025-09-20
8	4	150.00	C	Pendente	2025-11-01
9	5	110.00	P	Pago	2025-10-10
10	5	110.00	P	Atrasado	2025-11-01
\.


--
-- Data for Name: produtos; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.produtos (pd_id, pd_nome, pd_valor, pd_descricao, pd_status, pd_estoque) FROM stdin;
1	Whey Protein 900g	180	Suplemento proteico sabor baunilha.	Dispon¡vel	25
2	Creatina Monohidratada 300g	120	Aumenta for‡a e desempenho nos treinos.	Dispon¡vel	30
3	Pr‚-Treino Explosive 250g	150	F¢rmula energ‚tica para treino intenso.	Dispon¡vel	15
4	Camiseta Dry Fit Academia	70	Camiseta leve e respir vel, ideal para treinos.	Dispon¡vel	40
5	Garrafa Esportiva 1L	40	Pl stico resistente com tampa antivazamento.	Dispon¡vel	60
6	Toalha de Microfibra Fitness	35	Secagem r pida e compacta.	Dispon¡vel	50
7	Luvas de Treino em Couro	90	Protege as mÆos durante levantamento de peso.	Dispon¡vel	20
8	Barra de Cereal Proteica	10	Snack com alto teor de prote¡na.	Dispon¡vel	100
9	Cinto de Muscula‡Æo	130	Suporte lombar para levantamento de peso.	Dispon¡vel	10
10	Tapioca Proteica 500g	55	Mistura pronta com whey e fibras.	Dispon¡vel	25
\.


--
-- Data for Name: treinos; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.treinos (tr_id, tr_prof_id, tr_nome, tr_descricao, tr_dificuldade) FROM stdin;
1	1	Treino de For‡a A	Foco em superiores: peito, costas e tr¡ceps.	Intermedi rio
2	1	Treino de For‡a B	Foco em inferiores: pernas e gl£teos.	Intermedi rio
3	2	Treino Pilates Core	Exerc¡cios de estabilidade e fortalecimento abdominal.	Iniciante
4	3	Treino Funcional Total	Movimentos compostos com alta intensidade.	Avan‡ado
5	3	Treino Funcional Leve	Funcional de baixo impacto para iniciantes.	Iniciante
6	4	Treino de Alongamento Relax	S‚rie de alongamentos guiados e leves.	Iniciante
7	5	Treino HIIT Express	Alta intensidade com pausas curtas.	Avan‡ado
8	5	Treino Resistˆncia 360	Combina resistˆncia e agilidade em circuito.	Intermedi rio
\.


--
-- Data for Name: treinos_exercicios; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.treinos_exercicios (tr_id, ex_id, te_repeticoes, te_series, te_descanso) FROM stdin;
1	2	10	4	60
1	3	12	3	60
1	7	10	3	60
1	9	15	2	45
2	1	12	4	60
2	5	10	3	60
2	4	30	2	45
2	10	20	3	30
3	4	40	3	30
3	10	25	2	30
3	9	20	2	30
4	1	15	4	45
4	6	20	3	45
4	7	12	3	60
4	5	15	3	45
5	6	15	3	45
5	10	25	3	30
5	9	15	2	30
6	4	45	2	30
6	9	30	2	30
6	10	25	2	30
7	1	20	4	20
7	6	20	4	20
7	10	30	3	15
7	5	15	3	20
8	3	12	4	45
8	7	10	3	45
8	2	12	3	60
8	4	40	2	30
\.


--
-- Data for Name: turmas; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.turmas (tu_id, tu_nome, tu_prof_id, tu_mod_id, tu_hor_id) FROM stdin;
1	Muscula‡Æo Iniciante - ManhÆ	1	1	1
2	Muscula‡Æo Intermedi ria - Noite	1	1	2
3	Pilates Avan‡ado	2	2	3
4	Funcional Intensivo	3	3	4
5	Treino de Alongamento	4	1	5
6	HIIT - Alta Intensidade	5	3	6
7	Pilates para Iniciantes	2	2	7
8	Funcional Leve	3	3	8
\.


--
-- Name: alunos_al_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.alunos_al_id_seq', 1, false);


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

SELECT pg_catalog.setval('public.desafios_de_id_seq', 1, false);


--
-- Name: exercicios_ex_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.exercicios_ex_id_seq', 1, false);


--
-- Name: funcionarios_fu_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.funcionarios_fu_id_seq', 1, false);


--
-- Name: horarios_hor_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.horarios_hor_id_seq', 1, false);


--
-- Name: mensagens_me_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.mensagens_me_id_seq', 1, false);


--
-- Name: modalidades_mo_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.modalidades_mo_id_seq', 1, false);


--
-- Name: pagamentos_pa_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.pagamentos_pa_id_seq', 1, false);


--
-- Name: produtos_pd_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.produtos_pd_id_seq', 1, false);


--
-- Name: treinos_tr_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.treinos_tr_id_seq', 1, false);


--
-- Name: turmas_tu_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.turmas_tu_id_seq', 1, false);


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
-- Name: mensagens trg_verificar_participantes_mensagem; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER trg_verificar_participantes_mensagem BEFORE INSERT OR UPDATE ON public.mensagens FOR EACH ROW EXECUTE FUNCTION public.verificar_participantes_mensagem();


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

