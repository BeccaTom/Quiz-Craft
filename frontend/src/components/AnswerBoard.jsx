import React, { useEffect, useState, useRef } from "react";
import fetchData from "../common/fetchData";
import {
  Form,
  Card,
  Button,
  Tag,
  Input,
  Table,
  Statistic,
  Image,
  Result,
  Typography,
  Row,
  Col,
  Badge,
  Space,
  message,
} from "antd";
import * as echarts from "echarts";
import dayjs from "dayjs";
import {
  CheckCircleOutlined,
  RightCircleOutlined,
  PauseCircleOutlined,
  PlayCircleOutlined,
  SendOutlined,
  DislikeOutlined,
  LikeOutlined,
  ReloadOutlined,
  TrophyOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons";
import { useNavigate, useParams } from "react-router-dom";
import sty from "./AnswerBoard.module.css";

const { Paragraph, Text } = Typography;

const CountdownTimer = ({
  initialTime,
  onTimerComplete,
  isRunning,
  setIsRunning,
}) => {
  const [time, setTime] = useState(initialTime);
  useEffect(() => {
    let intervalId;
    if (isRunning && time > 0) {
      intervalId = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    } else if (time === 0) {
      setIsRunning(false);
      onTimerComplete();
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [isRunning, time, onTimerComplete]);

  const formatTime = (time) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;

    const formattedTime = `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
    return formattedTime;
  };

  return (
    <div
      style={{
        marginRight: 20,
      }}
    >
      <h2
        style={{
          margin: 0,
          padding: 0,
        }}
      >
        {formatTime(time)}
      </h2>
    </div>
  );
};

export default function AnswerBoard() {
  const navigate = useNavigate();
  const [flag, setFlag] = useState(false);
  const [config, setConfig] = useState({});
  const [isRunning, setIsRunning] = useState(true);
  const [isFinished, setIsFinished] = useState(false);
  const [answerRecords, setAnswerRecords] = useState([]);
  const [staticData, setStaticData] = useState({
    correctNum: "",
    score: "",
    time: dayjs(),
    details: [],
    data: [],
  });
  const [questionsArr, setQuestionsArr] = useState([]);
  const [curIndex, setCurIndex] = useState(0);
  const [curRes, setCurRes] = useState(null);
  const [curOpt, setCurOpt] = useState("");
  const [options, setOptions] = useState([]);
  useEffect(() => {
    if (questionsArr.length) {
      const optArr = questionsArr[curIndex].options.split("~").map((item) => {
        return {
          isAnswer: false,
          value: item,
        };
      });
      setOptions(optArr);
      getOptData();
    }
  }, [curIndex, questionsArr]);
  const difficultyColorMap = {
    Easy: "success",
    Medium: "warning",
    Difficult: "error",
  };
  const typeColorMap = {
    "True/False": "cyan",
    Single: "blue",
    Multiple: "purple",
  };

  useEffect(() => {
    if (isFinished) {
      console.log("a = ", answerRecords);
      let wrongNum = answerRecords.filter((v) => {
        return v == "wrong";
      }).length;
      let rightNum = answerRecords.filter((v) => {
        return v == "right";
      }).length;
      let time = dayjs().diff(staticData.time, "second");
      setStaticData({
        correctNum: rightNum,
        score: (rightNum / answerRecords.length) * 100,
        time,
        details: answerRecords,
      });
      initPie([
        { value: rightNum, name: "Correct Number" },
        { value: wrongNum, name: "Wrong Number" },
      ]);
      fetchData({
        url: "/record",
        method: "POST",
        data: {
          userId: JSON.parse(window.localStorage.userinfo).id,
          rightNum,
          wrongNum,
          time,
          type: config.type.join("~"),
          subject: config.subject,
          difficulty: config.difficulty,
        },
      });
    }
  }, [isFinished]);

  const initPie = (data) => {
    let chartDom = document.getElementById("pieBox");
    let myChart = echarts.init(chartDom);
    let option;

    option = {
      title: {
        text: "Your Performance",
        left: "center",
      },
      tooltip: {
        trigger: "item",
      },
      legend: {
        orient: "vertical",
        left: "right",
      },
      series: [
        {
          name: "",
          type: "pie",
          radius: ["40%", "70%"],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 10,
            borderColor: "#fff",
            borderWidth: 2,
          },
          label: {
            show: false,
            position: "center",
          },
          emphasis: {
            label: {
              show: true,
              fontSize: 14,
              fontWeight: "bold",
            },
          },
          labelLine: {
            show: false,
          },
          data,
          color: ["rgb(160, 217, 17)", "#f5222d"],
        },
      ],
    };

    option && myChart.setOption(option);
  };

  useEffect(() => {
    console.log("config = ", window.sessionStorage.config);
    if (window.sessionStorage.config) {
      let configObj = JSON.parse(window.sessionStorage.config);
      configObj.isPractice = configObj.mode == "test" ? false : true;
      console.log("configObj = ", configObj);
      getData(configObj);
      setConfig(configObj);
    }
  }, []);

  const getData = async (params) => {
    try {
      const { difficulty, subject, type } = params;
      const res = await fetchData({
        url: "/question/random",
        method: "GET",
        params: {
          difficulty,
          subject,
          type: type.join("~"),
        },
      });
      console.log("res = ", res);
      setQuestionsArr(res.data);
    } catch (error) {}
  };

  const [optObj, setOptObj] = useState({
    like: false,
    likeNum: 10,
    disLike: false,
    disLikeNum: 20,
  });

  const getOptData = async () => {
    const res = await fetchData({
      url: "/operation/statics",
      method: "GET",
      params: {
        userId: JSON.parse(window.localStorage.userinfo).id,
        questionId: questionsArr[curIndex].id,
      },
    });
    setOptObj(res.data);
    console.log("res.data666 = ", res.data);
    if (res.data.like) {
      setCurOpt("Like");
    }
    if (res.data.disLike) {
      setCurOpt("Dislike");
    }

    if (!res.data.like && !res.data.disLike) {
      setCurOpt("");
    }

    console.log("res666 = ", res);
  };
  console.log("curOpt= ", curOpt);
  return (
    <Card
      extra={
        <Space>
          {isFinished && (
            <Button
              style={{
                width: 100,
              }}
              icon={<ReloadOutlined />}
              type="primary"
              onClick={() => {
                navigate("/");
              }}
            >
              Restart
            </Button>
          )}
          {!isFinished && config.timer && (
            <Button
              disabled={isFinished}
              style={{
                width: 100,
              }}
              icon={
                isRunning ? <PauseCircleOutlined /> : <PlayCircleOutlined />
              }
              type="primary"
              danger={isRunning ? true : false}
              onClick={() => {
                setIsRunning((preState) => {
                  return !preState;
                });
              }}
            >
              {isRunning ? "Pause" : "Resume"}
            </Button>
          )}
          {!isFinished && (
            <Button
              disabled={isFinished || (config.isPractice && flag)}
              icon={
                curIndex == questionsArr.length - 1 || config.isPractice ? (
                  <SendOutlined />
                ) : (
                  <RightCircleOutlined />
                )
              }
              type="primary"
              onClick={() => {
                console.log("options = ", options);
                let isAnswerArr = options.filter((v) => {
                  return v.isAnswer;
                });
                if (isAnswerArr.length == 0) {
                  message.error("Please select an option!");
                  return;
                }
                let answersArr = isAnswerArr.map((v) => {
                  return v.value;
                });
                let answersStr = answersArr.join("~");
                console.log("answersStr = ", answersStr);
                let answer = questionsArr[curIndex].answer;
                console.log("answer = ", answer);
                let deepAnswerRecords = [...answerRecords];

                if (answer == answersStr) {
                  deepAnswerRecords.push("right");
                  if (config.isPractice) {
                    setCurRes(true);
                  }
                } else {

                  deepAnswerRecords.push("wrong");
                  if (config.isPractice) {
                    setCurRes(false);
                  }
                }
                console.log("deepAnswerRecords = ", deepAnswerRecords);
                setAnswerRecords(deepAnswerRecords);
                if (!config.isPractice) {
                  if (curIndex == questionsArr.length - 1) {
                    setIsFinished(true);
                    setIsRunning(false);
                    return;
                  }
                  setCurIndex((pre) => {
                    return pre + 1;
                  });
                } else {
                  setFlag(true);
                }
              }}
            >
              {curIndex == questionsArr.length - 1 || config.isPractice
                ? "Submit"
                : "Next"}
            </Button>
          )}
        </Space>
      }
      title={
        <div>
          {isFinished && <h2>Test Results</h2>}
          {!isFinished && config.timer && (
            <div className={sty.cardHead}>
              <CountdownTimer
                isRunning={isRunning}
                setIsRunning={setIsRunning}
                initialTime={100}
                onTimerComplete={() => {
                  let deepAnswerRecords = [...answerRecords];
                  let isAnswerArr = options.filter((v) => {
                    return v.isAnswer;
                  });
                  if (isAnswerArr.length == 0) {
                    deepAnswerRecords.push("wrong");
                    if (config.isPractice) {
                      setCurRes(false);
                    }
                  } else {
                    let answersArr = isAnswerArr.map((v) => {
                      return v.value;
                    });
                    let answersStr = answersArr.join("~");
                    console.log("answersStr = ", answersStr);
                    let answer = questionsArr[curIndex].answer;
                    console.log("answer = ", answer);

                    if (answer == answersStr) {
                      deepAnswerRecords.push("right");
                      if (config.isPractice) {
                        setCurRes(true);
                      }
                    } else {

                      deepAnswerRecords.push("wrong");
                      if (config.isPractice) {
                        setCurRes(false);
                      }
                    }
                  }
                  let len = questionsArr.length - deepAnswerRecords.length;
                  if (len > 0) {
                    for (let i = 0; i < len; i++) {
                      deepAnswerRecords.push("wrong");
                    }
                    console.log("deepAnswerRecords = ", deepAnswerRecords);
                    setAnswerRecords(deepAnswerRecords);
                  }
                  if (!config.isPractice) {
                    setIsFinished(true);
                  }
                  console.log("Finished counting down...");
                }}
              />
              <Tag
                color={difficultyColorMap[questionsArr[curIndex]?.difficulty]}
              >
                {questionsArr[curIndex]?.difficulty}
              </Tag>
              <Tag color={typeColorMap[questionsArr[curIndex]?.type]}>
                {questionsArr[curIndex]?.type}
              </Tag>
              <Tag>{questionsArr[curIndex]?.subject}</Tag>
              Question {curIndex + 1} of {questionsArr.length}
            </div>
          )}
        </div>
      }
      className={sty.box}
    >
      {isFinished === true && (
        <div className={sty.resultBox}>
          <h1
            style={{
              textAlign: "center",
            }}
          >
            You got{" "}
            <span
              style={{
                color: "#a0d911",
                fontSize: 50,
                margin: "0 10px",
              }}
            >
              {staticData.correctNum}
            </span>{" "}
            questions correct out of{" "}
            <span
              style={{
                color: "#1890ff",
                fontSize: 50,
                margin: "0 10px",
              }}
            >
              10
            </span>
          </h1>
          <div
            style={{
              background: "#ececec",
              padding: 30,
            }}
          >
            <Row gutter={16}>
              <Col span={12}>
                <Card>
                  <Statistic
                    title="Your Score"
                    value={staticData.score}
                    precision={2}
                    valueStyle={{
                      color: "#3f8600",
                    }}
                    prefix={<TrophyOutlined />}
                    suffix="%"
                  />
                </Card>
              </Col>
              <Col span={12}>
                <Card>
                  <Statistic
                    title="Time Spent"
                    value={staticData.time}
                    precision={2}
                    valueStyle={{
                      color: "#1890ff",
                    }}
                    prefix={<ClockCircleOutlined />}
                    suffix="s"
                  />
                </Card>
              </Col>
            </Row>
          </div>
          <div className={sty.chartBox}>
            <div className={sty.chartLeft}>
              <h2
                style={{
                  textAlign: "center",
                  marginBottom: 30,
                }}
              >
                Answer Details
              </h2>
              <div
                className={sty.circleItemBox}
                style={{
                  marginBottom: 30,
                }}
              >
                {staticData.details.slice(0, 5).map((item, index) => {
                  let bol = item == "right";
                  return bol ? (
                    <div className={sty.circleItem}>{index + 1}</div>
                  ) : (
                    <div className={sty.circleItemR}>{index + 1}</div>
                  );
                })}
              </div>
              <div className={sty.circleItemBox}>
                {staticData.details.slice(5, 10).map((item, index) => {
                  let bol = item == "right";
                  return bol ? (
                    <div className={sty.circleItem}>{index + 6}</div>
                  ) : (
                    <div className={sty.circleItemR}>{index + 6}</div>
                  );
                })}
              </div>
            </div>
            <div id="pieBox" className={sty.pieBox}></div>
          </div>
        </div>
      )}
      {isFinished === false && (
        <Card>
          <h2>{questionsArr[curIndex]?.title}</h2>
          {curRes !== null && curRes === true && (
            <Result
              status="success"
              title="Correct Answer"
              extra={
                <Button
                  icon={
                    curIndex == questionsArr.length - 1 ? (
                      <SendOutlined />
                    ) : (
                      <RightCircleOutlined />
                    )
                  }
                  type="primary"
                  onClick={() => {
                    setCurRes(null);
                    setFlag(false);
                    if (curIndex == questionsArr.length - 1) {
                      setIsFinished(true);
                      setIsRunning(false);
                      return;
                    }
                    setCurIndex((pre) => {
                      return pre + 1;
                    });
                  }}
                >
                  {curIndex == questionsArr.length - 1 ? "Submit" : "Next"}
                </Button>
              }
            >
              <Paragraph>
                <Text
                  strong
                  style={{
                    fontSize: 16,
                  }}
                >
                  Question Analysisis:
                </Text>
              </Paragraph>
              <Paragraph>{questionsArr[curIndex]?.desc}</Paragraph>
            </Result>
          )}
          {curRes !== null && curRes === false && (
            <Result
              status="error"
              title="Incorrect Answer"
              extra={
                <Button
                  icon={
                    curIndex == questionsArr.length - 1 ? (
                      <SendOutlined />
                    ) : (
                      <RightCircleOutlined />
                    )
                  }
                  type="primary"
                  onClick={() => {
                    setCurRes(null);
                    setFlag(false);
                    if (curIndex == questionsArr.length - 1) {
                      setIsFinished(true);
                      setIsRunning(false);
                      return;
                    }
                    setCurIndex((pre) => {
                      return pre + 1;
                    });
                  }}
                >
                  {curIndex == questionsArr.length - 1 ? "Submit" : "Next"}
                </Button>
              }
            >
              <Paragraph>
                <Text
                  strong
                  style={{
                    fontSize: 16,
                  }}
                >
                  The correct answer is:
                </Text>
              </Paragraph>
              {questionsArr[curIndex]?.answer
                ?.split("~")
                ?.map((item, index) => {
                  return <Paragraph key={item}>{item}</Paragraph>;
                })}
              <Paragraph>
                <Text
                  strong
                  style={{
                    fontSize: 16,
                  }}
                >
                  Question Analysisis:
                </Text>
              </Paragraph>
              <Paragraph>{questionsArr[curIndex].desc}</Paragraph>
            </Result>
          )}

          <div className={sty.center}>
            <div className={sty.options}>
              {options.map((item, index) => {
                return (
                  <Form.Item key={index} colon={false}>
                    <Space>
                      <Input
                        style={{
                          border: 0,
                        }}
                        value={item.value}
                        readOnly
                      ></Input>
                      <Button
                        disabled={isFinished}
                        onClick={async () => {
                          const newOptions = [...options];
                          const qType = questionsArr[curIndex].type;
                          console.log("qType = ", qType);
                          if (qType == "Single" || qType == "True/False") {
                            newOptions.forEach((optionItem) => {
                              optionItem.isAnswer = false;
                            });
                            newOptions[index].isAnswer = true;
                          } else {
                            newOptions[index].isAnswer =
                              !newOptions[index].isAnswer;
                          }
                          setOptions(newOptions);

                        }}
                        size="small"
                        type={item.isAnswer ? "primary" : "default"}
                        shape="circle"
                        icon={<CheckCircleOutlined />}
                      />
                    </Space>
                  </Form.Item>
                );
              })}
            </div>
          </div>
          <div className={sty.optBox}>
            <div
              onClick={async () => {
                if (curOpt == "Like") {
                  await fetchData({
                    url: `/operation/del`,
                    method: "POST",
                    data: {
                      userId: JSON.parse(window.localStorage.userinfo).id,
                      questionId: questionsArr[curIndex].id,
                      type: "Like",
                    },
                  });
                  getOptData();
                } else {
                  await fetchData({
                    url: `/operation`,
                    method: "POST",
                    data: {
                      type: "Like",
                      userId: JSON.parse(window.localStorage.userinfo).id,
                      questionId: questionsArr[curIndex].id,
                    },
                  });
                  getOptData();
                }
              }}
              className={sty.optItem}
              style={{
                marginRight: 20,
              }}
            >
              <LikeOutlined
                style={{
                  color: curOpt == "Like" ? "#1890ff" : "#888",
                }}
              />
              <span>{optObj.likeNum}</span>
            </div>
            <div
              onClick={async () => {


                if (curOpt == "Dislike") {
                  await fetchData({
                    url: `/operation/del`,
                    method: "POST",
                    data: {
                      userId: JSON.parse(window.localStorage.userinfo).id,
                      questionId: questionsArr[curIndex].id,
                      type: "Dislike",
                    },
                  });
                  getOptData();
                } else {
                  await fetchData({
                    url: `/operation`,
                    method: "POST",
                    data: {
                      type: "Dislike",
                      userId: JSON.parse(window.localStorage.userinfo).id,
                      questionId: questionsArr[curIndex].id,
                    },
                  });
                  getOptData();
                }
              }}
              className={sty.optItem}
            >
              <DislikeOutlined
                style={{
                  color: curOpt == "Dislike" ? "#1890ff" : "#888",
                }}
              />
              <span>{optObj.disLikeNum}</span>
            </div>
          </div>
        </Card>
      )}
    </Card>
  );
}
