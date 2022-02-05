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

  const addToFleet = (spaceship) => {
    dispatch(Creators.addToFleetRequest(spaceship));
  };

  const spaceships = useSelector(getSpaceships);
  const {
    list: { loading, data },
    fleet,
  } = spaceships;
  const renderCardContent = (spaceship) => {
    return (
      <Card
        style={styles.card_style}
        loading={loading}
        hoverable
        key={spaceship.key}
      >
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
                <Button
                  shape="circle"
                  icon={<PlusCircleFilled />}
                  onClick={() => addToFleet(spaceship)}
                />
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
            <Card style={styles.card_style} loading={loading}>
              <Meta title={<h2 style={styles.fleet_header}>Your Fleet</h2>} />
            </Card>
          </Col>
        </Row>
      </div>
    </Spin>
  );
};

export const styles = {
  card_style: {
    marginTop: 10,
    borderRadius: 10,
  },
  fleet_header: {
    textAlign: "center",
  },
};

export default Spaceships;
