import { useState } from 'react';

function useInput(initialValue) {
  const [value, setValue] = useState(initialValue);

  function handleChange(event) {
    setValue(event.target.value);
  }
  return {
    value,
    onChange: handleChange,
  };
}

export default useInput;
