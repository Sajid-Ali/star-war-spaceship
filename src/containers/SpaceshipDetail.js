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
import { PlusCircleFilled, MinusCircleOutlined } from "@ant-design/icons";

import { getSelectedSpaceship } from "../redux/selectors/star-war-selectors";
import Creators from "../redux/Reducers/star-war-reducers";

const SpaceshipDetail = () => {
  const dispatch = useDispatch();
  const spaceship = useSelector(getSelectedSpaceship);
  const {
    selected: { data },
  } = spaceship;
  const percentage = (data?.count / data?.total_capacity) * 100;
  return (
    <Spin spinning={false} size="large" tip="loading">
      <div className="wrapper">
        <div className="site-card-border-less-wrapper">
          <Card
            title={<h3>Star War Spaceships detail page</h3>}
            bordered={true}
            actions={[
              <div style={styles.action_button}>
                <Button type="primary" size="middle">
                  Cancel
                </Button>
                <Divider type="vertical" orientation="center" />
                <Button type="primary" size="middle">
                  Save
                </Button>
              </div>,
            ]}
          >
            <Tag color="magenta">{data?.name}</Tag>
            <p>{data?.manufacturer}</p>
            <p>Price: ${data?.cost_in_credits}</p>
            <p>{data?.consumables}</p>
            <p>{data?.model}</p>
            <p>{data?.starship_class}</p>
            <div style={styles.progress_bar}>
              <Progress
                strokeColor={{
                  "0%": "#108ee9",
                  "100%": "#87d068",
                }}
                percent={percentage || 0}
                status={percentage !== 100 && "exception"}
              />
              <Space>
                <Tooltip title="Add passenger">
                  <Button
                    shape="circle"
                    icon={<MinusCircleOutlined />}
                    onClick={() => dispatch(Creators.removePassenger())}
                  />
                </Tooltip>

                <Tooltip title="Remove passenger">
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
};

export default SpaceshipDetail;
