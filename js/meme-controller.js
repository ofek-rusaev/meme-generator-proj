'use strict';

var gCanvas;
var gCtx;
var gCurrShape;
var gFontFamily;
var gFontSize;
var gCurrImg;
var gTopLineLocation = 60;
var gTextAlign = 'left';
var isEditing = false;

var gFill;

function onRenderCanvas(img) {
    gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height);
    gCurrImg = img;
}

function onClearCanvas() {
    let isSure = confirm('Are you sure?');
    if (isSure) gCtx.clearRect(0, 0, gCanvas.width, gCanvas.height);
}

function onRenderLines() {
    var meme = getMemeData();
    var lines = meme.lines;
    lines.forEach(line => {
        onRenderText();
    })
}
function onRenderText() {
    var memeData = getMemeData();
    onRenderCanvas(gCurrImg);
    console.log('2 lines test: ', memeData);
    var idx = memeData.selectedLineIdx;
    var lines = memeData.lines;
    // lines.forEach(line => {
    //     var text = document.querySelector('.text-input').value;
    //     if (!text) text = memeData.lines[idx].txt;
    //     memeData.lines.txt = text;
    //     if (!gFontSize) gFontSize = memeData.lines[idx].size;
    //     memeData.lines[idx].size = gFontSize;
    //     gCtx.font = `${gFontSize}px ${gFontFamily}`
    //     gCtx.strokeStyle = memeData.lines[idx].color;
    //     if (gTextAlign === 'center') {
    //         gCtx.textAlign = 'center';
    //         gCtx.strokeText(text, 250, memeData.lines[idx].positionX);
    //     } else if (gTextAlign === 'right') {
    //         gCtx.textAlign = 'right';
    //         gCtx.strokeText(text, 480, memeData.lines[idx].positionX);
    //     } else {
    //         gCtx.textAlign = 'left';
    //         gCtx.strokeText(text, 60, memeData.lines[idx].positionX);
    //     }
    //     idx ++;
    //     gCtx.fillStyle = gFill;
    //     gCtx.fill()
    // }
    // )

    var text = document.querySelector('.text-input').value;
    if (!text) text = memeData.lines[idx].txt;
    memeData.lines[idx].txt = text;
    if (!gFontSize) gFontSize = memeData.lines[idx].size;
    memeData.lines[idx].size = gFontSize;
    gCtx.font = `${gFontSize}px ${gFontFamily}`
    gCtx.strokeStyle = memeData.lines[idx].color;
    if (gTextAlign === 'center') {
        gCtx.textAlign = 'center';
        gCtx.strokeText(text, 250, gTopLineLocation);
    } else if (gTextAlign === 'right') {
        gCtx.textAlign = 'right';
        gCtx.strokeText(text, 480, gTopLineLocation);
    } else {
        gCtx.textAlign = 'left';
        gCtx.strokeText(text, 60, gTopLineLocation);
    }
    gCtx.fillStyle = gFill;
    gCtx.fill()
}

function onLineMove(diff) {
    var memeData = getMemeData();
    var lineDirection = diff.classList.value;
    gTopLineLocation += (lineDirection === 'up') ? -2 : 2;
    onRenderText();
}

function onTxtSize(diff) {
    var sizeChanger = diff.classList.value;
    gFontSize += (sizeChanger === 'increase') ? 2 : -2;
    onRenderText();
}

function onSetStrokeStyle(color) {
    var memeData = getMemeData();
    memeData.lines['0'].color = color;
    onRenderText();
}

function onSetFillStyle(color) {
    var memeData = getMemeData();
    memeData.lines['0'].fillColor = color;
    gFill = memeData.lines['0'].fillColor;
    onRenderText();
}

function onSetFont(font) {
    switch (font) {
        case 'Times New Roman':
            gFontFamily = `'Times New Roman', Times, serif`;
            onRenderText();
            break;
        case 'Impact':
            gFontFamily = `Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif`;
            onRenderText();
            break;
        case 'Arial':
            gFontFamily = `Arial, Helvetica, sans-serif`;
            onRenderText();
            break;
        default:
            gFontFamily = 'monospace';
            onRenderText();
            break;
    }
}

function onTxtAlign(value) {
    var memeData = getMemeData();
    memeData.lines['0'].align = value.classList;
    gTextAlign = value.classList.value;
    onRenderText();
}
