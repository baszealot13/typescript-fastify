import fastify, { FastifyInstance } from "fastify";
import routeItems from './routes/items';
import dotenv from 'dotenv';

dotenv.config();

const app: FastifyInstance = fastify(
  { logger: true }
);

interface IQueryInterface {
  username: string;
  password: string;
}

interface HookBody {
  destination: string;
  events: HookEvent[]
}

interface HookEvent {
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
app.get('/', async (request, reply) =>  {
  return "Hello world";
});
app.post<{ Body: HookBody }>('/webhook', async (request, reply) => {
  const { type, message, deliveryContext, replyToken } = request.body.events[0];

  console.log(request.body);

  console.log('type: ', type);
  console.log('message: ', message);
  console.log('deliveryContext: ', deliveryContext);
  console.log('replyToken: ', replyToken);

  /*  
  If message type is image
  type:  message
  message:  {
    type: 'image',
    id: '17099755271349',
    contentProvider: { type: 'line' }
  }
  */
  /* 
  // How to get content with messageId
  const line = require('@line/bot-sdk');

  const client = new line.Client({
    channelAccessToken: '<channel access token>'
  });

  client.getMessageContent('<messageId>')
    .then((stream) => {
      stream.on('data', (chunk) => {
        ...
      });
      stream.on('error', (err) => {
        // error handling
      });
    });
  */

  return 'Hello world'
});

app.register(routeItems);

app.listen({host: '0.0.0.0', port: Number(process.env.PORT) }, (err, address) => {
  if (err) {
    app.log.error(err);
    process.exit(1);
  }
  app.log.info(`server listening on ${address}`);
})

