import IRouter from 'utils/interfaces/router.interface';
import { Router } from 'express';

class ItemRouter implements IRouter {
  public router: Router = Router();
  public path = 'items';

  constructor() {
    this.router.get('', (req, res) => res.send('Hello from B!'));
  }
}

export default ItemRouter;
