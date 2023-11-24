import { parse } from "../src/mpegStreamParser";
import { createReadStream } from "fs";

describe('parse', () => {
    it('should return the PIDs', () => {
        const fileStream = createReadStream('./test-files/test_success.ts');
        expect(parse(fileStream)).toBe(['0x0', '0x11', '0x20', '0x21', '0x22', '0x23', '0x24', '0x25', '0x1fff']);
    })
})

describe('parse', () => {
    it('should return ', () => {
        const fileStream = createReadStream('./test-files/test_failure.ts');
        expect(parse(fileStream)).toThrow('Error: No sync byte present in packet 20535, offset 3860580');
    })
})