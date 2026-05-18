import { useState } from 'react'
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
import WeatherCard from "./components/WeatherCard";
import NavBar from "./components/NavBar";



function App() {


return (
    <Home/>
)


}

export default App
