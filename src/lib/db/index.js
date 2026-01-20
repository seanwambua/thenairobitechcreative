"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
var client_1 = require("@/generated/client/client");
var adapter_better_sqlite3_1 = require("@prisma/adapter-better-sqlite3");
var better_sqlite3_1 = require("better-sqlite3");
var sqlite = (0, better_sqlite3_1.default)('./dev.db');
var adapter = new adapter_better_sqlite3_1.PrismaBetterSqlite3(sqlite);
var db;
// This is needed because in development we don't want to restart
// the server with every change, but we want to make sure we don't
// create a new connection to the DB with every change.
if (process.env.NODE_ENV === 'production') {
    exports.db = db = new client_1.PrismaClient({ adapter: adapter });
}
else {
    if (!global.__db__) {
        global.__db__ = new client_1.PrismaClient({ adapter: adapter });
    }
    exports.db = db = global.__db__;
}
