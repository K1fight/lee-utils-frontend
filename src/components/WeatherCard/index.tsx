import { useState, useEffect } from 'react';
import { Card, Typography, Space, Tag, Skeleton } from 'antd';
import { 
  CloudOutlined, 
  SunOutlined, 
  ThunderboltOutlined,
  CloudFilled,
  EnvironmentOutlined,
  ReloadOutlined
} from '@ant-design/icons';
import './index.css';

const { Text, Title } = Typography;

// 天气类型定义
interface WeatherData {
  city: string;
  temperature: number;
  condition: 'sunny' | 'cloudy' | 'rainy' | 'storm' | 'overcast';
  humidity: number;
  windSpeed: number;
  updateTime: string;
}

// 模拟天气数据获取
const fetchWeatherData = async (): Promise<WeatherData> => {
  // 这里可以替换为真实的天气 API
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        city: '北京市',
        temperature: 26,
        condition: 'sunny',
        humidity: 45,
        windSpeed: 3.5,
        updateTime: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })
      });
    }, 800);
  });
};

// 天气图标映射
const WeatherIcon = ({ condition, className }: { condition: string; className?: string }) => {
  const iconProps = { className };
  switch (condition) {
    case 'sunny':
      return <SunOutlined {...iconProps} style={{ color: '#faad14' }} />;
    case 'cloudy':
      return <CloudOutlined {...iconProps} style={{ color: '#8c8c8c' }} />;
    case 'rainy':
      return <CloudFilled {...iconProps} style={{ color: '#1890ff' }} />;
    case 'storm':
      return <ThunderboltOutlined {...iconProps} style={{ color: '#722ed1' }} />;
    case 'overcast':
      return <CloudFilled {...iconProps} style={{ color: '#595959' }} />;
    default:
      return <SunOutlined {...iconProps} style={{ color: '#faad14' }} />;
  }
};

// 天气文本映射
const weatherTextMap: Record<string, string> = {
  sunny: '晴朗',
  cloudy: '多云',
  rainy: '小雨',
  storm: '雷阵雨',
  overcast: '阴天'
};

export default function WeatherCard() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);

  const loadWeather = async () => {
    setLoading(true);
    try {
      const data = await fetchWeatherData();
      setWeather(data);
    } catch (error) {
      console.error('获取天气失败:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadWeather();
  }, []);

  if (loading) {
    return (
      <Card className="weather-card" size="small">
        <Skeleton active paragraph={{ rows: 3 }} />
      </Card>
    );
  }

  if (!weather) {
    return (
      <Card className="weather-card" size="small">
        <Text type="secondary">天气数据加载失败</Text>
      </Card>
    );
  }

  return (
    <Card 
      className="weather-card" 
      size="small"
      extra={
        <ReloadOutlined 
          className="refresh-icon" 
          onClick={loadWeather}
          title="刷新天气"
        />
      }
    >
      <Space direction="vertical" size="small" style={{ width: '100%' }}>
        {/* 城市位置 */}
        <Space>
          <EnvironmentOutlined style={{ color: '#1890ff' }} />
          <Text strong>{weather.city}</Text>
        </Space>

        {/* 主要天气信息 */}
        <div className="weather-main">
          <WeatherIcon condition={weather.condition} className="weather-icon-large" />
          <div className="weather-temp">
            <Title level={3} style={{ margin: 0 }}>
              {weather.temperature}°
            </Title>
            <Tag color="blue" size="small">
              {weatherTextMap[weather.condition]}
            </Tag>
          </div>
        </div>

        {/* 详细信息 */}
        <div className="weather-details">
          <div className="detail-item">
            <Text type="secondary">湿度</Text>
            <Text>{weather.humidity}%</Text>
          </div>
          <div className="detail-divider" />
          <div className="detail-item">
            <Text type="secondary">风速</Text>
            <Text>{weather.windSpeed}m/s</Text>
          </div>
        </div>

        {/* 更新时间 */}
        <Text type="secondary" style={{ fontSize: '12px', textAlign: 'right', display: 'block' }}>
          更新于 {weather.updateTime}
        </Text>
      </Space>
    </Card>
  );
}
