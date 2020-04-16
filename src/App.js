import React, { useState } from 'react';
import './App.css';
import { ChromePicker } from 'react-color';
import paint_brush_icon from './assets/paint_brush_icon.png'
import paint_brush_icon_choosen from './assets/paint_brush_icon_choosen.png'
import rectangle_icon from './assets/rectangle_icon.png'
import rectangle_icon_choosen from './assets/rectangle_icon_choosen.png'


function App() {
  const [canvas, setCanvas] = useState(
    new Array(50).fill('')
      .map(() => new Array(50).fill('')))

  const [filledPixels, setFilledPixels] = useState([])
  const [color, setColor] = useState('#000000');
  const [paintBrushClicked, paintBrushClickedstate] = useState(false)
  const [rectangleClicked, rectangleClickedstate] = useState(false)
  const [mouseDown, mouseDownState] = useState(false)

  const handlePixelClick = (rowIndex, pixelIndex) => {
    const isThereNot = (pair) => !(pair[0] === rowIndex && pair[1] === pixelIndex)
    setFilledPixels([...filledPixels.filter(isThereNot), [rowIndex, pixelIndex, color]])
  }

  const handleRightClick = (event, rowIndex, pixelIndex) => {
    event.preventDefault()
    erasePixel(rowIndex, pixelIndex)
  }

  const erasePixel = (rowIndex, pixelIndex) => setFilledPixels(
    filledPixels.filter(([x, y]) => !(x === rowIndex && y === pixelIndex))
  )

  const getColor = (rowIndex, pixelIndex) => {
    const pixel = filledPixels.find(([x, y]) => (x === rowIndex && y === pixelIndex))
    return (pixel)
      ? pixel[2]
      : 'white'
  }

  const isPaintBrushClicked = () => {
    paintBrushClickedstate(!paintBrushClicked)
  }

  const paintBrushChoose = () => {
    return paintBrushClicked
      ? paint_brush_icon_choosen
      : paint_brush_icon
  }

  const isRectangleClicked = () => {
    rectangleClickedstate(!rectangleClicked)
  }

  const rectangleChoose = () => {
    return rectangleClicked
      ? rectangle_icon_choosen
      : rectangle_icon
  }

  const isMouseDown = () => {
    mouseDownState(!mouseDown)
    console.log(mouseDown)
  }

  const isMouseUp = () => {
    mouseDownState(!mouseDown)
    console.log(mouseDown)
  }

  return (
    <div className={"centered"}>
      <h2 className={"title"}>Prawie jak Paint 🖌</h2>
      <div className={"toolBox"}>
        <div>
          <img src={paintBrushChoose()}
            alt="PaintBrushIcon"
            className={'paintBrushIcon'}
            onClick={() => isPaintBrushClicked()} />
        </div>
        <div>
          <img src={rectangleChoose()}
            alt="RectangleIcon"
            className={'rectangleIcon'}
            onClick={() => isRectangleClicked()} />
        </div>
        {/* </div> */}
        <div className={"picker-style"}>
          <ChromePicker
            color={color}
            onChangeComplete={(color) => setColor(color.hex)}
          />
        </div>
        {
          canvas.map((row, rowIndex) => (
            <div key={rowIndex}
              className={'canvas-row'}>
              {
                row.map((pixel, pixelIndex) =>
                  <div
                    onMouseDown={() => isMouseDown()}
                    onMouseUp={() => isMouseUp()}
                    onMouseOver={() => mouseDown && paintBrushClicked && handlePixelClick(rowIndex, pixelIndex)}
                    key={pixelIndex}
                    onContextMenu={(event) => handleRightClick(event, rowIndex, pixelIndex)}
                    onClick={() => !paintBrushClicked && handlePixelClick(rowIndex, pixelIndex)}
                    className={"pixel"}
                    style={{ backgroundColor: getColor(rowIndex, pixelIndex) }}
                  />)
              }
            </div>
          ))
        }
      </div>
    </div>
  );
}

export default App;
