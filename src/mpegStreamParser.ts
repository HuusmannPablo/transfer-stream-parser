import { Readable } from "stream";
import { Transform } from 'stream';

const PACKET_SIZE_IN_BYTES = 188;
const SYNC_BYTE = 0x47;

export function parse(fileStream: Readable): Promise<Array<string>> {
    return new Promise((resolve, reject) => {
        const transformStreamIntoPackets = new Transform({
            transform(chunk: Buffer, encoding: string, callback: Function) {
                for (let index = 0; index < chunk.length; index += PACKET_SIZE_IN_BYTES) {
                    this.push(chunk.slice(index, index + PACKET_SIZE_IN_BYTES));
                }
                callback();
            }
        });

        const packetIDs = new Array<string>();

        fileStream.pipe(transformStreamIntoPackets)
            .on('data', (packet: Buffer) => {
                try {
                    packetValidator(packet, packetIDs.length);
                    packetIDs.push(packetIDExtractor(packet));
                } catch (error) {
                    reject(error);
                }
            })
            .on('end', () => {
                resolve(packetIDs);
            })
            .on('error', (error) => {
                reject(error);
            });
    });
}

function packetIDExtractor(packet: Buffer): string {
    const packetID = ((packet[1] & 0x1f) << 8) | packet[2];
    return packetID.toString(16);
}

function packetValidator(packet: Buffer, index: number): void {
    // I need to add an exception for the first package, that is allowed to be less than 188 bytes


    // If the packet doesn't have the correct length, or if the sync byte is not present, I throw an error
    if (packet.length !== PACKET_SIZE_IN_BYTES || packet[0] !== SYNC_BYTE) {
        throw new Error(`Error: No sync byte present in packet ${index}, offset ${index * 188}`);
    }
}
