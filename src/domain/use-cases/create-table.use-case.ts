export interface CreateTableUseCase {
    execute: (options: CreateTableOptions) => string;
}

export interface CreateTableOptions {
    base: number;
    limit?: number;
}

export class CreateTable implements CreateTableUseCase{
    constructor(){
    }

    execute({base, limit =10}:CreateTableOptions) {  
    let tabla:string = ``
    const header:string= `================================================
                 Tabla del ${base}
================================================\n`;
    tabla+=header;
    for(let i=1; i<=limit; i++){
        let linea = `${base} * ${i} = ${base * i}`;
        tabla+=`${linea}\n`;
    }
    return tabla;
    }

}