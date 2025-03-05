import { useEffect } from 'react';
import { Col, Row, Spinner } from 'react-bootstrap';

export default function Loading({ message, redirectTo = null }) {
    useEffect(() => {
        if (redirectTo) window.location.replace(redirectTo);
    }, [redirectTo]);

    return (
        <>
            <Row
                style={{
                    minHeight: '100vh',
                    width: '100%',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                <Col xs='auto'>
                    <Spinner animation='grow' />
                </Col>
                <Col xs='auto'>{message}</Col>
            </Row>
        </>
    );
}
