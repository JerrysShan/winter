
console.log(process.cwd(), '>>>>>>>>');
export function loadControllers(path: string) {
    if (path.startsWith('.')) {
        throw new Error('path should be absolute path');
    }
    require(path);
}