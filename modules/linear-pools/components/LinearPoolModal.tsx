import { LinkOutlined } from '@ant-design/icons';
import { Alert, Button, Col, Divider, Modal, Row } from 'antd';
import React from 'react';
import { RawLinearPoolExtended } from '../linear-pool-types';
import { linearPoolRebalancers } from '../rebalancers';
import { useNetworkConfig } from '../../../lib/hooks/useNetworkConfig';
import { useApproveToken } from '../../../lib/hooks/useApproveToken';
import { etherscanGetContractReadUrl, etherscanGetContractWriteUrl } from '../../../lib/etherscan';
import { useAllowances } from '../../../lib/hooks/useAllowances';
import { useAccount } from 'wagmi';
import { useRebalance } from '../hooks/useRebalance';
import { useRebalanceWithExtraMain } from '../hooks/useRebalanceWithExtraMain';

interface Props {
    selectedPool: RawLinearPoolExtended | null;
    setSelectedPool: (pool: RawLinearPoolExtended | null) => void;
}

export function LinearPoolModal({ selectedPool, setSelectedPool }: Props) {
    const networkConfig = useNetworkConfig();
    const rebalancerAddress = linearPoolRebalancers[selectedPool?.address || ''] || null;
    const vaultAddress = networkConfig?.balancer?.vault || '';
    const { address: account } = useAccount();

    const mainToken = selectedPool?.tokens[selectedPool.mainIndex] || null;

    const { writeAsync: rebalance, isLoading: isRebalancing, prepare: reblaancePrepare } = useRebalance(selectedPool);
    const {
        writeAsync: rebalanceWithExtraMain,
        isLoading: isRebalancingWithExtraMain,
        prepare: rebalanceWithExtraMainPrepare,
    } = useRebalanceWithExtraMain(selectedPool);
    const { writeAsync: approve, isLoading: approvalLoading } = useApproveToken(mainToken || null);
    const {
        data: allowances,
        refetch: refetchAllowances,
        isLoading: allowancesLoading,
    } = useAllowances(account || null, [mainToken]);

    const mainTokenAllowance = allowances.length > 0 ? allowances[0].amountScaled : '0';
    const needsApproval = parseFloat(mainTokenAllowance) < 1000;

    return (
        <Modal
            title={selectedPool?.symbol}
            open={selectedPool !== null}
            onOk={() => setSelectedPool(null)}
            onCancel={() => setSelectedPool(null)}
            width={750}
        >
            <Row gutter={4}>
                <Col span={4}>
                    <div>Pool ID</div>
                </Col>
                <Col span={20}>
                    <div style={{ textAlign: 'right' }}>{selectedPool?.id}</div>
                </Col>
            </Row>
            <Divider style={{ margin: '12px 0' }} />
            <Row gutter={4}>
                <Col span={4}>
                    <div>Pool address</div>
                </Col>
                <Col span={20}>
                    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <div style={{ marginRight: 4 }}>{selectedPool?.address}</div>
                        <a
                            href={etherscanGetContractReadUrl(networkConfig.etherscan.url, selectedPool?.address || '')}
                            target="_blank"
                            rel="noreferrer"
                        >
                            <LinkOutlined />
                        </a>
                    </div>
                </Col>
            </Row>
            <Divider style={{ margin: '12px 0' }} />
            <Row gutter={4}>
                <Col span={4}>
                    <div>Vault</div>
                </Col>
                <Col span={20}>
                    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <div style={{ marginRight: 4 }}>{vaultAddress}</div>
                        <a
                            href={etherscanGetContractReadUrl(networkConfig.etherscan.url, vaultAddress)}
                            target="_blank"
                            rel="noreferrer"
                        >
                            <LinkOutlined />
                        </a>
                    </div>
                </Col>
            </Row>
            <Divider style={{ margin: '12px 0' }} />
            {rebalancerAddress ? (
                <>
                    <Row gutter={4}>
                        <Col span={4}>
                            <div>Rebalancer</div>
                        </Col>
                        <Col span={20}>
                            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                <div style={{ marginRight: 4 }}>{rebalancerAddress}</div>
                                <a
                                    href={etherscanGetContractWriteUrl(networkConfig.etherscan.url, rebalancerAddress)}
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    <LinkOutlined />
                                </a>
                            </div>
                        </Col>
                    </Row>
                    <Divider />
                    <Row gutter={12}>
                        <Col span={12}>
                            <Button
                                type="primary"
                                block
                                disabled={!!reblaancePrepare.error}
                                loading={isRebalancing}
                                onClick={async () => {
                                    if (rebalance) {
                                        await rebalance();
                                        // reload pool balances
                                    }
                                }}
                            >
                                Rebalance
                            </Button>
                        </Col>
                        <Col span={12}>
                            {needsApproval ? (
                                <Button
                                    type="primary"
                                    block
                                    loading={allowancesLoading || approvalLoading}
                                    onClick={async () => {
                                        if (account !== null && approve) {
                                            await approve();
                                            await refetchAllowances();
                                        }
                                    }}
                                >
                                    Approve extra main
                                </Button>
                            ) : (
                                <Button
                                    type="primary"
                                    block
                                    disabled={!!rebalanceWithExtraMainPrepare.error}
                                    loading={isRebalancingWithExtraMain}
                                    onClick={async () => {
                                        if (rebalanceWithExtraMain) {
                                            await rebalanceWithExtraMain();
                                        }
                                    }}
                                >
                                    Rebalance with extra main
                                </Button>
                            )}
                        </Col>
                    </Row>
                </>
            ) : (
                <Alert message="The rebalancer has not yet been added to the repo for this pool." type="warning" />
            )}
            {!needsApproval && rebalanceWithExtraMainPrepare.error && (
                <Alert
                    message={rebalanceWithExtraMainPrepare.error.message}
                    type="warning"
                    style={{ margin: '8px 0' }}
                />
            )}
            {reblaancePrepare.error && (
                <Alert message={reblaancePrepare.error.message} type="warning" style={{ margin: '8px 0' }} />
            )}
        </Modal>
    );
}
