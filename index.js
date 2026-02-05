const color = document.getElementById('color')
const colorScheme = document.getElementById('color-scheme')
const btn = document.getElementById('button')
const colorContainer = document.getElementById('color-container')

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
            hexText.style.color = `#FFFDFE`
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