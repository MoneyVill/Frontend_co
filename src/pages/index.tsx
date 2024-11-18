import Head from "next/head";
import Image from "next/image";
import localFont from "next/font/local";
import styles from "@/styles/Home.module.css";
import PhaserGame from "@/components/PhaserGame";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function Home() {
  return (
    <>
      {/* <Head>
        <title>Phaser Game with Next.js</title>
        <meta name="description" content="A Phaser game running inside a Next.js app" />
        <link rel="icon" href="/favicon.ico" />
      </Head> */}
      <main className={styles.main}>
        {/* <div className={styles.description}>
          <h1 className={`${geistSans.variable} ${geistMono.variable}`}>
            Welcome to the Phaser Game!
          </h1>
        </div> */}
        <PhaserGame />  {/* PhaserGame 컴포넌트를 Home 컴포넌트에 추가 */}
      </main>
    </>
  );
}
