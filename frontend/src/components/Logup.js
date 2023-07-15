import {Button, Form, Input, Modal, notification} from 'antd';
import { useState } from 'react';
import {useDispatch, useSelector} from "react-redux";
import authService from "../services/AuthService";
import {login} from "../slices/AuthSlice";

const Login = ({isVisible, onCancel}) => {
    const dispatch = useDispatch()


    const handleSubmit = (values) => {
        console.log('Форма отправлена:', values);
        authService.register(values);
        isVisible = false;
    };

    return (
        <>
            <Modal title="Регистрация" open={isVisible} onCancel={onCancel} footer={null}>
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
                        name="email"
                        label="Email"
                        rules={[
                            {
                                required: true,
                                message: 'Введите вашу почту!',
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
                            Зарегистрироваться
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

export default Login;