import React, { useState } from 'react';
import './App.css';
import { ChromePicker } from 'react-color';
import paint_brush_icon from './assets/paint_brush_icon.png'
import paint_brush_icon_choosen from './assets/paint_brush_icon_choosen.png'
import rectangle_icon from './assets/rectangle_icon.png'
import rectangle_icon_choosen from './assets/rectangle_icon_choosen.png'

const canvas = new Array(50).fill('')
  .map(() => new Array(50).fill(''))

function App() {
  /* const [canvas, setCanvas] = useState(
    new Array(50).fill('')
      .map(() => new Array(50).fill(''))) */

  const [filledPixels, setFilledPixels] = useState([])
  const [rectanglePixels, setRectanglePixels] = useState([])
  const [color, setColor] = useState('#000000');
  const [paintBrushClicked, paintBrushClickedstate] = useState(false)
  const [rectangleClicked, rectangleClickedstate] = useState(false)
  const [mouseDown, mouseDownState] = useState(false)

  const colorMultiplePixels = (pixels) => {
    const nextFilledPixels = [...filledPixels, ...pixels]
    setFilledPixels(nextFilledPixels)
  }

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

  const setPaintBrushClicked = () => {
    paintBrushClickedstate(!paintBrushClicked)
  }

  const paintBrushChoose = () => {    //zwraca nazwe image w zalenosci czy wybrany czy nie
    return paintBrushClicked
      ? paint_brush_icon_choosen
      : paint_brush_icon
  }

  const setRectangleClicked = () => {
    rectangleClickedstate(!rectangleClicked)
  }

  const rectangleChoose = () => {
    return rectangleClicked
      ? rectangle_icon_choosen
      : rectangle_icon
  }

  const setMouseDown = (event) => {
    mouseDownState(!mouseDown)
  }

  const setMouseUp = () => {
    mouseDownState(!mouseDown)
  }

  const rectangleDiagonal = (rowIndex, pixelIndex) => {
    const nextRectanglePixels = [...rectanglePixels, [rowIndex, pixelIndex, color]]
    setRectanglePixels(nextRectanglePixels)

    console.log('rectanglePixels:', nextRectanglePixels)
    if (nextRectanglePixels.length === 2) {
      rectangleDraw(nextRectanglePixels)
    }
  }

  const rectangleDraw = (nextRectanglePixels) => {
    //debugger
    colorMultiplePixels([
      [nextRectanglePixels[0][0], nextRectanglePixels[0][1], nextRectanglePixels[0][2]],
      [nextRectanglePixels[1][0], nextRectanglePixels[1][1], nextRectanglePixels[1][2]]
    ])
    //setFilledPixels([...filledPixels, [rectanglePixels[0][0], rectanglePixels[0][1], color]])
    console.log('drawn first')
    console.log(filledPixels)
    //setFilledPixels([...filledPixels, [rectanglePixels[1][0], rectanglePixels[1][1], color]])
    console.log('drawn second')
    console.log(filledPixels)

    setRectanglePixels([])  //czyszczenie tablicy przekątnych
    console.log('erased')
  }

  return (
    <div className={"centered"}>
      <h2 className={"title"}>Prawie jak Paint 🖌</h2>
      <div className={"toolBox"}>
        <div>
          <img src={paintBrushChoose()}
            alt="PaintBrushIcon"
            className={'paintBrushIcon'}
            onClick={() => setPaintBrushClicked()} />
        </div>
        <div>
          <img src={rectangleChoose()}
            alt="RectangleIcon"
            className={'rectangleIcon'}
            onClick={() => setRectangleClicked()} />
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
                    //onMouseDown={setMouseDown}    //paintbrush only
                    onMouseDown={() => rectangleClicked ? rectangleDiagonal(rowIndex, pixelIndex) : setMouseDown()}
                    //onMouseUp={setMouseUp}        //paintbrush only
                    onMouseUp={() => rectangleClicked ? rectangleDiagonal(rowIndex, pixelIndex) : setMouseUp()}
                    onMouseOver={() => (mouseDown && paintBrushClicked && handlePixelClick(rowIndex, pixelIndex))} //dziala
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
