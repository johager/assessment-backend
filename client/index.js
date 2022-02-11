const getAnotherBtn = document.getElementById('getAnotherBtn')
const calcDisp = document.getElementById('calcDisp')

// rpn (minimal) stack
const stack = {
    x: 0,
    y: 0,
    z: 0,
    t: 0
}

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
    document.getElementById('novelOrFugitiveDiv').innerHTML = `<img src="../server/images/${fugitive.pic}.jpeg" alt="picture of ${fugitive.name}"><p>${fugitive.name}</p>`
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

function setStackX(str) {
    stack.x = +str
    calcDisp.textContent = str
}

function setCalcDisp(str) {
    calcDisp.textContent = str
}

function pushXOntoStack(num) {
    stack.t = stack.z
    stack.z = stack.y
    stack.y = stack.x
    stack.x = num
}

document.getElementById('enter').onclick = function () {
    console.log('enter:', calcDisp.textContent)
    stack.y = Number(calcDisp.textContent)
    console.log('stack.y:', stack.y)
    setStackX('0')
    // pushXOntoStack(+calcDisp.textContent)
    // setCalcDisp(String(stack.x))
}

// console.log(document.querySelectorAll('button.calcNum'))

for (let calcNumBtn of document.querySelectorAll('button.calcNum')) {
    calcNumBtn.addEventListener('click', (event) => {
        console.log("clicked:", calcNumBtn.value)
        if (calcDisp.textContent === '0') {
            calcDisp.textContent = ''
        }
        calcDisp.textContent += event.target.value
    })
}

for (let calcNumBtn of document.querySelectorAll('button.calcOper')) {
    calcNumBtn.addEventListener('click', (event) => {
        stack.x = Number(calcDisp.textContent)
        const operation = {
            stack,
            oper: event.target.value
        }
        console.log("operation:", operation)
        axios.post("http://localhost:4000/api/doCalcOperation/", operation)
        .then(function (response) {
            stack.y = 0
            setCalcDisp(response.data)
        })
    })
}

//
// === Items === ===
//

function clearItemForm() {
    document.querySelector('input[name="name"]').value = ''
    document.querySelector('input[name="category"]').value = ''
}

function displayItems(items) {
    let html = ""
    for (let item of items) {
        html += `<p>name: ${item.name}; category: ${item.category}</p>`
    }
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

document.getElementById("updateItem").onclick = function (event) {
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

document.getElementById("deleteItem").onclick = function (event) {
    event.preventDefault()
    const name = document.querySelector('input[name="name"]').value
    console.log(name)
    axios.delete(`http://localhost:4000/api/item/${name}`)
    .then( (res) => {
        displayItems(res.data)
    })
}