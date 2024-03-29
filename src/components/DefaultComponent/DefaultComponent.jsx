import React from 'react';
import PropTypes from 'prop-types';
import HeaderComponent from '../HeaderComponent/HeaderComponent';
import { Breadcrumb } from 'antd';
import BreadCrumbComponent from '../BreadCrumbComponent/BreadCrumbComponent';
import FooterComponent from '../FooterComponent/FooterComponent';

DefaultComponent.propTypes = {

};

function DefaultComponent({ children }) {
    return (
        <div>
            <HeaderComponent />
            {children}
        </div>
    );
}

export default DefaultComponent;