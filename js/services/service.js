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

var gStickers = [
    { id: 1, url: 'stickers/beach-ball.png' },
    { id: 2, url: 'stickers/coconut-drink.png' },
    { id: 3, url: 'stickers/parrot.png' },
    { id: 4, url: 'stickers/summer.png' },
    { id: 5, url: 'stickers/sun.png' },
    { id: 6, url: 'stickers/turtle.png' }
]

var gMeme = {
    selectedImgId: 5,
    selectedLineIdx: 0,
    lines: [{
            idx: 0,
            txt: 'I Love Falafel',
            size: 30,
            font: 'Montserrat',
            align: 'center',
            color: 'black',
            strokeColor: 'white',
            positionX: 250,
            positionY: 50,

        },
        {
            idx: 1,
            txt: 'Yofi',
            size: 30,
            font: 'Montserrat',
            align: 'center',
            color: 'black',
            strokeColor: 'white',
            positionX: 250,
            positionY: 400,

        }
    ]
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
        size: 30,
        align: 'center',
        color: 'black',
        strokeColor: 'white',
        positionX: 225,
        positionY: 225
    }
    gMeme.lines.push(line)
    gMeme.selectedLineIdx = gMeme.lines.length - 1
}

function deleteObjectService() {
    if (gMeme.lines.length === 0) return
    gMeme.lines.splice(gFocus, 1)
}


// 0 for increase
// 1 for decrease
function changeTextSizeService(num) {
    if (num === 0) {
        gMeme.lines[gFocus].size++
    } else {
        if (gMeme.lines[gFocus].size > 0) {
            gMeme.lines[gFocus].size--
        }
    }
}


// 0 for Left
// 1 for Center
// 2 for Right

function changeAlignService(num) {
    switch (num) {
        case 0:
            gMeme.lines[gFocus].align = 'left'
            break;
        case 1:
            gMeme.lines[gFocus].align = 'center'
            break;
        case 2:
            gMeme.lines[gFocus].align = 'right'
    }
}

function changeFontService(font) {
    gMeme.lines[gFocus].font = font
}

function changeStrokeColorService(strokeColor) {
    gMeme.lines[gFocus].strokeColor = strokeColor
}

function changeFillColorService(fillColor) {
    gMeme.lines[gFocus].color = fillColor
}


//render line IDX
function renderIdx() {
    const length = gMeme.lines.length
    var idx = 0
    gMeme.lines.forEach(function(line) {
        line.idx = idx
        idx++
    })
    console.log(gMeme)
}

function moveSelectedByDragging(pos, gStartPos) {
    const dx = pos.x - gStartPos.x;
    const dy = pos.y - gStartPos.y;

    if (gFocus >= 0) {
        gMeme.lines[gFocus].positionX += dx;
        gMeme.lines[gFocus].positionY += dy;
    }

}

function getKeyWords() {
    return gKeywordSearchCountMap
}

function getStickers() {
    return gStickers
}