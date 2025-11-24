--
-- PostgreSQL database dump
--

\restrict aAsBx0zPmC05PP5LzmA5RdO85fN4gGxju4sBuPSpSy3zp6w83bxVC93IvqC4oyS

-- Dumped from database version 18.1
-- Dumped by pg_dump version 18.1

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



    -- Verifica se remetente e destinatário pertencem … conversa

    IF NOT (

        (NEW.remetente_tipo = 'aluno' AND NEW.remetente_id = aluno_id AND

         NEW.destinatario_tipo = 'professor' AND NEW.destinatario_id = professor_id)

        OR

        (NEW.remetente_tipo = 'professor' AND NEW.remetente_id = professor_id AND

         NEW.destinatario_tipo = 'aluno' AND NEW.destinatario_id = aluno_id)

    ) THEN

        RAISE EXCEPTION 'Remetente ou destinatário não pertencem … conversa %', NEW.co_id;

    END IF;



    -- Evita remetente e destinatário iguais do mesmo tipo

    IF NEW.remetente_tipo = NEW.destinatario_tipo

       AND NEW.remetente_id = NEW.destinatario_id THEN

        RAISE EXCEPTION 'Remetente e destinatário não podem ser iguais do mesmo tipo';

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
    START WITH 6
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
    START WITH 9
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
    START WITH 26
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
    START WITH 9
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
-- Name: desafios_imagem; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.desafios_imagem (
    di_id integer NOT NULL,
    di_aluno_id integer NOT NULL,
    di_desafio_id integer NOT NULL,
    di_image_url text NOT NULL,
    di_created_at timestamp without time zone DEFAULT now(),
    di_updated_at timestamp without time zone DEFAULT now()
);


ALTER TABLE public.desafios_imagem OWNER TO postgres;

--
-- Name: desafios_imagem_di_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.desafios_imagem_di_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.desafios_imagem_di_id_seq OWNER TO postgres;

--
-- Name: desafios_imagem_di_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.desafios_imagem_di_id_seq OWNED BY public.desafios_imagem.di_id;


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
    START WITH 11
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
    START WITH 11
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
    START WITH 11
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
    START WITH 51
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
    START WITH 11
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
    START WITH 11
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
    START WITH 11
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
    START WITH 9
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
    START WITH 9
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
-- Name: desafios_imagem di_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.desafios_imagem ALTER COLUMN di_id SET DEFAULT nextval('public.desafios_imagem_di_id_seq'::regclass);


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
2	Maria Clara Souza	maria@email.com	$2b$10$riY3y/4AK5xVECSXC7hjs.NcT.dU8U5lhWjDpc29h5PEYa6tApBQW	23456789012	11988888888	1995-07-21	200	8	ativo
3	Lucas Almeida	lucas@email.com	$2b$10$90uJejb9BaA9zzvEyou7ueVtERs00KEjYR68n6KT90HIdi8Fwj.c6	34567890123	11977777777	1999-02-18	100	3	ativo
4	Ana Beatriz Ramos	ana@email.com	$2b$10$Y9sW05D0kaEQAgUvWhx2n.ZZveul6yjCB9Hr2R3ZrzfauF0HbCV0S	45678901234	11966666666	2000-11-09	250	10	ativo
5	Carlos Henrique Dias	carlos@email.com	$2b$10$deBbNrfkaX8oa6/qKOtW2.dWl9pjwzbiaGypwU/ui3zBD.5AHZaPq	56789012345	11955555555	1997-05-25	180	6	ativo
1	João Pedro Silva	joao@email.com	$2b$10$F2yrJde1n6/.XtXPQ1JYFOoZ21Nizo1aD00JyPtV1hMsrGbYwBOS2	12345678901	11999999999	1998-03-10	110	5	ativo
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
\.


--
-- Data for Name: alunos_treinos; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.alunos_treinos (al_id, tr_id) FROM stdin;
2	4
3	5
3	6
4	4
5	5
5	6
2	21
3	21
4	21
5	21
1	21
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
1	Bem-vindo à Academia FitLife!	Seja bem-vindo(a) à nossa academia! Aproveite todas as funcionalidades do sistema e mantenha seu progresso em dia.	Informativo	Geral	2025-11-01 08:00:00	2025-12-01 23:59:00	t	2025-11-06 20:18:44.756931
2	Desafio do Mês: Resistência 100%	Participe do nosso desafio de resistência e acumule pontos extras! Fale com seu professor para se inscrever.	Evento	Alunos	2025-11-05 00:00:00	2025-12-05 23:59:00	t	2025-11-06 20:18:44.756931
3	Reunião de Professores	Lembramos que a reunião mensal dos professores ocorrerá na próxima sexta-feira às 14h na sala de conferências.	Interno	Professores	2025-11-04 00:00:00	2025-11-10 23:59:00	t	2025-11-06 20:18:44.756931
4	Feriado - Academia Fechada	A academia estará fechada no dia 15 de novembro (Proclamação da República). As aulas retornarão normalmente no dia seguinte.	Aviso	Geral	2025-11-10 00:00:00	2025-11-16 23:59:00	t	2025-11-06 20:18:44.756931
5	Nova Modalidade: Spinning Noturno	Agora você pode participar das aulas de Spinning à noite! Consulte a recepção para horários e turmas disponíveis.	Anúncio	Alunos	2025-11-02 00:00:00	2025-12-15 23:59:00	t	2025-11-06 20:18:44.756931
6	Campanha Solidária de Natal	Estamos arrecadando brinquedos e roupas infantis até o dia 20 de dezembro. Contribua com a nossa ação solidária!	Campanha	Geral	2025-11-20 00:00:00	2025-12-20 23:59:00	t	2025-11-06 20:18:44.756931
7	Atualização do Sistema	Nosso sistema passará por uma manutenção programada no dia 8 de novembro, das 22h às 23h59. Durante este período, o acesso será temporariamente suspenso.	Manutenção	Geral	2025-11-08 22:00:00	2025-11-08 23:59:00	t	2025-11-06 20:18:44.756931
8	Nova Turma de HIIT Abertas	As vagas para a nova turma de HIIT noturno estão abertas! Inscreva-se na recepção ou pelo aplicativo.	Anúncio	Alunos	2025-11-03 00:00:00	2025-12-03 23:59:00	t	2025-11-06 20:18:44.756931
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
5	Energia Máxima	Participe de uma aula de HIIT sem pausas.	200	hiit	0	2025-11-10 00:00:00	2025-12-10 00:00:00	ativo
7	Funcional Power	Complete 3 treinos funcionais no mês.	130	funcional	0	2025-11-01 00:00:00	2025-12-01 00:00:00	ativo
4	Desafio do Core	Complete todos os exercícios abdominais do mês.	150	core	33	2025-11-10 00:00:00	2025-12-10 00:00:00	ativo
1	Primeiros Passos	Complete seu primeiro treino com sucesso.	50	iniciacao	50	2025-11-01 00:00:00	2025-12-01 00:00:00	ativo
6	Alongue-se	Faça 500 sessões de alongamento.	2000	flexibilidade	0	2025-11-03 00:00:00	2025-11-30 00:00:00	Concluído
2	Foco Total	Conclua 5 treinos em uma semana.	120	consistencia	0	2025-11-01 00:00:00	2025-11-30 00:00:00	Inativo
3	Corpo em Movimento	Participe de 3 turmas diferentes.	100	participacao	25	2025-11-05 00:00:00	2025-12-05 00:00:00	Ativo
\.


--
-- Data for Name: desafios_imagem; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.desafios_imagem (di_id, di_aluno_id, di_desafio_id, di_image_url, di_created_at, di_updated_at) FROM stdin;
1	1	1	https://fitware-etec-s3.s3.amazonaws.com/desafios/ee6e3332-d644-41be-9d62-32f4c7bfaae9.jpeg	2025-11-23 22:08:51.085931	2025-11-23 22:08:51.085931
2	1	1	https://fitware-etec-s3.s3.amazonaws.com/desafios/a4c3aa98-48c7-4cee-960d-3f6f161b6225.jpeg	2025-11-23 22:10:58.4313	2025-11-23 22:10:58.4313
\.


--
-- Data for Name: exercicios; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.exercicios (ex_id, ex_nome, ex_instrucao, ex_video, ex_grupo_muscular, ex_dificuldade) FROM stdin;
1	Agachamento Livre	Mantenha os pés afastados e desça até 90 graus.	https://videos.academia.com/agachamento.mp4	Pernas	Intermediário
2	Supino Reto	Deite no banco e empurre a barra até estender os braços.	https://videos.academia.com/supino.mp4	Peito	Intermediário
3	Puxada Frontal	Segure a barra e puxe até o peito, mantendo postura.	https://videos.academia.com/puxada.mp4	Costas	Intermediário
4	Prancha Abdominal	Mantenha o corpo reto apoiado nos antebraços.	https://videos.academia.com/prancha.mp4	Core	Iniciante
5	Afundo	Dê um passo … frente e abaixe o corpo até 90 graus.	https://videos.academia.com/afundo.mp4	Pernas	Intermediário
6	Flexão de Braço	Mantenha o corpo reto e flexione os cotovelos até o chão.	https://videos.academia.com/flexao.mp4	Peito	Iniciante
7	Remada Curvada	Com barra ou halteres, puxe até o abdômen.	https://videos.academia.com/remada.mp4	Costas	Avançado
8	Bíceps com Halteres	Flexione os cotovelos controlando o movimento.	https://videos.academia.com/biceps.mp4	Braços	Iniciante
9	Elevação Lateral	Levante os braços até a altura dos ombros.	https://videos.academia.com/elevacao-lateral.mp4	Ombros	Iniciante
10	Abdominal Supra	Eleve o tronco até contrair o abdômen.	https://videos.academia.com/abdominal.mp4	Core	Iniciante
24	aaa	\N	\N	\N	\N
25	fffff	\N	\N	\N	\N
26	asad	\N	\N	\N	\N
\.


--
-- Data for Name: funcionarios; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.funcionarios (fu_id, fu_nome, fu_email, fu_senha, fu_cpf, fu_telefone, fu_dtnasc, fu_cargo, fu_cref) FROM stdin;
1	Felipe Evangelista	felipe@fitware.com	$2b$10$CSeDQRkzagkk9HrHj9L9beh962l2Zv7Z6osmLcTwXRbYZYGsamAqm	11122233344	11988887777	1985-03-14	Professor	CREF123456-SP
3	Thiago William	thiago@fitware.com	$2b$10$FayQtTKNseroOqrxTTdjv.qv0khRTEfp1gDEAtbg/0tkFVPmpwPHq	33344455566	11977776666	1988-11-09	Professor	CREF456789-SP
4	Pedro Nogueira	pedro@fitware.com	$2b$10$OTtMQu8sj9jI6P0i3ck2ju9/MnqGZUwco7MeygZikm9/5pLX82sr2	44455566677	11955554444	1992-09-18	Professor	CREF321654-SP
5	Bruno Almeida	bruno@fitware.com	$2b$10$EvRjPP0oWvt0qSHeSt9xd.6KwsK8I1sJRGX6kNbm.rBzTLqF8iVMW	55566677788	11933332222	1986-02-10	Professor	CREF654987-SP
7	Marcus Vinicius	marcus@fitware.com	$2b$10$CuDRFDSfuN7XRhC0hp.7YeOyUnRjfxXFmzZyATbmzCtJULjF5gKi6	77788899900	11911110000	1993-12-04	Secretario	\N
8	Samyra Herculano	samyra@fitware.com	$2b$10$IVEBdU7qwueV3mLgJMHRxeGlr5epHt.GyPxyVmaNXIHE9de5NZEwG	88899900011	11955553333	1998-05-19	Secretario	\N
9	Ermyone Vieira	ermyone@fitware.com	$2b$10$/6IVJ4NTCBAn.bStkkaGdO1bYhBOs3Z3H99Z6GSpqYdqRW/pGG2w6	99900011122	11977774444	1991-10-07	Secretario	\N
10	Ana Leonel	ana@fitware.com	$2b$10$1fuxqKYzcc0B35xl6nYWkeUQjUx8ClArg7DJCUojqKcLF10gJQyBG	00011122233	11966665555	1997-01-30	Secretario	\N
12	Anthony	anthony@email.com	$2b$10$ZoJMD9bvRfzN2WPUf1cb8ulNWSbedw1ZhVIJ941E60T0xMrA/8Oji	88877718191	11943321019	2008-03-12	Professor	1213
6	Anthony Dias	anthony@fitwar.com	$2b$10$3pP1qM81cg/94RBhCha6GuoOuOEaDacznqBfrRnTWx0KHcwMcSiNW	66677788899	11922221111	1995-08-25	Secretario	\N
2	Filipe Mello	filipe@fitware.com	$2b$10$CSeDQRkzagkk9HrHj9L9beh962l2Zv7Z6osmLcTwXRbYZYGsamAqm	22233344455	11999998888	1990-06-22	Professor	CREF987654-SP
\.


--
-- Data for Name: horarios; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.horarios (hor_id, hor_start, hor_end, hor_dia) FROM stdin;
1	06:00:00	07:00:00	Segunda
2	07:00:00	08:00:00	Terça
3	08:00:00	09:00:00	Quarta
4	09:00:00	10:00:00	Quinta
5	10:00:00	11:00:00	Sexta
6	18:00:00	19:00:00	Segunda
7	19:00:00	20:00:00	Terça
8	20:00:00	21:00:00	Quarta
9	21:00:00	22:00:00	Quinta
10	17:00:00	18:00:00	Sexta
\.


--
-- Data for Name: mensagens; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.mensagens (me_id, co_id, remetente_id, destinatario_id, me_conteudo, me_tempo, me_lida, remetente_tipo, destinatario_tipo) FROM stdin;
1	1	1	1	Olá professor Paulo, gostaria de tirar uma dúvida sobre o treino.	2025-11-06 20:18:33.860968	f	aluno	professor
2	1	1	1	Olá João, claro! Qual sua dúvida?	2025-11-06 20:18:33.860968	f	professor	aluno
3	2	1	2	Oi professora Juliana, o exercício de perna está certo?	2025-11-06 20:18:33.860968	f	aluno	professor
4	2	2	1	Oi João! Sim, o agachamento está correto. Continue assim!	2025-11-06 20:18:33.860968	f	professor	aluno
5	3	1	3	Olá Ricardo, posso trocar o treino de hoje?	2025-11-06 20:18:33.860968	f	aluno	professor
6	3	3	1	Pode sim, João. Apenas mantenha o aquecimento.	2025-11-06 20:18:33.860968	f	professor	aluno
7	4	1	4	Oi Fernanda, fiz o treino errado ontem.	2025-11-06 20:18:33.860968	f	aluno	professor
8	4	4	1	Tudo bem João, amanhã compensamos com outro exercício.	2025-11-06 20:18:33.860968	f	professor	aluno
9	5	1	5	Professor Bruno, o alongamento é antes ou depois?	2025-11-06 20:18:33.860968	f	aluno	professor
10	5	5	1	Oi João! Sempre antes e depois, para evitar lesões.	2025-11-06 20:18:33.860968	f	professor	aluno
11	6	2	1	Oi Paulo, finalizei meu treino hoje.	2025-11-06 20:18:33.860968	f	aluno	professor
12	6	1	2	Excelente Maria! Continue mantendo o ritmo.	2025-11-06 20:18:33.860968	f	professor	aluno
13	7	2	2	Professora Juliana, posso aumentar o peso no agachamento?	2025-11-06 20:18:33.860968	f	aluno	professor
14	7	2	2	Pode sim Maria, mas aumente com cuidado.	2025-11-06 20:18:33.860968	f	professor	aluno
15	8	2	3	Olá Ricardo, o treino de costas foi ótimo!	2025-11-06 20:18:33.860968	f	aluno	professor
16	8	3	2	Fico feliz, Maria! Continue com essa energia.	2025-11-06 20:18:33.860968	f	professor	aluno
17	9	2	4	Oi Fernanda, estou com dor no braço.	2025-11-06 20:18:33.860968	f	aluno	professor
18	9	4	2	Maria, evite sobrecarga hoje. Vamos ajustar o treino.	2025-11-06 20:18:33.860968	f	professor	aluno
19	10	2	5	Professor Bruno, adorei o novo circuito!	2025-11-06 20:18:33.860968	f	aluno	professor
20	10	5	2	Que bom, Maria! Esse circuito é ótimo para resistência.	2025-11-06 20:18:33.860968	f	professor	aluno
21	11	3	1	Paulo, terminei meu treino mais cedo.	2025-11-06 20:18:33.860968	f	aluno	professor
22	11	1	3	àtimo, Lucas! Aproveite para alongar bem.	2025-11-06 20:18:33.860968	f	professor	aluno
23	12	3	2	Juliana, posso adicionar corrida ao treino?	2025-11-06 20:18:33.860968	f	aluno	professor
24	12	2	3	Sim, Lucas. Corrida leve ajuda bastante no condicionamento.	2025-11-06 20:18:33.860968	f	professor	aluno
25	13	3	3	Ricardo, quanto tempo deve durar o treino?	2025-11-06 20:18:33.860968	f	aluno	professor
26	13	3	3	Cerca de 45 minutos, Lucas.	2025-11-06 20:18:33.860968	f	professor	aluno
27	14	3	4	Fernanda, fiquei com dúvida sobre a respiração.	2025-11-06 20:18:33.860968	f	aluno	professor
28	14	4	3	Lucas, respire sempre pelo nariz e solte pela boca.	2025-11-06 20:18:33.860968	f	professor	aluno
29	15	3	5	Bruno, gostei da aula de hoje.	2025-11-06 20:18:33.860968	f	aluno	professor
30	15	5	3	Que bom, Lucas! Vamos evoluir juntos.	2025-11-06 20:18:33.860968	f	professor	aluno
31	16	4	1	Oi Paulo, como sei se estou evoluindo bem?	2025-11-06 20:18:33.860968	f	aluno	professor
32	16	1	4	Ana, acompanhe suas cargas e tempos de descanso.	2025-11-06 20:18:33.860968	f	professor	aluno
33	17	4	2	Juliana, minha alimentação está afetando meu desempenho?	2025-11-06 20:18:33.860968	f	aluno	professor
34	17	2	4	Sim, Ana. Tente incluir mais proteínas nas refeições.	2025-11-06 20:18:33.860968	f	professor	aluno
35	18	4	3	Ricardo, qual o melhor horário pra treinar?	2025-11-06 20:18:33.860968	f	aluno	professor
36	18	3	4	Depende da sua rotina, Ana. O importante é manter constância.	2025-11-06 20:18:33.860968	f	professor	aluno
37	19	4	4	Fernanda, posso trocar a esteira pela bike?	2025-11-06 20:18:33.860968	f	aluno	professor
38	19	4	4	Claro, Ana! A bike também trabalha bem as pernas.	2025-11-06 20:18:33.860968	f	professor	aluno
39	20	4	5	Bruno, aumentei o peso e senti dor.	2025-11-06 20:18:33.860968	f	aluno	professor
40	20	5	4	Ana, reduza um pouco e ajuste sua postura.	2025-11-06 20:18:33.860968	f	professor	aluno
41	21	5	1	Oi Paulo, posso treinar duas vezes por dia?	2025-11-06 20:18:33.860968	f	aluno	professor
42	21	1	5	Carlos, só se houver bom descanso entre as sessões.	2025-11-06 20:18:33.860968	f	professor	aluno
43	22	5	2	Juliana, qual melhor treino pra força?	2025-11-06 20:18:33.860968	f	aluno	professor
44	22	2	5	Carlos, o treino de resistência muscular é ótimo pra isso.	2025-11-06 20:18:33.860968	f	professor	aluno
45	23	5	3	Ricardo, esqueci minha ficha de treino.	2025-11-06 20:18:33.860968	f	aluno	professor
46	23	3	5	Sem problema, Carlos. Te envio uma nova versão.	2025-11-06 20:18:33.860968	f	professor	aluno
47	24	5	4	Fernanda, posso fazer treino leve no domingo?	2025-11-06 20:18:33.860968	f	aluno	professor
48	24	4	5	Pode sim, Carlos. Domingo é ótimo pra treino regenerativo.	2025-11-06 20:18:33.860968	f	professor	aluno
49	25	5	5	Bruno, quando é o próximo desafio da academia?	2025-11-06 20:18:33.860968	f	aluno	professor
50	25	5	5	Na próxima semana, Carlos! Prepare-se!	2025-11-06 20:18:33.860968	f	professor	aluno
\.


--
-- Data for Name: modalidades; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.modalidades (mo_id, mo_nome, mo_descricao) FROM stdin;
1	Musculação	Treinos com foco em força, resistência e hipertrofia.
2	Pilates	Atividade voltada para flexibilidade, respiração e postura.
3	Funcional	Exercícios de alta intensidade com movimentos corporais.
4	Alongamento	Sessões leves voltadas para mobilidade e flexibilidade.
5	Cross Training	Treinos intensos que misturam força e cardio.
6	HIIT	Treinos intervalados de alta intensidade.
7	Yoga	Prática voltada ao equilíbrio, concentração e bem-estar.
8	Spinning	Aulas de ciclismo indoor com alta queima calórica.
9	Zumba	Dança aeróbica com ritmos latinos para condicionamento físico.
10	Abdominal Express	Aulas rápidas com foco na região abdominal.
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
1	Whey Protein 900g	180	Suplemento proteico sabor baunilha.	Disponível	25
2	Creatina Monohidratada 300g	120	Aumenta força e desempenho nos treinos.	Disponível	30
3	Pré-Treino Explosive 250g	150	Fórmula energética para treino intenso.	Disponível	15
4	Camiseta Dry Fit Academia	70	Camiseta leve e respirável, ideal para treinos.	Disponível	40
5	Garrafa Esportiva 1L	40	Plástico resistente com tampa antivazamento.	Disponível	60
6	Toalha de Microfibra Fitness	35	Secagem rápida e compacta.	Disponível	50
7	Luvas de Treino em Couro	90	Protege as mãos durante levantamento de peso.	Disponível	20
9	Cinto de Musculação	130	Suporte lombar para levantamento de peso.	Disponível	10
10	Tapioca Proteica 500g	55	Mistura pronta com whey e fibras.	Disponível	25
8	Barra de Cereal Proteica	10	Snack com alto teor de proteína.	disponivel	11
\.


--
-- Data for Name: treinos; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.treinos (tr_id, tr_prof_id, tr_nome, tr_descricao, tr_dificuldade) FROM stdin;
4	3	Treino Funcional Total	Movimentos compostos com alta intensidade.	Avançado
5	3	Treino Funcional Leve	Funcional de baixo impacto para iniciantes.	Iniciante
6	4	Treino de Alongamento Relax	Série de alongamentos guiados e leves.	Iniciante
7	5	Treino HIIT Express	Alta intensidade com pausas curtas.	Força
8	5	Treino Resistência 360	Combina resistência e agilidade em circuito.	Força
21	6	felipe	boa sorte com ele\n	Intermediário
\.


--
-- Data for Name: treinos_exercicios; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.treinos_exercicios (tr_id, ex_id, te_repeticoes, te_series, te_descanso) FROM stdin;
21	24	10	3	60
21	25	12	3	61112
21	26	10	3	60
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
7	1	20	4	60
7	5	15	3	60
7	6	20	4	60
7	10	30	3	60
8	2	12	3	60
8	3	12	4	60
8	4	40	2	60
8	7	10	3	60
\.


--
-- Data for Name: turmas; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.turmas (tu_id, tu_nome, tu_prof_id, tu_mod_id, tu_hor_id) FROM stdin;
1	Musculação Iniciante - Manhã	1	1	1
2	Musculação Intermediária - Noite	1	1	2
3	Pilates Avançado	2	2	3
4	Funcional Intensivo	3	3	4
5	Treino de Alongamento	4	1	5
6	HIIT - Alta Intensidade	5	3	6
7	Pilates para Iniciantes	2	2	7
8	Funcional Leve	3	3	8
\.


--
-- Name: alunos_al_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.alunos_al_id_seq', 6, true);


--
-- Name: avisos_av_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.avisos_av_id_seq', 9, true);


--
-- Name: conversas_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.conversas_id_seq', 26, true);


--
-- Name: desafios_de_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.desafios_de_id_seq', 9, false);


--
-- Name: desafios_imagem_di_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.desafios_imagem_di_id_seq', 2, true);


--
-- Name: exercicios_ex_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.exercicios_ex_id_seq', 26, true);


--
-- Name: funcionarios_fu_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.funcionarios_fu_id_seq', 12, true);


--
-- Name: horarios_hor_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.horarios_hor_id_seq', 11, true);


--
-- Name: mensagens_me_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.mensagens_me_id_seq', 51, true);


--
-- Name: modalidades_mo_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.modalidades_mo_id_seq', 11, true);


--
-- Name: pagamentos_pa_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.pagamentos_pa_id_seq', 11, true);


--
-- Name: produtos_pd_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.produtos_pd_id_seq', 11, true);


--
-- Name: treinos_tr_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.treinos_tr_id_seq', 21, true);


--
-- Name: turmas_tu_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.turmas_tu_id_seq', 9, true);


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
-- Name: desafios_imagem desafios_imagem_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.desafios_imagem
    ADD CONSTRAINT desafios_imagem_pkey PRIMARY KEY (di_id);


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
-- Name: desafios_imagem fk_di_aluno; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.desafios_imagem
    ADD CONSTRAINT fk_di_aluno FOREIGN KEY (di_aluno_id) REFERENCES public.alunos(al_id) ON DELETE CASCADE;


--
-- Name: desafios_imagem fk_di_desafio; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.desafios_imagem
    ADD CONSTRAINT fk_di_desafio FOREIGN KEY (di_desafio_id) REFERENCES public.desafios(de_id) ON DELETE CASCADE;


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

\unrestrict aAsBx0zPmC05PP5LzmA5RdO85fN4gGxju4sBuPSpSy3zp6w83bxVC93IvqC4oyS

