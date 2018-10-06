# graphql-authorization

Handling authorization in GraphQL - [https://pusher.com/tutorials/authorization-graphql](https://pusher.com/tutorials/authorization-graphql)

## Getting Started

Clone the project repository by running the command below if you use SSH

```bash
git clone git@github.com:ammezie/graphql-authorization.git
```

If you use https, use this instead

```bash
git clone https://github.com/ammezie/graphql-authorization.git
```

After cloning, run:

```bash
npm install
```

Rename `.env.example` to `.env` then enter your JWT secret:

```txt
JWT_SECRET=
```

Then run the migration:

```bash
node_modules/.bin/sequelize db:migrate
```

And finally, start the application:

```bash
npm run dev
```

The server will be running on [http://localhost:4000/api](http://localhost:4000/api).
