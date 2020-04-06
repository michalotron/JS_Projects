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

    if (filledPixels.includes(makeKey(rowIndex, pixelIndex))) {
      setFilledPixels(
        filledPixels.filter(a => a !== (makeKey(rowIndex, pixelIndex)))
      )
    } else {
      setFilledPixels([...filledPixels, (makeKey(rowIndex, pixelIndex))])
    }
  }

  const changeColor = (rowIndex, pixelIndex) => {
    return (filledPixels.includes(makeKey(rowIndex, pixelIndex)))
      ? 'pixel-filled'
      : 'pixel-empty'
  }

  const makeKey = (rowIndex, pixelIndex) => (String(rowIndex) + '.' + String(pixelIndex))

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
                <div key={pixelIndex}
                  onClick={() => handlePixelClick(rowIndex, pixelIndex)}
                  className={changeColor(rowIndex, pixelIndex)}>
                  {pixel}
                </div>)
            }
          </div>
        ))
      }
    </div>
  );
}

export default App;
