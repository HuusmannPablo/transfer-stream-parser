# transfer-stream-parser

These were the Requirements for this parser:

Please implement a parser that:

        - Reads a byte stream from standard input
        - Parses the byte stream to ensure it conforms to the criteria above:
        - The byte stream will contain a series of 188 byte packets, and each packet begins with the sync byte (possibly excepting the first packet)
        - Parse and report the Packet ID (PID) of each packet
        - Will successfully parse a valid stream that has a partial first packet (less than 188 bytes). If the first packet is not complete, it should be discarded.
        - Exits with a success code (0) if the byte stream conforms to the criteria, and a failure code (1) if it does not.

To run the parser:

        1) Clone the repository.

        2) Navigate to the root directory in the terminal.
        
        3) Run 'npm install'
        
        4) Run 'npm start' to execute

At this stage, the parser only takes the selected value from the index.ts file. When active, line 6 runs using the failure test, line 7 using the success test, and line 8 runs using a dummy hardcoded test.

What is missing from the program:

        1) packetValidator needs to discard the first packet if it is not 188-bytes long.

        2) packetValidator needs to discard the first packet if it doesn't have the correct sync byte

This is important, because at the moment I'm assuming every packet is 188 bytes, without checking for the sync byte as a start of the packet.
In the future I need to look for the sync byte to understand where the packet starts, to make the slicing of the stream into packets effective.

        3) The code should allow for us to run it from the command line, choosing there which stream file to parse.