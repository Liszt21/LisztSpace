import React, { useState } from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import Home from '../views/Home';
import Tools from '../views/Tools';
import About from '../views/About';

const { Header, Content, Sider, Footer } = Layout;

function Main() {
  return (
    <Switch>
      <Route exact path="/">
        {' '}
        <Home />{' '}
      </Route>
      <Route path="/tools">
        {' '}
        <Tools />{' '}
      </Route>
      <Route path="/about">
        {' '}
        <About />{' '}
      </Route>
    </Switch>
  );
}

const Wrapper = styled.div`
  height: 100vh;

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
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
            {React.createElement(
              sider ? MenuUnfoldOutlined : MenuFoldOutlined,
              {
                className: 'trigger',
                onClick: () => setSider(!sider),
              }
            )}
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
        </Header>
        <Layout>
          {sider ? <Sider>Sider</Sider> : null}
          <Content className="content">
            <Main></Main>
          </Content>
        </Layout>

        <Footer>Liszt Space ©2020 Created by Liszt21</Footer>
      </Layout>
    </Wrapper>
  );
};

export default MainLayout;
