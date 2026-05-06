import {JSX, useState} from 'react'
import { Layout, Menu, Dropdown, theme } from 'antd'
import type { MenuProps } from 'antd'
import {
  HomeOutlined,
  SettingOutlined,
  UserOutlined,
  CloudOutlined,
  LogoutOutlined,
} from '@ant-design/icons'
import Home from './pages/Home'
import Settings from './pages/Settings'
import './App.css'

const { Header, Content } = Layout

const userMenuItems: ({ icon: JSX.Element; label: string; key: string } | { type: string } | { icon: JSX.Element; label: string; danger: boolean; key: string })[] = [
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
]

function App() {
  const [activePage, setActivePage] = useState('home')

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken()

  const Page = activePage === 'settings' ? Settings : Home

  const handleUserMenuClick: MenuProps['onClick'] = ({ key }) => {
    if (key === 'profile') {
      // TODO: 跳转个人中心
    } else if (key === 'settings') {
      setActivePage('settings')
    } else if (key === 'logout') {
      // TODO: 退出登录逻辑
    }
  }

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
          items={[{ key: 'home', icon: <HomeOutlined />, label: '首页' }]}
          onClick={({ key }) => setActivePage(key)}
          className="header-menu"
        />

        <div className="header-right">
          <Dropdown
            menu={{ items: userMenuItems as NonNullable<MenuProps['items']>, onClick: handleUserMenuClick }}
            placement="bottomRight"
            trigger={['click']}
          >
            <UserOutlined className="header-avatar" />
          </Dropdown>
        </div>
      </Header>

      <Content className="main-content">
        <div
          style={{
            padding: '24px',
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
            minHeight: 280,
          }}
        >
          <Page />
        </div>
      </Content>
    </Layout>
  )
}

export default App
