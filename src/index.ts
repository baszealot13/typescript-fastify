import fastify, { FastifyInstance } from "fastify";
import routeItems from './routes/items';

const app: FastifyInstance = fastify(
  { logger: true }
);

interface IQueryInterface {
  username: string;
  password: string;
}

interface IHeaders {
  'x-access-token': string;
}

interface IReply {
  code: number;
  message: string;
  body: any;
}
app.get<{ Querystring: IQueryInterface, Headers: IHeaders, Reply: IReply }>('/', async (request, reply) =>  {
  const { username, password }  = request.query;
  
  return reply.send({
    code: 200,
    message: 'success',
    body: {
      username,
      password
    }
  })
});
app.get('/webhook', async (request, reply) => {
  console.log({request});

  return 'Hello world'
});

app.register(routeItems);

app.listen({port: 3000}, (err, address) => {
  if (err) {
    app.log.error(err);
    process.exit(1);
  }
  app.log.info(`server listening on ${address}`);
})

