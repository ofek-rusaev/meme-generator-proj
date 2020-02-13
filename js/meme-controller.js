'use strict';

var gCanvas;
var gCtx;
var gCurrImg;
var gLineIdx;
var gFontFamily;
var gFontSize;
var gTopLineLocation = 60;
var gTextAlign = 'left';
var isEditing = false;

var gStrokeColor;
var gFillColor;

function onRenderCanvas(img) {
    gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height);
    gCurrImg = img;
}

function onClearCanvas() {
    let isSure = confirm('Are you sure?');
    if (isSure) gCtx.clearRect(0, 0, gCanvas.width, gCanvas.height);
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
    if (!text) text = getText(gLineIdx, text);
    setText(gLineIdx, text);
    gFontSize = getFontSize(gLineIdx);
    // gCtx.fillStyle = memeData.lines[gLineIdx].fillColor;
    renderText();
}

function onLineMove(diff) {
    var lineDirection = diff.classList.value;
    gTopLineLocation += (lineDirection === 'up') ? -2 : 2;
    var memeData = getMemeData();
    var memeLineId = memeData.selectedLineIdx;
    setPositionY(memeLineId, gTopLineLocation);
    renderText();
}

function onTxtSize(diff) {
    var sizeChanger = diff.classList.value;
    gFontSize += (sizeChanger === 'increase') ? 2 : -2;
    var memeData = getMemeData();
    var memeLineId = memeData.selectedLineIdx;
    setFontSize(memeLineId, gFontSize);
    renderText();
}

function onSetStrokeStyle(color) {
    var memeData = getMemeData();
    var memeLineId = memeData.selectedLineIdx;
    gStrokeColor = color;
    setStrokeStyle(memeLineId, gStrokeColor);
    renderText();
}

function onSetFillStyle(color) {
    var memeData = getMemeData();
    var memeLineId = memeData.selectedLineIdx;
    gFillColor = color;
    setFillStyle(memeLineId, gFillColor)
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

function onTxtAlign(value) {
    var memeData = getMemeData();
    var memeLineId = memeData.selectedLineIdx;
    var positionX;
    gTextAlign = value.classList.value;
    if (gTextAlign === 'center') positionX = 250;
    else if (gTextAlign === 'right') positionX = 480;
    else positionX = 60;
    setAlignData(memeLineId, gTextAlign);
    setPositionX(memeLineId, positionX);
    renderText();
}
