# MyReads Project

O desenvolvimento desse aplicativo é requisito de formação do programa de nanodegree da Udacity. O objetivo é solidificar conhecimentos básicos de react, entendendo o paradigma de componentes, utilização de estados, props e routing.

A aplicação é uma biblioteca virtual simples, com três estantes contendo três categorias diferentes de livros: Lendo, Quero Ler ou Já Li. É possível utilizar um formulário de busca para que novos livros sejam adicionados nessa estante.

## Pré-requisitos de instalação
É necessário ter o npm instalado na máquina para executar o projeto.

## Executando o projeto
Acesse o diretório do projeto, executando `npm install`. Após finalizada a operação, executar `npm start`.

Obs: A aplicação utiliza a porta 3000 para ser executada, sendo acessada no navegador em http://localhost:3000.

## Extras
* O projeto utiliza o eslint para padronização de código. Para executar as validações nos arquivos utilize `npm run lint`
* O projeto utiliza a lib awesome-debounce-promise para melhorar a busca, só enviando o termo de busca após um tempo e economizando assim chamadas desnecessárias ao backend
