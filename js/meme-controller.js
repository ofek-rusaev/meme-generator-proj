'use strict';

var gCanvas;
var gCtx;
var gCurrImg;
var gLineIdx;
var gFontFamily;
var gFontSize;
var gTextAlign = 'left';
var isEditing = false;

var gStrokeColor;
var gFillColor;

var gIsDraging = false;
var gIsStopDraging = true;

var gPrevX;
var gPrevY;


function onNewEvent(ev) {
    // console.log(ev)
    gIsDraging = !gIsDraging;
    gPrevX = undefined;
    gPrevY = undefined;
}

function onDrawing(ev) {
    // console.log('ev: ', ev);
    var offsetX;
    var offsetY;
    if (gIsDraging) {
        if (ev.type === 'touchmove') {
            ev.preventDefault()
            offsetX = ev.changedTouches['0'].pageX;
            offsetY = ev.changedTouches['0'].pageY;
        } else {
            offsetX = ev.offsetX;
            offsetY = ev.offsetY;
            console.log('offsetX, offsetY', offsetX, offsetY);
        }
    }
    let lineIdx = (offsetY < 300) ? 0 : 1;
    onTypeText();
    setPoseX(lineIdx, offsetX);
    setPoseY(lineIdx, offsetY);
}

function onRenderCanvas(img) {
    gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height);
    gCurrImg = img;
}

function onClearCanvas() {
    let isSure = confirm('Are you sure?');
    if (isSure) {
        gCtx.clearRect(0, 0, gCanvas.width, gCanvas.height);
        document.querySelector('.hide-canvas').hidden = true;
        document.querySelector('.images-container').style.display = 'grid';
    }
}


function renderText() {
    onRenderCanvas(gCurrImg);
    var lines = getLines();
    lines.forEach(line => {
        // gCtx.lineWidth = 2;
        gCtx.textAlign = line.align;
        gCtx.font = `${line.size}px ${gFontFamily}`;
        gCtx.strokeStyle = gStrokeColor;
        gCtx.strokeText(line.txt, line.positionX, line.positionY);
        gCtx.fillStyle = gFillColor;
        gCtx.fillText(line.txt, line.positionX, line.positionY);
    });
}

function onTypeText() {
    var memeData = getMemeData();
    gLineIdx = memeData.selectedLineIdx;
    var text = document.querySelector('.text-input').value;
    if (!text) text = getText(gLineIdx);
    setText(gLineIdx, text);
    gFontSize = getFontSize(gLineIdx);
    renderText();
}

function onAddLine() {
    addLine();
}

function onLineSwitch() {
    gLineIdx += (gLineIdx) ? -1 : 1;
    updateLineIdx(gLineIdx);
    document.querySelector('.text-input').value = getText(gLineIdx);
    renderText();
}

function onTxtSize(diff) {
    var sizeChanger = diff.classList.value;
    gFontSize += (sizeChanger === 'increase') ? 2 : -2;
    setFontSize(gLineIdx, gFontSize);
    renderText();
}

function onSetStrokeStyle(color) {
    gStrokeColor = color;
    setStrokeStyle(gLineIdx, gStrokeColor);
    renderText();
}

function onSetFillStyle(color) {
    gFillColor = color;
    setFillStyle(gLineIdx, gFillColor)
    renderText();
}

function onSetFont(font) {
    switch (font) {
        case 'Times New Roman':
            gFontFamily = `'Times New Roman', Times, serif`;
            renderText();
            break;
        case 'Impact':
            gFontFamily = `Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif`;
            renderText();
            break;
        case 'Arial':
            gFontFamily = `Arial, Helvetica, sans-serif`;
            renderText();
            break;
        default:
            gFontFamily = 'monospace';
            renderText();
            break;
    }
}

function onLineMove(diff) {
    var lineDirection = diff.classList.value;
    var y = getPoseY(gLineIdx);
    y += (lineDirection === 'up') ? -2 : 2;
    setPoseY(gLineIdx, y);
    renderText();
}

function onTxtAlign(value) {
    var positionX;
    gTextAlign = value.classList.value;
    if (gTextAlign === 'center') positionX = 250;
    else if (gTextAlign === 'right') positionX = 480;
    else positionX = 60;
    setAlignData(gLineIdx, gTextAlign);
    setPoseX(gLineIdx, positionX);
    renderText();
}
