import Result from '../entities/response_result'
import { Controller, GET, POST, Inject } from '../../';
import HomeService from '../services/home';

@Controller('/home')
export default class HomeController {
    @Inject()
    homeService: HomeService;

    @GET('/index')
    public async index(): Promise<Result> {
        const data = await this.homeService.index();
        return { code: 0, data: data, msg: 'OK' };
    }

    @POST('/update')
    public async update(): Promise<Result> {
        return { code: -1, data: [], msg: 'OK' };
    }
}