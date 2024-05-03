import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Wrapper, WrapperButton, WrapperChangePass, WrapperContent, WrapperContentLeft, WrapperContentRight, WrapperDescription, WrapperHeader, WrapperHeaderProfile, WrapperImage, WrapperInput, WrapperLabel, WrapperUploadFile } from './style';
import InputForm from '../../components/InputForm/InputForm';
import TextArea from 'antd/es/input/TextArea';
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent';
import * as UserService from '../../services/UserService';
import Loading from '../../components/LoadingComponent/Loading';
import { useMutationHooks } from '../../hooks/useMutationHook';
import { Button, Upload, message } from 'antd';
import { updateUser } from '../../redux/slides/userSlide';
import { Input } from 'antd';
import { useNavigate } from 'react-router-dom';
import { FacebookFilled, UploadOutlined } from '@ant-design/icons';
import { getBase64 } from '../../utils';
import BreadCrumbComponent from '../../components/BreadCrumbComponent/BreadCrumbComponent';


function ProfilePage() {
    const navigate = useNavigate();
    const { Search } = Input;
    const user = useSelector((state) => state.user);
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [avatar, setAvatar] = useState('');
    const [facebook, setFaceBook] = useState('');
    const [description, setDescription] = useState('');
    const [password, setNewPass] = useState('');
    const [confirmNewPass, setConfirNewPass] = useState('');
    const [loading, setLoading] = useState(false);


    //mutation update user
    const mutation = useMutationHooks(
        (data) => {
            const { id, ...rests } = data;
            UserService.updateUser(id, rests)
        }
    )
    const { data, isPending, isSuccess, isError } = mutation;


    const mutationUpdatePass = useMutationHooks(
        (data) => {
            const { id, ...rests } = data;
            UserService.updatePass(id, rests)
            console.log(rests);
        }
    )
    const { isSuccess: isSuccessUpdatePass, isError: isErrorUpdatePass } = mutationUpdatePass;

    const dispatch = useDispatch();

    useEffect(() => {
        setEmail(user?.email);
        setName(user?.name);
        setAvatar(user?.avatar);
        setFaceBook(user?.facebook);
        setDescription(user?.description);
    }, [user]);

    useEffect(() => {
        if (isSuccess) {
            setLoading(false);
            message.success("Cập nhật thành công");
            handleGetDetailUser(user?.id, user?.access_token);
        } else if (isError) {
            setLoading(false);
            message.error();
        }
    }, [isSuccess, isError]);

    useEffect(() => {
        if (isSuccessUpdatePass) {
            setLoading(false);
            message.success("Cập nhật mật khẩu thành công");
            setNewPass();
            setConfirNewPass();
        } else if (isErrorUpdatePass) {
            message.error();
        }
    }, [isSuccessUpdatePass, isErrorUpdatePass]);

    //api detail user
    const handleGetDetailUser = async (id, token) => {
        setLoading(true);
        const res = await UserService.getDetailUser(id, token);
        dispatch(updateUser({ ...res?.data, access_token: token }));
        setLoading(false);
    }

    const handleOnchangeName = (value) => {
        setName(value);
    };
    const handleOnchangeFaceBook = (e) => {
        setFaceBook(e.target.value);
    };
    const handleOnchangeDescription = (e) => {
        setDescription(e.target.value);
    };
    const handleOnchangeAvatar = async ({ fileList }) => {
        const file = fileList[0];
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj)
        }
        setAvatar(file.preview)
    };
    //change password
    const handleOnchangeNewPass = (value) => {
        setNewPass(value);
    };
    const handleOnchangeConfirmPass = (value) => {
        setConfirNewPass(value);
    };

    const handleUpdatePass = () => {
        setLoading(true);
        if (password == '' || confirmNewPass == '') {
            message.warning("Vui lòng nhập mật khẩu mới và xác nhận mật khẩu mới");
            setLoading(false);
        }
        if (password && confirmNewPass) {
            if (password === confirmNewPass) {
                mutationUpdatePass.mutate({ id: user?.id, password });
            } else {
                message.error("Mật khẩu nhập lại không đúng");
                setLoading(false);
            }
        }
    }

    const handleUpdate = () => {
        setLoading(true);
        mutation.mutate({ id: user?.id, name, facebook, description, avatar });
    }

    const onSearch = (value) => {
        window.open(value, "_blank");
    }

    const breadcrumbItems = [
        {
            href: 'http://localhost:3000/',
            title: 'Trang chủ',
        },
        {
            title: 'Trang cá nhân',
        },
    ];


    return (
        <Wrapper>
            <div style={{marginTop: '20px', marginRight:'550px'}}>
                <BreadCrumbComponent items={breadcrumbItems} />
            </div>
            <WrapperHeaderProfile >
                <WrapperHeader>Thông tin người dùng</WrapperHeader>
                <Loading isLoading={loading}>
                    <WrapperContent>
                        <WrapperContentLeft>

                            <WrapperImage>
                                {avatar &&
                                    (<img src={avatar} style={{ width: '150px', height: 'auto', objectFit: 'cover' }} alt='ảnh đại diện' />)
                                }
                            </WrapperImage>

                            <WrapperUploadFile onChange={handleOnchangeAvatar} maxCount={1}>
                                <Button style={{ width: '150px', marginTop: '10px' }} icon={<UploadOutlined />}>Chọn ảnh</Button>
                            </WrapperUploadFile>

                        </WrapperContentLeft>

                        <WrapperContentRight>
                            <WrapperInput>
                                <WrapperLabel>Họ Tên:</WrapperLabel>
                                <InputForm value={name} onChange={handleOnchangeName} placeholder="Họ tên" />
                            </WrapperInput>

                            <WrapperInput>
                                <WrapperLabel>Email:</WrapperLabel>
                                <InputForm value={email} disabled />
                            </WrapperInput>

                            <WrapperInput>
                                <WrapperLabel>FaceBook:</WrapperLabel>
                                {/* <InputForm value={facebook} onChange={handleOnchangeFaceBook} placeholder="FaceBook của bạn" /> */}
                                <Search value={facebook} onChange={handleOnchangeFaceBook} placeholder="FaceBook của bạn" onSearch={onSearch} />
                            </WrapperInput>
                            <WrapperLabel >Mô tả về bạn:</WrapperLabel>
                            <TextArea showCount maxLength={200} value={description} onChange={handleOnchangeDescription}>{description}</TextArea>
                        </WrapperContentRight>
                    </WrapperContent>

                    <WrapperButton>
                        <ButtonComponent onClick={handleUpdate} size="middle" textButton="Cập nhật" style={{ color: '#fff' }} />
                    </WrapperButton>

                    <WrapperChangePass>
                        <WrapperLabel>Mật khẩu mới:</WrapperLabel>
                        <InputForm type="password" value={password} onChange={handleOnchangeNewPass} placeholder="Mật khẩu mới" style={{ width: '30%', marginLeft: '10px' }} />

                        <WrapperLabel style={{ marginLeft: '20px' }}>Nhập lại mật khẩu:</WrapperLabel>
                        <InputForm type="password" value={confirmNewPass} onChange={handleOnchangeConfirmPass} placeholder="Nhập lại mật khẩu" style={{ width: '30%', marginLeft: '10px' }} />

                        <WrapperButton>
                            <ButtonComponent onClick={handleUpdatePass} size="middle" textButton="Cập nhật mật khẩu" style={{ color: '#fff' }} />
                        </WrapperButton>
                    </WrapperChangePass>

                </Loading>
            </WrapperHeaderProfile>
        </Wrapper>

    );
}

export default ProfilePage;