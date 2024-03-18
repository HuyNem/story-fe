import React from 'react';
import PropTypes from 'prop-types';
import { Col, Row } from 'antd';
import BreadCrumbComponent from '../../components/BreadCrumbComponent/BreadCrumbComponent';
import NavbarCategoryComponent from '../../components/NavbarCategoryComponent/NavbarCategoryComponent';
import StoryDetail from '../../components/StoryDetail/StoryDetail';

StoryDetailPage.propTypes = {

};

function StoryDetailPage(props) {
    return (
        <div>
            <div style={{ padding: '15px 150px', backgroundColor: '#EAE8DC' }}>
                <BreadCrumbComponent />
            </div>
            <div style={{ padding: '5px 150px', backgroundColor: '#EAE8DC' }}>
                <Row>
                    <Col span={18}>
                        <StoryDetail />
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