import * as fs from 'fs';
export interface SaveFileUseCase {
    execute: (options: Options) => boolean;
}

export interface Options{
    fileContent : string;
    fileDestination?: string;
    fileName?   : string;
    type?: string;
} 


export class SaveFile implements SaveFileUseCase{
    constructor(){}

    execute ({fileContent, 
        fileDestination = 'output', 
        fileName = 'table',
        type = 'txt'
    }: Options): boolean{
        try {
            fs.mkdirSync(fileDestination, {recursive: true});
            fs.writeFileSync(`${fileDestination}/${fileName}.${type}`, fileContent);
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }

    }
}