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
    doTrans();
    onRenderSearchBtns();
}

function onRenderSearchBtns() {
    var keys = setFilterIcons();
    let elSearchBtns = document.querySelector('.search-btn');
    let strHTMLs = '';
    keys.forEach(key => {
        let keyName = key.charAt(0).toUpperCase() + key.slice(1)
        strHTMLs += `<button class="search-btn" onclick="onSearchKeys(this)">${keyName}</button>`
    });
    elSearchBtns.innerHTML = strHTMLs;
}

function onSetLang(lang) {
    setLang(lang);
    // TODO: if lang is hebrew add RTL class
    if (lang === 'he') {
        document.body.classList.add('rtl');
    } else {
        document.body.classList.remove('rtl');
    }

    doTrans();
    // renderBooks();
}

function onRenderImgs() {
    let imgs = getImgsForDisplay();
    // console.log(imgs);
    let elImgContainer = document.querySelector('.images-container');
    let strHTMLs = '';
    imgs.forEach(img => {
        strHTMLs += `<img data-id="${img.id}" src="${img.url}" alt="" onclick="onSetImgMeme(this)">`;
    });
    elImgContainer.innerHTML = strHTMLs;
}


function onSearch() {
    var text = document.querySelector('.search-input').value;
    updateSearchWord(text);
    onRenderImgs();
}

function onSearchKeys(el) {
    var txt = el.innerText.toLowerCase();
    updateSearchWord(txt);
    onRenderImgs();
}

function onSetImgMeme(elImg) {
    onRenderCanvas(elImg);
    var memeData = getMemeData();
    memeData.selectedImgId = elImg.dataset.id;
    document.querySelector('.images-container').style.display = 'none';
    document.querySelector('.hide-canvas').hidden = false;
    document.querySelector('.memes-container').style.display = 'none';
}

function onImgInput(ev) {
    loadImageFromInput(ev, onRenderCanvas)
}

function loadImageFromInput(ev, onImageReady) {
    document.querySelector('.share-container').innerHTML = ''
    var reader = new FileReader();

    reader.onload = function (event) {
        var img = new Image();
        img.onload = onImageReady.bind(null, img)
        img.src = event.target.result;
    }
    reader.readAsDataURL(ev.target.files[0]);
}

// on submit call to this function
function onShare(elForm, ev) {
    ev.preventDefault();
    document.getElementById('imgData').value = gCanvas.toDataURL("image/jpeg");

    // A function to be called if request succeeds
    function onSuccess(uploadedImgUrl) {
        uploadedImgUrl = encodeURIComponent(uploadedImgUrl)
        document.querySelector('.share').hidden = false;
        document.querySelector('.share').innerHTML = `
        <a class="btn" href="https://www.facebook.com/sharer/sharer.php?u=${uploadedImgUrl}&t=${uploadedImgUrl}" data-trans="share" target="_blank" onclick="window.open('https://www.facebook.com/sharer/sharer.php?u=${uploadedImgUrl}&t=${uploadedImgUrl}'); return false;">
           Share   
        </a>`
    }

    doUploadImg(elForm, onSuccess);
}

function doUploadImg(elForm, onSuccess) {
    var formData = new FormData(elForm);
    fetch('http://ca-upload.com/here/upload.php', {
        method: 'POST',
        body: formData
    })
        .then(function (res) {
            return res.text()
        })
        .then(onSuccess)
        .catch(function (err) {
            console.error(err)
        })
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
    resetSearchWord();
    onRenderImgs();
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
    memes.forEach(meme => {
        strHTML += `<img data-id="" src="${meme}" alt="" onclick="onSetImgMeme(this)">`;
    })
    elMemeContainer.innerHTML = strHTML;

}
function onToggleMenu() {
    document.body.classList.toggle('menu-open');
}
