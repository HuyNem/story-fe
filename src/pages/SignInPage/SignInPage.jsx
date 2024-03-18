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


function SignInPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const mutation = useMutationHooks(
        data => UserService.loginUser(data)
    )
    const { data, isPending, isSuccess } = mutation;

    useEffect(() => {
        if (isSuccess) {
            // message.success();
            // handleIconBackHome();
            console.log('data: ' + data);
            localStorage.setItem('access_token', data?.access_token);
        }
    }, [isSuccess])

    console.log('mutation', mutation);


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

    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#0E3746', height: '100vh' }}>
            <div style={{ width: '400px', height: '445px', borderRadius: '6px', backgroundColor: '#F4F2EC' }}>
                <WrapperContainer>
                    <a onClick={handleIconBackHome}><LeftOutlined /></a>
                    <h2>Xin chào,</h2>
                    <h3>Đăng nhập hoặc Tạo tài khoản</h3>
                    {data?.status === 'ERR' && <span style={{ color: 'red' }}>{data?.message}</span>}
                    <InputForm value={email} onChange={handleOnchangeEmail} placeholder="Email" style={{ marginLeft: '20px', marginBottom: '20px', width: '90%' }} />

                    <InputForm value={password} onChange={handleOnchangePassword} placeholder="Mật khẩu" type="password" style={{ marginLeft: '20px', marginBottom: '20px', width: '90%' }} />
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