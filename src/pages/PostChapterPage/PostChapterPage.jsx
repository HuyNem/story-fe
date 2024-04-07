import React, { useEffect, useState } from 'react';
import { Col, Row, message } from 'antd';
import { Wrapper, WrapperContent } from './style';
import { Button, Checkbox, Form, Input } from 'antd';
import { InputNumber } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { useLocation, useNavigate } from 'react-router-dom';
import { useMutationHooks } from '../../hooks/useMutationHook';
import * as ChapterService from '../../services/ChapterService';


function PostChapterPage(props) {
    const navigate = useNavigate();
    const location = useLocation();
    const rowSelected = location.state.selectRow; //_id story

    const [stateChapter, setStateChapter] = useState({
        chapNum: '',
        title: '',
        content: '',
        storyId: rowSelected,
    });

    //handle onChange
    const handleOnChange = (e) => {
        setStateChapter({
            ...stateChapter,
            [e.target.name]: e.target.value,
        })
    }

    const handleOnChangeChapNum = (value) => {
        setStateChapter({
           ...stateChapter,
            chapNum: value,
        })
    }

    //mutation
    const mutation = useMutationHooks(
        (data) => {
            const { chapNum, title, content, storyId } = data;
            return ChapterService.createChapter({ chapNum, title, content, storyId });
        }
    )
    const { data, isPending, isSuccess } = mutation;

    const onFinish = () => {
        mutation.mutate(stateChapter)
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    //useEffect create chapter
    useEffect(() => {
        if (isSuccess) {
            if (data?.status === 'OK') {
                message.success('Đăng chương mới thành công!');
                navigate('/quan-ly-truyen')
            } else if (data?.status === 'AR') {
                message.warning('Chương này đã tồn tại');
            }
        }
    }, [isSuccess])

    return (
        <Wrapper>
            <WrapperContent>
                <Row>
                    <Col span={16} style={{}}>
                        <Form
                            name="basic"
                            layout='vertical'
                            labelCol={{
                                span: 5,
                            }}
                            wrapperCol={{
                                // span: 16,
                            }}
                            style={{
                                maxWidth: '100%',
                            }}
                            initialValues={{
                                remember: true,
                            }}
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}
                            autoComplete="off"
                        >
                            <Form.Item
                                label="Chương"
                                name="chapNum"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Trường này không được bỏ trống!',
                                    },
                                ]}
                            >
                                <InputNumber
                                    allowClearValue={true}
                                    defaultValue={0}
                                    min={1}
                                    max={20}
                                    name='chapNum'
                                    onChange={handleOnChangeChapNum}
                                />
                            </Form.Item>

                            <Form.Item
                                label="Tiêu đề"
                                name="title"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Trường này không được bỏ trống!',
                                    },
                                ]}
                            >
                                <Input
                                    allowClearValue="true"
                                    name="title"
                                    onChange={handleOnChange}
                                />
                            </Form.Item>

                            <Form.Item
                                label="Nội dung"
                                name="content"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Trường này không được bỏ trống!',
                                    },
                                ]}
                            >
                                <TextArea
                                    allowClearValue="true"
                                    rows={15}
                                    name="content"
                                    onChange={handleOnChange}
                                />
                            </Form.Item>


                            <Form.Item
                                wrapperCol={{
                                    offset: 8,
                                    span: 16,
                                }}
                            >
                                <Button type="primary" htmlType="submit">
                                    Đăng
                                </Button>
                            </Form.Item>
                        </Form>
                    </Col>
                    <Col span={8}></Col>
                </Row>
            </WrapperContent>
        </Wrapper>
    );
}

export default PostChapterPage;