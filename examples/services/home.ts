import { Service } from '../../';

@Service()
class HomeService {
    public async index(): Promise<any[]> {
        return [
            { name: 'ssk', age: '24', gender: 'male' },
            { name: 'cpp', age: '24', gender: 'female' }
        ];
    }
}

export default HomeService;