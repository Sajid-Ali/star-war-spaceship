/* eslint-disable react-hooks/exhaustive-deps */
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Spin,
  Card,
  Row,
  Col,
  Tooltip,
  Button,
  Pagination,
  Divider,
} from "antd";
import {
  PlusCircleFilled,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";

import Creators from "../redux/Reducers/star-war-reducers";
import { getSpaceships } from "../redux/selectors/star-war-selectors";

const { Meta } = Card;

const Spaceships = () => {
  const [current, setCurrent] = useState(1);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const spaceships = useSelector(getSpaceships);

  useEffect(() => {
    fetchSpaceShips();
  }, []);

  const fetchSpaceShips = (page = 1) => {
    dispatch(dispatch(Creators.fetchSpaceshipRequest(`page=${page}`)));
  };

  const addToFleet = (spaceship) => {
    dispatch(Creators.addToFleetRequest(spaceship));
  };

  const {
    list: { loading, data },
    fleet,
  } = spaceships;

  const renderSpeceships = () => {
    return (
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
    );
  };

  const renderFleetList = () => {
    return (
      <Col>
        <Card style={styles.card_style} loading={loading}>
          <Meta title={<h2 style={styles.fleet_header}>Your Fleet</h2>} />
          <div style={styles.fleet_content}>
            {fleet?.data?.map((row, index) => (
              <div key={row?.key}>
                <Card
                  title={row?.name}
                  bordered={true}
                  style={{ width: 300, borderRadius: 10 }}
                  actions={[
                    <Tooltip title="Edit fleet">
                      <Button
                        shape="circle"
                        icon={<EditOutlined />}
                        onClick={() => handleClick(row)}
                      />
                    </Tooltip>,
                    <Tooltip title="Edit fleet">
                      <Button
                        danger
                        shape="circle"
                        icon={<DeleteOutlined />}
                        onClick={() => dispatch(Creators.deleteFromFleet(row))}
                      />
                    </Tooltip>,
                  ]}
                >
                  <Meta
                    title={<Tooltip title="Name">{row?.name}</Tooltip>}
                    description={
                      <div className="conter_holder">
                        <Tooltip title="Manufacturer">
                          <p>{row?.manufacturer}</p>
                        </Tooltip>

                        <Tooltip title="Model">
                          <p>{row?.model}</p>
                        </Tooltip>
                      </div>
                    }
                  />
                </Card>
                {index + 1 !== fleet?.data?.length && <Divider />}
              </div>
            ))}
          </div>
        </Card>
      </Col>
    );
  };

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

  const handleClick = (state) => {
    dispatch(Creators.setSelectedSpaceship(state));
    navigate("/details");
  };

  return (
    <Spin spinning={loading} size="large" tip="loading">
      <div className="wrapper">
        <Row gutter={12}>
          {renderSpeceships()}
          {renderFleetList()}
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
    textAlign: "left",
  },
  fleet_content: {},
  fleet_action: {},
};

export default Spaceships;
