import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Form, Input, Button, Checkbox, message } from "antd";
import axios from "axios";

interface UserInfo {
  username: string,
  password: string
}

function Signin() {
  const dispatch = useDispatch()
  const onFinish = (values: UserInfo)=> {
    console.log('Success:', values);
    axios.get('http://localhost:5000/api/user/info', {
      auth: {
        username: values.username,
        password: values.password
      }
    }).then(result => {
      dispatch({type: "LOGIN", payload: {
        username: result.data.username
      }})
      message.success("Welcome, "+ result.data.username);
    })
  };

  const onFinishFailed = (errorInfo: Object)=> {
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
  )
}

function Register() {
  return (
    <p>Register</p>
  )
}

function User() {
  const user = useSelector((state: any) => state.user)
  const [register, setRegister] = useState(false);

  return (
    <>
      {user.username}
      {
        register ? (
          <div>
            <Register />
            Already have an account? 
            <Button type="link" onClick={() => setRegister(false)}>Signin</Button>
          </div>
        ) : (
          <div>
            <Signin />
            Doesn't have an account?
            <Button type="link" onClick={() => setRegister(true)}>Register</Button>
          </div>
        )
      }
    </>
  )
}

export default User
