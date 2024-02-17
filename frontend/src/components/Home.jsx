import React from 'react';
import {
  Form,
  Card,
  Button,
  Checkbox,
  Select,
  Switch,
  Radio,
} from 'antd';
import { useNavigate } from 'react-router-dom';
import banner from '../img/banner.png';
import sty from './Home.module.css';

/* Home: The homepage of the website displays a form where you can choose test options such as
question format, question difficulty, subject matter, whether you want the stopwatch enabled,
and whether you want to answer in test mode or practice mode. */

export default function Home() {
  const navigate = useNavigate();
  const [form] = Form.useForm();

  return (
    <Card
      title="Home"
      className={sty.box}
      extra={(
        <Button
          type="primary"
          onClick={() => {
            form.submit();
          }}
        >
          Start
        </Button>
      )}
    >
      <div className={sty.cardBox}>
        <div className={sty.bannerBox}>
          <img className={sty.banner} alt="banner" src={banner} />
        </div>

        <Form
          form={form}
          style={{
            width: '80%',
          }}
          name="form"
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
          onFinish={(v) => {
            window.sessionStorage.config = JSON.stringify(v);
            navigate('/TestingBoard');
          }}
          autoComplete="off"
        >
          {/* Test Mode Form Input */}
          <Form.Item initialValue="test" label="Mode" name="mode">
            <Radio.Group>
              <Radio value="test">Test Mode</Radio>
              <Radio value="practice">Practice Mode</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item initialValue label="Timer" name="timer">
            <Switch checkedChildren="On" unCheckedChildren="Off" defaultChecked />
          </Form.Item>
          <Form.Item
            label="Question Format"
            name="type"
            rules={[
              {
                required: true,
                message: 'Please select a question format!',
              },
            ]}
          >
            <Checkbox.Group
              options={[
                {
                  label: 'True/False',
                  value: 'True/False',
                },
                {
                  label: 'Single',
                  value: 'Single',
                },
                {
                  label: 'Multiple',
                  value: 'Multiple',
                },
              ]}
            />
          </Form.Item>
          {/* Difficulty Level Form Input */}
          <Form.Item
            label="Difficulty"
            name="difficulty"
            rules={[
              {
                required: true,
                message: 'Please select a difficulty level!',
              },
            ]}
          >
            <Select
              style={{
                width: '100%',
              }}
              options={[
                {
                  value: 'Easy',
                  label: 'Easy',
                },
                {
                  value: 'Medium',
                  label: 'Medium',
                },
                {
                  value: 'Difficult',
                  label: 'Difficult',
                },
              ]}
            />
          </Form.Item>
          {/* Subject Matter Form Input */}
          <Form.Item
            label="Subject"
            name="subject"
            rules={[
              {
                required: true,
                message: 'Please select a subject!',
              },
            ]}
          >
            <Select
              style={{
                width: '100%',
              }}
              options={[
                {
                  value: 'Programming',
                  label: 'Programming',
                },
                {
                  value: 'Math',
                  label: 'Math',
                },
                {
                  value: 'Physics',
                  label: 'Physics',
                },
              ]}
            />
          </Form.Item>
        </Form>
      </div>
    </Card>
  );
}
