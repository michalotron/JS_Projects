import React, { useState } from 'react';
import './App.css';

function App() {

  const [filledPixels, setFilledPixels] = useState([])

  const [canvas, setCanvas] = useState(
    new Array(100).fill('')
      .map(() => new Array(100).fill('')))


  const handlePixelClick = (rowIndex, pixelIndex) => {
    const canvasEdited = [...canvas]
    canvasEdited[rowIndex] = [...canvasEdited[rowIndex]]

    var filledPixelsEdited = [...filledPixels]
    /* .filter(a => a !== (String(pixelIndex) + String(rowIndex))) */

    if (filledPixelsEdited.includes(String(pixelIndex) + String(rowIndex))) {
      document.getElementById(String(pixelIndex) + String(rowIndex)).style.backgroundColor = "white"
      filledPixelsEdited = filledPixelsEdited.filter(a => a !== (String(pixelIndex) + String(rowIndex)))
    } else {
      document.getElementById(String(pixelIndex) + String(rowIndex)).style.backgroundColor = "black"
      filledPixelsEdited = [...filledPixels, (String(pixelIndex) + String(rowIndex))]
    }

    console.log(filledPixelsEdited)
    setCanvas(canvasEdited)
    setFilledPixels(filledPixelsEdited)
  }


  return (
    <div className={"centered"}>
      <h2 className={"title"}>Prawie jak Paint 🖌</h2>
      {
        canvas.map((row, rowIndex) => (
          <div key={rowIndex}
            className={'canvas-row'}>
            {
              row.map((pixel, pixelIndex) =>
                <div key={pixelIndex}
                  id={String(pixelIndex) + String(rowIndex)}
                  onClick={() => handlePixelClick(rowIndex, pixelIndex)}
                  className={'canvas-pixel'}>
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
