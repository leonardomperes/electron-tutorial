const { contextBridge, ipcRenderer } = require('electron/renderer')

// processos
contextBridge.exposeInMainWorld('api', {
    verElectron: () => process.versions.electron,
    open: () => ipcRenderer.send('open-child'),
    // RENDERER envia para MAIN
    send: (message) => ipcRenderer.send('renderer-message', message),
    // MAIN envia para RENDERER
    on: (message) => { ipcRenderer.on('main-message', message) },
    info: () => ipcRenderer.send('dialog-info'),
    warning: () => ipcRenderer.send('dialog-warning'),
    select: () => ipcRenderer.send('dialog-select'),
})

// manipulação do DOM
window.addEventListener('DOMContentLoaded', () => {
    document.getElementById('dataAtual').innerHTML = obterData()
})

function obterData() {
    const data = new Date()
    const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'

    }
    return data.toLocaleDateString('pt-BR', options)
}