import {useState} from "react";
import {Dropdown, Layout, Menu, theme} from "antd";
import type { MenuProps } from 'antd';
import Settings from "../../pages/Settings";
import Home from "../../pages/Home";
import {CloudOutlined, HomeOutlined, LogoutOutlined, SettingOutlined, UserOutlined} from "@ant-design/icons";
import WeatherCard from "../WeatherCard";
import {Content, Header} from "antd/es/layout/layout";
import './index.css'

// const { Header, Content } = Layout
function NavBar(){
    const [activePage, setActivePage] = useState('home')

    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken()

    const Page = activePage === 'settings' ? Settings : Home


    const handleNavClick: MenuProps['onClick'] = ({ key }) => {
        setActivePage(key)
    }

    const handleUserMenuClick: MenuProps['onClick'] = ({ key }) => {
        if (key === 'settings') {
            setActivePage('settings')
        }
        // TODO: profile、logout 逻辑
    }


    const userMenuItems = [
        {
            key: 'profile',
            icon: <UserOutlined />,
            label: '个人中心',
        },
        {
            key: 'settings',
            icon: <SettingOutlined />,
            label: '设置',
        },
        { type: 'divider' },
        {
            key: 'logout',
            icon: <LogoutOutlined />,
            label: '退出登录',
            danger: true,
        },
    ] as MenuProps['items']

    const navItems = [
        { key: 'home', icon: <HomeOutlined />, label: '首页' },
    ] as MenuProps['items']



    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Header className="top-header">
                <div className="header-brand">
                    <CloudOutlined className="brand-icon" />
                    <span className="brand-text">Lee Utils</span>
                </div>

                <Menu
                    mode="horizontal"
                    selectedKeys={[activePage]}
                    items={navItems}
                    onClick={handleNavClick}
                    className="header-menu"
                />

                <div className="header-right">
                    <Dropdown
                        menu={{
                            items: userMenuItems,
                            onClick: handleUserMenuClick,
                        } as MenuProps}
                        placement="bottomRight"
                        trigger={['click']}
                    >
                        <UserOutlined className="header-avatar" />
                    </Dropdown>
                </div>
            </Header>



        </Layout>
    )
} export default NavBar