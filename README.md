# Instruções para Executar a Aplicação com Docker

## Pré-requisitos

Antes de começar, certifique-se de que você tem o Docker instalado em seu sistema. Se ainda não tiver instalado, você pode baixá-lo e instalá-lo a partir do [site oficial do Docker](https://www.docker.com/get-started).

Na raiz do projeto deverá haver um arquivo .env com as seguintes variáveis. *(Solicitar)*:
- `DATABASE_URL`: string para conexão com o banco.
- `JWT_SECRET`: algum string ou código para hash
- `MAIL_USER`: email resposável por enviar as menssagens
- `MAIL_PASSWORD`: senha do email
- `MAIL_SECURE`: variável boolean para ativar ou não o modo TSL
- `MAIL_HOST`: host para o envio de email
- `MAIL_PORT`: porta que será usada pelo host

## Passos para Executar um Contêiner Docker

1. **Execute o arquivo docker-compose da aplicação para criar a imagem e subir um contâiner**

   ```
   docker-compose -f docker-compose.app.yml up  -d
   ```

   A flag `-d` destrava o terminal e omite os logs do contâiner. Caso deseje acompanhar os logs, basta remover a flag.

2. **Rode o comando para subir as migrations**

   Após ativar o contâiner é necessário subir as migrations para sincronizar as tabelas do banco de dados.

   ```
   docker exec -it midas-backend npx prisma migrate dev
   ```