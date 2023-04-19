# Boardcamp

No mundo digital de hoje, muitas pessoas se sentem tristes por não vivenciarem experiências fora das telas. Felizmente, há pessoas dedicadas a oferecer atividades analógicas para trazer equilíbrio à vida das pessoas. Uma dessas atividades são os jogos de tabuleiro, que podem proporcionar muita diversão em um ambiente aconchegante. Como os jogos são caros, algumas pessoas empreendem em locadoras de jogos. Este é um mercado novo e oferece a oportunidade de construir um sistema de gestão de uma locadora de jogos de tabuleiro usando Banco de Dados Relacional (SQL). E é exatamente o que essa API faz !!

## A api permite:

## 1. criar e ler categorias de jogos de tabuleiro 
 - Rota: GET /categories
 - Rota: POST /categories

## 2. criar e ler jogos de tabuleiro 
 - Rota: GET /games
 - Rota: POST /games

## 3. criar,ler e atualizar clientes da locadora
 - Rota: GET /customers
 - Rota: GET /customers/:id
 - Rota: POST /customers
 - Rota: PUT /customers/:id

## 4. criar,ler,atualizar e deletar Aluguéis da locadora
 - Rota: GET /rentals
 - Rota: POST /rentals
 - Rota: POST /rentals/:id/:return
 - Rota: DELETE /rentals/:id

# Tecnologias usadas 

- ### javascript, postgreSQL joi, cors, dayjs, dotenv, express, joi, nodemon, pg

# Como rodar o projeto 

1. Clone esse repositório 

2. Instalar todas as dependências
```
npm install
```
3. Configure seu ambiente como no arquivo .env.example

4. Rode o projeto 
```
npm run dev
```
