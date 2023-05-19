import type { NextPage } from 'next';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { LinearPoolsList } from '../modules/linear-pools/LinearPoolsList';

const LinearPools: NextPage = () => {
    return (
        <div className={styles.container}>
            <Head>
                <title>Balancer Toolkit - Linear Pools</title>
                <meta content="" name="description" />
                <link href="/favicon.ico" rel="icon" />
            </Head>

            <LinearPoolsList />
        </div>
    );
};

export default LinearPools;
