import React, { useState } from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import { Layout, Menu, Avatar, Input, Space } from 'antd';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import { UserOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import Home from '../views/Home';
import Tools from '../views/Tools';
import About from '../views/About';

const { Header, Content, Sider, Footer } = Layout;
const { Search } = Input;

function Main() {
  return (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route path="/tools">
        <Tools />
      </Route>
      <Route path="/about">
        <About />
      </Route>
    </Switch>
  );
}

const Wrapper = styled.div`
  .content {
    background-color: #fff;
    min-height: calc(100vh - 134px);
  }
`;

const MainLayout = () => {
  const [sider, setSider] = useState(false);
  return (
    <Wrapper>
      <Layout>
        <Header>
          <Space>
            {React.createElement(sider ? MenuUnfoldOutlined : MenuFoldOutlined, {
              className: 'trigger',
              onClick: () => setSider(!sider),
            })}
            <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
              <Menu.Item key="1">
                <Link to="/">Home</Link>
              </Menu.Item>
              <Menu.Item key="2">
                <Link to="/tool">Tool</Link>
              </Menu.Item>
              <Menu.Item key="3">
                <Link to="/about">About</Link>
              </Menu.Item>
            </Menu>
            <Search
              className="searcher"
              placeholder="search"
              allowClear
              enterButton="Search"
              style={{ verticalAlign: 'middle' }}
            />
            <Avatar icon={<UserOutlined />} />
            <span>User</span>
          </Space>
        </Header>
        <Layout>
          {sider ? <Sider>Sider</Sider> : null}
          <Content className="content" style={{ padding: 24 }}>
            <Main></Main>
          </Content>
        </Layout>

        <Footer>Liszt Space ©2020 Created by Liszt21</Footer>
      </Layout>
    </Wrapper>
  );
};

export default MainLayout;
