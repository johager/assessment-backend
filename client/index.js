const getAnotherBtn = document.getElementById('getAnotherBtn')
const calcDisp = document.getElementById('calcDisp')

document.getElementById("complimentButton").onclick = function () {
    axios.get("http://localhost:4000/api/compliment/")
    .then(function (response) {
        alert(response.data)
    })
}

document.getElementById("fortuneButton").onclick = function () {
    axios.get("http://localhost:4000/api/fortune/")
    .then(function (response) {
        document.getElementById('fortuneSpan').textContent = response.data
    })
}

function handleSelectOption() {
    // hide "- Select An Option -"
    const none = document.getElementById('none')
    if (none) {
        none.remove()
    }

    // show Get Another button
    getAnotherBtn.style = "display: inline"

    // handle the select option
    const select = document.getElementById('novelOrFugitive')
    const type = select.options[select.selectedIndex].value
    console.log(type)
    switch (type) {
        case 'novel':
        axios.get("http://localhost:4000/api/novel/")
        .then(function (response) {
            displayNovel(response.data)
        })
        break
    case 'fugitive':
        axios.get("http://localhost:4000/api/fugitive/")
        .then(function (response) {
            displayFugitive(response.data)
        })
    }
}

function displayNovel(novel) {
    document.getElementById('novelOrFugitiveDiv').textContent = novel
    getAnotherBtn.textContent = "Get Another Novel"
}

function displayFugitive(fugitive) {
    document.getElementById('novelOrFugitiveDiv').innerHTML = `<p class="fugitive">${fugitive.name}</p><img src="../server/images/${fugitive.pic}.jpeg" alt="picture of ${fugitive.name}">`
    getAnotherBtn.textContent = "Get Another Fugitive"
}

getAnotherBtn.style = "display: none"

document.getElementById('novelOrFugitive').onchange = function (event) {
    handleSelectOption()
}

document.getElementById("getAnotherBtn").onclick = function () {
    console.log('getAnother')
    handleSelectOption()
}

//
// === RPN calculator === ===
//

let stack = {
    x: 0,
    y: 0,
    z: 0,
    t: 0
}

let stackModeAdd = false

function setStackX(str) {
    stack.x = +str
    calcDisp.textContent = str
}

function setCalcDisp(str) {
    calcDisp.textContent = str
}

function pushXOntoStack(num) {
    console.log("push:", num)
    console.log("pushXOntoStack inp:", stack)
    stack.t = stack.z
    stack.z = stack.y
    stack.y = stack.x
    stack.x = num
    console.log("pushXOntoStack out:", stack)
}

document.getElementById('enter').onclick = function () {
    console.log("enter top:", stack)
    stackModeAdd = false
    pushXOntoStack(+calcDisp.textContent)
    setCalcDisp(String(stack.x))
    console.log("enter bot:", stack)
}

document.getElementById('calcChS').onclick = function () {
    switch (calcDisp.textContent[0]) {
        case '0':
            return
        case '-':
            calcDisp.textContent = calcDisp.textContent.slice(1)
            return
        default:
            calcDisp.textContent = '-' + calcDisp.textContent
    }
}

document.getElementById('calcBkSp').onclick = function () {
    if (stackModeAdd) {
        calcDisp.textContent = calcDisp.textContent.slice(0, -1)
    } else {
        calcDisp.textContent = '0'
    }
}

// console.log(document.querySelectorAll('button.calcNum'))

for (let calcNumBtn of document.querySelectorAll('button.calcNum')) {
    calcNumBtn.addEventListener('click', (event) => {
        console.log("clicked:", calcNumBtn.value, "stackModeAdd:", stackModeAdd)
        if (!stackModeAdd) {
            pushXOntoStack(Number(calcDisp.textContent))
            stackModeAdd = true
            calcDisp.textContent = event.target.value
        } else {
            calcDisp.textContent += event.target.value
        }
    })
}

for (let calcNumBtn of document.querySelectorAll('button.calcOper')) {
    calcNumBtn.addEventListener('click', (event) => {
        stack.x = Number(calcDisp.textContent)
        console.log("post:", stack)
        const operation = {
            stack,
            oper: event.target.value
        }
        console.log("operation:", operation)
        axios.post("http://localhost:4000/api/doCalcOperation/", operation)
        .then(function (resp) {
            console.log("resp.data:", resp.data)
            stack = resp.data
            console.log("stack:", stack)
            setCalcDisp(stack.x)
            stackModeAdd = false
        })
    })
}

//
// === Items === ===
//

const updateItemBtn = document.getElementById("updateItem")
const deleteItemBtn = document.getElementById("deleteItem")

updateItemBtn.style = 'visibility: hidden'
deleteItemBtn.style = 'visibility: hidden'

function clearItemForm() {
    document.querySelector('input[name="name"]').value = ''
    document.querySelector('input[name="category"]').value = ''
}

function displayItems(items) {
    if (items.length === 0) {
        updateItemBtn.style = 'visibility: hidden'
        deleteItemBtn.style = 'visibility: hidden'
        document.getElementById('items').innerHTML = ''
        return
    }
    updateItemBtn.style = 'visibility: visible'
    deleteItemBtn.style = 'visibility: visible'
    let html = '<div class="table">'
    html += '<div class="table-row table-row-header">'
    html += '<div class="table-cell table-cell-header">Name</div><div  class="table-cell">Category</div>'
    html += '</div>'
    for (let item of items) {
        html += '<div class="table-row">'
        html += `<div class="table-cell table-cell-header">${item.name}</div><div class="table-cell">${item.category}</div>`
        html += '</div>'
    }
    html += '</div>'
    document.getElementById('items').innerHTML = html
}

document.getElementById("makeItem").onclick = function (event) {
    event.preventDefault()
    const newItem = {
        name: document.querySelector('input[name="name"]').value,
        category: document.querySelector('input[name="category"]').value
    }
    clearItemForm()
    console.log(newItem)
    axios.post("http://localhost:4000/api/item/", newItem)
    .then( (res) => {
        displayItems(res.data)
    })
}

updateItemBtn.onclick = function (event) {
    event.preventDefault()
    const name = document.querySelector('input[name="name"]').value
    const body = {category: document.querySelector('input[name="category"]').value}
    clearItemForm()
    console.log(name)
    axios.put(`http://localhost:4000/api/item/${name}`, body)
    .then( (res) => {
        displayItems(res.data)
    })
}

deleteItemBtn.onclick = function (event) {
    event.preventDefault()
    const name = document.querySelector('input[name="name"]').value
    console.log(name)
    axios.delete(`http://localhost:4000/api/item/${name}`)
    .then( (res) => {
        displayItems(res.data)
    })
}