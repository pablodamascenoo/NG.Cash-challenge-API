<p align="center">
  <h1 align="center">
    NG.CASH Challenge API
  </h1>
</p>

<div align="center">
  <h3>Feito com:</h3> 
  <img src="https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white" height="30px"/>
  <img src="https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white" height="30px"/>
  <img src="https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white" height="30px"/>
  <img src="https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB" height="30px"/>
  <img src="https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white" height="30px"/>

</div>

## Descrição:

O NG.CASH Challenge API foi feito para garantir ao [NG.CASH-challenge](https://github.com/pablodamascenoo/NG.Cash-challenge) endpoints de autenticação com JWT e rotas autenticadas para ver seu saldo, fazer e ver suas transações.

## Instalação:

```bash
$ git clone https://github.com/pablodamascenoo/NG.Cash-challenge-API.git
$ cd NG.Cash-challenge-API
$ npm i
```

Siga o [.env.example](.env.example) para criar seu próprio .env

## Uso:

- rodar em modo de desenvolvimento:

```bash
$ npm run prisma:dev
$ npm run prisma:generate
$ npm run dev
```

## Testes:

### Sem Docker:

- Para rodar os testes sem docker, basta executar as seguintes linhas de comando:

```bash
$ npm i
$ npm run test
```

### Com Docker:

- Para rodar os testes com o Docker, basta executa a seguinte linha

```bash
$ npm run test:docker
```

## Rotas:

```

- POST /auth/sign-up
    - Rota para cadastrar usuário
    - headers: {}
    - body: {
        "username": "John",
        "password": "Password123"
        "confirmPassword": "Password123"
    }

- POST /auth/sign-in
    - Rota para realizar o login
    - headers: {}
    - body: {
        "username": "John",
        "password": "Password123"
    }

- GET /balance
    - Rota para receber o saldo em conta
    - headers: {
        "Authorization": "Bearer <token>"
    }
    - body: {}

- GET /transactions
    - Rota para receber todas as transações do usuário
    - headers: {
        "Authorization": "Bearer <token>"
    }
    - body: {}
    - query:{
        date?: <date>
        type?: <"cash-in"|"cash-out">
    }

- POST /transaction
    - Rota para realizar uma transação
    - headers: {
        "Authorization": "Bearer <token>"
    }
    - body: {
        "username": "John",
        "value": 1000
    }
```
