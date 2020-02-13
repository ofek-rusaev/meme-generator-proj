'use strict';

function onInit() {
    gCanvas = document.getElementById('my-canvas');
    gCtx = gCanvas.getContext('2d');
    onRenderImgs();

    gCanvas.addEventListener("mousedown", onNewEvent);
    gCanvas.addEventListener("mouseup", onNewEvent);
    gCanvas.addEventListener("mousemove", onDrawing);

    gCanvas.addEventListener("touchstart", onNewEvent);
    gCanvas.addEventListener("touchend", onNewEvent);
    gCanvas.addEventListener("touchmove", onDrawing);
}

function onRenderImgs() {
    let imgs = imgsForDisplay();
    let elImgContainer = document.querySelector('.images-container');
    let strHTML = '';
    imgs.forEach(img => {
        strHTML += `<img data-id="${img.id}" src="${img.url}" alt="" onclick="onSetImgMeme(this)">`;
    });
    elImgContainer.innerHTML = strHTML;
}

function onSetImgMeme(elImg) {
    onRenderCanvas(elImg);
    var memeData = getMemeData();
    memeData.selectedImgId = elImg.dataset.id;
    document.querySelector('.images-container').style.display = 'none';
    document.querySelector('.hide-canvas').hidden = false;
    document.querySelector('.memes-container').style.display = 'none';
}

function onSave() {
    const imgData = gCanvas.toDataURL();
    saveMeme(imgData);
    // document.querySelector('.canvas-container').style.display = 'flex';
    document.querySelector('.hide-canvas').hidden = true;
    document.querySelector('.images-container').style.display = 'grid';
    document.querySelector('.memes-container').style.display = 'none';
}

function onShowGallery() {
    document.querySelector('.images-container').style.display = 'grid';
    document.querySelector('.memes-container').style.display = 'none';
    document.querySelector('.hide-canvas').hidden = true;
}

function onShowMemes() {
    document.querySelector('.images-container').style.display = 'none';
    document.querySelector('.memes-container').style.display = 'grid';
    document.querySelector('.hide-canvas').hidden = true;
    onRenderMemes();
}

function onRenderMemes() {
    let memes = getMemes();
    let elMemeContainer = document.querySelector('.memes-container');

    let strHTML = '';
    console.log('memes saved and loaded : ', memes);
    memes.forEach(meme => {
        strHTML += `<img data-id="" src="${meme}" alt="" onclick="onSetImgMeme(this)">`;
    })
    elMemeContainer.innerHTML = strHTML;

}
function onToggleMenu() {
    document.body.classList.toggle('menu-open');
}
