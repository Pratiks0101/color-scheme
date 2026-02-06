const color = document.getElementById('color')
const colorScheme = document.getElementById('color-scheme')
const btn = document.getElementById('button')
const randomBtn = document.getElementById('random-button')
const colorContainer = document.getElementById('color-container')

// Function to generate color

function getColor() {
    const hexValue = color.value.replace('#', '')
    const colorSchemeMode = colorScheme.value.toLowerCase()
    const url = `https://www.thecolorapi.com/scheme?hex=${hexValue}&mode=${colorSchemeMode}&count=5`
    console.log("Fetching From: ", url)

    fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            renderColor(data.colors)
        })
}

btn.addEventListener('click', getColor)

// Function to show color on screen

function renderColor(colorArray) {
    colorContainer.innerHTML = ''

    colorArray.forEach(color => {
        const hexValue = color.hex.value.toUpperCase()
        const colorDiv = document.createElement('div')
        colorDiv.className = 'color-div'

        const colorBox = document.createElement('div')
        colorBox.style.backgroundColor = hexValue
        colorBox.className = 'color-box'

        const hexText = document.createElement('p')
        hexText.textContent = hexValue
        hexText.style.color = 'white'

        colorDiv.addEventListener('click', () => {
            navigator.clipboard.writeText(hexValue)

            const originaltext = hexText.textContent
            hexText.style.color = `#00FFFF`
            hexText.textContent = 'COPIED!'

            setTimeout (() => {
                hexText.textContent = originaltext
            }, 1000)
        })

        colorDiv.appendChild(colorBox)
        colorDiv.appendChild(hexText)
        colorContainer.appendChild(colorDiv)
    });
}

//  Function to generate random colour

function randomColor () {
    const randomHexNumber = Math.floor(Math.random()*16777215).toString(16).padStart(6, '0')
    color.value = `#${randomHexNumber}`

    const options = colorScheme.options
    const randomIndex = Math.floor(Math.random()* options.length)
    colorScheme.selectedIndex = randomIndex  // SelectedIndex is a built-in Property which is available with <select> in HTML

    getColor()
}

randomBtn.addEventListener('click', randomColor)