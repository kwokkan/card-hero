--
-- PostgreSQL database dump
--

-- Dumped from database version 12.1
-- Dumped by pg_dump version 12.1

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

SET default_table_access_method = heap;

--
-- Name: Card; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."Card" (
    "Card_PK" integer NOT NULL,
    "Rowstamp" integer NOT NULL,
    "Name" character varying(100) NOT NULL,
    "Description" character varying(1000),
    "UpAttack" integer DEFAULT 1 NOT NULL,
    "RightAttack" integer DEFAULT 1 NOT NULL,
    "DownAttack" integer DEFAULT 1 NOT NULL,
    "LeftAttack" integer DEFAULT 1 NOT NULL,
    "Health" integer DEFAULT 1 NOT NULL,
    "Attack" integer DEFAULT 1 NOT NULL,
    "Defence" integer DEFAULT 1 NOT NULL,
    "Rarity_FK" integer DEFAULT 1 NOT NULL,
    "TotalStats" integer GENERATED ALWAYS AS ((((((("UpAttack" + "RightAttack") + "DownAttack") + "LeftAttack") + "Health") + "Attack") + "Defence")) STORED NOT NULL,
    "CardPack_FK" integer DEFAULT 1 NOT NULL,
    "CardPackId" integer NOT NULL
);


--
-- Name: CardCollection; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."CardCollection" (
    "CardCollection_PK" integer NOT NULL,
    "Rowstamp" integer NOT NULL,
    "Card_FK" integer NOT NULL,
    "User_FK" integer NOT NULL,
    "CreatedTime" timestamp with time zone DEFAULT now() NOT NULL
);


--
-- Name: CardCollection_CardCollection_PK_seq; Type: SEQUENCE; Schema: public; Owner: -
--

ALTER TABLE public."CardCollection" ALTER COLUMN "CardCollection_PK" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public."CardCollection_CardCollection_PK_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: CardCollection_Rowstamp_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."CardCollection_Rowstamp_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: CardCollection_Rowstamp_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."CardCollection_Rowstamp_seq" OWNED BY public."CardCollection"."Rowstamp";


--
-- Name: CardFavourite; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."CardFavourite" (
    "CardFavourite_PK" integer NOT NULL,
    "Card_FK" integer NOT NULL,
    "User_FK" integer NOT NULL
);


--
-- Name: CardFavourite_CardFavourite_PK_seq; Type: SEQUENCE; Schema: public; Owner: -
--

ALTER TABLE public."CardFavourite" ALTER COLUMN "CardFavourite_PK" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public."CardFavourite_CardFavourite_PK_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: CardPack; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."CardPack" (
    "CardPack_PK" integer NOT NULL,
    "Rowstamp" integer NOT NULL,
    "Name" character varying(100) NOT NULL,
    "Description" character varying(1000)
);


--
-- Name: CardPack_Rowstamp_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."CardPack_Rowstamp_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: CardPack_Rowstamp_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."CardPack_Rowstamp_seq" OWNED BY public."CardPack"."Rowstamp";


--
-- Name: Card_Card_PK_seq; Type: SEQUENCE; Schema: public; Owner: -
--

ALTER TABLE public."Card" ALTER COLUMN "Card_PK" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public."Card_Card_PK_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: Card_Rowstamp_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."Card_Rowstamp_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: Card_Rowstamp_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."Card_Rowstamp_seq" OWNED BY public."Card"."Rowstamp";


--
-- Name: Deck; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."Deck" (
    "Deck_PK" integer NOT NULL,
    "Rowstamp" integer NOT NULL,
    "CreatedTime" timestamp with time zone DEFAULT now() NOT NULL,
    "UpdatedTime" timestamp with time zone,
    "Name" character varying(100) NOT NULL,
    "Description" character varying(1000),
    "MaxCards" integer NOT NULL,
    "User_FK" integer NOT NULL
);


--
-- Name: DeckCardCollection; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."DeckCardCollection" (
    "DeckCardCollection_PK" integer NOT NULL,
    "Rowstamp" integer NOT NULL,
    "Deck_FK" integer NOT NULL,
    "CardCollection_FK" integer NOT NULL
);


--
-- Name: DeckCardCollection_DeckCardCollection_PK_seq; Type: SEQUENCE; Schema: public; Owner: -
--

ALTER TABLE public."DeckCardCollection" ALTER COLUMN "DeckCardCollection_PK" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public."DeckCardCollection_DeckCardCollection_PK_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: DeckCardCollection_Rowstamp_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."DeckCardCollection_Rowstamp_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: DeckCardCollection_Rowstamp_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."DeckCardCollection_Rowstamp_seq" OWNED BY public."DeckCardCollection"."Rowstamp";


--
-- Name: DeckFavourite; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."DeckFavourite" (
    "DeckFavourite_PK" integer NOT NULL,
    "Deck_FK" integer NOT NULL,
    "User_FK" integer NOT NULL
);


--
-- Name: DeckFavourite_DeckFavourite_PK_seq; Type: SEQUENCE; Schema: public; Owner: -
--

ALTER TABLE public."DeckFavourite" ALTER COLUMN "DeckFavourite_PK" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public."DeckFavourite_DeckFavourite_PK_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: Deck_Deck_PK_seq; Type: SEQUENCE; Schema: public; Owner: -
--

ALTER TABLE public."Deck" ALTER COLUMN "Deck_PK" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public."Deck_Deck_PK_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: Deck_Rowstamp_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."Deck_Rowstamp_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: Deck_Rowstamp_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."Deck_Rowstamp_seq" OWNED BY public."Deck"."Rowstamp";


--
-- Name: Game; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."Game" (
    "Game_PK" integer NOT NULL,
    "Rowstamp" integer NOT NULL,
    "StartTime" timestamp with time zone DEFAULT now() NOT NULL,
    "EndTime" timestamp with time zone,
    "CurrentUser_FK" integer,
    "WinnerUser_FK" integer,
    "Rows" integer DEFAULT 3 NOT NULL,
    "Columns" integer DEFAULT 3 NOT NULL,
    "GameType_FK" integer DEFAULT 1 NOT NULL,
    "MaxPlayers" integer DEFAULT 2 NOT NULL
);


--
-- Name: GameDeck; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."GameDeck" (
    "GameDeck_PK" integer NOT NULL,
    "Rowstamp" integer NOT NULL,
    "Name" character varying(100),
    "Description" character varying(1000),
    "CreatedTime" timestamp with time zone DEFAULT now() NOT NULL,
    "GameUser_FK" integer NOT NULL
);


--
-- Name: GameDeckCardCollection; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."GameDeckCardCollection" (
    "GameDeckCardCollection_PK" integer NOT NULL,
    "Rowstamp" integer NOT NULL,
    "GameDeck_FK" integer NOT NULL,
    "Card_FK" integer NOT NULL
);


--
-- Name: GameDeckCardCollection_GameDeckCardCollection_PK_seq; Type: SEQUENCE; Schema: public; Owner: -
--

ALTER TABLE public."GameDeckCardCollection" ALTER COLUMN "GameDeckCardCollection_PK" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public."GameDeckCardCollection_GameDeckCardCollection_PK_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: GameDeckCardCollection_Rowstamp_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."GameDeckCardCollection_Rowstamp_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: GameDeckCardCollection_Rowstamp_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."GameDeckCardCollection_Rowstamp_seq" OWNED BY public."GameDeckCardCollection"."Rowstamp";


--
-- Name: GameDeck_GameDeck_PK_seq; Type: SEQUENCE; Schema: public; Owner: -
--

ALTER TABLE public."GameDeck" ALTER COLUMN "GameDeck_PK" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public."GameDeck_GameDeck_PK_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: GameDeck_Rowstamp_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."GameDeck_Rowstamp_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: GameDeck_Rowstamp_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."GameDeck_Rowstamp_seq" OWNED BY public."GameDeck"."Rowstamp";


--
-- Name: GameUser; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."GameUser" (
    "GameUser_PK" integer NOT NULL,
    "Rowstamp" integer NOT NULL,
    "Game_FK" integer NOT NULL,
    "User_FK" integer NOT NULL,
    "JoinedTime" timestamp with time zone DEFAULT now() NOT NULL,
    "Order" integer
);


--
-- Name: GameUser_GameUser_PK_seq; Type: SEQUENCE; Schema: public; Owner: -
--

ALTER TABLE public."GameUser" ALTER COLUMN "GameUser_PK" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public."GameUser_GameUser_PK_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: GameUser_Rowstamp_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."GameUser_Rowstamp_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: GameUser_Rowstamp_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."GameUser_Rowstamp_seq" OWNED BY public."GameUser"."Rowstamp";


--
-- Name: Game_Game_PK_seq; Type: SEQUENCE; Schema: public; Owner: -
--

ALTER TABLE public."Game" ALTER COLUMN "Game_PK" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public."Game_Game_PK_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: Game_Rowstamp_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."Game_Rowstamp_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: Game_Rowstamp_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."Game_Rowstamp_seq" OWNED BY public."Game"."Rowstamp";


--
-- Name: Move; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."Move" (
    "Move_PK" integer NOT NULL,
    "Rowstamp" integer NOT NULL,
    "CreatedTime" timestamp with time zone DEFAULT now() NOT NULL,
    "Turn_FK" integer NOT NULL,
    "GameDeckCardCollection_FK" integer NOT NULL,
    "Row" integer NOT NULL,
    "Column" integer NOT NULL
);


--
-- Name: Move_Move_PK_seq; Type: SEQUENCE; Schema: public; Owner: -
--

ALTER TABLE public."Move" ALTER COLUMN "Move_PK" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public."Move_Move_PK_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: Move_Rowstamp_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."Move_Rowstamp_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: Move_Rowstamp_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."Move_Rowstamp_seq" OWNED BY public."Move"."Rowstamp";


--
-- Name: Rarity; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."Rarity" (
    "Rarity_PK" integer NOT NULL,
    "Rowstamp" integer NOT NULL,
    "Name" character varying(100) NOT NULL,
    "Frequency" integer NOT NULL
);


--
-- Name: Rarity_Rarity_PK_seq; Type: SEQUENCE; Schema: public; Owner: -
--

ALTER TABLE public."Rarity" ALTER COLUMN "Rarity_PK" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public."Rarity_Rarity_PK_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: Rarity_Rowstamp_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."Rarity_Rowstamp_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: Rarity_Rowstamp_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."Rarity_Rowstamp_seq" OWNED BY public."Rarity"."Rowstamp";


--
-- Name: StoreItem; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."StoreItem" (
    "StoreItem_PK" integer NOT NULL,
    "Rowstamp" integer NOT NULL,
    "Name" character varying(100) NOT NULL,
    "Description" character varying(1000),
    "Cost" integer NOT NULL,
    "ItemCount" integer DEFAULT 1 NOT NULL,
    "Expiry" timestamp without time zone,
    "CardPack_FK" integer
);


--
-- Name: StoreItem_Rowstamp_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."StoreItem_Rowstamp_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: StoreItem_Rowstamp_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."StoreItem_Rowstamp_seq" OWNED BY public."StoreItem"."Rowstamp";


--
-- Name: StoreItem_StoreItem_PK_seq; Type: SEQUENCE; Schema: public; Owner: -
--

ALTER TABLE public."StoreItem" ALTER COLUMN "StoreItem_PK" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public."StoreItem_StoreItem_PK_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: Turn; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."Turn" (
    "Turn_PK" integer NOT NULL,
    "Rowstamp" integer NOT NULL,
    "StartTime" timestamp with time zone DEFAULT now() NOT NULL,
    "EndTime" timestamp with time zone,
    "CurrentGameUser_FK" integer NOT NULL,
    "Game_FK" integer NOT NULL
);


--
-- Name: Turn_Rowstamp_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."Turn_Rowstamp_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: Turn_Rowstamp_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."Turn_Rowstamp_seq" OWNED BY public."Turn"."Rowstamp";


--
-- Name: Turn_Turn_PK_seq; Type: SEQUENCE; Schema: public; Owner: -
--

ALTER TABLE public."Turn" ALTER COLUMN "Turn_PK" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public."Turn_Turn_PK_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: User; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."User" (
    "User_PK" integer NOT NULL,
    "Identifier" character varying(50) NOT NULL,
    "CreatedDate" timestamp with time zone DEFAULT now() NOT NULL,
    "FullName" character varying(200),
    "IdPSource" character varying(50) NOT NULL,
    "Coins" bigint NOT NULL
);


--
-- Name: User_User_PK_seq; Type: SEQUENCE; Schema: public; Owner: -
--

ALTER TABLE public."User" ALTER COLUMN "User_PK" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public."User_User_PK_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: Card Rowstamp; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Card" ALTER COLUMN "Rowstamp" SET DEFAULT nextval('public."Card_Rowstamp_seq"'::regclass);


--
-- Name: CardCollection Rowstamp; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."CardCollection" ALTER COLUMN "Rowstamp" SET DEFAULT nextval('public."CardCollection_Rowstamp_seq"'::regclass);


--
-- Name: CardPack Rowstamp; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."CardPack" ALTER COLUMN "Rowstamp" SET DEFAULT nextval('public."CardPack_Rowstamp_seq"'::regclass);


--
-- Name: Deck Rowstamp; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Deck" ALTER COLUMN "Rowstamp" SET DEFAULT nextval('public."Deck_Rowstamp_seq"'::regclass);


--
-- Name: DeckCardCollection Rowstamp; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."DeckCardCollection" ALTER COLUMN "Rowstamp" SET DEFAULT nextval('public."DeckCardCollection_Rowstamp_seq"'::regclass);


--
-- Name: Game Rowstamp; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Game" ALTER COLUMN "Rowstamp" SET DEFAULT nextval('public."Game_Rowstamp_seq"'::regclass);


--
-- Name: GameDeck Rowstamp; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."GameDeck" ALTER COLUMN "Rowstamp" SET DEFAULT nextval('public."GameDeck_Rowstamp_seq"'::regclass);


--
-- Name: GameDeckCardCollection Rowstamp; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."GameDeckCardCollection" ALTER COLUMN "Rowstamp" SET DEFAULT nextval('public."GameDeckCardCollection_Rowstamp_seq"'::regclass);


--
-- Name: GameUser Rowstamp; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."GameUser" ALTER COLUMN "Rowstamp" SET DEFAULT nextval('public."GameUser_Rowstamp_seq"'::regclass);


--
-- Name: Move Rowstamp; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Move" ALTER COLUMN "Rowstamp" SET DEFAULT nextval('public."Move_Rowstamp_seq"'::regclass);


--
-- Name: Rarity Rowstamp; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Rarity" ALTER COLUMN "Rowstamp" SET DEFAULT nextval('public."Rarity_Rowstamp_seq"'::regclass);


--
-- Name: StoreItem Rowstamp; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."StoreItem" ALTER COLUMN "Rowstamp" SET DEFAULT nextval('public."StoreItem_Rowstamp_seq"'::regclass);


--
-- Name: Turn Rowstamp; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Turn" ALTER COLUMN "Rowstamp" SET DEFAULT nextval('public."Turn_Rowstamp_seq"'::regclass);


--
-- Name: Card PK_Card; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Card"
    ADD CONSTRAINT "PK_Card" PRIMARY KEY ("Card_PK");


--
-- Name: CardCollection PK_CardCollection; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."CardCollection"
    ADD CONSTRAINT "PK_CardCollection" PRIMARY KEY ("CardCollection_PK");


--
-- Name: CardFavourite PK_CardFavourite; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."CardFavourite"
    ADD CONSTRAINT "PK_CardFavourite" PRIMARY KEY ("CardFavourite_PK");


--
-- Name: CardPack PK_CardPack; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."CardPack"
    ADD CONSTRAINT "PK_CardPack" PRIMARY KEY ("CardPack_PK");


--
-- Name: Deck PK_Deck; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Deck"
    ADD CONSTRAINT "PK_Deck" PRIMARY KEY ("Deck_PK");


--
-- Name: DeckCardCollection PK_DeckCardCollection; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."DeckCardCollection"
    ADD CONSTRAINT "PK_DeckCardCollection" PRIMARY KEY ("DeckCardCollection_PK");


--
-- Name: DeckFavourite PK_DeckFavourite; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."DeckFavourite"
    ADD CONSTRAINT "PK_DeckFavourite" PRIMARY KEY ("DeckFavourite_PK");


--
-- Name: Game PK_Game; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Game"
    ADD CONSTRAINT "PK_Game" PRIMARY KEY ("Game_PK");


--
-- Name: GameDeck PK_GameDeck; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."GameDeck"
    ADD CONSTRAINT "PK_GameDeck" PRIMARY KEY ("GameDeck_PK");


--
-- Name: GameDeckCardCollection PK_GameDeckCardCollection; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."GameDeckCardCollection"
    ADD CONSTRAINT "PK_GameDeckCardCollection" PRIMARY KEY ("GameDeckCardCollection_PK");


--
-- Name: GameUser PK_GameUser; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."GameUser"
    ADD CONSTRAINT "PK_GameUser" PRIMARY KEY ("GameUser_PK");


--
-- Name: Move PK_Move; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Move"
    ADD CONSTRAINT "PK_Move" PRIMARY KEY ("Move_PK");


--
-- Name: Rarity PK_Rarity; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Rarity"
    ADD CONSTRAINT "PK_Rarity" PRIMARY KEY ("Rarity_PK");


--
-- Name: StoreItem PK_StoreItem; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."StoreItem"
    ADD CONSTRAINT "PK_StoreItem" PRIMARY KEY ("StoreItem_PK");


--
-- Name: Turn PK_Turn; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Turn"
    ADD CONSTRAINT "PK_Turn" PRIMARY KEY ("Turn_PK");


--
-- Name: User PK_User; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "PK_User" PRIMARY KEY ("User_PK");


--
-- Name: Card UX_Card_CardPack_FK_CardPackId; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Card"
    ADD CONSTRAINT "UX_Card_CardPack_FK_CardPackId" UNIQUE ("CardPack_FK", "CardPackId");


--
-- Name: IX_CardCollection_Card_FK; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "IX_CardCollection_Card_FK" ON public."CardCollection" USING btree ("Card_FK");


--
-- Name: IX_CardCollection_User_FK; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "IX_CardCollection_User_FK" ON public."CardCollection" USING btree ("User_FK");


--
-- Name: IX_CardFavourite_User_FK; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "IX_CardFavourite_User_FK" ON public."CardFavourite" USING btree ("User_FK");


--
-- Name: IX_Card_CardPack_FK; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "IX_Card_CardPack_FK" ON public."Card" USING btree ("CardPack_FK");


--
-- Name: IX_Card_Rarity_FK; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "IX_Card_Rarity_FK" ON public."Card" USING btree ("Rarity_FK");


--
-- Name: IX_DeckCardCollection_CardCollection_FK; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "IX_DeckCardCollection_CardCollection_FK" ON public."DeckCardCollection" USING btree ("CardCollection_FK");


--
-- Name: IX_DeckCardCollection_Deck_FK; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "IX_DeckCardCollection_Deck_FK" ON public."DeckCardCollection" USING btree ("Deck_FK");


--
-- Name: IX_DeckFavourite_User_FK; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "IX_DeckFavourite_User_FK" ON public."DeckFavourite" USING btree ("User_FK");


--
-- Name: IX_Deck_User_FK; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "IX_Deck_User_FK" ON public."Deck" USING btree ("User_FK");


--
-- Name: IX_GameDeckCardCollection_Card_FK; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "IX_GameDeckCardCollection_Card_FK" ON public."GameDeckCardCollection" USING btree ("Card_FK");


--
-- Name: IX_GameDeckCardCollection_GameDeck_FK; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "IX_GameDeckCardCollection_GameDeck_FK" ON public."GameDeckCardCollection" USING btree ("GameDeck_FK");


--
-- Name: IX_GameDeck_GameUser_FK; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "IX_GameDeck_GameUser_FK" ON public."GameDeck" USING btree ("GameUser_FK");


--
-- Name: IX_GameUser_Game_FK; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "IX_GameUser_Game_FK" ON public."GameUser" USING btree ("Game_FK");


--
-- Name: IX_GameUser_User_FK; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "IX_GameUser_User_FK" ON public."GameUser" USING btree ("User_FK");


--
-- Name: IX_Game_CurrentUser_FK; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "IX_Game_CurrentUser_FK" ON public."Game" USING btree ("CurrentUser_FK");


--
-- Name: IX_Game_GameType_FK; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "IX_Game_GameType_FK" ON public."Game" USING btree ("GameType_FK");


--
-- Name: IX_Game_WinnerUser_FK; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "IX_Game_WinnerUser_FK" ON public."Game" USING btree ("WinnerUser_FK");


--
-- Name: IX_Move_GameDeckCardCollection_FK; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "IX_Move_GameDeckCardCollection_FK" ON public."Move" USING btree ("GameDeckCardCollection_FK");


--
-- Name: IX_Move_Turn_FK; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "IX_Move_Turn_FK" ON public."Move" USING btree ("Turn_FK");


--
-- Name: IX_StoreItem_CardPack_FK; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "IX_StoreItem_CardPack_FK" ON public."StoreItem" USING btree ("CardPack_FK");


--
-- Name: IX_Turn_CurrentGameUser_FK; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "IX_Turn_CurrentGameUser_FK" ON public."Turn" USING btree ("CurrentGameUser_FK");


--
-- Name: IX_Turn_Game_FK; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "IX_Turn_Game_FK" ON public."Turn" USING btree ("Game_FK");


--
-- Name: UX_CardFavourite_Card_FK_User_FK; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX "UX_CardFavourite_Card_FK_User_FK" ON public."CardFavourite" USING btree ("Card_FK", "User_FK");


--
-- Name: UX_DeckFavourite_Deck_FK_User_FK; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX "UX_DeckFavourite_Deck_FK_User_FK" ON public."DeckFavourite" USING btree ("Deck_FK", "User_FK");


--
-- Name: UX_User_Identifier; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX "UX_User_Identifier" ON public."User" USING btree ("Identifier", "IdPSource");


--
-- Name: CardCollection FK_CardCollection_Card_FK; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."CardCollection"
    ADD CONSTRAINT "FK_CardCollection_Card_FK" FOREIGN KEY ("Card_FK") REFERENCES public."Card"("Card_PK") ON DELETE RESTRICT;


--
-- Name: CardCollection FK_CardCollection_User_FK; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."CardCollection"
    ADD CONSTRAINT "FK_CardCollection_User_FK" FOREIGN KEY ("User_FK") REFERENCES public."User"("User_PK") ON DELETE RESTRICT;


--
-- Name: CardFavourite FK_CardFavourite_Card_FK; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."CardFavourite"
    ADD CONSTRAINT "FK_CardFavourite_Card_FK" FOREIGN KEY ("Card_FK") REFERENCES public."Card"("Card_PK") ON DELETE RESTRICT;


--
-- Name: CardFavourite FK_CardFavourite_User_FK; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."CardFavourite"
    ADD CONSTRAINT "FK_CardFavourite_User_FK" FOREIGN KEY ("User_FK") REFERENCES public."User"("User_PK") ON DELETE RESTRICT;


--
-- Name: Card FK_Card_Rarity_FK; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Card"
    ADD CONSTRAINT "FK_Card_Rarity_FK" FOREIGN KEY ("Rarity_FK") REFERENCES public."Rarity"("Rarity_PK") ON DELETE RESTRICT;


--
-- Name: DeckCardCollection FK_DeckCardCollection_CardCollection_FK; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."DeckCardCollection"
    ADD CONSTRAINT "FK_DeckCardCollection_CardCollection_FK" FOREIGN KEY ("CardCollection_FK") REFERENCES public."CardCollection"("CardCollection_PK") ON DELETE RESTRICT;


--
-- Name: DeckCardCollection FK_DeckCardCollection_Deck_FK; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."DeckCardCollection"
    ADD CONSTRAINT "FK_DeckCardCollection_Deck_FK" FOREIGN KEY ("Deck_FK") REFERENCES public."Deck"("Deck_PK") ON DELETE RESTRICT;


--
-- Name: DeckFavourite FK_DeckFavourite_Deck_FK; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."DeckFavourite"
    ADD CONSTRAINT "FK_DeckFavourite_Deck_FK" FOREIGN KEY ("Deck_FK") REFERENCES public."Deck"("Deck_PK") ON DELETE RESTRICT;


--
-- Name: DeckFavourite FK_DeckFavourite_User_FK; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."DeckFavourite"
    ADD CONSTRAINT "FK_DeckFavourite_User_FK" FOREIGN KEY ("User_FK") REFERENCES public."User"("User_PK") ON DELETE RESTRICT;


--
-- Name: Deck FK_Deck_User_FK; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Deck"
    ADD CONSTRAINT "FK_Deck_User_FK" FOREIGN KEY ("User_FK") REFERENCES public."User"("User_PK") ON DELETE RESTRICT;


--
-- Name: GameDeckCardCollection FK_GameDeckCardCollection_Card_FK; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."GameDeckCardCollection"
    ADD CONSTRAINT "FK_GameDeckCardCollection_Card_FK" FOREIGN KEY ("Card_FK") REFERENCES public."Card"("Card_PK") ON DELETE RESTRICT;


--
-- Name: GameDeckCardCollection FK_GameDeckCardCollection_GameDeck_FK; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."GameDeckCardCollection"
    ADD CONSTRAINT "FK_GameDeckCardCollection_GameDeck_FK" FOREIGN KEY ("GameDeck_FK") REFERENCES public."GameDeck"("GameDeck_PK") ON DELETE RESTRICT;


--
-- Name: GameDeck FK_GameDeck_GameUser_FK; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."GameDeck"
    ADD CONSTRAINT "FK_GameDeck_GameUser_FK" FOREIGN KEY ("GameUser_FK") REFERENCES public."GameUser"("GameUser_PK") ON DELETE RESTRICT;


--
-- Name: GameUser FK_GameUser_Game; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."GameUser"
    ADD CONSTRAINT "FK_GameUser_Game" FOREIGN KEY ("Game_FK") REFERENCES public."Game"("Game_PK") ON DELETE RESTRICT;


--
-- Name: GameUser FK_GameUser_User; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."GameUser"
    ADD CONSTRAINT "FK_GameUser_User" FOREIGN KEY ("User_FK") REFERENCES public."User"("User_PK") ON DELETE RESTRICT;


--
-- Name: Game FK_Game_CurrentUser_FK; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Game"
    ADD CONSTRAINT "FK_Game_CurrentUser_FK" FOREIGN KEY ("CurrentUser_FK") REFERENCES public."User"("User_PK") ON DELETE RESTRICT;


--
-- Name: Game FK_Game_WinnerUser_FK; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Game"
    ADD CONSTRAINT "FK_Game_WinnerUser_FK" FOREIGN KEY ("WinnerUser_FK") REFERENCES public."User"("User_PK") ON DELETE RESTRICT;


--
-- Name: Move FK_Move_CardCollection_FK; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Move"
    ADD CONSTRAINT "FK_Move_CardCollection_FK" FOREIGN KEY ("GameDeckCardCollection_FK") REFERENCES public."GameDeckCardCollection"("GameDeckCardCollection_PK") ON DELETE RESTRICT;


--
-- Name: Move FK_Move_Turn_FK; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Move"
    ADD CONSTRAINT "FK_Move_Turn_FK" FOREIGN KEY ("Turn_FK") REFERENCES public."Turn"("Turn_PK") ON DELETE RESTRICT;


--
-- Name: StoreItem FK_StoreItem_CardPack_FK; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."StoreItem"
    ADD CONSTRAINT "FK_StoreItem_CardPack_FK" FOREIGN KEY ("CardPack_FK") REFERENCES public."CardPack"("CardPack_PK") ON DELETE RESTRICT;


--
-- Name: Turn FK_Turn_CurrentGameUser_FK; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Turn"
    ADD CONSTRAINT "FK_Turn_CurrentGameUser_FK" FOREIGN KEY ("CurrentGameUser_FK") REFERENCES public."GameUser"("GameUser_PK") ON DELETE RESTRICT;


--
-- Name: Turn FK_Turn_Game_FK; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Turn"
    ADD CONSTRAINT "FK_Turn_Game_FK" FOREIGN KEY ("Game_FK") REFERENCES public."Game"("Game_PK") ON DELETE RESTRICT;


--
-- PostgreSQL database dump complete
--

