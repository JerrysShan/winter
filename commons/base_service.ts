import Container from '../container';
import { Logger } from '../types/logger';

export default class BaseService {
    logger: Logger = Container.get('logger');
}