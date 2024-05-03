import React from 'react';
import { useState, useEffect } from 'react';
import { WrapperContainer } from './style';
import InputForm from '../../components/InputForm/InputForm';
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent';
import { LeftOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import * as UserService from '../../services/UserService';
import { useMutationHooks } from '../../hooks/useMutationHook';
import Loading from '../../components/LoadingComponent/Loading';
import * as message from '../../components/Message/Message';
import { jwtDecode } from "jwt-decode";
import { useDispatch } from 'react-redux';
import { updateUser } from '../../redux/slides/userSlide'



function SignInPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();

    const navigate = useNavigate();

    const mutation = useMutationHooks(
        data => UserService.loginUser(data)
    )
    const { data, isPending, isSuccess } = mutation;


    useEffect(() => {
        if (isSuccess) {
            localStorage.setItem('access_token', JSON.stringify(data?.access_token));
            if (data?.access_token) {
                const decoded = jwtDecode(data?.access_token)
                if (decoded?.id) {
                    handleGetDetailUser(decoded.id, data?.access_token);
                }
            }
            if (data?.status === 'ERR') {
                message.error(data?.message);
            }
            if (data?.status === 'OK') {
                handleIconBackHome();
                message.success('Đăng nhập thành công');
            }
        }
    }, [isSuccess]);

    const handleGetDetailUser = async (id, token) => {
        const res = await UserService.getDetailUser(id, token);
        dispatch(updateUser({ ...res?.data, access_token: token }));
    }


    const handleButtonSignUp = () => {
        navigate('/dang-ky');
    }
    const handleIconBackHome = () => {
        navigate('/');
    }
    const handleOnchangeEmail = (value) => {
        setEmail(value);
    }
    const handleOnchangePassword = (value) => {
        setPassword(value);
    }
    const handleSignIn = () => {
        mutation.mutate({ email, password });
    }

    const handleEnterEmail = (e) => {
        if (e.key === 'Enter') {
            if (email === '') {
                message.warning('Vui lòng nhập email');
            } else {
                document.getElementById('password').focus();
            }
        }
    }

    const handleEnterPassword = (e) => {
        if (e.key === 'Enter') {
            if (password === '') {
                message.warning('Vui lòng nhập password');
            } else {
                mutation.mutate({ email, password });
            }
        }
    }

    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#0E3746', height: '100vh' }}>
            <div style={{ width: '400px', height: '445px', borderRadius: '6px', backgroundColor: '#F4F2EC' }}>
                <WrapperContainer>
                    <a onClick={handleIconBackHome}><LeftOutlined /></a>
                    <h2>Xin chào,</h2>
                    <h3>Đăng nhập hoặc Tạo tài khoản</h3>
                    <InputForm id="email" value={email} onKeyDown={handleEnterEmail} onChange={handleOnchangeEmail} placeholder="Email" style={{ marginLeft: '20px', marginBottom: '20px', width: '90%' }} />

                    <InputForm id="password" value={password} onKeyDown={handleEnterPassword} onChange={handleOnchangePassword} placeholder="Mật khẩu" type="password" style={{ marginLeft: '20px', marginBottom: '20px', width: '90%' }} />
                    <Loading isLoading={isPending}>
                        <ButtonComponent disabled={!email.length || !password.length} onClick={handleSignIn} size="middle" textButton="Đăng nhập" style={{ backgroundColor: "#0E3746", color: "#fff", marginLeft: '20px', width: '90%' }} />
                    </Loading>
                    <p style={{ marginLeft: '20px' }}>Bạn chưa có tài khoản? <a><span onClick={handleButtonSignUp} style={{ cursor: 'pointer', color: 'blue' }}>Đăng ký</span></a></p>
                </WrapperContainer>
            </div>
        </div >
    );
}

export default SignInPage;