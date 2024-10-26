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
} from "rsuite";
import "rsuite/dist/rsuite.min.css"; // Make sure to import RSuite CSS
import TopBar from "../components/TopBar";
import Menu from "../components/Menu";
import CalendarDateHeader from "../components/CalendarDateHeader";
import { ToastContainer, toast } from 'react-toastify';

const ProfilePage = () => {
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

      <Container className="max-w-4xl mx-auto p-6 space-y-6">
        {/* Profile Card */}
        <Panel header="Profile Card" bordered className="profile-panel">
          <Form fluid>
            <Grid fluid>
              <Row className="mb-4">
                <Col xs={24} md={6}>
                  <Uploader
                    listType="picture"
                    action="//jsonplaceholder.typicode.com/posts/"
                    renderFileInfo={(file) => {
                      return (
                        <Avatar src={file.url} alt="avatar" size="lg" circle />
                      );
                    }}
                  >
                    <Button>Upload Avatar</Button>
                  </Uploader>
                </Col>
                <Col xs={24} md={18}>
                  <Row>
                    <Col xs={24} md={12} className="p-2">
                      <Form.Group>
                        <Form.ControlLabel>Date of Birth</Form.ControlLabel>
                        <Input type="date" />
                      </Form.Group>
                    </Col>
                    <Col xs={24} md={12} className="p-2">
                      <Form.Group>
                        <Form.ControlLabel>Gender</Form.ControlLabel>
                        <SelectPicker
                          data={[
                            { label: "Male", value: "male" },
                            { label: "Female", value: "female" },
                            { label: "Other", value: "other" },
                            {
                              label: "Prefer not to say",
                              value: "undisclosed",
                            },
                          ]}
                          block
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Grid>
          </Form>
        </Panel>

        {/* Contact Information */}
        <Panel header="Contact Information" bordered>
          <Form fluid>
            <Grid fluid>
              <Row>
                <Col xs={24} md={12} className="p-2">
                  <Form.Group>
                    <Form.ControlLabel>Email</Form.ControlLabel>
                    <Input type="email" />
                  </Form.Group>
                </Col>
                <Col xs={24} md={12} className="p-2">
                  <Form.Group>
                    <Form.ControlLabel>Mobile Phone</Form.ControlLabel>
                    <Input type="tel" />
                  </Form.Group>
                </Col>
                <Col xs={24} md={12} className="p-2">
                  <Form.Group>
                    <Form.ControlLabel>Street Address</Form.ControlLabel>
                    <Input />
                  </Form.Group>
                </Col>
                <Col xs={24} md={12} className="p-2">
                  <Form.Group>
                    <Form.ControlLabel>ZIP</Form.ControlLabel>
                    <Input />
                  </Form.Group>
                </Col>
                <Col xs={24} md={12} className="p-2">
                  <Form.Group>
                    <Form.ControlLabel>Website</Form.ControlLabel>
                    <Input type="url" />
                  </Form.Group>
                </Col>
              </Row>
            </Grid>
          </Form>
        </Panel>

        {/* Personal Information */}
        <Panel header="Personal Information" bordered>
          <Form fluid>
            <Grid fluid>
              <Row>
                <Col xs={24} className="p-2">
                  <Form.Group>
                    <Form.ControlLabel>About Me</Form.ControlLabel>
                    <Input as="textarea" rows={4} />
                  </Form.Group>
                </Col>
                <Col xs={24} className="p-2">
                  <Form.Group>
                    <Form.ControlLabel>Activities</Form.ControlLabel>
                    <Input as="textarea" rows={3} />
                  </Form.Group>
                </Col>
                <Col xs={24} className="p-2">
                  <Form.Group>
                    <Form.ControlLabel>Hobbies</Form.ControlLabel>
                    <Input as="textarea" rows={3} />
                  </Form.Group>
                </Col>
                <Col xs={24} className="p-2">
                  <Form.Group>
                    <Form.ControlLabel>Interests</Form.ControlLabel>
                    <Input as="textarea" rows={3} />
                  </Form.Group>
                </Col>
                <Col xs={24} className="p-2">
                  <Form.Group>
                    <Form.ControlLabel>
                      Movies, Music, TV, etc.
                    </Form.ControlLabel>
                    <Input as="textarea" rows={3} />
                  </Form.Group>
                </Col>
              </Row>
            </Grid>
          </Form>
        </Panel>

        {/* Work & Education */}
        <Panel header="Work & Education" bordered>
          <Form fluid>
            <Grid fluid>
              <Row>
                <Col xs={24} className="p-2">
                  <Form.Group>
                    <Form.ControlLabel>
                      Work & Education History
                    </Form.ControlLabel>
                    <Input as="textarea" rows={6} />
                  </Form.Group>
                </Col>
              </Row>
            </Grid>
          </Form>
        </Panel>

        {/* Save Button */}
        <div className="flex justify-end mt-4">
          <Button appearance="primary" size="lg">
            Save Changes
          </Button>
        </div>
      </Container>
      </div>
    </>
  );
};

export default ProfilePage;
