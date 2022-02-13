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

function logClick(str) {
    console.log(`clicked: ${str}, stackModeAdd: ${stackModeAdd}`)
}

function logStack(str) {
    const {x, y, z, t} = stack
    console.log(`x: ${x}  y: ${y}  z: ${z}  t: ${t}  -- ${str}`)
}

function setStackX(str) {
    stack.x = +str
    calcDisp.textContent = str
}

function setCalcDisp(str) {
    calcDisp.textContent = str
}

function pushXOntoStack(num) {
    logStack(`pushXOntoStack ${num}`)
    stack.t = stack.z
    stack.z = stack.y
    stack.y = stack.x
    stack.x = num
    logStack(`pushXOntoStack at end`)
}

document.getElementById('enter').onclick = function () {
    stackModeAdd = false
    logClick('enter')
    pushXOntoStack(+calcDisp.textContent)
    setCalcDisp(String(stack.x))
    logStack('enter')
}

document.getElementById('calcChS').onclick = function () {
    logClick('Chs')
    if (+calcDisp.textContent === 0) {
        return
    }
    if (calcDisp.textContent[0] === '-') {
        calcDisp.textContent = calcDisp.textContent.slice(1)
    } else {
        calcDisp.textContent = '-' + calcDisp.textContent
    }
}

document.getElementById('calcBkSp').onclick = function () {
    logClick('BkSp')
    if (stackModeAdd) {
        calcDisp.textContent = calcDisp.textContent.slice(0, -1)
    } else {
        calcDisp.textContent = '0'
    }
}

// console.log(document.querySelectorAll('button.calcNum'))

for (let calcNumBtn of document.querySelectorAll('button.calcNum')) {
    calcNumBtn.addEventListener('click', (event) => {
        logClick(calcNumBtn.value)
        if (!stackModeAdd) {
            //pushXOntoStack(Number(calcDisp.textContent))
            stackModeAdd = true
            calcDisp.textContent = event.target.value
        } else {
            calcDisp.textContent += event.target.value
        }
    })
}

for (let calcNumBtn of document.querySelectorAll('button.calcOper')) {
    calcNumBtn.addEventListener('click', (event) => {
        //stack.x = Number(calcDisp.textContent)
        if (stackModeAdd) {
            pushXOntoStack(+calcDisp.textContent)
        }
        const op = event.target.value
        logClick(op)
        logStack(`pre op ${op}`)
        const operation = {
            stack,
            oper: event.target.value
        }
        axios.post("http://localhost:4000/api/doCalcOperation/", operation)
        .then(function (resp) {
            stack = resp.data
            logStack(`post op ${op}`)
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

function clearItemForm() {
    document.querySelector('input[name="name"]').value = ''
    document.querySelector('input[name="category"]').value = ''
}

function displayNoItems() {
    updateItemBtn.style = 'visibility: hidden'
    deleteItemBtn.style = 'visibility: hidden'
    document.getElementById('items').innerHTML = '<p class="noItems">There are no items.</p>'
}

function displayItems(items) {
    if (items.length === 0) {
        displayNoItems()
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

    if (name === '') {
        alert('You must enter the name of the item you wish to update.')
        return
    }

    const body = {category: document.querySelector('input[name="category"]').value}
    clearItemForm()
    console.log(name)
    axios.put(`http://localhost:4000/api/item/${name}`, body)
    .then( (res) => {
        displayItems(res.data)
    })
    .catch(error => {
        alert('There was an error.')
    })
}

deleteItemBtn.onclick = function (event) {
    event.preventDefault()
    const name = document.querySelector('input[name="name"]').value
    
    if (name === '') {
        alert('You must enter the name of the item you wish to delete.')
        return
    }
    
    clearItemForm()
    axios.delete(`http://localhost:4000/api/item/${name}`)
    .then( (res) => {
        displayItems(res.data)
    })
    .catch(error => {
        alert('There was an error.')
    })
}

displayNoItems()