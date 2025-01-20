import express from "express";
import { SignUpController } from "../application/controllers/SignUpController";
import { SignInController } from "../application/controllers/SignInController";


const app = express();
app.use(express.json());


app.post("/sign-up", async (request, response) => {
  const signUpController = new SignUpController();


  const { statusCode, body } = await signUpController.handle({ body: request.body })

  response.status(statusCode).json(body);
})

app.post("/sign-in", async (request, response) => {
  const signInController = new SignInController();


  const { statusCode, body } = await signInController.handle({ body: request.body })

  response.status(statusCode).json(body);
})



app.listen(3000, () => {
  console.log("Server started on http://localhost:3000");
});
