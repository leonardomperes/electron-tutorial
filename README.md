# Electron Tutorial

- [link para playlist](https://www.youtube.com/playlist?list=PLbEOwbQR9lqybf2ehSR-KWEv_0g-HDJ50)

🧑‍💻 Professor José de Assis

## 📚 
- Utilizado para aplicações Desktop
- Framework cross plataform roda em LINUX, MacOS, Windows
- Conceitos principais: main, renderer, preloader, IPC

## Main
Processo principal onde desempenha o papel semelhante ao backend, se comunica com o SO

## Renderer
Arquivo que se comunica com o frontend da aplicação, páginas HTML

## Preloader
Faz pré carregamento dos arquivos necessários para a comunicação entre front e back (processos), 

## IPC (inter process comunication)
Semelhante a um Websocket, o _IPC renderer_ e o _IPC main_ são responsáveis pela comunicação mediante a channels (canais) onde ambos estão inscritos (subscribe)

# Considerações ao enpacotar
Para enpacotar e distribuir, por questões de segurança e autenticidade deve-se criar um certificado digital em _ACs (Autoridades Certificadoras)_ em ambientes Windows