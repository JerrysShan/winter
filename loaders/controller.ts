import { statSync } from 'fs';
import * as globby from 'globby';
import * as path from 'path';

export function loadControllers(dir: string) {
    const filepaths = globby.sync(['**/*.ts', '**/*.js', '!**/*.d.ts'], { cwd: dir });
    for (const filepath of filepaths) {
        const fullpath = path.join(dir, filepath);
        if (!statSync(fullpath).isFile()) continue;
        require(fullpath);
    }
}