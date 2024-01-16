import { SaveFile } from './save-file.use-case';
import fs from 'fs';



describe('SaveFileUseCase', () => {


    const options = {
        fileContent: 'custom content',
        fileDestination: 'custom-output/file-destination',
        fileName: 'custom-table-name'
    };

    afterEach(() => {
        //? Clean up
        
        const outputFolderExist = fs.existsSync('output');
        if (outputFolderExist) {
            fs.rmSync('output', {recursive: true})
        }

        const output = fs.existsSync('custom-output');
        if (output) {
            fs.rmSync('custom-output', {recursive: true})
        }
        
    })



    test('Should save file with default values', () => {

        const saveFile = new SaveFile();
        const options = {
            fileContent: 'test content'
        };

        const filePath = 'output/table.txt';

        const result = saveFile.execute(options);
        expect(result).toBe(true);
        const checkFile = fs.existsSync(filePath);
        const fileContent = fs.readFileSync(filePath, { encoding: 'utf8' });

        expect(checkFile).toBe(true);
        expect(fileContent).toBe(options.fileContent)
    });

    test('should save file with custom values', () => {


        const saveFile = new SaveFile();
        const result = saveFile.execute(options);

        const fileContent = fs.readFileSync(`${options.fileDestination}/${options.fileName}.txt`, { encoding: 'utf8' });
        const existFile = fs.existsSync(`${options.fileDestination}/${options.fileName}.txt`);

        expect(fileContent).toBe(options.fileContent);
        expect(existFile).toBe(true);
        expect(result).toBe(true);
    
    });

    test('should return false if directory could not be created', () => {

        const saveFile = new SaveFile();
        const mkdirSpy = jest.spyOn(fs, 'mkdirSync').mockImplementation(
          () => { throw new Error('This is a custom error message from testing'); }
        );
        
        const result = saveFile.execute(options);
    
        expect( result ).toBe( false );
    
        mkdirSpy.mockRestore();
    
      });
    
    
      test('should return false if file could not be created', () => {
        const saveFile = new SaveFile();
        const writeFileSpy = jest.spyOn(fs, 'writeFileSync').mockImplementation(
            () => {throw new Error('This is an error')}
        );

        const result = saveFile.execute({fileContent: 'hola'});
        expect(result).toBe(false);

        writeFileSpy.mockRestore();
      });

});