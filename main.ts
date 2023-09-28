import express, { Express, Request, Response } from "express";
import bodyParser from "body-parser";
import { z } from "zod";

const app: Express = express();
app.use(express.json());
app.use(bodyParser.urlencoded());

const port = process.env.PORT ?? 3000;

const schema = z.object({
  firstName: z.string().min(2),
  lastName: z.string().optional(),
});

app.post("/customer", (req: Request, res: Response) => {
  const parsedData = schema.safeParse(req.body);

  if (!parsedData.success) {
    return res.status(400).send(parsedData.error.issues);
  }

  res.status(200).send();
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
