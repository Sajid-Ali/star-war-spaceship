/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { Spin, Card, Avatar, Row, Col, Tooltip, Button } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { PlusCircleFilled } from "@ant-design/icons";

import Creators from "../redux/Reducers/star-war-reducers";
import { getSpaceships } from "../redux/selectors/star-war-selectors";

const { Meta } = Card;

const Spaceships = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(dispatch(Creators.fetchSpaceshipRequest()));
  }, []);

  const spaceships = useSelector(getSpaceships);
  const { loading, data } = spaceships;
  const renderCardContent = (spaceship) => {
    return (
      <Card style={{ marginTop: 16 }} loading={loading} hoverable>
        <Meta
          title={<Tooltip title="Name">{spaceship?.name}</Tooltip>}
          description={
            <div className="conter_holder">
              <Tooltip title="Manufacturer">
                <p>{spaceship?.manufacturer}</p>
              </Tooltip>

              <Tooltip title="Model">
                <p>{spaceship?.model}</p>
              </Tooltip>
              <Tooltip title="Add to fleet">
                <Button shape="circle" icon={<PlusCircleFilled />} />
              </Tooltip>
            </div>
          }
        />
      </Card>
    );
  };

  return (
    <Spin spinning={loading} size="large" tip="loading">
      <div className="wrapper">
        <Row gutter={12}>
          <Col span={16}>
            <h2>Star war spaceships</h2>
            {data?.results?.map((row) => renderCardContent(row))}
          </Col>
          <Col span={8} gutter={8}>
            <Card style={{ width: "95%", marginTop: 16 }} loading={loading}>
              <Meta
                avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                title="Card title"
                description="This is the description"
              />
            </Card>
          </Col>
        </Row>
      </div>
    </Spin>
  );
};

export default Spaceships;
