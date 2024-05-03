import React, { lazy } from 'react';
import { Wrapper, WrapperContent, WrapperForm, WrapperHeader, WrapperUploadFile } from './style';
import './style.css';
import TextArea from 'antd/es/input/TextArea';
import { Select, Button, Form, Input } from 'antd';
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import * as CategoryService from '../../services/CategoryService';
import * as StoryService from '../../services/StoryService';
import { useMutationHooks } from '../../hooks/useMutationHook';
import { getBase64 } from '../../utils';
import Loading from '../../components/LoadingComponent/Loading';
import * as message from '../../components/Message/Message';
import { useNavigate } from 'react-router-dom';
import BreadCrumbComponent from '../../components/BreadCrumbComponent/BreadCrumbComponent';


function PostStoryPage(props) {
    const navigate = useNavigate();
    const user = useSelector((state) => state.user);
    const id_member = user?.id
    //state
    const [stateStory, setStateStory] = useState({
        name: '',
        description: '',
        category: '',
        author: '',
        image: '',
        id_Member: id_member,
    });

    //call api from table category
    const fetchCategory = async () => {
        const res = await CategoryService.getAllCategory()
        return res;
    }
    const { data: categories } = useQuery({ queryKey: ['category'], queryFn: fetchCategory })

    //mutation
    const mutation = useMutationHooks(
        (data) => {
            const { name, description, category, author, image, id_Member } = data;
            return StoryService.createStory({ name, description, category, author, image, id_Member });
        }
    )

    const { data, isPending, isSuccess, isError } = mutation;
    //useEffect
    useEffect(() => {
        if (isSuccess && data?.status === 'OK') {
            navigate('/quan-ly-truyen');
            message.success('Truyện đang chờ xác nhận từ phía quản trị viên.');
        } else if (isError) {
            message.error('Đăng truyện thất bại, vui lòng thử lại');
        }
        if (isSuccess && data?.status === 'AR') {
            message.warning('Tên truyện đã tồn tại');
        }
    }, [isSuccess])

    //form
    const onFinish = () => {
        mutation.mutate(stateStory);
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const handleOnChange = (e) => {
        setStateStory({
            ...stateStory,
            [e.target.name]: e.target.value,
        })
    }

    const handleOnChangeCategory = (value) => {
        setStateStory({
            ...stateStory,
            category: value.label
        })
    }

    const handleOnchangeAvatar = async ({ fileList }) => {
        const file = fileList[0];
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj)
        }
        setStateStory({
            ...stateStory,
            image: file.preview
        })
    };

    // <BreadCrumbComponent />
    const breadcrumbItems = [
        {
            href: 'http://localhost:3000/',
            title: 'Trang chủ',
        },
        {
            title: 'Đăng truyện',
        },
    ];

    return (
        <Wrapper>
            <BreadCrumbComponent items={breadcrumbItems} />
            <WrapperContent>
                <Loading isLoading={isPending}>
                    <WrapperHeader>Đăng truyện</WrapperHeader>
                    <WrapperForm>
                        <Form
                            layout='vertical'
                            name="basic"
                            style={{

                            }}
                            labelCol={{
                                span: 24,
                            }}
                            wrapperCol={{
                                span: 24,
                            }}
                            initialValues={{
                                remember: true,
                            }}
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}
                            autoComplete="off"
                        >
                            <Form.Item
                                label="Tên truyện"
                                name="name"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Tên truyện không được bỏ trống!',
                                    },
                                ]}
                            >
                                <Input name="name" value={stateStory.name} onChange={handleOnChange} />
                            </Form.Item>

                            <Form.Item
                                label="Mô tả ngắn (200 ký tự)"
                                name="description"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui lòng nhập mô tả!',
                                    },
                                ]}
                            >
                                <TextArea maxLength={200} name="description" value={stateStory.description} onChange={handleOnChange} ></TextArea>
                            </Form.Item>

                            <Form.Item
                                label="Thể loại"
                                name="category"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui lòng chọn thể loại!',
                                    },
                                ]}
                            >
                                <Select
                                    labelInValue
                                    defaultValue={{
                                        value: 'Thể loại',
                                    }}
                                    options={categories?.data.map(category => ({
                                        value: category._id,
                                        label: category.name
                                    }))}
                                    onChange={handleOnChangeCategory}
                                />
                            </Form.Item>

                            <Form.Item
                                label="Tác giả"
                                name="author"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui lòng nhập tác giả!',
                                    },
                                ]}
                            >
                                <Input rows={12} name="author" value={stateStory.author} onChange={handleOnChange}></Input>
                            </Form.Item>

                            {stateStory.image &&
                                (<img src={stateStory.image} style={{ width: '200px', height: 'auto', objectFit: 'cover' }} alt='ảnh đại diện' />)
                            }

                            <Form.Item
                                label="Ảnh bìa truyện (Dung lượng cần nhỏ hơn 1MB. Tên ảnh cần viết không dấu)"
                                name="image"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui lòng chọn ảnh!',
                                    },
                                ]}
                            >
                                <WrapperUploadFile onChange={handleOnchangeAvatar} maxCount={1}>
                                    <Button>Chọn ảnh</Button>
                                </WrapperUploadFile>
                            </Form.Item>

                            <Button type="primary" htmlType="submit">
                                Đăng
                            </Button>
                        </Form>
                    </WrapperForm>
                </Loading>
            </WrapperContent>
        </Wrapper>
    );
}

export default PostStoryPage;