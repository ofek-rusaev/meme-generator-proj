'use strict';

var gKeywords = { 'happy': 12, 'funny': 1 }
const KEY = 'Memes';
var gMemes = getMemes();
var gCurrFilterWord;

var gImgs = [
    { id: 1, url: 'img/1.jpg', keywords: ['orange', 'funny'] },
    { id: 2, url: 'img/2.jpg', keywords: ['puppy', 'cute'] },
    { id: 3, url: 'img/3.jpg', keywords: ['baby', 'puppy', 'cute'] },
    { id: 4, url: 'img/4.jpg', keywords: ['cat'] },
    { id: 5, url: 'img/5.jpg', keywords: ['baby', 'win'] },
    { id: 6, url: 'img/6.jpg', keywords: ['happy'] },
    { id: 7, url: 'img/7.jpg', keywords: ['baby'] },
    { id: 8, url: 'img/8.jpg', keywords: ['funny'] },
    { id: 9, url: 'img/9.jpg', keywords: ['happy', 'baby'] },
    { id: 10, url: 'img/10.jpg', keywords: ['happy'] },
    { id: 11, url: 'img/11.jpg', keywords: ['happy'] },
    { id: 12, url: 'img/12.jpg', keywords: ['happy'] },
    { id: 13, url: 'img/13.jpg', keywords: ['happy'] },
    { id: 14, url: 'img/14.jpg', keywords: ['funny'] },
    { id: 15, url: 'img/15.jpg', keywords: ['funny'] },
    { id: 16, url: 'img/16.jpg', keywords: ['funny'] },
];

var gMeme = {
    selectedImgId: 5,
    selectedLineIdx: 0,
    lines: [{
        txt: 'I never eat Falafel',
        size: 30,
        align: 'left',
        color: 'black',
        fillColor: 'black',
        positionX: 60,
        positionY: 60
    }]
}

function addLine() {
    var newLine = {
        txt: 'I LOVE Falafel',
        size: 30,
        align: 'left',
        color: 'black',
        fillColor: 'black',
        positionX: 60,
        positionY: 450
    }
    gMeme.lines.push(newLine);
}

function getKeysForSearch() {
    return gKeys;
}

function getPoseY(idx) {
    return gMeme.lines[idx].positionY;
}

function setPoseY(idx, value) {
    gMeme.lines[idx].positionY = value;
}

function updateLineIdx(idx) {
    gMeme.selectedLineIdx = idx;
}

function setPoseX(lineId, value) {
    gMeme.lines[lineId].positionX = value;
}

function setFillStyle(lineId, value) {
    gMeme.lines[lineId].fillColor = value;
}

function setAlignData(lineId, value) {
    gMeme.lines[lineId].align = value;
}

function setFontSize(lineId, value) {
    gMeme.lines[lineId].size = value;
}

function setStrokeStyle(lineId, value) {
    gMeme.lines[lineId].color = value;
}

function getLines() {
    return gMeme.lines;
}

function getFontSize(lineId) {
    return gMeme.lines[lineId].size;
}

function getText(lineId) {
    return gMeme.lines[lineId].txt;
}

function setText(line, text) {
    gMeme.lines[line].txt = text;
}

function saveMeme(imgData) {
    gMemes.push(imgData);
    saveToStorage(KEY, gMemes);
}

function getMemes() {
    var memes = loadFromStorage(KEY);
    if (!memes) memes = [];
    return memes;
}

function getImgsForDisplay() {
    if (!gCurrFilterWord) return gImgs;
    var filteredImgs = gImgs.filter(img => {
        if (img.keywords.includes(gCurrFilterWord)) {
            return img;
        }
    });
    return filteredImgs;
}

// var keys = getKeywords();

// function onlyUnique(value, index, self) {
//     return self.indexOf(value) === index;
// }

// function getKeywords() {
//     var wordkeys = gImgs.map(img => {
//         var keys = img.keywords;
//         return [...keys];
//     })

//     var uniqueKeys = wordkeys;
//     // var uniqueKeys = keys.filter(onlyUnique);
//     console.log('in unique :', uniqueKeys);

// }
function setUniqueKeys() {
    var arr = []
    for (var i = 0; i < gImgs.length; i++) {
        arr.push(...gImgs[i].keywords)
    }
    var filteredArray = arr.filter(function(item, pos) {
        return arr.indexOf(item) == pos;
    });
    return filteredArray;
}


function updateSearchWord(text) {
    gCurrFilterWord = text;
}

function resetSearchWord() {
    gCurrFilterWord = '';
}

function getMemeData() {
    return gMeme;
}

function getImg(imgId) {
    return gImgs.find(img => img.id === imgId);
}
