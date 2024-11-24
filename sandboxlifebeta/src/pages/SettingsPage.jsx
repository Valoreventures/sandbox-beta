// import { useState } from "react";
// import {
//   Panel,
//   Form,
//   Button,
//   Input,
//   SelectPicker,
//   Row,
//   Col,
//   Container,
//   Toggle,
//   Slider
// } from "rsuite";
// import "rsuite/dist/rsuite.min.css"; // Make sure to import RSuite CSS
// import TopBar from "../components/TopBar";
// import Menu from "../components/Menu";
// import CalendarDateHeader from "../components/CalendarDateHeader";
// import { ToastContainer,} from 'react-toastify';

// const SettingsPage = () => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [currentDate, setCurrentDate] = useState(new Date());

//   const toggleMenu = () => {
//     setIsMenuOpen((prev) => !prev);
//   };
//   const handlePrevClick = () => {
//     setCurrentDate(
//       (prevDate) => new Date(prevDate.setMonth(prevDate.getMonth() - 1))
//     );
//   };

//   const handleNextClick = () => {
//     setCurrentDate(
//       (prevDate) => new Date(prevDate.setMonth(prevDate.getMonth() + 1))
//     );
//   };

//   return (
//     <>
//       <TopBar toggleMenu={toggleMenu} />
//       {isMenuOpen && (
//         <div className="fixed inset-0 z-50">
//           <Menu toggleMenu={toggleMenu} />
//         </div>
//       )}
//       <CalendarDateHeader
//         currentDate={currentDate}
//         onPrevClick={handlePrevClick}
//         onNextClick={handleNextClick}
//       />
//       <ToastContainer />

//       <div className="flex flex-row items-center justify-center w-full mt-60">

//       <Container>
//       {/* Display Settings */}
//       <Panel header="Display Settings" bordered>
//         <Form fluid>
//           <Row>
//             <Col xs={24} md={12}>
//               <Form.Group>
//                 <Form.ControlLabel>Theme</Form.ControlLabel>
//                 <SelectPicker
//                   data={[
//                     { label: 'Light', value: 'light' },
//                     { label: 'Dark', value: 'dark' },
//                     { label: 'System', value: 'system' }
//                   ]}
//                   block
//                 />
//               </Form.Group>
//             </Col>
//             <Col xs={24} md={12}>
//               <Form.Group>
//                 <Form.ControlLabel>Icon Size</Form.ControlLabel>
//                 <SelectPicker
//                   data={[
//                     { label: 'Small', value: 'small' },
//                     { label: 'Medium', value: 'medium' },
//                     { label: 'Large', value: 'large' }
//                   ]}
//                   block
//                 />
//               </Form.Group>
//             </Col>
//           </Row>
//         </Form>
//       </Panel>

//       {/* Pattern Recognition */}
//       <Panel header="Pattern Recognition" bordered>
//         <Form fluid>
//           <Form.Group>
//             <Form.ControlLabel>Scan Frequency</Form.ControlLabel>
//             <SelectPicker
//               data={[
//                 { label: 'Hourly', value: 'hourly' },
//                 { label: 'Daily', value: 'daily' },
//                 { label: 'Weekly', value: 'weekly' }
//               ]}
//               block
//             />
//           </Form.Group>
//           <Form.Group>
//             <Form.ControlLabel>Confidence Threshold</Form.ControlLabel>
//             <Slider
//               min={0}
//               max={100}
//               step={5}
//               defaultValue={75}
//             />
//           </Form.Group>
//         </Form>
//       </Panel>

//       {/* Notifications */}
//       <Panel header="Notifications" bordered>
//         <Form fluid>
//           <Form.Group>
//             <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//               <Form.ControlLabel>Daily Reminder</Form.ControlLabel>
//               <Toggle />
//             </div>
//           </Form.Group>
//           <Form.Group>
//             <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//               <Form.ControlLabel>Pattern Alerts</Form.ControlLabel>
//               <Toggle />
//             </div>
//           </Form.Group>
//           <Form.Group>
//             <Form.ControlLabel>Reminder Time</Form.ControlLabel>
//             <Input type="time" />
//           </Form.Group>
//         </Form>
//       </Panel>

//       {/* Data & Privacy */}
//       <Panel header="Data & Privacy" bordered>
//         <Form fluid>
//           <Form.Group>
//             <Form.ControlLabel>Data Retention</Form.ControlLabel>
//             <SelectPicker
//               data={[
//                 { label: '30 Days', value: 30 },
//                 { label: '90 Days', value: 90 },
//                 { label: '1 Year', value: 365 },
//                 { label: '2 Years', value: 730 }
//               ]}
//               block
//             />
//           </Form.Group>
//           <Form.Group>
//             <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//               <Form.ControlLabel>Auto Backup</Form.ControlLabel>
//               <Toggle />
//             </div>
//           </Form.Group>
//         </Form>
//       </Panel>

//       {/* Beta Features */}
//       <Panel header="Beta Features" bordered>
//         <Form fluid>
//           <Form.Group>
//             <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//               <div>
//                 <Form.ControlLabel>AI Assistant</Form.ControlLabel>
//                 <p style={{ fontSize: '12px', color: '#666' }}>Get AI-powered insights</p>
//               </div>
//               <Toggle />
//             </div>
//           </Form.Group>
//           <Form.Group>
//             <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//               <div>
//                 <Form.ControlLabel>Advanced Visualization</Form.ControlLabel>
//                 <p style={{ fontSize: '12px', color: '#666' }}>View complex patterns</p>
//               </div>
//               <Toggle />
//             </div>
//           </Form.Group>
//         </Form>
//       </Panel>

//       {/* Save Button */}
//       <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
//         <Button appearance="primary" size="lg">
//           Save Changes
//         </Button>
//       </div>
//     </Container>
//       </div>
//     </>
//   );
// };

// export default SettingsPage;


import { useState, useEffect } from "react";
import {
  Panel,
  Form,
  Button,
  Input,
  SelectPicker,
  Row,
  Col,
  Container,
  Toggle,
  Slider,
} from "rsuite";
import "rsuite/dist/rsuite.min.css"; // Make sure to import RSuite CSS
import TopBar from "../components/TopBar";
import Menu from "../components/Menu";
import CalendarDateHeader from "../components/CalendarDateHeader";
import { ToastContainer, toast } from "react-toastify";
import { supabase } from "../utils/supabase"; // Import Supabase client

const SettingsPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [settings, setSettings] = useState({
    theme: "system",
    icon_size: "medium",
    scan_frequency: "daily",
    confidence_threshold: 75,
    daily_reminder: false,
    pattern_alerts: false,
    reminder_time: "08:00",
    data_retention: 90,
    auto_backup: false,
    ai_assistant: false,
    advanced_visualization: false,
  });

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const handlePrevClick = () => {
    setCurrentDate((prevDate) => new Date(prevDate.setMonth(prevDate.getMonth() - 1)));
  };

  const handleNextClick = () => {
    setCurrentDate((prevDate) => new Date(prevDate.setMonth(prevDate.getMonth() + 1)));
  };

  useEffect(() => {
    const fetchSettings = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data, error } = await supabase
          .from("user_define_settings")
          .select("*")
          .eq("user_id", user.id)
          .single();
        
        if (error) {
          console.error("Failed to fetch settings:", error.message);
        } else if (data) {
          setSettings(data); // Load existing settings
        }
      }
    };

    fetchSettings();
  }, []);

  const handleChange = (value, field) => {
    setSettings((prevSettings) => ({
      ...prevSettings,
      [field]: value,
    }));
  };

  const saveSettings = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      toast.error("User not authenticated");
      return;
    }

    const settingsData = {
      ...settings,
      user_id: user.id,
      updated_at: new Date().toISOString(),
    };

    const { error } = await supabase
      .from("user_define_settings")
      .upsert(settingsData, { onConflict: ["user_id"] });

    if (error) {
      toast.error("Failed to save settings");
      console.error("Error saving settings:", error);
    } else {
      toast.success("Settings saved successfully");
    }
  };

  return (
    <>
      <TopBar toggleMenu={toggleMenu} />
      {isMenuOpen && (
        <div className="fixed inset-0 z-50">
          <Menu toggleMenu={toggleMenu} />
        </div>
      )}
      <CalendarDateHeader currentDate={currentDate} onPrevClick={handlePrevClick} onNextClick={handleNextClick} />
      <ToastContainer />

      <div className="flex flex-row items-center justify-center w-full mt-35">
        <Container className="max-w-4xl mx-auto p-6 space-y-6">
          {/* Display Settings */}
          <Panel header="Display Settings" bordered>
            <Form fluid>
              <Row>
                <Col xs={24} md={12}>
                  <Form.Group>
                    <Form.ControlLabel>Theme</Form.ControlLabel>
                    <SelectPicker
                      value={settings.theme}
                      onChange={(value) => handleChange(value, "theme")}
                      data={[
                        { label: "Light", value: "light" },
                        { label: "Dark", value: "dark" },
                        { label: "System", value: "system" },
                      ]}
                      block
                    />
                  </Form.Group>
                </Col>
                <Col xs={24} md={12}>
                  <Form.Group>
                    <Form.ControlLabel>Icon Size</Form.ControlLabel>
                    <SelectPicker
                      value={settings.icon_size}
                      onChange={(value) => handleChange(value, "icon_size")}
                      data={[
                        { label: "Small", value: "small" },
                        { label: "Medium", value: "medium" },
                        { label: "Large", value: "large" },
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
                  value={settings.scan_frequency}
                  onChange={(value) => handleChange(value, "scan_frequency")}
                  data={[
                    { label: "Hourly", value: "hourly" },
                    { label: "Daily", value: "daily" },
                    { label: "Weekly", value: "weekly" },
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
                  value={settings.confidence_threshold}
                  onChange={(value) => handleChange(value, "confidence_threshold")}
                />
              </Form.Group>
            </Form>
          </Panel>

          {/* Notifications */}
          <Panel header="Notifications" bordered>
            <Form fluid>
              <Form.Group>
                <div className="flex justify-between items-center">
                  <Form.ControlLabel>Daily Reminder</Form.ControlLabel>
                  <Toggle checked={settings.daily_reminder} onChange={(value) => handleChange(value, "daily_reminder")} />
                </div>
              </Form.Group>
              <Form.Group>
                <div className="flex justify-between items-center">
                  <Form.ControlLabel>Pattern Alerts</Form.ControlLabel>
                  <Toggle checked={settings.pattern_alerts} onChange={(value) => handleChange(value, "pattern_alerts")} />
                </div>
              </Form.Group>
              <Form.Group>
                <Form.ControlLabel>Reminder Time</Form.ControlLabel>
                <Input
                  type="time"
                  value={settings.reminder_time}
                  onChange={(value) => handleChange(value, "reminder_time")}
                />
              </Form.Group>
            </Form>
          </Panel>

          {/* Data & Privacy */}
          <Panel header="Data & Privacy" bordered>
            <Form fluid>
              <Form.Group>
                <Form.ControlLabel>Data Retention</Form.ControlLabel>
                <SelectPicker
                  value={settings.data_retention}
                  onChange={(value) => handleChange(value, "data_retention")}
                  data={[
                    { label: "30 Days", value: 30 },
                    { label: "90 Days", value: 90 },
                    { label: "1 Year", value: 365 },
                    { label: "2 Years", value: 730 },
                  ]}
                  block
                />
              </Form.Group>
              <Form.Group>
                <div className="flex justify-between items-center">
                  <Form.ControlLabel>Auto Backup</Form.ControlLabel>
                  <Toggle checked={settings.auto_backup} onChange={(value) => handleChange(value, "auto_backup")} />
                </div>
              </Form.Group>
            </Form>
          </Panel>

          {/* Beta Features */}
          <Panel header="Beta Features" bordered>
            <Form fluid>
              <Form.Group>
                <div className="flex justify-between items-center">
                  <Form.ControlLabel>AI Assistant</Form.ControlLabel>
                  <Toggle checked={settings.ai_assistant} onChange={(value) => handleChange(value, "ai_assistant")} />
                </div>
              </Form.Group>
              <Form.Group>
                <div className="flex justify-between items-center">
                  <Form.ControlLabel>Advanced Visualization</Form.ControlLabel>
                  <Toggle
                    checked={settings.advanced_visualization}
                    onChange={(value) => handleChange(value, "advanced_visualization")}
                  />
                </div>
              </Form.Group>
            </Form>
          </Panel>

          {/* Save Button */}
          <div className="flex justify-end mt-4">
            <Button appearance="primary" size="lg" onClick={saveSettings}>
              Save Changes
            </Button>
          </div>
        </Container>
      </div>
    </>
  );
};

export default SettingsPage;
