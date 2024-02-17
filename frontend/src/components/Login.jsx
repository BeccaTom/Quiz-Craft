import React from 'react';
import {
  Card, Form, Input, Button, Space, message, Row, Col,
} from 'antd';
import { useNavigate } from 'react-router-dom';
import fetchData from '../common/fetchData';
import sty from './Login.module.css';

/* Login: The login page displays a form where you can login with your email and password
if you already have an account. It also gives an option to go to the registration page
if you don't have an account yet. */

export default function Login() {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const onFinish = async (data) => {
    try {
      const res = await fetchData({
        url: '/user/login',
        method: 'POST',
        data,
      });
      window.localStorage.setItem('userinfo', JSON.stringify(res.data));
      message.success('Login successful!');
      navigate('/');
    } catch (error) {
      message.error('There was an error logging you in.');
    }
  };

  return (
    <div className={sty.box}>
      <Card className={sty.card} title="Login" bordered={false}>
        <Form
          form={form}
          name="form"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: 'Email cannot be empty!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="pwd"
            label="Password"
            rules={[
              {
                required: true,
                message: 'Password cannot be empty!',
              },
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Space>
              <Button
                type="primary"
                onClick={(e) => {
                  e.preventDefault();
                  form.submit();
                }}
              >
                Login
              </Button>
            </Space>
          </Form.Item>
          <Row justify="center">
            <Col>
              <Button
                onClick={() => {
                  navigate('/register');
                }}
                type="link"
              >
                No account yet? Click here to register now.
              </Button>
            </Col>
          </Row>
        </Form>
      </Card>
    </div>
  );
}
