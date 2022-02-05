/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { PlusCircleFilled } from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import { Spin, Card, Row, Col, Tooltip, Button, Pagination } from "antd";

import Creators from "../redux/Reducers/star-war-reducers";
import { getSpaceships } from "../redux/selectors/star-war-selectors";

const { Meta } = Card;

const Spaceships = () => {
  const [current, setCurrent] = useState(1);
  const dispatch = useDispatch();

  useEffect(() => {
    fetchSpaceShips();
  }, []);

  const fetchSpaceShips = (page = 1) => {
    dispatch(dispatch(Creators.fetchSpaceshipRequest(`?page=${page}`)));
  };

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

  const onChange = (page) => {
    setCurrent(page);
    if (current !== page) fetchSpaceShips(page);
  };

  return (
    <Spin spinning={loading} size="large" tip="loading">
      <div className="wrapper">
        <Row gutter={12}>
          <Col span={16}>
            <h2>Star war spaceships</h2>
            {data?.results?.map((row) => renderCardContent(row))}
            {data?.results?.length > 0 && (
              <div className="pagination">
                <Pagination
                  current={current}
                  responsive={true}
                  onChange={onChange}
                  total={data?.count || 0}
                  showTotal={(total, range) =>
                    `${range[0]}-${range[1]} of ${total} spaceships`
                  }
                />
              </div>
            )}
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
