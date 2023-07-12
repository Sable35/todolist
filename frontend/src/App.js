import { Button, Layout } from 'antd';
import React, {useEffect, useState} from 'react';
import { Content, Header } from 'antd/es/layout/layout';
import { Link, Route, Routes } from 'react-router-dom';
import { ProductsPage } from './pages/ProductsPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { CartPage } from './pages/CartPage';
import Login from './components/Login';
import {AdminPage} from "./pages/AdminPage";
import {ProfilePage} from "./pages/ProfilePage";
import {useSelector} from "react-redux";
import Logup from "./components/Logup";
function App() {
    const [isAuth, setIsAuth] = useState(false);
    const [isLogUp, setIsLogUp] = useState(false);
    const {user: currentUser} = useSelector((state) => state.auth);
    const openAuth = () => {
        setIsAuth(true);
    };
    const openLogUP = () => {
        setIsLogUp(true);
    };
    return (
        <Layout className="layout">
            <Header
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    backgroundColor: '#228B22',
                }}
            >
            </Header>
            <Content style={{ padding: '20px 20px', backgroundColor: 'rgba(220,253,220,0.62)'}}>
                <Routes>
                    <Route index element={<ProductsPage />} />
                </Routes>
            </Content>
        </Layout>
    );
}

export default App;

