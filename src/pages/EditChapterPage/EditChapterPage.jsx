import React, { useEffect, useState } from 'react';
import { Col, Row, message } from 'antd';
import { Wrapper, WrapperContent } from './style';
import { Button, Checkbox, Form, Input } from 'antd';
import { InputNumber } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { useLocation, useNavigate } from 'react-router-dom';
import { useMutationHooks } from '../../hooks/useMutationHook';
import * as ChapterService from '../../services/ChapterService';
import { useSelector } from 'react-redux';
import Loading from '../../components/LoadingComponent/Loading';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './style.css';



function EditChapterPage() {
    const user = useSelector((state) => state?.user);
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const location = useLocation();
    const rowSelected = location.state.selectRow; //id chapter

    const [content, setContent] = useState('');

    const [chapter, setChapter] = useState({
        chapNum: '',
        title: '',
        content: '',
    });

    const [isPending, setIsPending] = useState(false);

    //call api load one chpater
    const fetchGetChapterApiById = async (rowSelected) => {
        const res = await ChapterService.getChapterById(rowSelected);
        if (res?.data) {
            setChapter({
                chapNum: res?.data?.chapNum,
                title: res?.data?.title,
                content: res?.data?.content,
            })
        }
    }

    useEffect(() => {
        if (rowSelected) {
            fetchGetChapterApiById(rowSelected)
        }
    }, [rowSelected]);

    useEffect(() => {
        form.setFieldsValue(chapter);
    }, [form, chapter]);

    //handle onchange
    const handleOnChange = (e) => {
        setChapter({ ...chapter, [e.target.name]: e.target.value })
    }
    const handleOnChangeChapNum = (value) => {
        setChapter({
            ...chapter,
            chapNum: value,
        })
    }
    const handleContent = (value) => {
        setChapter({
            ...chapter,
            content: value,
        })
    }

    //mutation update story
    const mutationUpdate = useMutationHooks(
        (data) => {
            const { id, token, ...rests } = data;
            return ChapterService.updateChapter(id, token, rests);
        }
    )
    const { data: dataUpdate, isSuccess } = mutationUpdate;

    const onUpdateChapter = () => {
        setIsPending(true);
        mutationUpdate.mutate({ id: rowSelected, token: user?.access_token, ...chapter });
    }

    //useEffect update chapter
    useEffect(() => {
        if (isSuccess) {
            if (dataUpdate?.status === 'OK') {
                message.success('Cập nhật chương thành công!');
                setIsPending(false);
                navigate(-1);
            }
            if (dataUpdate?.status === 'AR') {
                message.warning('Chương này đã tồn tại');
                setIsPending(false);
            }
        }
    }, [isSuccess])

    return (
        <Wrapper>
            <WrapperContent>
                <Loading isLoading={isPending} >
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
                        onFinish={onUpdateChapter}
                        autoComplete="off"
                        form={form}
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
                                name='title'
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
                            <ReactQuill theme="snow" value={content} onChange={handleContent} />
                        </Form.Item>


                        <Form.Item>
                            <button type="primary" htmlType="submit">
                                Lưu
                            </button>
                        </Form.Item>
                    </Form>
                </Loading>
            </WrapperContent>
        </Wrapper>
    );
}

export default EditChapterPage;