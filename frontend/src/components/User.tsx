import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Input, Button, Checkbox, message } from 'antd';
import axios from 'axios';
import qs from 'qs';

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

function Signin() {
  const dispatch = useDispatch();
  const onFinish = (values: UserInfo) => {
    console.log('Success:', values);
    axios
      .get('http://localhost:5000/api/user/info', {
        auth: {
          username: values.username,
          password: values.password,
        },
      })
      .then((result) => {
        dispatch({
          type: 'LOGIN',
          payload: {
            username: result.data.username,
          },
        });
        message.success('Welcome, ' + result.data.username);
      })
      .catch((error) => {
        console.log(error.response);
        message.error('Error');
      });
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
      const data = {
        username: values.username,
        password: values.password,
        email: values.email,
      };
      console.log(data);
      axios
        .post('http://localhost:5000/api/user', qs.stringify(data), {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        })
        .then((res) => {
          console.log(res);
          console.log(res.data);
        })
        .catch((error) => {
          console.log(error);
        });
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
      {user.username}
      {register ? (
        <div>
          <Register />
          Already have an account?
          <Button type="link" onClick={() => setRegister(false)}>
            Signin
          </Button>
        </div>
      ) : (
        <div>
          <Signin />
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
