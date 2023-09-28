import express from "express";
import { z } from "zod";

const app = express();

const schema = z.object({
  firstName: z.string().min(2),
  lastName: z.string().optional(),
  age: z.number(),
  email: z.string().email(),
});

app.use(express.json());

app.post("/customer", (req, res) => {
  const parsedData = schema.safeParse(req.body);

  if (!parsedData.success) {
    return res.status(400).send(parsedData.error.issues);
  }

  return res.json(parsedData.data);
});

const start = (): void => {
  try {
    const port = 3333;
    app.listen(port, () => {
      console.log(`Server started on port ${port}`);
    });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};
start();
