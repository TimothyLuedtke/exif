import React from "react";
import { useState, useCallback, useEffect, useReducer, useRef } from "react";

export function useToggle(initialValue) {
  const [value, setValue] = useState(initialValue);

  const toggle = () => {
    setValue(!value);
    console.log('toggle value: ' + value);
  };

  return [value, toggle];
}

export function useToggleCallback(initialValue) {
  const [value, setValue] = useState(initialValue);

  const toggle = useCallback(() => {
    setValue(!value);
    console.log('toggle value: ' + value);
  }, [value]);

  return [value, toggle];
}
