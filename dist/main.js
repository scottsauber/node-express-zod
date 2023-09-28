"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const zod_1 = require("zod");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(body_parser_1.default.urlencoded());
const port = (_a = process.env.PORT) !== null && _a !== void 0 ? _a : 3000;
const schema = zod_1.z.object({
    firstName: zod_1.z.string().min(2),
    lastName: zod_1.z.string().optional(),
});
app.post("/customer", (req, res) => {
    const parsedData = schema.safeParse(req.body);
    if (!parsedData.success) {
        return res.status(400).send(parsedData.error.issues);
    }
    res.status(200).send();
});
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
