# Clicksign Embedded Test

O projeto pode ser utilizado para testes e/ou como base ou referência para aplicação do script [embedded](https://developers.clicksign.com/docs/instalacao-do-widget-embedded) em sites (HTML).

## Como utilizar
Com os links abaixo, você pode checar como foi feita a implementação de forma simples ou até mesmo utilizar para checar se o carregamento é esperado dentro da versão utilizada na API:
- [**API v1** (Batches)](https://clicksign.github.io/embedded-test)
- [**API v2** (Envelopes)](https://clicksign.github.io/embedded-test/v2)
- [**Tokenless**](https://clicksign.github.io/embedded-test/tokenless)

Para o uso em testes para o Tokenless, você pode utilizar o link: [**Tokenless**](clicksign.github.io/embedded-test/tokenless)


## Ambiente local
1. Você precisará do [nodejs](https://nodejs.org).
2. Um gerenciador de dependências NPM para instalação da única dependência: [Vite](https://vitejs.dev)
   > Estamos utilizando o [Yarn](https://yarnpkg.com/)
4. Instalar as dependências setadas no projeto: `yarn install`
5. Executar o comando para rodar em modo de desenvolvimento `yarn dev`
6. Para requisições à aplicação será necessário que estas partam de uma requisição segura (https). Para isso, você pode utilizar o [ngrok](https://ngrok.com/).
7. Criar a sua conta ngrok e obter a chave de autenticação.
8. Iniciar o ngrok, exemplo: `ngrok http 5173` (caso esteja rodando na porta 5173).

## Ambiente docker
1. Você precisará do [docker](https://www.docker.com/) instalado.
2. Você precisará do [docker-compose](https://docs.docker.com/compose/) instalado.
3. Defina a variável de ambiente `NGROK_AUTHTOKEN` ou edite diretamente no arquivo `docker-compose.yml`.
4. Rodar o comando `docker-compose up` para subir a aplicação.
5. O link gerado estará disponível em https://dashboard.ngrok.com/endpoints

## Como contribuir
A sua contribuição é bem-vinda!

Ao encontrar algum problema ou tenha ideia de alguma melhoria pode abrir uma [_issue_](https://github.com/clicksign/embedded-test/issues).
Em caso de sugestões de melhorias no código, pode submeter um [_pull request_ ](https://github.com/clicksign/embedded-test/pulls) onde será revisado pelo time técnico e acompanhado.


### Compilando
Caso precise buildar o projeto para ser feito deploy ou subir de alguma outra maneira:
`yarn build`


## Suporte
Em caso de dúvidas ou problemas, envie um e-mail para ajuda@clicksign.com.
