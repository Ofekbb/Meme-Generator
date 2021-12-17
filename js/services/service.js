'use strict'

var gKeywordSearchCountMap = { 'funny': 12, 'cat': 16, 'baby': 2, 'politics': 4, 'sport': 5 }
var gIdx = 2
var gImgs = [
    { id: 1, url: 'img/1.jpg', keywords: ['funny', 'politics', 'famous'] },
    { id: 2, url: 'img/2.jpg', keywords: ['love', 'dog', 'cute'] },
    { id: 3, url: 'img/3.jpg', keywords: ['cute', 'dog', 'baby'] },
    { id: 4, url: 'img/4.jpg', keywords: ['funny', 'cat'] },
    { id: 5, url: 'img/5.jpg', keywords: ['baby', 'funny', 'cute'] },
    { id: 6, url: 'img/6.jpg', keywords: ['tv', 'funny'] },
    { id: 7, url: 'img/7.jpg', keywords: ['baby', 'cute'] },
    { id: 8, url: 'img/8.jpg', keywords: ['tv', 'famous'] },
    { id: 9, url: 'img/9.jpg', keywords: ['baby', 'funny'] },
    { id: 10, url: 'img/10.jpg', keywords: ['funny', 'politics'] },
    { id: 11, url: 'img/11.jpg', keywords: ['sport', 'funny'] },
    { id: 12, url: 'img/12.jpg', keywords: ['tv', 'funny'] },
    { id: 13, url: 'img/13.jpg', keywords: ['tv', 'famous'] },
    { id: 14, url: 'img/14.jpg', keywords: ['tv', 'famous'] },
    { id: 15, url: 'img/15.jpg', keywords: ['tv', 'famous'] },
    { id: 16, url: 'img/16.jpg', keywords: ['tv', 'famous'] },
    { id: 17, url: 'img/17.jpg', keywords: ['politics', 'famous'] },
    { id: 18, url: 'img/18.jpg', keywords: ['tv', 'funny'] }

];

var gStickers = [{
        id: 1,
        url: 'stickers/beach-ball.png',
        positionX: 225,
        positionY: 225,
        width: 100,
        height: 100,
        isDragging: false
    },
    {
        id: 2,
        url: 'stickers/coconut-drink.png',
        positionX: 225,
        positionY: 225,
        width: 100,
        height: 100,
        isDragging: false
    },
    {
        id: 3,
        url: 'stickers/parrot.png',
        positionX: 225,
        positionY: 225,
        width: 100,
        height: 100,
        isDragging: false
    },
    {
        id: 4,
        url: 'stickers/summer.png',
        positionX: 225,
        positionY: 225,
        width: 100,
        height: 100,
        isDragging: false
    },
    {
        id: 5,
        url: 'stickers/sun.png',
        positionX: 225,
        positionY: 225,
        width: 100,
        height: 100,
        isDragging: false
    },
    {
        id: 6,
        url: 'stickers/turtle.png',
        positionX: 225,
        positionY: 225,
        width: 100,
        height: 100,
        isDragging: false
    },
    {
        id: 7,
        url: 'stickers/party.png',
        positionX: 225,
        positionY: 225,
        width: 100,
        height: 100,
        isDragging: false
    },
    {
        id: 8,
        url: 'stickers/glass.png',
        positionX: 225,
        positionY: 225,
        width: 100,
        height: 100,
        isDragging: false
    },
    {
        id: 9,
        url: 'stickers/party-hat.png',
        positionX: 225,
        positionY: 225,
        width: 100,
        height: 100,
        isDragging: false
    }
]
var gMeme = {
    selectedImgId: 5,
    selectedLineIdx: 0,
    selectedStickerIdx: 0,
    lines: [{
            idx: 0,
            txt: 'I Love Falafel',
            size: 40,
            font: 'Montserrat',
            align: 'center',
            color: 'black',
            strokeColor: 'white',
            positionX: 250,
            positionY: 50,
            isDragging: false

        },
        {
            idx: 1,
            txt: 'Yofi',
            size: 40,
            font: 'Montserrat',
            align: 'center',
            color: 'black',
            strokeColor: 'white',
            positionX: 250,
            positionY: 400,
            isDragging: false

        }
    ],
    stickers: []
}

function clearCanvas() {
    gMeme = {
        selectedImgId: 5,
        selectedLineIdx: 0,
        selectedStickerIdx: 0,
        lines: [{
                idx: 0,
                txt: 'I Love Falafel',
                size: 40,
                font: 'Montserrat',
                align: 'center',
                color: 'black',
                strokeColor: 'white',
                positionX: 250,
                positionY: 50,
                isDragging: false

            },
            {
                idx: 1,
                txt: 'Yofi',
                size: 40,
                font: 'Montserrat',
                align: 'center',
                color: 'black',
                strokeColor: 'white',
                positionX: 250,
                positionY: 400,
                isDragging: false

            }
        ],
        stickers: []
    }
}

function getImgs() {
    return gImgs;
}

function updateMemeImg(imgId) {
    gMeme.selectedImgId = imgId
}

function getMemeImg() {
    return gMeme.selectedImgId
}

function getMeme() {
    return gMeme
}

function updateMemeTxt(selectedLineIdx, txt) {
    gMeme.lines[selectedLineIdx].txt = txt
    console.log('service:' + gMeme.lines[selectedLineIdx].txt)
}

function addLine() {
    var line = {
        idx: gIdx++,
        txt: 'Add new text here',
        font: 'Montserrat',
        size: 40,
        align: 'center',
        color: 'black',
        strokeColor: 'white',
        positionX: 225,
        positionY: 225,
        isDragging: false
    }
    gMeme.lines.push(line)
    gMeme.selectedLineIdx = gMeme.lines.length - 1
}

function deleteObjectService() {
    if (gFocusOnTxt) {
        if (gMeme.lines.length === 0) return
        gMeme.lines.splice(gMeme.selectedLineIdx, 1)
        gMeme.selectedLineIdx = 0
    }
    if (gFocusOnSticker) {
        if (gMeme.stickers.length === 0) return
        var idx = getSelectedStickerIdx()
        console.log(gMeme.selectedStickerIdx)
        gMeme.stickers.splice(idx, 1)
    }
}

function changeLines() {
    if (gMeme.lines.length === 0) return
    if (gMeme.selectedLineIdx === gMeme.lines.length - 1) gMeme.selectedLineIdx = 0
    else gMeme.selectedLineIdx++

}


// 0 for increase
// 1 for decrease
function changeTextSizeService(num) {

    if (gFocusOnTxt) {
        if (num === 0) {
            gMeme.lines[gMeme.selectedLineIdx].size++
        } else {
            if (gMeme.lines[gMeme.selectedLineIdx].size > 0) {
                gMeme.lines[gMeme.selectedLineIdx].size--
            }
        }
    }
    if (gFocusOnSticker) {
        var idx = getSelectedStickerIdx()
        if (num === 0) {
            gMeme.stickers[idx].width += 5
            gMeme.stickers[idx].height += 5
        } else {
            gMeme.stickers[idx].width -= 5
            gMeme.stickers[idx].height -= 5
        }
    }
}


// 0 for Left
// 1 for Center
// 2 for Right

function changeAlignService(num) {
    if (gFocusOnSticker) return
    switch (num) {
        case 0:
            gMeme.lines[gMeme.selectedLineIdx].align = 'left'
            break;
        case 1:
            gMeme.lines[gMeme.selectedLineIdx].align = 'center'
            break;
        case 2:
            gMeme.lines[gMeme.selectedLineIdx].align = 'right'
    }
}

function changeFontService(font) {
    if (gFocusOnSticker) return
    gMeme.lines[gMeme.selectedLineIdx].font = font
}

function changeStrokeColorService(strokeColor) {
    if (gFocusOnSticker) return
    gMeme.lines[gMeme.selectedLineIdx].strokeColor = strokeColor
}

function changeFillColorService(fillColor) {
    if (gFocusOnSticker) return
    gMeme.lines[gMeme.selectedLineIdx].color = fillColor
}


function renderIdx() {
    const length = gMeme.lines.length
    var idx = 0
    gMeme.lines.forEach(function(line) {
        line.idx = idx
        idx++
    })
}

function getSelectedStickerIdx() {
    var idx = gMeme.stickers.findIndex(function(sticker) {
        return (sticker.id === gMeme.selectedStickerIdx)
    })
    return idx
}

function changeSelectedLine(idx) {
    gMeme.selectedLineIdx = idx
}

function changeSelectedSticker(idx) {
    gMeme.selectedStickerIdx = idx
}

function updateIsDragging(idx, type, isDragging) {
    if (type === 'lines') {
        gMeme.lines[idx].isDragging = isDragging
    }
    if (type === 'stickers') {
        var sticker = gMeme.stickers.find(function(sticker) {
            return (sticker.id === idx)
        })
        sticker.isDragging = isDragging;
    }

}


function changePosition(dx, dy) {
    if (gFocusOnTxt) {
        if (gMeme.lines.length === 0) return
        const lineIdx = gMeme.selectedLineIdx
        gMeme.lines[lineIdx].positionX += dx
        gMeme.lines[lineIdx].positionY += dy
    }
    if (gFocusOnSticker) {
        if (gMeme.stickers.length === 0) return
        var memeSticker = gMeme.stickers.find(function(sticker) {
            return (sticker.id === gMeme.selectedStickerIdx)
        })
        memeSticker.positionX += dx
        memeSticker.positionY += dy

    }
}


function getKeyWords() {
    return gKeywordSearchCountMap
}

function getStickers() {
    return gStickers
}

function addStickerToMeme(sticker) {
    gMeme.stickers.push(sticker)
}