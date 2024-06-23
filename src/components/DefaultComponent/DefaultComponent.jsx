import React from 'react';
import HeaderComponent from '../HeaderComponent/HeaderComponent';
import FooterComponent from '../FooterComponent/FooterComponent';
import Header from '../Header/Header.jsx';


function DefaultComponent({ children }) {
    return (
        <div>
            <Header />
            {children}
            <FooterComponent />
        </div>
    );
}

export default DefaultComponent;