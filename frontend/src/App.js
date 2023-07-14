import {Button, Layout, Menu, theme, Dropdown, Space} from 'antd';
import React, {useEffect, useState} from 'react';
import { Content, Header } from 'antd/es/layout/layout';
import {useDispatch, useSelector} from "react-redux";
import Logup from "./components/Logup";
import Login from "./components/Login";
import AuthService from "./services/AuthService";
import {logout} from "./slices/AuthSlice";
import CategoryService from "./services/CategoryService";
import { DownOutlined } from '@ant-design/icons';
import {Link, Route, Routes, useNavigate} from "react-router-dom";
import TasksPage from "./pages/TasksPage";
import TasksPageByCategory from "./pages/TasksPageByCategory";
import {HomePage} from "./pages/HomePage";
import EditCategoryModal from "./components/EditCategoryModal";
function App() {

    const {user: currentUser} = useSelector((state) => state.auth);
    const categories = useSelector((state) => state.categories.categories);
    const [isModalRegisterVisible, setIsModalRegisterVisible] = useState(false);
    const [isModalAuthVisible, setIsModalAuthVisible] = useState(false);
    const [isModalEditVisible, setIsModalEditVisible] = useState(false);
    const [IdCategory, setIdCategory] = useState(-1);
    const navigate = useNavigate();
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
        setIdCategory(item.key);
        navigate("/Tasks/Category")
        console.log(IdCategory);
    };

    const handleAddCategoryClick = () => {
        CategoryService.createCategory({"name":"Новая категория"}, dispatch)
    };

    const menuProps = {
        items: [
            ...items.map((item) => ({ key: item.key, label: item.label })),
            { key: "add", label: "Добавить категорию" },
            { key: "edit", label: "Редактировать категории" }
        ],
        onClick: (item) => {
            if (item.key === "add") {
                handleAddCategoryClick();
            } else if (item.key === "edit") {
                handleEditClick()
            } else handleMenuTasksClick(item);
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

    const handleEditClick = () => {
        setIsModalEditVisible(true);
        console.log(isModalEditVisible)
    };

    const handleEditCancel = () => {
        setIsModalEditVisible(false);
    };
    const handleExit = () => {
        dispatch(logout(currentUser))
        AuthService.logout();
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
                <div style={{display: 'flex', justifyContent: 'flex-start', alignItems: 'center', }}>


                    <Dropdown menu={menuProps}>
                        <Link to={"/Tasks"}>
                        <Button >
                            <Space>
                                Задачи
                                <DownOutlined />
                            </Space>
                        </Button>
                        </Link>
                    </Dropdown>
                    <EditCategoryModal isVisible={isModalEditVisible} onCancel={handleEditCancel} categories={categories}/>
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
                                <Route index element={<HomePage />} />
                                <Route path="/Tasks" element={<TasksPage />} />
                                <Route path="/Tasks/Category" element={<TasksPageByCategory IdCategory={IdCategory} />} />
                            </Routes>
                        </Content>
                    </Layout>
                </Layout>
        </Layout>

    );
}

export default App;

