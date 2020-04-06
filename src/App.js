import React, { useState } from 'react';
import './App.css';
import { ChromePicker } from 'react-color';


function App() {
  const [canvas, setCanvas] = useState(
    new Array(100).fill('')
      .map(() => new Array(100).fill('')))

  const [filledPixels, setFilledPixels] = useState([])
  var filledPixelsEdited = [...filledPixels]

  const handlePixelClick = (rowIndex, pixelIndex) => {

    /* const filledPixelsEdited = [...filledPixels] */

    if (filledPixelsEdited.includes(String(pixelIndex) + String(rowIndex))) {
      filledPixelsEdited = filledPixelsEdited.filter(a => a !== (String(pixelIndex) + String(rowIndex)))
    } else {
      filledPixelsEdited = [...filledPixels, (String(pixelIndex) + String(rowIndex))]
    }

    console.log(filledPixelsEdited)
    setFilledPixels(filledPixelsEdited)
  }

  const changeColor = (rowIndex, pixelIndex) => {
    if (filledPixelsEdited.includes(String(pixelIndex) + String(rowIndex))) return 'pixel-filled'
    else return 'pixel-empty'
  }


  return (
    <div className={"centered"}>
      <h2 className={"title"}>Prawie jak Paint 🖌</h2>
      <div className={"picker-style"}>
        <ChromePicker
          color={"#ff0000"}
          onChangeComplete={() => { }}
        />
      </div>
      {
        canvas.map((row, rowIndex) => (
          <div key={rowIndex}
            className={'canvas-row'}>
            {

              row.map((pixel, pixelIndex) =>
                <div key={pixelIndex}
                  /* id={String(pixelIndex) + String(rowIndex)} */
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
