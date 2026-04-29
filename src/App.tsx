import { useState } from 'react'
import { Layout, Menu, theme } from 'antd'
import { 
  HomeOutlined, 
  SettingOutlined, 
  UserOutlined,
  CloudOutlined
} from '@ant-design/icons'
import WeatherCard from './components/WeatherCard'
import './App.css'

const { Sider, Content, Header } = Layout

function App() {
  const [count, setCount] = useState(0)
  const [collapsed, setCollapsed] = useState(false)
  
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken()

  const menuItems = [
    {
      key: 'home',
      icon: <HomeOutlined />,
      label: '首页',
    },
    {
      key: 'user',
      icon: <UserOutlined />,
      label: '用户',
    },
    {
      key: 'settings',
      icon: <SettingOutlined />,
      label: '设置',
    },
  ]

  return (
    <Layout style={{ minHeight: '100vh' }}>
      {/* 侧边栏 */}
      <Sider 
        trigger={null} 
        collapsible 
        collapsed={collapsed}
        theme="light"
        style={{
          boxShadow: '2px 0 8px rgba(0,0,0,0.05)',
        }}
      >
        <div className="logo">
          <CloudOutlined style={{ fontSize: '24px', color: '#1890ff' }} />
          {!collapsed && <span className="logo-text">Utils</span>}
        </div>
        
        <Menu
          mode="inline"
          defaultSelectedKeys={['home']}
          items={menuItems}
          style={{ borderRight: 'none' }}
        />
        
        {/* 天气卡片 - 固定在侧边栏底部 */}
        {!collapsed && (
          <div className="weather-card-container">
            <WeatherCard />
          </div>
        )}
      </Sider>

      <Layout>
        <Header style={{ 
          padding: '0 24px', 
          background: colorBgContainer,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          boxShadow: '0 1px 4px rgba(0,0,0,0.05)'
        }}>
          <h1 style={{ margin: 0, fontSize: '18px' }}>Lee Utils</h1>
          <div>
            <UserOutlined style={{ fontSize: '18px', color: '#8c8c8c' }} />
          </div>
        </Header>
        
        <Content style={{ 
          margin: '24px', 
          padding: '24px',
          background: colorBgContainer,
          borderRadius: borderRadiusLG,
          minHeight: 280,
        }}>
          <h2>欢迎使用 Lee Utils</h2>
          <p>这是一个集成了天气卡片侧边栏的 React + Ant Design 项目。</p>
          
          <div style={{ marginTop: '24px' }}>
            <button
              type="button"
              className="counter"
              onClick={() => setCount((count) => count + 1)}
            >
              Count is {count}
            </button>
          </div>
        </Content>
      </Layout>
    </Layout>
  )
}

export default App
