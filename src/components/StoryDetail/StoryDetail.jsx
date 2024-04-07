import { React, useState } from 'react';
import { Col, Row, Typography, Button } from 'antd';
import { WrapperStoryDetail } from './style';
import { useLocation, useParams } from 'react-router-dom';
import * as StoryService from '../../services/StoryService';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../components/LoadingComponent/Loading';


//hàm sử lý "xem thêm"
const paragrapStyles = {
    WebkitLineClamp: 3,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
    display: '-webkit-box',
}

function StoryDetail(props) {
    const [isOpent, setIsOpent] = useState(false);
    // const { id } = useParams();
    const { state } = useLocation();

    //call api get detail story
    const fetchGetDetailStory = async () => {
        const res = await StoryService.getDetailStory(state);
        return res.data;
    }
    const { isPending, data: storyDetail } = useQuery({ queryKey: ['story'], queryFn: fetchGetDetailStory, enabled: !!state })
    return (
        <div>
            <WrapperStoryDetail>
                <Loading isLoading={isPending}>
                    <Row>
                        <Col span={8}>
                            <img src={storyDetail?.image} width="230px" />
                        </Col>
                        <Col span={3}>
                            <h3>Tên truyện:</h3>
                            <h5>Tác giả:</h5>
                            <p>Độ tuổi:</p>
                            <p>Lượt xem:</p>
                            <p>Bình luận:</p>
                        </Col>
                        <Col span={13}>
                            <h3>{storyDetail?.name}</h3>
                            <h5>{storyDetail?.author}</h5>
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
                        {storyDetail?.description}
                    </Typography>
                    <a onClick={() => setIsOpent(!isOpent)}><i>{isOpent ? 'Rút gọn' : 'Xem thêm'}</i></a>
                    <hr />
                    <Button type="primary" block>Đọc truyện</Button>
                </Loading>
            </WrapperStoryDetail>

        </div>
    );
}

export default StoryDetail;