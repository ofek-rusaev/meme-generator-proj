'use strict';

function onInit() {
    gCanvas = document.getElementById('my-canvas');
    gCtx = gCanvas.getContext('2d');
    onRenderImgs();
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
    document.querySelector('.hide').hidden = false;
}

function onSave() {
    document.querySelector('.canvas-container').style.display = 'flex';
    document.querySelector('.hide').hidden = true;
    document.querySelector('.images-container').style.display = 'grid';
    saveMeme();
}
