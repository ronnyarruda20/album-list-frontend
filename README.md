# album-list 

 Este projeto tem como base gerenciar ábuns e autores.
 
### Pré-requisitos

Antes de começar, você vai precisar ter instalado em sua máquina as seguintes ferramentas:
[Git](https://git-scm.com), [Node.js](https://nodejs.org/en/).

### Rodando o FrontEnd 

## Clone este repositório
``` 
git clone https://github.com/ronnyarruda20/album-list-frontend
```
## Entre na pasta do projeto
```
 cd album-list-frontend
```
## Instale as depedencias 
```
npm install
```
## Rode o projeto
```
npm start
```
### Pronto agora pode ser acessado através do [http://localhost:4200](http://localhost:4200)
------------------------------------------ou--------------------------------------------------

# Com docker...

## Build no projeto criando container
```
docker build -t album-list-frontend .
```
## Start na imagem do container
```
docker run --name album-list-container -d -p 4200:80 album-list-frontend
```
### Pronto agora pode ser acessado através do [http://localhost:4200](http://localhost:4200)

### Acesso
```
Login: admin
Senha: password
```
