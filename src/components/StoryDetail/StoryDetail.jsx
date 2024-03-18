import { React, useState } from 'react';
import PropTypes from 'prop-types';
import { Col, Row, Typography, Button } from 'antd';
import { WrapperStoryDetail } from './style';

StoryDetail.propTypes = {

};

const paragrapStyles = {
    WebkitLineClamp: 3,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
    display: '-webkit-box',
}



function StoryDetail(props) {
    const [isOpent, setIsOpent] = useState(false);
    return (
        <div>
            <WrapperStoryDetail>


                <Row>
                    <Col span={8}>
                        <img src='https://img.dtruyen.com/public/images/large/sieucaptraxanhxuyenthanhtieukhalienk8ZDqT9AkR.jpg' width="230px" />
                    </Col>
                    <Col span={3}>
                        <h3>Tên truyện:</h3>
                        <h5>Tác giả:</h5>
                        <p>Độ tuổi:</p>
                        <p>Lượt xem:</p>
                        <p>Bình luận:</p>
                    </Col>
                    <Col span={13}>
                        <h3>SIÊU CẤP TRÀ XANH XUYÊN THÀNH TIỂU KHẢ LIÊN</h3>
                        <h5>Xuân Đao Hàn</h5>
                        <p>Mọi độ tuổi đều đọc được</p>
                        <p>100</p>
                        <p>60</p>
                    </Col>
                </Row>
                <Typography style={{
                    textAlign: 'justify',
                    padding: '10px 30px 0px 0px',
                    ...(isOpent ? null : paragrapStyles)
                }}
                >
                    Cô là một cô gái tâm cơ hàng đầu trong số các cô gian manh, mánh khóe, lừa lọc, có thể xem là một ảnh hậu đoạt giải Oscar trong cuộc sống bình thường.

                    Cô có thể giả vờ đáng yêu, bưng cái giá cao quý, dáng vẻ thanh khiết, có thể vờ vô tội, ngây thơ, thành bạch liên hoa ngây ngốc, đáng yêu,...không vai nào cô không diễn được.

                    Từ những điểm đó, ai cũng nhận ra Lâm Phi Lộc là một cô nàng khó chơi, không tốt lành gì, không nên dây vào.

                    Sau đó, Lâm Phi Lộc vì cái nết duyên dáng của mình mà bị nghiệp quật - Chết đúng sinh nhật 27 tuổi.

                    Lúc chết, Lâm Phi Lộc ngẫm lại hai mươi năm cuộc đời làm trà xanh chuyên nghiệp của mình, hối hận và áy náy với Đảng với nhân dân quá đỗi.
                </Typography>
                <a onClick={() => setIsOpent(!isOpent)}><i>{isOpent ? 'Rút gọn' : 'Xem thêm'}</i></a>
                <hr />
                <Button type="primary" block>Đọc truyện</Button>
            </WrapperStoryDetail>

        </div>
    );
}

export default StoryDetail;