"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const items_1 = require("../dao/items");
const Item = {
    type: "object",
    properties: {
        id: { type: "string" },
        name: { type: "string" },
    }
};
const items = async (fastify, opts) => {
    fastify.get("/items", {
        schema: {
            response: {
                200: {
                    type: "array",
                    items: Item
                }
            }
        },
        handler: async (request, reply) => {
            return items_1.daoItems;
        }
    });
    fastify.get("/items/:id", {
        schema: {
            response: {
                200: Item
            }
        },
        handler: async (request, Reply) => {
            const { id } = request.params;
            const item = items_1.daoItems.find((item) => item.id === id);
            return item;
        }
    });
};
exports.default = items;
