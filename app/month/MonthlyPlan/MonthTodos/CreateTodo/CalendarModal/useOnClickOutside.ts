import React, { useEffect } from 'react';

const useOnClickOutside = (ref: any, handler: any) => {
  useEffect(() => {
    const listener = (event: any) => {
      console.log('ref', ref.current);
      if(!ref.current || ref.current.contains(event.target)){
        return;
      }
      handler();
    };
    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);
    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("mousedown", listener);
    };
  }, [ref, handler]);
};

export default useOnClickOutside;
