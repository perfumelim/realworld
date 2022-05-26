import type { NextPage, GetServerSideProps } from "next";
import Link from "next/link";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";

type ArticleT = {
  slug: string;
  title: string;
  description: string;
};

interface CardItemProps {
  article: ArticleT;
}

const CardItem = ({ article }: CardItemProps) => {
  return (
    <li>
      <Link href={"./articles/" + article.slug}>
        <a>
          <h3>{article.title}</h3>
          <p>{article.description}</p>
        </a>
      </Link>
    </li>
  );
};

interface HomeProps {
  data: {
    articles: ArticleT[];
    articlesCount: number;
  };
}

const Home: NextPage<HomeProps> = ({ data }) => {
  const { articles, articlesCount } = data;

  return (
    <div className={styles.container}>
      <Head>
        <title>리얼월드 넥스트</title>
        <meta name="description" content="리얼월드의 넥스트 앱" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <nav>
        <Link href="/auth/signup">
          <a>Sign Up</a>
        </Link>
      </nav>

      <main className={styles.main}>
        <h1>conduit A place to share your knowledge.</h1>
        <ul>
          {articles.map((article) => (
            <CardItem key={article.slug} article={article} />
          ))}
        </ul>
      </main>
    </div>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps<HomeProps> = async (
  context
) => {
  // https://api.realworld.io/api/articles?limit=10&offset=0

  const res = await fetch(
    `https://api.realworld.io/api/articles?limit=10&offset=0`
  );
  const data = await res.json();
  return {
    props: { data }, // will be passed to the page component as props
  };
};
