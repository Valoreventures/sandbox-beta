import { useState } from "react";
import {
  Panel,
  Form,
  Button,
  Input,
  InputGroup,
  SelectPicker,
  Uploader,
  Avatar,
  Grid,
  Row,
  Col,
  Container,
  Toggle,
  Slider
} from "rsuite";
import "rsuite/dist/rsuite.min.css"; // Make sure to import RSuite CSS
import TopBar from "../components/TopBar";
import Menu from "../components/Menu";
import CalendarDateHeader from "../components/CalendarDateHeader";
import { ToastContainer, toast } from 'react-toastify';

const SettingsPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };
  const handlePrevClick = () => {
    setCurrentDate(
      (prevDate) => new Date(prevDate.setMonth(prevDate.getMonth() - 1))
    );
  };

  const handleNextClick = () => {
    setCurrentDate(
      (prevDate) => new Date(prevDate.setMonth(prevDate.getMonth() + 1))
    );
  };

  return (
    <>
      <TopBar toggleMenu={toggleMenu} />
      {isMenuOpen && (
        <div className="fixed inset-0 z-50">
          <Menu toggleMenu={toggleMenu} />
        </div>
      )}
      <CalendarDateHeader
        currentDate={currentDate}
        onPrevClick={handlePrevClick}
        onNextClick={handleNextClick}
      />
      <ToastContainer />

      <div className="flex flex-row items-center justify-center w-full mt-60">

      <Container>
      {/* Display Settings */}
      <Panel header="Display Settings" bordered>
        <Form fluid>
          <Row>
            <Col xs={24} md={12}>
              <Form.Group>
                <Form.ControlLabel>Theme</Form.ControlLabel>
                <SelectPicker
                  data={[
                    { label: 'Light', value: 'light' },
                    { label: 'Dark', value: 'dark' },
                    { label: 'System', value: 'system' }
                  ]}
                  block
                />
              </Form.Group>
            </Col>
            <Col xs={24} md={12}>
              <Form.Group>
                <Form.ControlLabel>Icon Size</Form.ControlLabel>
                <SelectPicker
                  data={[
                    { label: 'Small', value: 'small' },
                    { label: 'Medium', value: 'medium' },
                    { label: 'Large', value: 'large' }
                  ]}
                  block
                />
              </Form.Group>
            </Col>
          </Row>
        </Form>
      </Panel>

      {/* Pattern Recognition */}
      <Panel header="Pattern Recognition" bordered>
        <Form fluid>
          <Form.Group>
            <Form.ControlLabel>Scan Frequency</Form.ControlLabel>
            <SelectPicker
              data={[
                { label: 'Hourly', value: 'hourly' },
                { label: 'Daily', value: 'daily' },
                { label: 'Weekly', value: 'weekly' }
              ]}
              block
            />
          </Form.Group>
          <Form.Group>
            <Form.ControlLabel>Confidence Threshold</Form.ControlLabel>
            <Slider
              min={0}
              max={100}
              step={5}
              defaultValue={75}
            />
          </Form.Group>
        </Form>
      </Panel>

      {/* Notifications */}
      <Panel header="Notifications" bordered>
        <Form fluid>
          <Form.Group>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Form.ControlLabel>Daily Reminder</Form.ControlLabel>
              <Toggle />
            </div>
          </Form.Group>
          <Form.Group>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Form.ControlLabel>Pattern Alerts</Form.ControlLabel>
              <Toggle />
            </div>
          </Form.Group>
          <Form.Group>
            <Form.ControlLabel>Reminder Time</Form.ControlLabel>
            <Input type="time" />
          </Form.Group>
        </Form>
      </Panel>

      {/* Data & Privacy */}
      <Panel header="Data & Privacy" bordered>
        <Form fluid>
          <Form.Group>
            <Form.ControlLabel>Data Retention</Form.ControlLabel>
            <SelectPicker
              data={[
                { label: '30 Days', value: 30 },
                { label: '90 Days', value: 90 },
                { label: '1 Year', value: 365 },
                { label: '2 Years', value: 730 }
              ]}
              block
            />
          </Form.Group>
          <Form.Group>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Form.ControlLabel>Auto Backup</Form.ControlLabel>
              <Toggle />
            </div>
          </Form.Group>
        </Form>
      </Panel>

      {/* Beta Features */}
      <Panel header="Beta Features" bordered>
        <Form fluid>
          <Form.Group>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <Form.ControlLabel>AI Assistant</Form.ControlLabel>
                <p style={{ fontSize: '12px', color: '#666' }}>Get AI-powered insights</p>
              </div>
              <Toggle />
            </div>
          </Form.Group>
          <Form.Group>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <Form.ControlLabel>Advanced Visualization</Form.ControlLabel>
                <p style={{ fontSize: '12px', color: '#666' }}>View complex patterns</p>
              </div>
              <Toggle />
            </div>
          </Form.Group>
        </Form>
      </Panel>

      {/* Save Button */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
        <Button appearance="primary" size="lg">
          Save Changes
        </Button>
      </div>
    </Container>
      </div>
    </>
  );
};

export default SettingsPage;
