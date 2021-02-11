import Head from 'next/head';
import { useAuth } from '../lib/auth';
import styles from '../styles/Home.module.css';
import React from 'react';

interface indexProps {}

const index: React.FC<indexProps> = ({}) => {
   const auth = useAuth();
   console.log(auth);
   return (
      <div className={styles.container}>
         <Head>
            <title>Create Next App</title>
            <link rel="icon" href="/favicon.ico" />
         </Head>

         <main className={styles.main}>
            <h1 className={styles.title}>Fast Feedback</h1>

            <p className={styles.description}>
               Get started by editing{' '}
               <code className={styles.code}>pages/index.js</code>
            </p>
            <button onClick={(e) => (auth as any).signinWithGithub()}>
               Sign In
            </button>
            <div>{(auth as any)?.user?.email}</div>
            {(auth as any)?.user && (
               <button onClick={(e) => (auth as any).signout()}>
                  Sign Out
               </button>
            )}
         </main>

         <footer className={styles.footer}>
            <a
               href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
               target="_blank"
               rel="noopener noreferrer"
            >
               Powered by{' '}
               <img
                  src="/vercel.svg"
                  alt="Vercel Logo"
                  className={styles.logo}
               />
            </a>
         </footer>
      </div>
   );
};

export default index;
