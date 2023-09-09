import { Card, Col, Row, Statistic } from "antd";
import { useEffect } from "react";
import CountUp from "react-countup";
import { callGetInforDashBoard } from "../../services/api";
import { useState } from "react";
const AdminPage = () => {
  const [dataDashboard, setDataDashboard] = useState({
    countUser: 0,
    countOrder: 0,
  });

  const formatter = (value) => <CountUp end={value} separator="," />;

  useEffect(() => {
    const initDashboard = async () => {
      const res = await callGetInforDashBoard();
      if (res && res?.data) {
        setDataDashboard(res.data);
      }
    };
    initDashboard();
  }, []);

  return (
    <div style={{ padding: "15px" }}>
      <Row gutter={[20, 20]}>
        <Col span={10}>
          <Card>
            <Statistic
              title="Active Users"
              value={dataDashboard.countUser}
              formatter={formatter}
            />
          </Card>
        </Col>
        <Col span={10}>
          <Card>
            <Statistic
              title="Total Orders"
              value={dataDashboard.countOrder}
              precision={2}
              formatter={formatter}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};
export default AdminPage;
