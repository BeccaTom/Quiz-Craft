import React from 'react';
import {
  Card, Form, Input, Button, Space, message, Row, Col,
} from 'antd';
import { useNavigate } from 'react-router-dom';
import fetchData from '../common/fetchData';
import sty from './Register.module.css';

/* Register: The registration page displays a form
that allows users to create a new account in the app's
mySQL database by submitting their name, email, and password. */

export default function Register() {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const onFinish = async (data) => {
    try {
      const res = await fetchData({
        url: '/user/register',
        method: 'POST',
        data,
      });
      window.localStorage.setItem('userinfo', JSON.stringify(res.data));
      message.success('Registration successful!');
      navigate('/');
    } catch (error) {
      message.error('There was an error registering a new user.');
    }
  };

  return (
    <div className={sty.box}>
      <Card className={sty.card} title="Register" bordered={false}>
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
            label="Name"
            name="name"
            rules={[{ required: true, message: 'Name cannot be empty!' }]}
          >
            <Input />
          </Form.Item>
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
                onClick={() => {
                  form.submit();
                }}
              >
                Register
              </Button>
            </Space>
          </Form.Item>
          <Row justify="center">
            <Col>
              <Button
                onClick={() => {
                  navigate('/login');
                }}
                type="link"
              >
                Already have an account? Click here to login now.
              </Button>
            </Col>
          </Row>
        </Form>
      </Card>
    </div>
  );
}
