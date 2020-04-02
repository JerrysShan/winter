import Container from '../container';
import { Logger } from '../types/logger';

export default class BaseController {
    logger: Logger = Container.get('logger');
}