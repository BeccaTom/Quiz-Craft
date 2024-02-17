import React, { useEffect } from "react";
import fetchData from "../common/fetchData";
import {
  Form,
  Card,
  Button,
  Checkbox,
  message,
  Select,
  Switch,
  Radio,
} from "antd";
import { useNavigate, useParams } from "react-router-dom";
import banner from "../img/banner.png";
import sty from "./home.module.css";

export default function Home() {
  const navigate = useNavigate();
  const [form] = Form.useForm();

  return (
    <Card
      title="Home"
      className={sty.box}
      extra={
        <Button
          type="primary"
          onClick={() => {
            form.submit();
          }}
        >
          Start
        </Button>
      }
    >
      <div className={sty.cardBox}>
        <div className={sty.bannerBox}>
          <img className={sty.banner} src={banner} />
        </div>

        <Form
          form={form}
          style={{
            width: "80%",
          }}
          name="form"
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
          onFinish={(v) => {
            console.log("v = ", v)
            window.sessionStorage.config = JSON.stringify(v);
            navigate('/answerBoard');
          }}
          autoComplete="off"
        >
          <Form.Item initialValue="test" label="Mode" name="mode">
            <Radio.Group>
              <Radio value="test">test</Radio>
              <Radio value="practice">practice</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item initialValue={true} label="Timer" name="timer">
            <Switch checkedChildren="On" unCheckedChildren="Off" defaultChecked />
          </Form.Item>
          <Form.Item
            label="Question Format"
            name="type"
            rules={[
              {
                required: true,
                message: "Please select a question format!",
              },
            ]}
          >
            <Checkbox.Group
              options={[
                {
                  label: "True/False",
                  value: "True/False",
                },
                {
                  label: "Single",
                  value: "Single",
                },
                {
                  label: "Multiple",
                  value: "Multiple",
                },
              ]}
            />
          </Form.Item>
          <Form.Item
            label="Difficulty"
            name="difficulty"
            rules={[
              {
                required: true,
                message: "Please select a difficulty level!",
              },
            ]}
          >
            <Select
              style={{
                width: "100%",
              }}
              options={[
                {
                  value: "Easy",
                  label: "Easy",
                },
                {
                  value: "Medium",
                  label: "Medium",
                },
                {
                  value: "Difficult",
                  label: "Difficult",
                },
              ]}
            />
          </Form.Item>

          <Form.Item
            label="Subject"
            name="subject"
            rules={[
              {
                required: true,
                message: "Please select a subject!",
              },
            ]}
          >
            <Select
              style={{
                width: "100%",
              }}
              options={[
                {
                  value: "Programming",
                  label: "Programming",
                },
                {
                  value: "Math",
                  label: "Math",
                },
                {
                  value: "Physics",
                  label: "Physics",
                },
              ]}
            />
          </Form.Item>
        </Form>
      </div>
    </Card>
  );
}
