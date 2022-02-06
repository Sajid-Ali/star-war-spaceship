import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Tag,
  Spin,
  Card,
  Space,
  Button,
  Tooltip,
  Divider,
  Progress,
} from "antd";
import { useNavigate } from "react-router-dom";
import { PlusCircleFilled, MinusCircleOutlined } from "@ant-design/icons";

import { getSelectedSpaceship } from "../redux/selectors/star-war-selectors";
import Creators from "../redux/Reducers/star-war-reducers";

const SpaceshipDetail = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const spaceship = useSelector(getSelectedSpaceship);
  const {
    selected: { data },
  } = spaceship;

  const renderInfo = (title, color, value) => (
    <p>
      {title} <Tag color={color || "magenta"}>{value}</Tag>
    </p>
  );

  const percentage = (data?.count / data?.total_capacity) * 100;
  return (
    <Spin spinning={false} size="large" tip="loading">
      <div className="wrapper">
        <div className="site-card-border-less-wrapper">
          <Card
            title={<h3>Star War Spaceships detail page</h3>}
            style={styles.card_section}
            bordered={true}
            actions={[
              <div style={styles.action_button}>
                <Button
                  type="primary"
                  size="middle"
                  onClick={() => navigate(-1)}
                >
                  Cancel
                </Button>
                <Divider type="vertical" orientation="center" />
                <Button
                  type="primary"
                  size="middle"
                  onClick={() => {
                    dispatch(Creators.saveToFleet({ ...data, percentage }));
                    navigate(-1);
                  }}
                >
                  Save
                </Button>
              </div>,
            ]}
          >
            {renderInfo("Nmae", "magenta", data?.name)}
            {renderInfo("Manufacturer", "magenta", data?.manufacturer)}
            {renderInfo("Price", "magenta", data?.cost_in_credits)}
            {renderInfo("Category", "magenta", data?.starship_class)}
            {renderInfo("Avarage Time", "magenta", data?.consumables)}
            {renderInfo("Model", "magenta", data?.model)}
            {renderInfo("No Of Crew", "magenta", data?.crew)}
            {renderInfo("No Of Passenger", "magenta", data?.count)}
            {renderInfo(
              "Total Capacity (Crew + Passengers)",
              "magenta",
              data?.total_capacity
            )}
            <div style={styles.progress_bar}>
              <Progress
                strokeColor={{
                  "0%": "red",
                  "50%": "#108ee9",
                  "100%": "#87d068",
                }}
                percent={percentage || 0}
                status={percentage !== 100 && "exception"}
              />
              <Space>
                <Tooltip title="Remove passenger">
                  <Button
                    shape="circle"
                    icon={<MinusCircleOutlined />}
                    onClick={() => dispatch(Creators.removePassenger())}
                  />
                </Tooltip>

                <Tooltip title="Add passenger">
                  <Button
                    shape="circle"
                    icon={<PlusCircleFilled />}
                    onClick={() => dispatch(Creators.addPassenger())}
                  />
                </Tooltip>
              </Space>
            </div>
          </Card>
        </div>
      </div>
    </Spin>
  );
};

const styles = {
  progress_bar: {
    display: "flex",
    alignItems: "center",
  },
  action_button: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  card_section: {
    maxWidth: "50%",
    margin: "auto",
    boxShadow: "0 0 10px #cfcaca",
  },
};

export default SpaceshipDetail;
