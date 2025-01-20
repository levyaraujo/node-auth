import express from "express";
import { SignUpController } from "../application/controllers/SignUpController";
import { SignInController } from "../application/controllers/SignInController";
import { SignInUseCase } from "../application/useCases/SignInUseCase";
import { SignUpUseCase } from "../application/useCases/SignUpUseCase";


const app = express();
app.use(express.json());


app.post("/sign-up", async (request, response) => {
  const signUpController = new SignUpController(new SignUpUseCase());


  const { statusCode, body } = await signUpController.handle({ body: request.body })

  response.status(statusCode).json(body);
})

app.post("/sign-in", async (request, response) => {
  const signInController = new SignInController(new SignInUseCase());


  const { statusCode, body } = await signInController.handle({ body: request.body })

  response.status(statusCode).json(body);
})



app.listen(3000, () => {
  console.log("Server started on http://localhost:3000");
});
