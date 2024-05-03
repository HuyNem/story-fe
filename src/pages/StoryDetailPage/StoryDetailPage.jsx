import React from 'react';
import { Col, Row } from 'antd';
import BreadCrumbComponent from '../../components/BreadCrumbComponent/BreadCrumbComponent';
import NavbarCategoryComponent from '../../components/NavbarCategoryComponent/NavbarCategoryComponent';
import StoryDetail from '../../components/StoryDetail/StoryDetail';
import CommentComponent from '../../components/CommentComponent/CommentComponent';
import { useLocation } from 'react-router-dom';


function StoryDetailPage() {
    const { state } = useLocation();
    const breadcrumbItems = [
        {
            href: 'http://localhost:3000/',
            title: 'Trang chủ',
        },
        {
            title: `${state.name}`,
        },
    ];

    return (
        <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
            <div style={{ padding: '15px 150px', backgroundColor: '#EAE8DC' }}>
                <BreadCrumbComponent items={breadcrumbItems} />
            </div>
            <div style={{ padding: '5px 150px', backgroundColor: '#EAE8DC' }}>
                <Row>
                    <Col span={18}>
                        <StoryDetail />
                        <CommentComponent />
                    </Col>
                    <Col span={6}>
                        <NavbarCategoryComponent />
                    </Col>
                </Row>
            </div>
        </div>
    );
}

export default StoryDetailPage;