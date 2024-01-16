import { ServerApp } from './presentation/server-app';
describe('App', () =>{
    test('should call Server.run with values', async () =>{
    
        const serverRunMock = jest.fn();
        ServerApp.run = serverRunMock;

        process.argv = ['node', 'app.ts', '-b', '10', '-l', '5', '-n', 'test', '-d', 'destination'];

        await import('./app');

        expect(serverRunMock).toHaveBeenCalledWith({"base": 10, "destination": "destination", "fileName": "test", "limit": 5, "showTable": false, "type": "txt"});

    })
})