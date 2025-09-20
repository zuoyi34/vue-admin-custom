import React, { useEffect, useState } from 'react';
import { Tabs, List, Image, Spin, Alert } from 'antd';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const DeviceDetail = () => {
  const { id } = useParams();
  const [deviceData, setDeviceData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchDeviceDetail();
  }, [id]);

  const fetchDeviceDetail = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get(`/api/devices/${id}`);
      setDeviceData(res.data);
    } catch (err) {
      setError('加载设备详情失败');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Spin tip="加载中..." />;
  if (error) return <Alert message={error} type="error" />;

  const { contacts = [], messages = [], photos = [], location = null } = deviceData;

  return (
    <Tabs defaultActiveKey="contacts" type="line">
      <Tabs.TabPane tab="通讯录" key="contacts">
        <List
          bordered
          dataSource={contacts}
          renderItem={item => (
            <List.Item>
              <List.Item.Meta
                title={item.name}
                description={`电话: ${item.phone}`}
              />
            </List.Item>
          )}
        />
      </Tabs.TabPane>

      <Tabs.TabPane tab="短信" key="messages">
        <List
          bordered
          dataSource={messages}
          renderItem={item => (
            <List.Item>
              <List.Item.Meta
                title={item.sender}
                description={item.content}
              />
              <div>{item.date}</div>
            </List.Item>
          )}
        />
      </Tabs.TabPane>

      <Tabs.TabPane tab="相册" key="photos">
        <List
          grid={{ gutter: 16, column: 4 }}
          dataSource={photos}
          renderItem={url => (
            <List.Item>
              <Image src={url} alt="photo" />
            </List.Item>
          )}
        />
      </Tabs.TabPane>

      <Tabs.TabPane tab="定位" key="location">
        {location ? (
          <iframe
            title="device-location"
            width="100%"
            height="400px"
            style={{ border: 0 }}
            src={`https://www.google.com/maps?q=${location.latitude},${location.longitude}&hl=zh-CN&z=15&output=embed`}
            allowFullScreen
          />
        ) : (
          <div>无定位数据</div>
        )}
      </Tabs.TabPane>
    </Tabs>
  );
};

export default DeviceDetail;