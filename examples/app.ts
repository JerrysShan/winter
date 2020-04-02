import { Application } from '../';
import handleError from './middleware/error';

const app = new Application({ middlewares: [handleError] });

app.listen(3000, () => {
    console.log('server is listening 3000');
});