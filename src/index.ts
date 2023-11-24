// The fs is a module that allows me to read and write files and directories
import { createReadStream } from 'fs';
import { parse } from './mpegStreamParser';
import { dummyStream } from '../test-files/test_dummy';

const fileStream = createReadStream('./test-files/test_failure.ts');
// const fileStream = createReadStream('./test-files/test_success.ts');
// const fileStream = dummyStream

(async () => {
    try {
        const PIDs = await parse(fileStream);
        PIDs.forEach(pid => console.log(pid));
        process.exit(0);
    } catch (error) {
        console.log(error);
        process.exit(1)
    }
})();
