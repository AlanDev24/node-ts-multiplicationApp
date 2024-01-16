import { Console } from 'console';
import { ServerApp } from './server-app';
import { CreateTable } from '../domain/use-cases/create-table.use-case';
import { SaveFile } from '../domain/use-cases/save-file.use-case';
describe('server-app.ts', () => {
    const options = {
        base: 2,
        limit: 10,
        showTable: true,
        destination: 'test-destination',
        fileName: 'test',
        type: 'txt'
    };

    test('should create a server instance', () => {
        const serverApp = new ServerApp();

        expect(serverApp).toBeInstanceOf(ServerApp);
        expect(typeof ServerApp.run).toBe('function')
    });

    // test('should run servver app with default options', () => {

    //     const logSpy = jest.spyOn(console, 'log');
    //     const createTableSpy = jest.spyOn(CreateTable.prototype, 'execute');
    //     const saveFileSpy = jest.spyOn(SaveFile.prototype, 'execute');


    //     ServerApp.run(options);
    //     expect(logSpy).toHaveBeenCalledWith('Server running...');
    //     expect(createTableSpy).toHaveBeenCalledTimes(1)


    //     expect(saveFileSpy).toHaveBeenCalledTimes(1);
    //     expect(saveFileSpy).toHaveBeenCalledWith({
    //             fileContent: expect.any(String),
    //             fileDestination: options.destination,
    //             fileName: options.fileName,
    //             type: 'txt'
    //         })
    // })


    test('should run with custom values mocked', () => {

        const createMock = jest.fn().mockReturnValue('1 x 1 = 1');
        const saveFileMock = jest.fn();

        CreateTable.prototype.execute = createMock;
        SaveFile.prototype.execute = saveFileMock;

        ServerApp.run(options);

        expect(createMock).toHaveBeenCalledWith({"base":options.base, "limit": options.limit});
        expect(saveFileMock).toHaveBeenCalledWith({
            fileContent: '1 x 1 = 1',
            fileDestination: options.destination,
            fileName: options.fileName,
            type: options.type
        })
    })
})