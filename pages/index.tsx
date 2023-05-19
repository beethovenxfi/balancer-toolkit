import type { NextPage } from 'next';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Link from 'next/link';

const Home: NextPage = () => {
    return (
        <div className={styles.container}>
            <Head>
                <title>Balancer Toolkit</title>
                <meta content="" name="description" />
                <link href="/favicon.ico" rel="icon" />
            </Head>

            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '24px' }}>
                <main>
                    <h1 className={styles.title}>Welcome to Balancer Toolkit</h1>

                    <div className={styles.grid}>
                        <Link href="/sor">
                            <div className={styles.card}>
                                <h2>Smart Order Router (SOR) &rarr;</h2>
                                <p>Find the best swap route for tokenIn/tokenOut.</p>
                            </div>
                        </Link>

                        <a className={styles.card} href="https://wagmi.sh">
                            <h2>Batchswap Builder &rarr;</h2>
                            <p>A UI for building arbitrarily complex batch swaps.</p>
                        </a>

                        <a className={styles.card} href="https://github.com/rainbow-me/rainbowkit/tree/main/examples">
                            <h2>Pool Actions &rarr;</h2>
                            <p>Swap/join/exit for both query and tx submission</p>
                        </a>

                        <Link href="/linear-pools">
                            <a className={styles.card}>
                                <h2>Linear Pool Tools &rarr;</h2>
                                <p>Tools to help keep linear pools within target ranges.</p>
                            </a>
                        </Link>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Home;
