import Result from '../entities/response_result'
import { Controller, GET, POST, Inject, BaseController, Query } from '../..';
import HomeService from '../services/home';
// import winston = require('winston');

@Controller('/home')
export default class HomeController extends BaseController {
    @Inject()
    homeService: HomeService;

    @GET('/index')
    public async index(@Query() query): Promise<Result> {
        const data = await this.homeService.index();
        this.logger.info('request index', query, Date.now())
        return { code: 0, data: data, msg: 'OK' };
    }

    @POST('/update')
    public async update(): Promise<Result> {
        return { code: -1, data: [], msg: 'OK' };
    }

    @GET('/list')
    public async list(): Promise<Result> {
        throw new Error('no implement')
    }
}