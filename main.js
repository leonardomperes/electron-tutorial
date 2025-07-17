console.log("Processo principal (Backend)")
console.log(`Electron ${process.versions.electron}`)

const { app, BrowserWindow, nativeTheme, Menu, shell, ipcMain, dialog } = require('electron')
const path = require('node:path')
const db = require('./database.js')
// Janela principal
const createWindow = () => {
    nativeTheme.themeSource = "dark";
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    })

    // menu personalizado
    Menu.setApplicationMenu(Menu.buildFromTemplate(template))

    win.loadFile('./src/views/index.html')
}

// Janela sobre
const aboutWindow = () => {
    const about = new BrowserWindow({
        width: 360,
        height: 220,
        resizable: false,
        autoHideMenuBar: true
    })

    about.loadFile('./src/views/sobre.html')
}

// Janela secundária
const childWindow = () => {
    const father = BrowserWindow.getFocusedWindow()
    if (father) {
        const child = new BrowserWindow({
            width: 640,
            height: 480,
            resizable: false,
            parent: father,
            modal: true,
            autoHideMenuBar: true
        })
        child.loadFile('./src/views/child.html')
    }
}

app.whenReady().then(() => {
    createWindow()
    // aboutWindow()
    // Exemplo de uso do banco de dados
    db.run("INSERT INTO users (name, phone) VALUES (?, ?)", ['Joe', 'xxxxxxxxxxx'], function (err) {
        if (err) {
            return console.error(err.message);
        } else {
            console.log(`Linha inserida com ID: ${this.lastID}`);
        }
    })
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow()
        }
    })

    // IPC
    ipcMain.on('open-child', () => {
        childWindow()
    })
    ipcMain.on('renderer-message', (event, message) => {
        console.log(`Processo principal recebeu do renderer: ${message}`)
        event.reply('main-message', "Ola renderizador")
    })
    ipcMain.on('dialog-info', () => {
        dialog.showMessageBox({
            type: 'info',
            title: 'Informação',
            message: 'Mensagem',
            buttons: ['OK']
        })
    })
    ipcMain.on('dialog-warning', () => {
        dialog.showMessageBox({
            type: 'warning',
            title: 'Aviso',
            message: 'Confirma essa ação?',
            buttons: ['SIM', 'NÃO'],
            defaultId: 0
        }).then((result) => {
            // SIM 0, NAO 1
            console.log(result)
            if (result === 0) {
                console.log("Confirmado!")
            }
        })
    })
    ipcMain.on('dialog-select', () => {
        dialog.showOpenDialog({
            properties: ['openDirectory']
        }).then((result) => {
            console.log(result)
        }).catch(error => console.log(error))
    })
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

// template do menu
const template = [
    {
        label: 'Arquivo',
        submenu: [
            {
                label: 'Janela Secundária',
                click: () => childWindow()
            },
            {
                label: 'Sair',
                click: () => app.quit(),
                accelerator: 'Alt+f4'
            },
        ]
    },
    {
        label: 'Exibir',
        submenu: [
            {
                label: 'Recarregar',
                role: 'reload'
            },
            {
                label: 'Ferramentas do Desenvolvedor',
                role: 'toggleDevTools'
            },
            {
                type: 'separator'
            },
            {
                label: 'Aplicar Zoom',
                role: 'zoomIn'
            },
            {
                label: 'Reduzir',
                role: 'zoomOut'
            },
            {
                label: 'Restaurar Zoom Padrão',
                role: 'resetZoom'
            },
        ]
    },
    {
        label: 'Ajuda',
        submenu: [
            {
                label: 'Docs',
                click: () => shell.openExternal('https://www.electronjs.org/docs/latest/'),

            },
            {
                type: 'separator'
            },
            {
                label: 'Sobre',
                click: () => aboutWindow()
            }
        ]
    }
]
