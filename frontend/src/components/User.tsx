import React, { useState } from "react";
import { Form, Input, Button, Checkbox } from "antd";
import axios from "axios";

interface UserInfo {
  username: string,
  password: string
}

function Signin() {
  const [ username, setUsername ] = useState("please Sign in")
  const onFinish = (values: UserInfo)=> {
    console.log('Success:', values);
    axios.get('http://localhost:5000/api/user/1', {
      auth: {
        username: values.username,
        password: values.password
      }
    }).then(result => {
      setUsername(result.data.username)
    })

  };

  const onFinishFailed = (errorInfo: Object)=> {
    console.log('Failed:', errorInfo);
  };

  return (
    <div>
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
      <p>{ username }</p>
    </div>
  )
}

export default Signin
