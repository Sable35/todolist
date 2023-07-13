import {Button, Form, Input, message, Modal, notification} from 'antd';
import { useState } from 'react';
import {useDispatch, useSelector} from "react-redux";
import authService from "../services/AuthService";
import {login} from "../slices/AuthSlice";

const Login = ({isVisible, onCancel}) => {
    const dispatch = useDispatch()

    const handleSubmit = (values) => {
        console.log('Форма отправлена:', values);
        authService.login(values).then((user) => {
            console.log(user)
            dispatch(login(user))
            isVisible = false;
        }, (error) => {
            const _content = (error.response && error.response.data)
            error.message ||
            error.toString();
            console.log(_content);
            message.error("Неправильный логин или пароль");
        })
    };

    return (
        <>
            <Modal title="Вход в аккаунт" open={isVisible} onCancel={onCancel} footer={null}>
                <Form onFinish={handleSubmit}>
                    <Form.Item
                        name="username"
                        label="Username"
                        rules={[
                            {
                                required: true,
                                message: 'Введите ваше имя пользователя!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        label="Пароль"
                        rules={[
                            {
                                required: true,
                                message: 'Введите ваш пароль!',
                            },
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Войти
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

export default Login;