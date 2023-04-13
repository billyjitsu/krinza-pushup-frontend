import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Nav from "../components/Nav";
import Hero from "../components/Intro";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Krinza Push Up Challenge</title>
        <meta name="description" content="Krinza Push Up Challenge" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Nav />
      <Hero />
    </>
  );
};

export default Home;
