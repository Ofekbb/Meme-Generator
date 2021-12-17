'use strict'

var gCanvas
var gCtx
var gStartPos
var gIsDragging = false
var gFocusOnTxt = false
var gFocusOnSticker = false
var gCurrPosX
var gCurrPosY
var gStickerPage = 0



function renderCanvas() {
    gCanvas = document.querySelector("#my-canvas")
    gCtx = gCanvas.getContext('2d');
    setMemeImg()
    renderText()
    renderStickers()
    drawFocusLine()
    drawStickers()
    addMouseListeners()
}



function setMemeImg() {
    var imgId = getMemeImg()
    var elImg = document.querySelector(`#img-num-${imgId}`)
    gCtx.drawImage(elImg, 0, 0, gCanvas.width, gCanvas.height)

}


function renderText() {
    var meme = getMeme()
    var lines = meme.lines
    if (lines.length === 0) return
    lines.forEach(line => drawText(line))
    renderTextBox()

}


function drawText(line) {
    gCtx.setLineDash([])
    gCtx.lineWidth = '0.5'
    gCtx.strokeStyle = line.strokeColor
    gCtx.fillStyle = line.color
    gCtx.font = `${line.size}px ${line.font}`;
    gCtx.textAlign = line.align
    gCtx.fillText(line.txt, line.positionX, line.positionY)
    gCtx.strokeText(line.txt, line.positionX, line.positionY)
}

function drawFocusLine() {
    var meme = getMeme()
    if (gFocusOnTxt) {
        if (meme.lines.length === 0) return
        var line = meme.lines[meme.selectedLineIdx]
        gCtx.beginPath()
        gCtx.rect(line.positionX - 160, line.positionY - 40, 320, 50)
        gCtx.setLineDash([7])
        gCtx.strokeStyle = 'black'
        gCtx.stroke()
    }
    if (gFocusOnSticker) {
        if (meme.stickers.length === 0) return
        var memeSticker = gMeme.stickers.find(function(sticker) {
            return (sticker.id === gMeme.selectedStickerIdx)
        })
        if (!memeSticker) return
        var posX = memeSticker.positionX
        var posY = memeSticker.positionY
        gCtx.beginPath()
        gCtx.rect(posX - 10, posY - 10, memeSticker.width + 20, memeSticker.height + 20)
        gCtx.setLineDash([7])
        gCtx.strokeStyle = 'black'
        gCtx.stroke()
    }
}

function renderTextBox() {
    var meme = getMeme()
    var selectedLine = meme.selectedLineIdx
    document.querySelector('.control-txt-input').value = meme.lines[selectedLine].txt
}

function onChangeLines() {
    changeLines()
    gFocusOnTxt = true
    gFocusOnSticker = false
    renderCanvas()
}

function addText() {
    addLine() //Service add line
    renderIdx()
    gFocusOnSticker = false
    renderCanvas()
}

function deleteObject() {
    deleteObjectService() //Service delete object
    renderIdx()
    renderCanvas()
}

function changeTextSize(num) {
    changeTextSizeService(num)
    renderCanvas()
}

function changeAlign(num) {
    changeAlignService(num)
    renderCanvas()
}

function changeFont(font) {
    changeFontService(font)
    renderCanvas()
}

function changeStrokeColor(strokeColor) {
    changeStrokeColorService(strokeColor)
    renderCanvas()

}

function changeFillColor(fillColor) {
    changeFillColorService(fillColor)
    renderCanvas()

}



// DRAG AND DROP

function addMouseListeners() {
    gCanvas.addEventListener('mousedown', onDown);
    gCanvas.addEventListener('mousemove', onMove);
    gCanvas.addEventListener('mouseup', onUp);

    gCanvas.addEventListener('touchstart', onDown)
    gCanvas.addEventListener('touchmove', onMove)
    gCanvas.addEventListener('touchend', onUp)
}



function onDown(ev) {
    var offsetX
    var offsetY

    ev.preventDefault()
    ev.stopPropagation()

    if (ev.type === 'touchstart') {
        offsetX = ev.changedTouches[0].pageX - gCanvas.getBoundingClientRect().left
        offsetY = ev.changedTouches[0].pageY - gCanvas.getBoundingClientRect().top
    } else {
        offsetX = ev.offsetX
        offsetY = ev.offsetY
    }



    var meme = getMeme()
    var lines = meme.lines
    var stickers = meme.stickers
    var idx = 0
    lines.forEach(function(line) {
        if (offsetX > line.positionX - 160 &&
            offsetX < line.positionX + 160 &&
            offsetY > line.positionY - 40 &&
            offsetY < line.positionY + 10) {
            changeSelectedLine(idx)
            updateIsDragging(idx, 'lines', true)
            document.querySelector('.control-txt-input').value = line.txt
            renderCanvas()
            gIsDragging = true
            gFocusOnTxt = true
            gFocusOnSticker = false
            return
        }
        idx++
    })


    stickers.forEach(function(sticker) {
        if (offsetX > sticker.positionX - 10 &&
            offsetX < sticker.positionX + sticker.width + 10 &&
            offsetY > sticker.positionY - 10 &&
            offsetY < sticker.positionY + sticker.height + 10) {
            changeSelectedSticker(sticker.id)
            updateIsDragging(sticker.id, 'stickers', true)
            renderCanvas()
            gIsDragging = true
            gFocusOnSticker = true
            gFocusOnTxt = false
            return
        }

    })


    gCurrPosX = offsetX
    gCurrPosY = offsetY
    renderCanvas()

}



function onMove(ev) {

    if (gIsDragging) {
        ev.preventDefault()
        ev.stopPropagation()

        var offsetX
        var offsetY
        if (ev.type === 'touchmove') {
            offsetX = ev.changedTouches[0].pageX - gCanvas.getBoundingClientRect().left
            offsetY = ev.changedTouches[0].pageY - gCanvas.getBoundingClientRect().top
        } else {
            offsetX = ev.offsetX
            offsetY = ev.offsetY
        }


        var dx = offsetX - gCurrPosX;
        var dy = offsetY - gCurrPosY;

        var meme = getMeme()

        if (gFocusOnTxt) {
            var lines = meme.lines
            lines.forEach(function(line) {
                if (line.isDragging) {
                    changePosition(dx, dy)
                }
            })
        }

        if (gFocusOnSticker) {
            var stickers = meme.stickers
            stickers.forEach(function(sticker) {
                if (sticker.isDragging) {
                    changePosition(dx, dy)
                }
            })
        }


        renderCanvas()

        gCurrPosX = offsetX;
        gCurrPosY = offsetY;
    }
}



function onUp(ev) {
    ev.preventDefault()
    ev.stopPropagation()

    gIsDragging = false

    var idx
    var meme = getMeme()
    if (gFocusOnTxt) {
        var lines = meme.lines
        idx = 0
        lines.forEach(function(line) {
            if (line.isDragging) {
                updateIsDragging(idx, 'lines', false)
                return
            }
            idx++
        })
    }

    if (gFocusOnSticker) {
        var stickers = meme.stickers
        stickers.forEach(function(sticker) {
            if (sticker.isDragging) {
                updateIsDragging(sticker.id, 'stickers', false)
                return
            }
        })
    }

    gCurrPosX = undefined
    gCurrPosY = undefined
}




// STICKERS

function renderStickers() {
    var stickers = getStickerForPage()
    var strHtml = '<button class="stickers-btn" onclick="onChangePage(false)"><img src="icons/left.png"></button><div class="stickers">'
    stickers.forEach(sticker => {
        strHtml += `<img src="${sticker.url}" class="sticker" id="sticker-num-${sticker.id}" onclick="drawSticker(${sticker.id})">`
    })
    strHtml += '</div><button class="stickers-btn" onclick="onChangePage(true)"><img src="icons/right.png"></button>'
    document.querySelector('.sticker-container').innerHTML = strHtml
        // onAddStickersInPage()
}

function getStickerForPage() {
    var stickers = getStickers()
    var stickerForPage = stickers.slice(gStickerPage, gStickerPage + 3)
    return stickerForPage

}

function onChangePage(bol) {
    if (bol) {
        // (gStickerPage < 2) ? gStickerPage++ : gStickerPage
        if (gStickerPage < 5) {
            gStickerPage++
        } else {
            return
        }
    } else if (gStickerPage > 0) {
        // (gStickerPage > 0) ? gStickerPage-- : gStickerPage
        gStickerPage--
    }
    renderStickers()

}


// STICKER ON CANVAS
// var gFocusStickerId = -1;
// var gLineIsFocus = true;

function drawSticker(id) {
    var stickers = getStickers()
    var sticker = stickers[id - 1]
    addStickerToMeme(sticker)
    var elSticker = document.querySelector(`#sticker-num-${id}`)
    gCtx.drawImage(elSticker, sticker.positionX, sticker.positionY, sticker.width, sticker.height)
    changeSelectedSticker(id)
    gFocusOnTxt = false
        // gFocusOnSticker = true
    renderStickers()
    renderCanvas()


}

function drawStickers() {
    var meme = getMeme()
    var stickers = meme.stickers
    if (stickers.length === 0) return
    else stickers.forEach(sticker => {
        var elSticker = document.querySelector(`#sticker-num-${sticker.id}`)
        gCtx.drawImage(elSticker, sticker.positionX, sticker.positionY, sticker.width, sticker.height)
    })
}



// DOWNLOAD AND SHARE

function shareLink() {

}

function downloadCanvas(elLink) {
    var imgContent = gCanvas.toDataURL('image/jpeg')
    elLink.href = imgContent
}