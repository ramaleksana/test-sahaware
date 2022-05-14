CREATE TABLE public.article (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    title character varying(100) NOT NULL,
    short_description character varying(255) NOT NULL,
    description text NOT NULL,
    category_id uuid NOT NULL,
    is_visible boolean DEFAULT true,
    image character varying(100) DEFAULT 'default-image.jpg'::character varying,
    created_on timestamp with time zone DEFAULT now() NOT NULL,
    created_by uuid NOT NULL
);

CREATE TABLE public.article_categories (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    title character varying(20) NOT NULL,
    created_on timestamp with time zone DEFAULT now() NOT NULL,
    created_by uuid NOT NULL
);

CREATE TABLE public.users (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    name character varying(50) NOT NULL,
    email character varying(100) NOT NULL,
    password character varying NOT NULL,
    phone character varying(15) NOT NULL,
    created_on timestamp with time zone DEFAULT now() NOT NULL
);