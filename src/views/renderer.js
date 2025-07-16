console.log("Processo de renderização")
console.log(`Electron ${api.verElectron()}`)

const btnOpenChild = document.getElementById('open-child')
const btnInfo = document.getElementById('info')
const btnWarning = document.getElementById('warning')
const btnSelect = document.getElementById('select')

btnOpenChild.addEventListener('click', () => {
    api.open()
})

btnInfo.addEventListener('click', () => {
    api.info()
})

btnWarning.addEventListener('click', () => {
    api.warning()
})

btnSelect.addEventListener('click', () => {
    api.select()
})

api.send("Ola eu sou renderer")
api.on((event, message) => {
    console.log("Processo de renderização recebeu uma mensagem: " + message)
})