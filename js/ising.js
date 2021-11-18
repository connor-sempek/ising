// ********************************************************
// **** JS code for visulizing Ising model simulations ****
// ********************************************************

// set up svg namespace to dynamically add svg/g to html and append children
const svgns = "http://www.w3.org/2000/svg"

// generate random integer between min and max inclusive
function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
};

// generate random "spin" value of +1 or -1 for Ising model
function getRandomSpin() {
  return (-1) ** getRandomIntInclusive(0, 1)
};

// generate nrows x ncols array of random spin values, in the Ising Model
// the array represents the taurus T^2 so that vertical/horizontal edges 
// are identified with one another
function generateRandomSpinArray(nrows, ncols) {
  let mat = []
  for (let i = 0; i < nrows; i++) {
    let row = []
    for (let j = 0; j < ncols; j++) {
      row.push(getRandomSpin())
    }
    mat.push(row)
  }
  return mat;
};

// given a set of parameters, generate a SVG rect mark at some position in the array
function createRect(svgns, i, j, sideLength, pad, rx=null, ry=null) {
  rect = document.createElementNS(svgns, "rect")
  rect.setAttribute("x", sideLength * j)
  rect.setAttribute("y", sideLength * i)
  rect.setAttribute("width", sideLength)
  rect.setAttribute("height", sideLength)
  if (rx != null) {rect.setAttribute("rx", rx)}
  if (ry != null) {rect.setAttribute("ry", ry)}
  rect.setAttribute("class", "cell")
  return rect;
};

// given a set of parameters, generate a SVG circle mark at some position in the array
function createCircle(svgns, i, j, sideLength, pad) {
  circ = document.createElementNS(svgns, "circle")
  circ.setAttribute("cx", sideLength * j + sideLength / 2)
  circ.setAttribute("cy", sideLength * i + sideLength / 2)
  circ.setAttribute("r", sideLength / 2)
  circ.setAttribute("class", "cell")
  return circ;
};

// given a set of parameters, generate an SVG mark at some position in the array
function createMark(svgns, markName, i, j, sideLength, pad, rx=null, ry=null) {
  if (markName == "rect") {
    return createRect(svgns, i, j, sideLength, pad, rx, ry);
  } else if (markName == "circle") {
    return createCircle(svgns, i, j, sideLength, pad);
  }
};

// draw the spin array as a n x n array of marks (e.g., rects or circles) colored
// based on their spin values
function drawSpinArray(parent, n, markName, pad, sideLength, spinColor) {
  var lattice = generateRandomSpinArray(n, n)
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      var spin = lattice[i][j]
      mark = createMark(svgns, markName, i, j, sideLength, pad)
      mark.setAttribute("fill", spin < 0 ? spinColor[0] : spinColor[1])
      mark.setAttribute("name", spin < 0 ? "negSpin" : "posSpin")
      parent.appendChild(mark)
    }
  }
};
