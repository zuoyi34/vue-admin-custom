import React, { useEffect, useState } from 'react';
import { Table, Input } from 'antd';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const { Search } = Input;

const DeviceList = () => {
  const [devices, setDevices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchDevices();
  }, []);

  const fetchDevices = async () => {
    setLoading(true);
    try {
      const res = await axios.get('/api/devices');
      setDevices(res.data);
    } catch (error) {
      console.error('获取设备数据失败', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredDevices = devices.filter(device =>
    device.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const columns = [
    { title: '设备名称', dataIndex: 'name', key: 'name' },
    { title: '设备型号', dataIndex: 'model', key: 'model' },
    { title: '系统版本', dataIndex: 'osVersion', key: 'osVersion' },
    { title: '登录时间', dataIndex: 'loginTime', key: 'loginTime' },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <a onClick={() => navigate(`/device/${record.id}`)}>查看详情</a>
      )
    }
  ];

  return (
    <div>
      <Search
        placeholder="搜索设备名称"
        onSearch={value => setSearchText(value)}
        style={{ width: 300, marginBottom: 20 }}
        allowClear
      />
      <Table
        dataSource={filteredDevices}
        columns={columns}
        rowKey="id"
        loading={loading}
      />
    </div>
  );
};

export default DeviceList;