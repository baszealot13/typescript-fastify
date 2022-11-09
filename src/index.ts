import fastify, { FastifyInstance } from "fastify";
import routeItems from './routes/items';

const app: FastifyInstance = fastify(
  { logger: true }
);

interface IQueryInterface {
  username: string;
  password: string;
}

interface HookBody {
  type: string;
  message: any;
  webhookEventId: string;
  deliveryContext: any;
  timestamp: number;
  source: any;
  replyToken: string;
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
app.post('/webhook', async (request, reply) => {
  // const { type, message, deliveryContext, replyToken } = request.body;

  // console.log('type: ', type);
  // console.log('message: ', message);
  // console.log('deliveryContext: ', deliveryContext);
  // console.log('replyToken: ', replyToken);
  console.log(request.body);

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

