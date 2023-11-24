// Creating a dummy stream to check if the code works

import { Readable } from "stream";

// Create a buffer of 188 bytes
const dummyPacket = Buffer.alloc(188);
// Set the sync byte
dummyPacket[0] = 0x47;
// Set the PID to 0x1fff
dummyPacket[1] = 0x1F;
dummyPacket[2] = 0xFF;
// The rest of the packet can be any data
for (let i = 3; i < 188; i++) {
    dummyPacket[i] = Math.floor(Math.random() * 256);
}
const twoDummyPackets = Buffer.concat([dummyPacket, dummyPacket]);
export const dummyStream = Readable.from(twoDummyPackets);
