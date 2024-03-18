import React from 'react';
import PropTypes from 'prop-types';
import StoryComponent from '../../components/StoryComponent/StoryComponents';
import NewStoryComponent from '../../components/StoryComponent/NewStoryComponent';
import NavbarCategoryComponent from '../../components/NavbarCategoryComponent/NavbarCategoryComponent';
import BreadCrumbComponent from '../../components/BreadCrumbComponent/BreadCrumbComponent';
import { Col, Row } from 'antd';
HomePage.propTypes = {

};



function HomePage(props) {

    return (
        <>
            <div style={{ padding: '15px 200px', backgroundColor: '#EAE8DC' }}>
                <BreadCrumbComponent />
            </div>
            <div style={{ padding: '5px 200px', backgroundColor: '#EAE8DC' }}>
                <Row>
                    <Col span={6}>
                        <NavbarCategoryComponent />
                    </Col>
                    <Col span={18}>
                        <NewStoryComponent />
                    </Col>
                </Row>
            </div>
        </>

    );
}

export default HomePage;