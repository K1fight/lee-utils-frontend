import { useState } from 'react'
import NavBar from "../../components/NavBar";
import WeatherCard from "../../components/WeatherCard";

export default function Home() {
  const [count, setCount] = useState(0)

  return (
      <>
          <div className={"navbar-container"}>
              <NavBar/>
          </div>

          <h2>欢迎使用 Lee Utils</h2>
          <p>这是一个集成了天气卡片侧边栏的 React + Ant Design 项目。</p>

          <div style={{ marginTop: '24px' }}>
            <button
              type="button"
              className="counter"
              onClick={() => setCount((c) => c + 1)}
            >
              Count is {count}
            </button>
          </div>
          <div>
              <WeatherCard/>
          </div>

    </>
  )
}
