"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = __importDefault(require("fastify"));
const items_1 = __importDefault(require("./routes/items"));
const app = (0, fastify_1.default)({ logger: true });
app.get('/', async (request, reply) => {
    const { username, password } = request.query;
    return reply.send({
        code: 200,
        message: 'success',
        body: {
            username,
            password
        }
    });
});
app.register(items_1.default);
app.listen({ port: 3000 }, (err, address) => {
    if (err) {
        app.log.error(err);
        process.exit(1);
    }
    app.log.info(`server listening on ${address}`);
});
