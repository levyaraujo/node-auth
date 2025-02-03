import express from 'express';
import { middlewareAdapter } from './adapters/middlewareAdapter';
import { makeAuthenticationMiddleware } from '../factories/makeAuthenticationMiddleware';
import { makeSignUpController } from '../factories/makeSignUpController';
import { routeAdapter } from '../application/lib/routeAdapter';
import { makeUserProfileController } from '../factories/makeUserProfileController';
import { makeSignInController } from '../factories/makeSignInController';


const app = express();
app.use(express.json());


app.post('/sign-up', routeAdapter(makeSignUpController()));

app.post('/sign-in', routeAdapter(makeSignInController()))


app.get('/profile',
  middlewareAdapter(makeAuthenticationMiddleware()),
  routeAdapter(makeUserProfileController()),
);


app.listen(3000, () => {
  console.log('Server started on http://localhost:3000');
});
