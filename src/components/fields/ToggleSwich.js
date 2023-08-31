import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
export default function ToggleSwich({ label, onToggle }) {
    const [isChecked, setIsChecked] = useState(false);

    const handleToggle = () => {
      const newValue = !isChecked;
      setIsChecked(newValue);
      onToggle(newValue);
    };
  return (
    <div className='cus-mt-5'>
         <Form.Group  controlId="formToggleSwitch">
      <Form.Check
      className='f-13'
        type="switch"
        id="toggleSwitch"
        label={label}
        checked={isChecked}
        onChange={handleToggle}
      />
    </Form.Group>
    </div>
  )
}
