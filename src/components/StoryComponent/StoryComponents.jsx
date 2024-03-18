import React from 'react';
import { Card } from 'antd';
import { StyleNameStory, StyledCard } from './style';

import PropTypes from 'prop-types';

StoryComponents.propTypes = {

};

function StoryComponents(props) {
    return (
        <div>
            <StyledCard
                hoverable
                cover={< img alt="example" src="https://static.8cache.com/cover/eJwFwdm2azAAANAvsm7N9XAfkGpKzbMXi6pQabWmhK8_e-OO__fz28bZgF7WZgpLKGWd_Qn0qgIOfTBPqadmykP9FcelbWRrdAlx51gyK1nJkN0KJcA4ZsSPlUnbQMo-TwYekuAQmNDgOuvqic-kJbOKzmsaFsi6ug2pRnOAcA28JH490I-jaK15MXWS94kf8rk0fc3u5WUQ1QmdmdTtkPV6MmGm-ZW7iePyJq9ep1ofiAoUF2b3jMDLGpuo9NVu-YQLjGjiICgPxYbHPLnP36ZF96mVlNU3y42dFwG-TV4ne1PyY2O1wdDzQFTmu6HorVZdGiqenCRlGj2dVW2pqeVVzycdiFklxvUINlmHKzB_eJjfrokK4hiIrVGNoloWuOzRTkBqthM1l1R1gXfThXnE30D0yIDO06pfkba6inoF-RD4wgs6bqp-llTUZBIhwVpN-1TZl4KDUR7mIrpYwUjjNt-dI5u-slBUjPHVmdvWrDmOFL262HfOqON5rl2jZRq4FnWI6-569xaDyLO2T2rJPjwl2mQQgLifdMnB4Y12hcBZXOEptixsAlz2-OMaN74FavpLjuMuK_5nK9N48zGIjou3M735daD2jVlmOx-PcSK7es_0Pjy6iGVfJx_F1oS-xZS7R-lKHU3cy3uK8dVCOQDgmIqxq96eA5pdfvSfonGm1X6658Kh1VkMpb2EpnHTMZhxJ3bgTKsHcboJ4TcL7fE_YTmF6ViF-wMCwew4/xuyen-nhanh-chi-he-thong-nang-cap-tra-xanh.jpg" />}
            >
                <StyleNameStory>Truyện tình mùa đông</StyleNameStory>
            </StyledCard >
        </div>
    );
}

export default StoryComponents;