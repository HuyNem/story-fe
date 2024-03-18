import React from 'react';
import PropTypes from 'prop-types';
import HeaderComponent from '../HeaderComponent/HeaderComponent';

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