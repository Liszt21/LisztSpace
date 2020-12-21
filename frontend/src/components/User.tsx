import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Form, Input, Button, Checkbox } from 'antd';
import { login, register } from '../api';

interface UserInfo {
  username: string;
  password: string;
}

interface RegisterInfo {
  username: string;
  password: string;
  email: string;
  confirm: string;
}

function Login() {
  const onFinish = (values: UserInfo) => {
    login(values.username, values.password);
  };

  const onFinishFailed = (errorInfo: Object) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Form
      name="basic"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item
        label="Username"
        name="username"
        rules={[{ required: true, message: 'Please input your username!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item name="remember" valuePropName="checked">
        <Checkbox>Remember me</Checkbox>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
}

function Register() {
  const onFinish = (values: RegisterInfo) => {
    if (values.password === values.confirm) {
      register(values.username, values.password, values.email);
    }
  };
  return (
    <Form name="Register" onFinish={onFinish}>
      <Form.Item
        label="Username"
        name="username"
        rules={[{ required: true, message: 'Please provide username' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Email address"
        name="email"
        rules={[{ required: true, message: 'Please provide email' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item
        label="Confirm"
        name="confirm"
        rules={[{ required: true, message: 'Please confirm your password!' }]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
}

function User() {
  const user = useSelector((state: any) => state.user);
  const [register, setRegister] = useState(false);

  return (
    <>
      {user.username ? (
        user.username
      ) : register ? (
        <div>
          <Register />
          Already have an account?
          <Button type="link" onClick={() => setRegister(false)}>
            Signin
          </Button>
        </div>
      ) : (
        <div>
          <Login />
          Doesn't have an account?
          <Button type="link" onClick={() => setRegister(true)}>
            Register
          </Button>
        </div>
      )}
    </>
  );
}

export default User;
