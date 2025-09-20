import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import DeviceList from './components/DeviceList';
import DeviceDetail from './components/DeviceDetail';

const { Header, Content } = Layout;

const App = () => (
  <Router>
    <Layout style={{ minHeight: '100vh' }}>
      <Header>
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['devices']}
          items={[{ key: 'devices', label: '设备管理' }]}
        />
      </Header>
      <Content style={{ padding: '20px 50px', background: '#fff' }}>
        <Routes>
          <Route path="/" element={<DeviceList />} />
          <Route path="/device/:id" element={<DeviceDetail />} />
        </Routes>
      </Content>
    </Layout>
  </Router>
);

export default App;