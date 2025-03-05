import React from 'react';
import { TimePicker as PfTimePicker } from '@patternfly/react-core';

const CustomTimePicker = () => {
  const onChange = (
    _event,
    time,
    hour,
    minute,
    seconds,
    isValid
  ) => {
    console.log('time', time);
    console.log('hour', hour);
    console.log('minute', minute);
    console.log('seconds', seconds);
    console.log('isValid', isValid);
  };

  const customStyle = {
    width: '100%',
    backgroundColor: '#171717', 
    color: 'white',
    borderRadius: '0.375rem', 
    padding: '0.5rem', 
    border: '1px solid #cbd5e0', 
    '&:focus': {
      backgroundColor: '#4a5568', 
      color: 'white', 
      border: '1px solid transparent', 
    }
  };

  return (
    <div className="w-[50%] md:w-full mx-auto"> 
      <PfTimePicker
        style={customStyle}
        placeholder="Select Time"
        value="3:35 AM"
        onChange={onChange}
      />
    </div>
  );
};

export default CustomTimePicker;
