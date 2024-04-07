import React, { lazy } from 'react';
import BreadCrumbComponent from '../../components/BreadCrumbComponent/BreadCrumbComponent';
import { Wrapper, WrapperContent, WrapperForm, WrapperHeader, WrapperLabel, WrapperUploadFile } from './style';
import TextArea from 'antd/es/input/TextArea';
import { Select, Button, Upload, Form, Input } from 'antd';
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import * as CategoryService from '../../services/CategoryService';
import * as StoryService from '../../services/StoryService';
import { useMutationHooks } from '../../hooks/useMutationHook';
import { getBase64 } from '../../utils';
import Loading from '../../components/LoadingComponent/Loading';
import * as message from '../../components/Message/Message';
import { useLocation, useNavigate } from 'react-router-dom';


function PostStoryPage(props) {
    const user = useSelector((state) => state?.user);
    const { TextArea } = Input;
    const [form] = Form.useForm();
    const location = useLocation();
    const rowSelected = location.state.selectRow; //id story

    const [story, setStory] = useState({
        name: '',
        description: '',
        image: '',
        category: '',
        author: '',
        id_Member: ''
    });
    const [isPending, setIsPending] = useState(false);

    //call api từ bảng category
    const fetchCategory = async () => {
        const res = await CategoryService.getAllCategory()
        return res;
    }
    const { data: categories } = useQuery({ queryKey: ['category'], queryFn: fetchCategory })

    //call api load one story
    const fetchGetStoryApiById = async (rowSelected) => {
        const res = await StoryService.getStoryById(rowSelected);
        if (res?.data) {
            setStory({
                name: res?.data?.name,
                description: res?.data?.description,
                image: res?.data?.image,
                category: res?.data?.category,
                author: res?.data?.author,
                id_Member: res?.data?.id_Member
            })
        }
    }

    useEffect(() => {
        if (rowSelected) {
            fetchGetStoryApiById(rowSelected)
        }
    }, [rowSelected]);

    useEffect(() => {
        form.setFieldsValue(story);
    }, [form, story]);


    //handle onchange
    const handleOnChange = (e) => {
        setStory({ ...story, [e.target.name]: e.target.value })
    }
    const handleOnChangeCategory = (value) => {
        console.log('category', value);
        setStory({
            ...story,
            category: value.label
        })
    }
    const handleOnchangeAvatar = async ({ fileList }) => {
        const file = fileList[0];
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj)
        }
        setStory({
            ...story,
            image: file.preview
        })
    };

    //mutation update story
    const mutationUpdate = useMutationHooks(
        (data) => {
            const { id, token, ...rests } = data;
            console.log('data: ',data);
            return StoryService.updateStory(id, token, rests);
        }
    )
    const { data: dataUpdate, isPending: isPendingUpdate, isSuccess } = mutationUpdate;

    const onUpdateStory = () => {
        setIsPending(true);
        mutationUpdate.mutate({ id: rowSelected, token: user?.access_token, ...story });
    }

    //useEffect update story
    useEffect(() => {
        if (isSuccess) {
            if (dataUpdate?.status === 'OK') {
                message.success('Sửa truyện thành công');
                setIsPending(false);
            }
            if (dataUpdate?.status === 'AR') {
                message.warning('truyện đã tồn tại');
                setIsPending(false);
            }
        }
    }, [isSuccess])


    return (
        <Wrapper>
            <WrapperContent>
                {/* <BreadCrumbComponent /> */}
                <Loading isLoading={isPending}>
                    <WrapperHeader>Sửa truyện</WrapperHeader>
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
                            onFinish={onUpdateStory}
                            // onFinishFailed={onFinishFailed}
                            autoComplete="off"
                            form={form}
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
                                <Input allowClear={true} name="name" value={story.name} onChange={handleOnChange} />
                            </Form.Item>

                            <Form.Item
                                label="Mô tả ngắn (500 ký tự)"
                                name="description"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui lòng nhập mô tả!',
                                    },
                                ]}
                            >
                                <TextArea maxLength={500} rows={5} name="description" value={story.description} onChange={handleOnChange} ></TextArea>
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
                                    defaultValue={story.category}
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
                                <Input rows={12} name="author" value={story.author} onChange={handleOnChange}></Input>
                            </Form.Item>

                            <Form.Item
                                style={{ display: 'flex' }}
                                name="image"
                            >
                                {story.image &&
                                    (<img src={story.image} style={{ width: '200px', height: 'auto', objectFit: 'cover' }} alt='ảnh đại diện' />)
                                }
                                <WrapperUploadFile onChange={handleOnchangeAvatar} maxCount={1}>
                                    <Button>Chọn ảnh</Button>
                                </WrapperUploadFile>
                            </Form.Item>

                            <Button type="primary" htmlType="submit">Đăng</Button>
                        </Form>
                    </WrapperForm>
                </Loading>
            </WrapperContent>
        </Wrapper>
    );
}

export default PostStoryPage;