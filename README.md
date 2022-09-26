<h1 align="center">
    <img  src="https://www.svgrepo.com/show/55038/music.svg" width="100"> 
    <p>Sing me a Song</p>
</h1>

<h3 align="center">
   🎵 Seu aplicativo para recomendações de músicas 🎵
</h3>

<h4 align="center">
	🚧 Concluído 🚀 🚧
</h4>

### 💻 Sobre o projeto

Sing me a song é uma aplicação para recomendação anônima de músicas. Quanto mais as pessoas curtirem uma recomendação, maior a chance dela ser recomendada para outras pessoas 🙂

### ⚙️ Funcionalidades

- [x] Usuários podem cadastrar recomendações de músicas incluindo o nome e o link do YouTube
- [x] Usuários podem acessar as últimas recomendações cadastradas
- [x] Usuários podem acessar as recomendações mais curtidas
- [x] Usuários podem descobrir novas recomendações aleatoriamente

### 🚀 Como executar o projeto

Neste projeto foram desenvolvidos por mim apenas os testes:
- testes unitários
- testes de integração
- testes e2e

#### Pré-requisitos

Antes de começar, você vai precisar ter instalado em sua máquina as seguintes ferramentas:
[Git](https://git-scm.com), [Node.js](https://nodejs.org/en/). 
Além disto é bom ter um editor para trabalhar com o código como [VSCode](https://code.visualstudio.com/)

#### 🎲 Rodando o servidor

```bash

# Clone este repositório
$ git clone https://github.com/jaquecaye2/Testes-Sign-me-a-song.git

# Acesse a pasta back-end do projeto no terminal/cmd

# Instale as dependências
$ npm install

# Na pasta back-end crie dois arquivos e informe as seguintes informações no arquivo:
- .env
$ PORT = 5000
$ DATABASE_URL = postgres://{user}:{password}@{hostname}:{port}/{database-name};
$ SECRET_KEY = nome_da_chave
$ NODE_ENV='prod'

- .env.test
$ PORT = 5000
$ DATABASE_URL = postgres://{user}:{password}@{hostname}:{port}/{database-name-test};
$ SECRET_KEY = nome_da_chave
$ NODE_ENV='test'

# Execute a criação do banco de dados local
$ npx prisma migrate dev

# Execute a aplicação em modo de desenvolvimento
$ npm run dev

-----------------------------------

# Acesse a pasta front-end do projeto no terminal/cmd

# Instale as dependências
$ npm install

# Na pasta front-end crie o arquivo .env e informe as seguintes informações no arquivo:
$ REACT_APP_API_BASE_URL=http://localhost:5000

# Execute a aplicação em modo de desenvolvimento
$ npm start
```

#### 🎲 Rodando os testes

Após executar os itens anteriores, é possível rodar os testes

➡️ <span> Testes Unitários </span>

```bash
# Acesse a pasta back-end do projeto no terminal/cmd

# Execute a aplicação em modo de testes unitários
$ npm run test:unit
```

➡️ <span> Testes de Integração </span>

```bash
# Acesse a pasta back-end do projeto no terminal/cmd

# Execute a aplicação em modo de testes de integração
$ npm run test:integration
```

➡️ <span> Testes e2e </span>

```bash
# Acesse a pasta front-end do projeto no terminal/cmd

# Execute a aplicação em modo de testes e2e
$ npx cypress open
```

### 🛠 Tecnologias

Segue abaixo algumas das tecnologias utilizadas neste projeto:

<img src="https://img.shields.io/badge/Cypress-17202C?style=for-the-badge&logo=cypress&logoColor=white" height="30px"/> <img src="https://img.shields.io/badge/Jest-C21325?style=for-the-badge&logo=jest&logoColor=white" height="30px"/>

### 👩🏻 Autora
<img style="border-radius: 200" src="https://avatars.githubusercontent.com/u/102393976?s=400&u=aba5f19bf20b58d80146b343326cdb4fac491351&v=4" width="100" alt=""/>          |           <b>Jaqueline Caye</b>

[![Linkedin Badge](https://img.shields.io/badge/-LinkedIn-blue?style=for-the-badge&logo=Linkedin&logoColor=white&link=https://www.linkedin.com/in/jaqueline-caye-614449137/)](https://www.linkedin.com/in/jaqueline-caye-614449137/)
[![Instagram Badge](https://img.shields.io/badge/Instagram-E4405F?style=for-the-badge&logo=instagram&logoColor=white&link=https://www.instagram.com/jaquecaye/?hl=pt)](https://www.instagram.com/jaquecaye/?hl=pt)
