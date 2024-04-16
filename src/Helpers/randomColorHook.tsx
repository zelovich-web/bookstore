import { useState, useEffect } from 'react';

const useRandomColor = () => {
  const [randomColor, setRandomColor] = useState<string>('');
  const colors = ['#F4EEFD', '#D7E4FD', '#FEE9E2', '#CAEFF0'];

  useEffect(() => {
    const color = colors[Math.floor(Math.random() * colors.length)];
    setRandomColor(color);
  }, []);

  return randomColor;
};

export default useRandomColor;