'use strict'

var gFocus

function init() {
    openGallery()
    gFocus = 0
    searchKeyWordRender()
}

function renderGallery() {
    var imgs = getImgs()
    console.log(imgs)
    var strHtml = ''
    imgs.forEach(img => {
        strHtml += `<img src="${img.url}" id="img-num-${img.id}" onclick="onRenderCanvas(${img.id})">`
    })
    document.querySelector('.gallery-container').innerHTML = strHtml
}

function openGallery() {
    renderGallery()
    document.querySelector('.page1').classList.remove('hidden')
    document.querySelector('.page2').classList.add('hidden')
    document.querySelector('.page3').classList.add('hidden')
    document.querySelector('.about').classList.remove('active')
    document.querySelector('.gallery').classList.add('active')
}


function toggleMenu() {
    var mainMenu = document.getElementById('mainMenu');
    mainMenu.classList.toggle('open');
}


function onChangeText(value) {
    if (gMeme.lines.length === 0) return
    updateMemeTxt(gFocus, value) //update service
    renderCanvas()
}

function onRenderCanvas(imgId) {
    updateMemeImg(imgId)
    renderCanvas()
    document.querySelector('.page1').classList.add('hidden')
    document.querySelector('.page2').classList.remove('hidden')
    document.querySelector('.page3').classList.add('hidden')
}

function onSearchBy(value) {
    var unfilteredImgs = getImgs()
    var filteredImgs = unfilteredImgs.filter(img => {
        return (img.keywords.includes(value))
    })

    if (filteredImgs.length > 0) {
        renderGalleryFiltered(filteredImgs)
        if (gKeywordSearchCountMap[value] < 30) gKeywordSearchCountMap[value]++
            searchKeyWordRender()

    } else renderGallery()

}

function renderGalleryFiltered(imgs) {
    var strHtml = ''
    imgs.forEach(img => {
        strHtml += `<img src="${img.url}" id="img-num-${img.id}" onclick="onRenderCanvas(${img.id})">`
    })

    document.querySelector('.gallery-container').innerHTML = strHtml
}

function searchKeyWordRender() {
    var strInnerText = ''
    var keywords = getKeyWords()
    var keysArray = Object.keys(keywords)
    keysArray.forEach(keyword => {
        strInnerText += `<button class= "search-button" onclick="onSearchBy('${keyword}')" style="font-size:${keywords[keyword] + 15}px;">${keyword}</button>`
    })
    document.querySelector('.search-words').innerHTML = strInnerText
}

function openAbout() {
    document.querySelector('.page1').classList.add('hidden')
    document.querySelector('.page2').classList.add('hidden')
    document.querySelector('.page3').classList.remove('hidden')
    document.querySelector('.about').classList.add('active')
    document.querySelector('.gallery').classList.remove('active')
        // document.querySelector('.page3').classList.add('flex')

}