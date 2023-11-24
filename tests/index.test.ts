// import * as index from '../src/index';
// import { validatePacket, parsePID, packetStream } from '../src/index';
// import { Buffer } from 'buffer';
// import { Readable } from 'stream';

// // I mock the handleError function to avoid exiting the process when an error is thrown
// jest.spyOn(index, 'handleError').mockImplementation(() => {});

// describe('MPEG-TS Parser', () => {


//     // Test to check that I'm correclty slicing the data into 188-byte packets
//     describe('packetStream', () => {
//         it('should correctly transform a chunk into 188-byte packets', (done) => {
//             // Create a chunk of 376 bytes (188 * 2)
//             const chunk = Buffer.alloc(376, 0x00);
    
//             // Create a readable stream that pushes the chunk and then ends
//             const readable = new Readable({
//                 read() {
//                     this.push(chunk);
//                     this.push(null);
//                 }
//             });
    
//             // Pipe the readable stream into packetStream
//             readable.pipe(packetStream);
    
//             // Listen for 'data' events on packetStream
//             let packetCount = 0;
//             packetStream.on('data', (packet) => {
//                 packetCount++;
//                 // Each packet should be 188 bytes
//                 expect(packet.length).toBe(188);
//             });
    
//             // Listen for the 'end' event to check the total number of packets
//             packetStream.on('end', () => {
//                 // There should be 2 packets for a 376-byte chunk
//                 expect(packetCount).toBe(2);
//                 done();
//             });
//         });
//     });

//     // Test to check the functionality of the parsePID function
//     describe('parsePID', () => {
//         it('should correctly parse the PID from a packet', () => {
//             const packet = Buffer.alloc(188, 0x47);
//             packet[1] = 0x1F;
//             packet[2] = 0xFF;
//             expect(parsePID(packet)).toBe('1fff');
//         });
//     });

//     // Test to check the different cases of the validation of a packet
//     describe('validatePacket', () => {
//         it('should not throw an error for a valid packet', () => {
//             const packet = Buffer.alloc(188, 0x47);
//             expect(() => validatePacket(packet, 0)).not.toThrow();
//         });

//         // it('should throw an error for a packet with incorrect length', () => {
//         //     const packet = Buffer.alloc(187, 0x47);
//         //     expect(() => validatePacket(packet, 0)).toThrow('Error: No correct length in packet 0, offset 0');
//         // });

//         // it('should throw an error for a packet without a sync byte', () => {
//         //     const packet = Buffer.alloc(188, 0x00);
//         //     expect(() => validatePacket(packet, 0)).toThrow('Error: No sync byte present in packet 0, offset 0');
//         // });
//     });
// });
