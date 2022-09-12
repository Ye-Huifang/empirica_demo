import React, { useEffect } from "react";
import { useHooks, useLayoutEffect } from "use-react-hooks";

let data = {
    canvas: null,
    ctx: null,
    fromDot: null,
    dots: [{x: 100, y: 100}, {x: 200, y: 200}, {x: 200, y: 100}, {x: 100, y: 200}, {x: 100, y: 300}, {x: 200, y: 300}, {x: 300, y: 300}, {x: 300, y: 100}, {x: 300, y: 200}],
    collDots: new Set(),
    lineNum: 0,
    radius: 10
}

function drawLine (toDot) {
    data.ctx.beginPath();
    data.ctx.moveTo(data.fromDot.x, data.fromDot.y);
    data.ctx.lineTo(toDot.x, toDot.y);
    // data.ctx.moveTo(494, 322);
    // data.ctx.lineTo(599, 323);
    data.ctx.lineWidth = 1;
    data.ctx.strokeStyle = '#777';
    data.ctx.closePath();
    data.ctx.stroke();
    // check collision
    checkCollision(data.fromDot, toDot);
    data.fromDot = toDot;
    data.lineNum++;
}

function getOffset(el) {
  const rect = el.getBoundingClientRect();
  return {
    left: rect.left + window.scrollX,
    top: rect.top + window.scrollY
  };
}

const clearCanvas = () => {
  data.ctx.clearRect(0, 0, data.canvas.width, data.canvas.height);
  data.lineNum = 0;
  data.collDots = new Set();
  data.fromDot = null;
  drawDots();
}

function checkCollision (c1, c2) {
  let a = c1.y - c2.y;
  let b = c2.x - c1.x; 
  let c = c1.x * c2.y - c2.x * c1.y;
  // find the distance of line from the center of dots
  for (let i = 0; i < data.dots.length; i++) {
      let dot = data.dots[i];
      let distance = (Math.abs(a * dot.x + b * dot.y + c)) / Math.sqrt(a * a + b * b);
      if (data.radius >= distance && !data.collDots.has(dot)) {
          data.collDots.add(dot);
          data.ctx.beginPath();
          data.ctx.arc(dot.x, dot.y, data.radius, 0, 2 * Math.PI);
          data.ctx.fillStyle = '#880808';
          data.ctx.fill();
          data.ctx.closePath();
      }
  }
  console.log(data.collDots);
}

function drawDots () {
    for (let i = 0; i < data.dots.length; i++) {
        let dot = data.dots[i];
        data.ctx.beginPath();
        data.ctx.arc(dot.x, dot.y, data.radius, 0, 2 * Math.PI);
        data.ctx.fillStyle = '#777';
        data.ctx.fill();
    }
}

function checkForDot (e) {
    let toDot = null;
    let offsetLeft = getOffset(data.canvas).left;
    let offsetTop = getOffset(data.canvas).top;
    if (data.fromDot == null) {
        data.fromDot = {x: e.clientX - offsetLeft, y: e.clientY - offsetTop};
    } else {
        toDot = {x: e.clientX - offsetLeft, y: e.clientY - offsetTop};
        if (data.lineNum < 4) drawLine(toDot);
    }
}

const NineDots = useHooks(props => {
  // initialize the canvas context
  useLayoutEffect(() => {
    data.canvas = document.getElementById('dots');
    data.ctx = data.canvas.getContext('2d');
    drawDots();
  })

  const onMouseDown = (e) => {
    checkForDot(e);
  }

  return (
    <div className="NineDots">
      <canvas
        style={{border: "1px solid #000"}}
        width={500}
        height={500}
        onClick={onMouseDown}
        id="dots"
      />
      <br />
      <p> There are {4 - data.lineNum} lines to draw. You have connected {data.collDots.size} dots. </p>
    </div>
  )
})

export default NineDots;
