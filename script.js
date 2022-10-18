swal("Press the space bar to change colors!")

const cols = document.querySelectorAll('.col')

document.addEventListener('keydown', (e) => {
    e.preventDefault()
    if (e.code.toLowerCase() === 'space') {
        setRandomColors()
    }
})

document.addEventListener('click', (e) => {
    const type = e.target.dataset.type

    if (type === 'lock') {
        const check = 
            e.target.tagName.toLowerCase() === 'i'
                ? e.target
                : e.target.children[0]
        
        check.classList.toggle('fa-lock-open')
        check.classList.toggle('fa-lock')
    } else if (type === 'copy') copyText(e.target.textContent) 
})

function copyText(text) {
    return navigator.clipboard.writeText(text)
}

const generateColor = () => {
    const hexCodes = '0123456789ABCDEF'
    let color = ''
    for (let i = 0; i < 6; i++) {
        color += hexCodes[Math.floor(Math.random() * hexCodes.length)]
    }
    return '#' + color
}

function setTextColor(text, color) {
    const luminance = chroma(color).luminance()
    text.style.color = luminance > 0.5 ? 'black' : 'white'
}

function setRandomColors(isInitial) {
    const colors = isInitial ? getHash() : []

    cols.forEach((el, i) => {
        const isLocked = el.querySelector('i').classList.contains('fa-lock')
        const text = el.querySelector('h2')
        const btn = el.querySelector('button')

        if (isLocked) { 
            colors.push(text.textContent)
            return 
        }

        const color = isInitial
            ? colors[i]
                ? colors[i]
                : generateColor()
            : generateColor()

        if (!isInitial) {
            colors.push(color)
        }
        
        text.textContent = color
        el.style.background = color

        setTextColor(text, color)
        setTextColor(btn, color)
    })

    updateHash(colors)
}

function updateHash(colors = []) {
    document.location.hash = colors.map(el => el.toString().substring(1)).join('-')
}

function getHash() {
    if (document.location.hash.length > 1) {
        return document.location.hash.substring(1).split('-').map(color => '#' + color)
    }
    return []
}

setRandomColors(true)