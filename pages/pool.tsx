import type { NextPage } from 'next';
import Head from 'next/head';
import styles from '../styles/Home.module.css';

const Pool: NextPage = () => {
    return (
        <div className={styles.container}>
            <Head>
                <title>Balancer Toolkit - Pool</title>
                <meta content="" name="description" />
                <link href="/favicon.ico" rel="icon" />
            </Head>
        </div>
    );
};

export default Pool;
