import { FastifyPluginAsync, FastifyReply, FastifyRequest } from "fastify";
import { daoItems } from "../dao/items";

interface IItemParams {
  id: string;
}

const Item = {
  type: "object",
  properties: {
    id: { type: "string" },
    name: { type: "string" },
  }
}

const items: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.get("/items", {
    schema: {
      response: {
        200: {
          type: "array",
          items: Item
        }
      }
    },
    handler: async (request: FastifyRequest, reply: FastifyReply) => {
      return daoItems;
    }
  });
  fastify.get<{ Params: IItemParams }>("/items/:id", {
    schema: {
      response: {
        200: Item
      }
    },
    handler: async (request, Reply: FastifyReply) => {
      const { id } = request.params
      const item = daoItems.find((item) => item.id === id)

      return item;
    }
  });
}

export default items;