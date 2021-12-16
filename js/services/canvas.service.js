'use strict'

var gCanvas
var gCtx
var gIsDragging = false
var gStartPos



function renderCanvas() {
    gCanvas = document.querySelector("#my-canvas")
    gCtx = gCanvas.getContext('2d');
    setMemeImg()
    renderText()
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

function changeFocus() {
    var numOfLines = gMeme.lines.length
    if (numOfLines <= 0) return
    numOfLines = numOfLines - 1;
    (gFocus >= numOfLines) ? gFocus = 0: gFocus++;
    console.log(gFocus)
    gMeme.selectedLineIdx = gFocus
    renderTextBox()
}

function renderTextBox() {
    var meme = getMeme()
    var selectedLine = meme.lines[meme.selectedLineIdx]
    document.querySelector('.control-txt-input').value = selectedLine.txt
}

function addText() {
    addLine() //Service add line
    renderIdx()
    renderCanvas()
    gFocus = gMeme.selectedLineIdx
}

function deleteObject() {
    deleteObjectService() //Service delete object
    renderIdx()
    gFocus = 0
    gMeme.selectedLineIdx = 0
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

}

function onDown(ev) {
    gStartPos = getEvPos(ev);
    gIsDragging = true
    renderCanvas();

    //Change Focus 
    gMeme.lines.forEach(function(line) {
        if (gStartPos.x > line.positionX - 160 && gStartPos.x < line.positionX + 160 &&
            gStartPos.y > line.positionY - 40 && gStartPos.y < line.positionY + 10) {
            gFocus = line.idx
            return
        }
    })
    gMeme.selectedLineIdx = gFocus
        // console.log(gMeme.selectedLineIdx)

}

function onMove(ev) {
    if (!gIsDragging) return;
    var pos = getEvPos(ev);
    if (gIsDragging && gMeme.lines.length > 0) {
        moveSelectedByDragging(pos, gStartPos);
        gStartPos = pos;
        renderCanvas();
        return
    }
}

function onUp() {
    gIsDragging = false;
}

function getEvPos(ev) {
    var pos = {
        x: ev.offsetX,
        y: ev.offsetY,
    };

    return pos;
}