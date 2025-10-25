# Task Manager

Um sistema simples de gerenciamento de tarefas com frontend em React e backend em Node.js/Express.

---

## Tecnologias utilizadas

- **Frontend:** React
- **Backend:** Node.js + Express
- **Banco de dados:** PostgreSQL 
- **Autenticação:** JWT

---

## Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- [Node.js](https://nodejs.org/) (v18+ recomendado)
- [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/)
- Banco de dados configurado (PostgreSQL, MySQL ou outro suportado)
- Git (opcional, para clonar o repositório)

---

## Instalação

1. Clone o repositório:

```bash
git clone https://github.com/Lud-Souza/task-manager.git
cd task-manager


2. Instale as dependências do backend:
cd backend
npm install

3. Configure as variáveis de ambiente no arquivo .env:
PORT=5000
DATABASE_URL=postgres://usuario:senha@localhost:5432/nome_do_banco
JWT_SECRET=sua_chave_secreta

4. Inicialize o banco de dados e rode as migrations:
npx sequelize db:create
npx sequelize db:migrate

5.Iniciar o servidor backend:
npm start

6. Instale as dependências do frontend:
cd ../frontend
npm install

7. Inicie o frontend:
npm start

---

## Funcionalidades

Cadastro e login de usuários

Criação, edição, conclusão e exclusão de tarefas

Tarefas pendentes aparecem em verde e concluídas riscam o texto

Logout do usuário
