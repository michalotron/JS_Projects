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

    function isThere(pair) {
      return (pair[0] === rowIndex && pair[1] === pixelIndex)
    }

    function isThereNot(pair) {
      return (pair[0] !== rowIndex && pair[1] !== pixelIndex) //wiem ze nie dziala
    }

    if (filledPixels.find(isThere)) {
      setFilledPixels([...filledPixels.filter(isThereNot)])
    }
    else {
      setFilledPixels([...filledPixels, (makeKey(rowIndex, pixelIndex))])
    }
    console.log([...filledPixels])
  }

  const changeColor = (rowIndex, pixelIndex) => {
    function isThere(pair) {
      if (pair[0] === rowIndex && pair[1] === pixelIndex) {
        return pair
      } else {
        return undefined
      }
    }

    return (filledPixels.find(isThere))
      ? 'pixel-filled'
      : 'pixel-empty'
  }

  const divPixelStyle = {
    backgroundColor: { color }
  }

  /* const makeKey = (rowIndex, pixelIndex) => (String(rowIndex) + '.' + String(pixelIndex)) */
  const makeKey = (rowIndex, pixelIndex) => (Array(rowIndex, pixelIndex))

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
