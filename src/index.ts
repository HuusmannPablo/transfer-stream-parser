// Spalk Tech Test
    // Preamble:
        // - The purpose of this test is for us to get a sense of your current code style and provide
        // talking points for discussion during the interview process.
        // - We expect you to spend a maximum of 4 hrs completing this test, please do not feel
        // compelled to spend more if you have not completed the task.
        // - Ideally you complete the task but if you cannot please deliver your attempt as completely
        // as possible.
        // - Please complete the test using any programming language you are comfortable with.
// Please provide instructions to compile and run the solution alongside any code you produce.

// Introduction
    // You may be familiar with the MPEG Transport Stream format, it is a streaming standard used by
    // broadcasters to distribute broadcast content from one point to another. Some useful aspects of
    // the standard are:
        // 1. The streaming format is made up of individual packets
        // 2. Each packet is 188 bytes long
        // 3. Every packet begins with a “sync byte” which has hex value 0x47. Note this is also a
        // valid value in the payload of the packet.
        // 4. Each packet has an ID, known as the PID that is 13 bits long. The PID is stored in the
        // last 5 bits of the second byte, and all 8 bits of the third byte of a packet eg:

// 0                   1                   2                   3
// 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1
// +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
// |SYNC BYTE(0x47)|Flags|          PID          | ... Packet payload
// +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+

// Spalk is exploring the possibility of launching a feature that accepts uploaded and streamed
// MPEG Transport Stream files from our users. As a part of this we need to validate that the uploaded files are valid.

// Task: Implement a parser:
    // - Please implement a parser that:
    // - Reads a byte stream from standard input
    // $ cat some_test_file.ts | ./mpegts-parser
    // - Parses the byte stream to ensure it conforms to the criteria above:
        // - The byte stream will contain a series of 188 byte packets, and each
        // packet begins with the sync byte (possibly excepting the first packet)
        // - Parse and report the Packet ID (PID) of each packet
    // - Will successfully parse a valid stream that has a partial first packet (less than 188
    // bytes). If the first packet is not complete, it should be discarded.
    // - Exits with a success code (0) if the byte stream conforms to the criteria, and a
    // failure code (1) if it does not.

    // - Outputs a summary:
        // - If there are any errors, exit and print the index and byte offset of the first TS packet where the error occurs.
        // $ cat some_test_file.ts | ./mpegts-parser
        // Error: No sync byte present in packet 1203, offset 226164
        // $ echo $?
        // 1

        // - If stdin is closed and there are no errors, lists all the unique PIDs present
        // in the stream in ascending order in hex. Eg:
        // $ cat some_test_file.ts | ./mpegts-parser
        // 0x1010
        // 0x1020
        // 0x1030
        // 0x1040
        // $ echo $?
        // 0

// I would need to create a parser class or function, that can recieve an input file as the one mentioned before
// And I need to return a message for success or error

// I need to create the tests for the fail or success results

// Here's a step-by-step plan:

// Import the necessary modules.
// Create a function to parse the PID from the packet.
// Create a function to validate the packet.
// Create a ReadStream from the input file.
// Listen for 'data' events on the stream.
// On each 'data' event, slice the data into 188-byte packets.
// Validate each packet and extract the PID.
// Keep track of the unique PIDs in a Set.
// If a packet is invalid, print an error message and exit with a failure code.
// If the stream ends without any errors, print the unique PIDs and exit with a success code.



// The fs is a module that allows me to read and write files and directories
// The stream module allows me to handle streaming data, and transform is a class that allows me to take input, process it and produce output
import * as fs from 'fs';
import { Transform } from 'stream';
import { Readable } from 'stream';

// Creating a dummy stream to check if the code works
// Create a buffer of 188 bytes
const dummyPacket = Buffer.alloc(188);
// Set the sync byte
dummyPacket[0] = 0x47;
// Set the PID to 0x1fff (null packet)
dummyPacket[1] = 0x1F;
dummyPacket[2] = 0xFF;
// The rest of the packet can be any data
for (let i = 3; i < 188; i++) {
    dummyPacket[i] = Math.floor(Math.random() * 256);
}
const twoDummyPackets = Buffer.concat([dummyPacket, dummyPacket]);
const dummyStream = Readable.from(twoDummyPackets);

// Function to parse the PID from the packet
export function parsePID(packet: Buffer): string {
    // The PID is stored in the last 5 bits of the second byte, and all 8 bits of the third byte of a packet
    // The first part takes the last 5 bits of the second byte (packet[1]) and then shifts it 8 bits to the left to make room for the third byte
    // The second part after the OR operator takes the third byte (packet[2])
    // The result is a 13-bit PID that is converted to a string in hexadecimal format
    const pid = ((packet[1] & 0x1f) << 8) | packet[2];
    return pid.toString(16);
}

// Function to validate the packet
export function validatePacket(packet: Buffer, index: number): void {
    // I need to add an exception for the first package, that is allowed to be less than 188 bytes

    // If the packet doesn't have the correct length, or if the sync byte is not present, I throw an error
    if (packet.length !== 188 || packet[0] !== 0x47) {
        handleError(`Error: No sync byte present in packet ${index}, offset ${index * 188}`);
    }
}

// Function to handle errors, needed to be able to run the tests without ending the process
export function handleError(message: string): void {
    console.error(message);
    process.exit(1);
}

// I create the stream to read from the file 
// const fileStream = fs.createReadStream('./test-files/test_failure.ts');
// const fileStream = fs.createReadStream('./test-files/test_success.ts');

// I create the stream to transform the data into packets
export const packetStream = new Transform({
    transform(chunk: Buffer, encoding: string, callback: Function) {
        // I slice the data into 188-byte packets
        for (let i = 0; i < chunk.length; i += 188) {
            this.push(chunk.slice(i, i + 188));
        }
        callback();
    }
});

// Keep track of the unique PIDs in a Set
const uniquePIDs = new Set<string>();

// I pipe the file stream into the packetStream. I read the file and send it to be transformed into packets
// fileStream.pipe(packetStream)
dummyStream.pipe(packetStream)
    // Every time I get a packet, I validate it and extract the PID 
    .on('data', (packet: Buffer) => {
        validatePacket(packet, uniquePIDs.size);
        uniquePIDs.add(parsePID(packet));
    })
    // When the stream ends, I print the unique PIDs and exit with a success code
    .on('end', () => {
        console.log(Array.from(uniquePIDs).sort());
        process.exit(0);
    });
