import React, { useState } from 'react';
import './App.css';
import { ChromePicker } from 'react-color';


function App() {
  const [canvas, setCanvas] = useState(
    new Array(50).fill('')
      .map(() => new Array(50).fill('')))

  const [filledPixels, setFilledPixels] = useState([])

  const [color, setColor] = useState('#ff0000');

  const handlePixelClick = (rowIndex, pixelIndex) => {
    const isThereNot = (pair) => !(pair[0] === rowIndex && pair[1] === pixelIndex)
    const nextFilledPixels = (filledPixels.find(([x, y]) => (x === rowIndex && y === pixelIndex)))
      ? (filledPixels.filter(isThereNot))
      : [...filledPixels, ([rowIndex, pixelIndex, color])]
    setFilledPixels(nextFilledPixels)
  }

  const getColor = (rowIndex, pixelIndex) => {
    const pixel = filledPixels.find(([x, y]) => (x === rowIndex && y === pixelIndex))
    return (pixel)
      ? pixel[2]
      : 'white'
  }

  return (
    <div className={"centered"}>
      <h2 className={"title"}>Prawie jak Paint 🖌</h2>
      <div className={"picker-style"}>
        <ChromePicker
          color={color}
          onChangeComplete={(color) => { setColor(color.hex) }}
        />
      </div>
      {
        canvas.map((row, rowIndex) => (
          <div key={rowIndex}
            className={'canvas-row'}>
            {
              row.map((pixel, pixelIndex) =>
                <div
                  /* onMouseOver={() => handlePixelClick(rowIndex, pixelIndex)} */
                  key={pixelIndex}
                  onClick={() => handlePixelClick(rowIndex, pixelIndex)}
                  className={"pixel"}
                  style={{ backgroundColor: getColor(rowIndex, pixelIndex) }}
                />)
            }
          </div>
        ))
      }
    </div>
  );
}

export default App;
