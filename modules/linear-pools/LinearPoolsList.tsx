import { RawPoolTokenWithRate } from '@balancer/sdk';
import { Button, Divider, Table, Typography } from 'antd';
import numeral from 'numeral';
import React, { useState } from 'react';
import { LinearPoolModal } from './components/LinearPoolModal';
import { RawLinearPoolExtended } from './linear-pool-types';
import { tokenFormatAmount } from '../../lib/token-helpers';
import { usePoolsData } from '../../lib/hooks/usePoolsData';

const { Title, Paragraph, Text } = Typography;

const LINEAR_POOL_TYPES = [
    'Linear',
    'AaveLinear',
    'YearnLinear',
    'ERC4626Linear',
    'BeefyLinear',
    'GearboxLinear',
    'EulerLinear',
    'MidasLinear',
    'ReaperLinear',
    'SiloLinear',
];

interface Props {}

export function LinearPoolsList({}: Props) {
    const data = usePoolsData({ poolTypeIn: LINEAR_POOL_TYPES });
    const [selectedPool, setSelectedPool] = useState<RawLinearPoolExtended | null>(null);
    const linearPools = data.linearPools as unknown as RawLinearPoolExtended[];
    const isLoading = data.isLoading;

    return (
        <div style={{ marginTop: 24, marginLeft: 18, marginRight: 18, paddingBottom: 200 }}>
            <Typography>
                <Title level={2}>Linear Pools</Title>
                <Paragraph>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean dictum orci eu sem lobortis, vel
                    ultricies ante ornare. Suspendisse consequat scelerisque nulla sed bibendum. Nunc eget enim at justo
                    efficitur condimentum pellentesque sed urna. Morbi a turpis velit. In pharetra luctus lorem et
                    feugiat. Pellentesque vel
                </Paragraph>
                <Divider />
                <div style={{ marginBottom: 24 }}>
                    <Table
                        loading={isLoading}
                        pagination={{ pageSize: 50 }}
                        columns={[
                            {
                                title: 'Pool details',
                                key: 'details',
                                render: (_, pool) => <>{pool.symbol + ' - ' + pool.name}</>,
                            },
                            {
                                title: 'Variance',
                                key: 'variance',
                                render: (_, pool) => {
                                    const mainToken = pool.tokens.find((token) => token.index === pool.mainIndex);
                                    const mainTokenBalance = parseFloat(mainToken?.balance || '0');
                                    const lowerTarget = parseFloat(pool.lowerTarget);
                                    const upperTarget = parseFloat(pool.upperTarget);

                                    if (mainTokenBalance > lowerTarget * 1.1 && mainTokenBalance < upperTarget * 0.9) {
                                        return <Text type="success">In range</Text>;
                                    } else if (mainTokenBalance >= lowerTarget && mainTokenBalance <= upperTarget) {
                                        return <Text type="warning">Near range</Text>;
                                    } else if (mainTokenBalance < lowerTarget) {
                                        return (
                                            <Text type="danger">
                                                -{tokenFormatAmount(Math.abs(mainTokenBalance - lowerTarget))}
                                            </Text>
                                        );
                                    } else if (mainTokenBalance > upperTarget) {
                                        return (
                                            <Text type="danger">
                                                +{tokenFormatAmount(Math.abs(mainTokenBalance - upperTarget))}
                                            </Text>
                                        );
                                    }

                                    return null;
                                },
                            },
                            {
                                title: 'Main',
                                key: 'mainBalance',
                                render: (_, pool) => (
                                    <>
                                        {tokenFormatAmount(
                                            pool.tokens.find((token) => token.index === pool.mainIndex)?.balance || '0',
                                        )}
                                    </>
                                ),
                            },
                            {
                                title: 'Wrapped',
                                key: 'wrappedBalance',
                                render: (_, pool) => (
                                    <>
                                        {tokenFormatAmount(
                                            pool.tokens.find((token) => token.index === pool.wrappedIndex)?.balance ||
                                                '0',
                                        )}
                                    </>
                                ),
                            },
                            {
                                title: '% Wrapped',
                                key: 'percentWrapped',
                                render: (_, pool) => {
                                    const mainToken = pool.tokens.find((token) => token.index === pool.mainIndex);
                                    const wrappedToken = pool.tokens.find(
                                        (token) => token.index === pool.wrappedIndex,
                                    ) as RawPoolTokenWithRate | undefined;
                                    const mainTokenBalance = parseFloat(mainToken?.balance || '0');
                                    const wrappedMainTokenBalance =
                                        parseFloat(wrappedToken?.balance || '0') *
                                        parseFloat(wrappedToken?.priceRate || '1');
                                    const totalMainTokenBalance = mainTokenBalance + wrappedMainTokenBalance;

                                    return (
                                        <>{numeral(wrappedMainTokenBalance / totalMainTokenBalance).format('0.00%')}</>
                                    );
                                },
                            },
                            {
                                title: 'Lower',
                                key: 'lowerTarget',
                                render: (_, pool) => <>{numeral(pool.lowerTarget).format('0a')}</>,
                            },
                            {
                                title: 'Upper',
                                key: 'upperTarget',
                                render: (_, pool) => <>{numeral(pool.upperTarget).format('0a')}</>,
                            },
                            {
                                title: 'TVL',
                                key: 'totalLiquidity',
                                render: (_, pool) => <>{numeral(pool.totalLiquidity).format('$0.00a')}</>,
                            },
                            {
                                title: '',
                                key: 'actions',
                                render: (_, pool) => (
                                    <>
                                        <Button onClick={() => setSelectedPool(pool)}>Actions</Button>
                                    </>
                                ),
                            },
                        ]}
                        dataSource={linearPools}
                    />
                </div>
            </Typography>
            <LinearPoolModal
                selectedPool={selectedPool}
                setSelectedPool={setSelectedPool}
                refetchPoolData={async () => {
                    await data.refetch();
                }}
            />
        </div>
    );
}
