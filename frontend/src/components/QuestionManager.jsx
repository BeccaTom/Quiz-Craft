import React, { useState, useEffect } from 'react';
import {
  message,
  Pagination,
  Form,
  Input,
  Button,
  Table,
  Space,
  Modal,
  Select,
  Popconfirm,
  Tag,
  Card,
} from 'antd';
import { CheckCircleOutlined } from '@ant-design/icons';
import sty from './QuestionManager.module.css';
import request from '../common/fetchData';

const { TextArea } = Input;
const { Option } = Select;

/* QuestionManager: The question manager page displays a list of all the questions
existing inside the app's MySQL database, along with their corresponding labels
(such as difficulty level, subject matter, and format). There is also a button
which leads to a page for creating a new question. Users also have the option to
edit or delete existing questions. */

export default function QuestionManager() {
  const [form] = Form.useForm();
  const [options, setOptions] = useState([
    {
      value: '',
    },
    {
      value: '',
    },
  ]);
  const [modelForm] = Form.useForm();
  const [query, setQuery] = useState({
    index: 1,
    title: '',
  });

  const [source, setSource] = useState({ data: [] });
  const [currentItem, setCurrentItem] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentOperation, setCurrentOperation] = useState('ADD');

  const OPERATION_MAP_TEXT = {
    ADD: 'Create New Question',
    EDIT: 'Edit Question',
  };
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    modelForm.submit();
  };
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const getData = () => {
    request({
      url: '/question',
      method: 'get',
      params: {
        ...query,
      },
    }).then((res) => {
      setSource({
        data: res.data.rows,
        total: res.data.count,
      });
    });
  };

  const remove = (id) => {
    request({
      url: `/question/${id}`,
      method: 'delete',
    }).then(() => {
      getData();
      message.success('Successfully deleted!');
    });
  };

  const hasDuplicateValues = (arr) => {
    const valueSet = {};
    for (const obj of arr) {
      const { value } = obj;
      if (valueSet[value]) {
        return true;
      }
      valueSet[value] = true;
    }
    return false;
  };

  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Subject',
      dataIndex: 'subject',
      key: 'subject',
      render: (text, record) => <Tag>{record.subject}</Tag>,
    },
    {
      title: 'Question Type',
      dataIndex: 'type',
      key: 'type',
      render: (text, record) => {
        if (record.type === 'Single') {
          return <Tag color="blue">Single</Tag>;
        }
        if (record.type === 'Multiple') {
          return <Tag color="purple">Multiple</Tag>;
        }
        return <Tag color="cyan">True/False</Tag>;
      },
    },
    {
      title: 'Difficulty',
      dataIndex: 'difficulty',
      key: 'difficulty',
      render: (text, record) => {
        if (record.difficulty === 'Easy') {
          return <Tag color="success">Easy</Tag>;
        }
        if (record.difficulty === 'Medium') {
          return <Tag color="warning">Medium</Tag>;
        }
        return <Tag color="error">Difficult</Tag>;
      },
    },
    {
      title: 'Operation',
      dataIndex: 'operation',
      key: 'operation',
      render(text, t) {
        return (
          <Space>
            <Button
              onClick={() => {
                setIsModalVisible(true);
                setCurrentOperation('EDIT');
                setCurrentItem(t);
                const {
                  title,
                  type,
                  options,
                  answer,
                  difficulty,
                  subject,
                  desc,
                } = t;
                const deepOptions = [];
                const optionsArr = options.split('~');
                const answerArr = answer.split('~');
                optionsArr.forEach((v) => {
                  const oIndex = answerArr.findIndex((item) => v === item);
                  if (oIndex === -1) {
                    deepOptions.push({
                      value: v,
                      isAnswer: false,
                    });
                  } else {
                    deepOptions.push({
                      value: v,
                      isAnswer: true,
                    });
                  }
                });
                setOptions(deepOptions);
                setTimeout(() => {
                  modelForm.setFieldsValue({
                    title,
                    type,
                    difficulty,
                    subject,
                    desc,
                  });
                }, 500);
              }}
              type="primary"
            >
              edit
            </Button>
            <Popconfirm
              title="Are you sure you want to delete the current test question? This cannot be undone."
              onConfirm={() => remove(t.id)}
              okText="yes"
              cancelText="cancel"
            >
              <Button type="primary" danger>
                delete
              </Button>
            </Popconfirm>
          </Space>
        );
      },
    },
  ];

  useEffect(() => {
    getData();
  }, [query]);

  return (
    <div className={sty.container}>
      <Card
        title="Manage Questions"
        className={sty.box}
        extra={(
          <Button
            type="primary"
            onClick={() => {
              showModal();
              setCurrentOperation('ADD');
              setOptions([
                {
                  value: '',
                },
                {
                  value: '',
                },
              ]);
              setTimeout(() => {
                modelForm.resetFields();
              }, 200);
            }}
          >
            Create Questions
          </Button>
        )}
      >
        <Modal
          width={800}
          title={OPERATION_MAP_TEXT[currentOperation]}
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <Form
            name="modelForm"
            form={modelForm}
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 18 }}
            autoComplete="off"
            onFinish={(v) => {
              const {
                title, difficulty, type, subject, desc,
              } = v;
              let optionsStr = '';
              const answerArr = [];
              const haveEmpty = options.filter((item) => !item.value);
              if (haveEmpty.length) {
                message.error('Empty options are not allowed.');
                return;
              }
              const hasDuplicates = hasDuplicateValues(options);
              if (hasDuplicates) {
                message.error("You can't have duplicate options!");
                return;
              }
              const noAnswer = options.filter((item) => {
                if (item.isAnswer) {
                  answerArr.push(item.value);
                }
                return item.isAnswer;
              });
              if (noAnswer.length === 0) {
                message.error('You must select at least one answer to be correct!');
                return;
              }
              optionsStr = options
                .map((item) => item.value)
                .join('~');
              const answerStr = answerArr.join('~');

              const bodyData = {
                title,
                difficulty,
                subject,
                type,
                desc,
                answer: answerStr,
                options: optionsStr,
              };
              if (currentOperation === 'ADD') {
                request({
                  url: '/question',
                  method: 'post',
                  data: bodyData,
                }).then((res) => {
                  if (res.code === -1) {
                    message.error(res.msg);
                  } else {
                    message.success('Successfully added!');
                    getData();
                    setIsModalVisible(false);
                  }
                });
              } else {
                request({
                  url: `/question/${currentItem.id}`,
                  method: 'put',
                  data: bodyData,
                }).then((res) => {
                  if (res.code === -1) {
                    message.error(res.msg);
                  } else {
                    message.success('Edited successfully!');
                    getData();
                    setIsModalVisible(false);
                  }
                });
              }
            }}
            onFinishFailed={() => {}}
          >
            <Form.Item
              label="Title"
              name="title"
              rules={[
                {
                  required: true,
                  message: 'Please enter a question title!',
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Difficulty"
              name="difficulty"
              rules={[{ required: true, message: 'Please select difficulty level!' }]}
            >
              <Select style={{ width: '100%' }}>
                <Option value="Easy">Easy</Option>
                <Option value="Medium">Medium</Option>
                <Option value="Difficult">Difficult</Option>
              </Select>
            </Form.Item>

            <Form.Item
              label="Subject"
              name="subject"
              rules={[{ required: true, message: 'Please select a subject!' }]}
            >
              <Select style={{ width: '100%' }}>
                <Option value="Programming">Program</Option>
                <Option value="Math">Math</Option>
                <Option value="Physics">Physics</Option>
              </Select>
            </Form.Item>

            <Form.Item
              label="Question Type"
              name="type"
              initialValue="Single"
              rules={[
                { required: true, message: 'Please select a question type!' },
              ]}
            >
              <Select
                onChange={(val) => {
                  if (val === 'True/False') {
                    setOptions([
                      {
                        value: 'Right',
                      },
                      {
                        value: 'Wrong',
                      },
                    ]);
                  } else {
                    setOptions([
                      {
                        value: '',
                      },
                      {
                        value: '',
                      },
                    ]);
                  }
                }}
                style={{ width: '100%' }}
              >
                <Option value="Single">Single</Option>
                <Option value="Multiple">Multiple</Option>
                <Option value="True/False">True/False</Option>
              </Select>
            </Form.Item>
            <Form.Item label="Question Options">
              <Button
                onClick={() => {
                  if (modelForm.getFieldValue('type') === 'True/False') {
                    message.error('True/False questions can only have 2 options!');
                    return;
                  }
                  const newOptions = [...options];
                  newOptions.push({
                    value: '',
                  });
                  setOptions(newOptions);
                }}
                type="primary"
              >
                New Options
              </Button>
            </Form.Item>

            {options.map((item, index) => (
              <Form.Item
                key={index}
                label={(
                  <span
                    style={{
                      opacity: 0,
                    }}
                  >
                    1
                  </span>
                  )}
                colon={false}
              >
                <Space>
                  <Input
                    value={item.value}
                    readOnly={modelForm.getFieldValue('type') === 'True/False'}
                    onChange={(e) => {
                      const newOptions = [...options];
                      newOptions[index].value = e.target.value;
                      setOptions(newOptions);
                    }}
                  />
                  <Button
                    size="small"
                    type="primary"
                    danger
                    onClick={() => {
                      const newOptions = [...options];
                      if (newOptions.length === 2) {
                        message.error('At least 2 options!');
                        return;
                      }
                      newOptions.splice(index, 1);
                      setOptions(newOptions);
                    }}
                  >
                    delete
                  </Button>
                  <Button
                    onClick={() => {
                      const newOptions = [...options];
                      const qType = modelForm.getFieldValue('type');
                      if (qType === 'Single' || qType === 'True/False') {
                        newOptions.forEach((optionItem) => {
                          optionItem.isAnswer = false;
                        });
                        newOptions[index].isAnswer = true;
                      } else {
                        newOptions[index].isAnswer = !newOptions[index].isAnswer;
                      }
                      setOptions(newOptions);
                    }}
                    size="small"
                    type={item.isAnswer ? 'primary' : 'default'}
                    shape="circle"
                    icon={<CheckCircleOutlined />}
                  />
                </Space>
              </Form.Item>
            ))}
            <Form.Item
              label="Question Analysis"
              name="desc"
              rules={[
                {
                  required: true,
                  message: 'Please enter question analysis!',
                },
              ]}
            >
              <TextArea rows={4} />
            </Form.Item>
          </Form>
        </Modal>
        <div
          style={{
            marginBottom: 30,
          }}
          className={sty.SearchBox}
        >
          <Form
            layout="inline"
            form={form}
            onFinish={(v) => {
              setQuery({
                ...query,
                ...v,
                index: 1,
              });
            }}
          >
            <Form.Item label="Title" name="title">
              <Input
                placeholder="Please enter a question title!"
                allowClear
              />
            </Form.Item>

            <Form.Item>
              <Space>
                <Button type="primary" htmlType="submit">
                  Search
                </Button>
                <Button
                  type="primary"
                  danger
                  onClick={() => {
                    form.resetFields();
                    setQuery({
                      index: 1,
                      title: '',
                    });
                  }}
                >
                  Reset
                </Button>
              </Space>
            </Form.Item>
          </Form>
        </div>
        <Table
          columns={columns}
          rowKey={(v) => v.id}
          pagination={false}
          dataSource={source.data}
        />
        <div
          style={{
            textAlign: 'center',
            margin: '20px 0',
          }}
        >
          <Pagination
            showSizeChanger={false}
            onChange={(current) => {
              setQuery({
                ...query,
                index: current,
              });
            }}
            total={source.total}
          />
        </div>
      </Card>
    </div>
  );
}
