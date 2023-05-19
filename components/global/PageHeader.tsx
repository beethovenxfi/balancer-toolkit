import { Col, Row } from 'antd';
import { BalancerLogo } from '../../assets/BalancerLogo';
import { ConnectButton } from '@rainbow-me/rainbowkit';

export function PageHeader() {
    return (
        <Row style={{ padding: '16px 2rem ' }} className="container">
            <Col span={16} style={{ display: 'flex', alignItems: 'center' }}>
                <BalancerLogo />
            </Col>
            <Col span={8} style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <ConnectButton />
            </Col>
        </Row>
    );
}
