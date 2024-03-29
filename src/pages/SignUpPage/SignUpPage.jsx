import React from 'react';
import { useState, useEffect } from 'react';
import { WrapperContainer } from './style';
import InputForm from '../../components/InputForm/InputForm';
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent';
import { LeftOutlined } from '@ant-design/icons';
import { useNavigate, useLocation } from 'react-router-dom';
import { useMutation } from 'react-query';
import * as UserService from '../../services/UserService';
import { useMutationHooks } from '../../hooks/useMutationHook';
import * as message from '../../components/Message/Message';



function SignUpPage(props) {
    const location = useLocation()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const navigate = useNavigate();

    const mutation = useMutationHooks(
        data => UserService.signupUser(data)
    );
    const { data, isPending, isSuccess, isError } = mutation;

    console.log('mutation', mutation);

    useEffect(() => {
        if (isSuccess) {
            message.success();
            handleButtonSignIn();
        } else if (isError) {
            message.error();
        }
    }, [isSuccess, isError])

    const handleIconBackHome = () => {
        navigate('/');
    }
    const handleButtonSignIn = () => {
        navigate('/dang-nhap');
    }

    const handleOnchangeEmail = (value) => {
        setEmail(value);
    }
    const handleOnchangePassword = (value) => {
        setPassword(value);
    }
    const handleOnchangeConfirmPassword = (value) => {
        setConfirmPassword(value);
    }
    const handleSignUp = () => {
        mutation.mutate({ email, password, confirmPassword });
    }

    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#0E3746', height: '100vh' }}>
            <div style={{ width: '400px', height: '445px', borderRadius: '6px', backgroundColor: '#F4F2EC' }}>
                <WrapperContainer>
                    <a onClick={handleIconBackHome}><LeftOutlined /></a>
                    <h2>Xin chào,</h2>
                    <h3>Đăng nhập hoặc Tạo tài khoản</h3>
                    <InputForm value={email} onChange={handleOnchangeEmail} placeholder="Email" style={{ marginLeft: '20px', marginBottom: '20px', width: '90%' }} />

                    <InputForm value={password} onChange={handleOnchangePassword} placeholder="Mật khẩu" style={{ marginLeft: '20px', marginBottom: '20px', width: '90%' }} />

                    <InputForm value={confirmPassword} onChange={handleOnchangeConfirmPassword} placeholder="Nhập lại mật khẩu" style={{ marginLeft: '20px', marginBottom: '20px', width: '90%' }} />

                    <ButtonComponent onClick={handleSignUp} size="middle" textButton="Đăng ký" style={{ backgroundColor: "#0E3746", color: "#fff", marginLeft: '20px', width: '90%' }} />

                    <p style={{ marginLeft: '20px' }}>Bạn đã có tài khoản? <a><span onClick={handleButtonSignIn} style={{ cursor: 'pointer', color: 'blue' }}>Đăng nhập</span></a></p>
                </WrapperContainer>
            </div>
        </div>
    );
}

export default SignUpPage;