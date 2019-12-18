import React from "react";
import { Card, Col, Row, Icon, Button, Tooltip } from "antd";

const Dashboard = props => {
  return (
    <div style={{ background: "#f0f2f5" }}>
      <Row gutter={16}>
        <Col span={6}>
          <Card
            title="Total Sales"
            bordered={false}
            extra={
              <Tooltip placement="top" title="Introduce" arrowPointAtCenter>
                <Icon type="info-circle" />
              </Tooltip>
            }
            loading={false}
          >
            Total Sales
          </Card>
        </Col>
        <Col span={6}>
          <Card title="Visits" bordered={false} loading={true}>
            Visits
          </Card>
        </Col>
        <Col span={6}>
          <Card title="Payments" bordered={false} loading={true}>
            Payments
          </Card>
        </Col>
        <Col span={6}>
          <Card title="Operational Effect" bordered={false}  loading={true}>
            Operational Effect
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
