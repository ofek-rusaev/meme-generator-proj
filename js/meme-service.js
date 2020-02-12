'use strict';

var gKeywords = { 'happy': 12, 'funny': 1 }
const KEY = 'Memes';
var gMemes = [];

var gMeme = {
    selectedImgId: 5,
    selectedLineIdx: 0,
    lines: [{
        txt: 'I never eat Falafel',
        size: 30,
        align: 'left',
        color: 'black',
        fillColor: 'black',
        positionX: 60
    }, {
        txt: 'I LOVE Falafel',
        size: 30,
        align: 'left',
        color: 'black',
        fillColor: 'black',
        positionX: 450
    }]
}

// function updateMemeData(dataKey, memeID, value) {
//     var data = dataKey;
//     gMeme[memeID].data = value;
//     console.log('updating gmeme', value);
// }

function saveMeme() {
    gMemes.push(gMeme);
    saveToStorage(KEY, gMemes);
}

function imgsForDisplay() {
    return gImgs;
}

function getMemeData() {
    return gMeme;
}

function getImg(imgId) {
    return gImgs.find(img => img.id === imgId);
}

var gImgs = [
    { id: 1, url: 'img/1.jpg', keywords: ['orange'] },
    { id: 2, url: 'img/2.jpg', keywords: ['puppy', 'cute'] },
    { id: 3, url: 'img/3.jpg', keywords: ['happy', 'puppy', 'cute'] },
    { id: 4, url: 'img/4.jpg', keywords: ['cat'] },
    { id: 5, url: 'img/5.jpg', keywords: ['happy'] },
    { id: 6, url: 'img/6.jpg', keywords: ['happy'] },
    { id: 7, url: 'img/7.jpg', keywords: ['happy'] },
    { id: 8, url: 'img/8.jpg', keywords: ['happy'] },
    { id: 9, url: 'img/9.jpg', keywords: ['happy'] },
    { id: 10, url: 'img/10.jpg', keywords: ['happy'] },
    { id: 11, url: 'img/11.jpg', keywords: ['happy'] },
    { id: 12, url: 'img/12.jpg', keywords: ['happy'] },
    { id: 13, url: 'img/13.jpg', keywords: ['happy'] },
    { id: 14, url: 'img/14.jpg', keywords: ['happy'] },
    { id: 15, url: 'img/15.jpg', keywords: ['happy'] },
    { id: 16, url: 'img/16.jpg', keywords: ['happy'] },
];