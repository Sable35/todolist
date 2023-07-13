import {Button, Layout, Menu, theme, Dropdown, Space} from 'antd';
import React, {useEffect, useState} from 'react';
import { Content, Header } from 'antd/es/layout/layout';
import {Scrollbar} from 'react-scrollbars-custom';
import {useDispatch, useSelector} from "react-redux";
import Logup from "./components/Logup";
import Login from "./components/Login";
import AuthService from "./services/AuthService";
import {logout} from "./slices/AuthSlice";
import Sider from "antd/es/layout/Sider";
import CategoryService from "./services/CategoryService";
import { DownOutlined } from '@ant-design/icons';
import {Link, Route, Routes} from "react-router-dom";
import {NotFoundPage} from "./pages/NotFoundPage";
import TasksPage from "./pages/TasksPage";
function App() {

    const {user: currentUser} = useSelector((state) => state.auth);
    const categories = useSelector((state) => state.categories.categories);
    const [isModalRegisterVisible, setIsModalRegisterVisible] = useState(false);
    const [isModalAuthVisible, setIsModalAuthVisible] = useState(false);
    const dispatch = useDispatch()

    useEffect(() => {
        if (currentUser){
            CategoryService.getCategories(dispatch);
        }
    }, [currentUser]);

    const items = categories.map((category) => ({
        key: category.id,
        label: category.name,
    }));

    const handleMenuTasksClick = (item) => {
        console.log(item);
    };

    const handleAddCategoryClick = () => {
        CategoryService.createCategory({"name":"Новая категория"}, dispatch)
    };

    const menuProps = {
        items: [
            ...items.map((item) => ({ key: item.key, label: item.label })),
            { key: "add", label: "Добавить категорию" },
        ],
        onClick: (item) => {
            if (item.key === "add") {
                handleAddCategoryClick();
            } else {
                handleMenuTasksClick(item);
            }
        },
    };

    const handleRegisterClick = () => {
        setIsModalRegisterVisible(true);
    };

    const handleRegisterCancel = () => {
        setIsModalRegisterVisible(false);
    };

    const handleAuthClick = () => {
        setIsModalAuthVisible(true);
    };

    const handleAuthCancel = () => {
        setIsModalAuthVisible(false);
    };
    const handleExit = () => {
        dispatch(logout(currentUser))
        AuthService.logout();
    };

    const handleTasksButton = () => {
    };

    const {
        token: { colorBgContainer },
    } = theme.useToken();

    return (
        <Layout>
            <Header
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    color:'white'
                }}
            >
                <h1 >JUST DO IT!</h1>
                <div>


                    <Dropdown menu={menuProps}>
                        <Link to={"/Tasks"}>
                        <Button onClick={handleTasksButton}>
                            <Space>
                                Задачи
                                <DownOutlined />
                            </Space>
                        </Button>
                        </Link>
                    </Dropdown>
                </div>
                {currentUser ? <div style={{display: 'flex', justifyContent: 'flex-end', alignItems: 'center', }}>
                        <h2 style={{ marginRight: '15px' }}>{currentUser.username}</h2>
                        <Button type="primary" danger onClick={handleExit}>Выход</Button>


                </div>
                    :
                    <div style={{
                    display: 'flex',
                    justifyContent: 'flex-end'}}>
                    <div style={{ marginRight: '15px' }}>
                        <Button onClick={handleRegisterClick}>Регистрация</Button>
                        <Logup
                            isVisible={isModalRegisterVisible}
                            onCancel={handleRegisterCancel}
                        />
                    </div>
                    <div >
                        <Button onClick={handleAuthClick}>Вход</Button>
                        <Login
                            isVisible={isModalAuthVisible}
                            onCancel={handleAuthCancel}
                        />
                    </div>
                </div>}

            </Header>
                <Layout
                    style={{
                        padding: '24px 0',
                        background: colorBgContainer,
                    }}
                >
                    <Layout>
                        <Content style={{padding: '0 50px',}}>
                            <Routes>
                                <Route path="/Tasks" element={<TasksPage />} />
                            </Routes>
                        </Content>
                    </Layout>
                </Layout>
        </Layout>

    );
}

export default App;

