'use strict';

var gCanvas;
var gCtx;
var gCurrImg;
var gLineIdx;
var gFontFamily = 'monospace';
var gFontSize;
var gTextAlign = 'left';
var isEditing = false;

var gIsDragging = false;

function onNewEvent(ev) {
    gIsDragging = !gIsDragging;
}

function onDrag(ev) {
    var offsetX;
    var offsetY;
    if (gIsDragging) {
        if (ev.type === 'touchmove') {
            ev.preventDefault()
            var position = getTouchPos(ev);
            offsetX = position.x;
            offsetY = position.y;
        } else {
            offsetX = ev.offsetX;
            offsetY = ev.offsetY;
        }
        let lineIdx = (offsetY < 300) ? 0 : 1;
        setPoseX(lineIdx, offsetX);
        setPoseY(lineIdx, offsetY);
        renderText();
    }
}

// window.addEventListener('DOMContentLoaded', () => {
//     const button = document.querySelector('#emoji-button');
//     const picker = new EmojiButton();
//     picker.on('emoji', emoji => {
//         document.querySelector('.text-input').value += emoji;
//         // renderText();
//         onTypeText();
//         // onRenderCanvas(gCurrImg);
//     });
//     button.addEventListener('click', () => {
//         picker.pickerVisible ? picker.hidePicker() : picker.showPicker(button);
//     });
// });

function getTouchPos(event) {
    var rect = gCanvas.getBoundingClientRect();
    return {
        x: event.touches[0].clientX - rect.left,
        y: event.touches[0].clientY - rect.top
    };
}

function onRenderCanvas(img) {
    gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height);
    gCurrImg = img;
}

function onClearCanvas() {
    var memeData = getMemeData();
    updateLineIdx(memeData.selectedLineIdx);
    setText(memeData.selectedLineIdx, '');
    renderText();
}


function renderText() {
    onRenderCanvas(gCurrImg);
    var lines = getLines();
    lines.forEach(line => {
        gCtx.textAlign = line.align;
        gCtx.font = `${line.size}px ${gFontFamily}`;
        gCtx.strokeStyle = line.color;
        gCtx.strokeText(line.txt, line.positionX, line.positionY);
        gCtx.fillStyle = line.fillColor;
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
    renderText();
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
    setStrokeStyle(gLineIdx, color);
    renderText();
}

function onSetFillStyle(color) {
    setFillStyle(gLineIdx, color)
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
