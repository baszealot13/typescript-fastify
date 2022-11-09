"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getItem = exports.getItems = void 0;
const items_1 = require("../dao/items");
const getItems = async (request, reply) => {
    return items_1.items;
};
exports.getItems = getItems;
const getItem = async (request, Reply) => {
    const { id } = request.params;
    const item = items_1.items.find((item) => item.id === id);
    return item;
};
exports.getItem = getItem;
