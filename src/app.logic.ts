
import * as fs from 'fs';
import { yarg } from '../config/plugins/args.plugin';
let {b, l, s} = yarg;

const multiplo:number =b;


let tabla:string = ``
const header:string= `================================================
                 Tabla del ${multiplo}
================================================
`;

function crearTabla(){
    tabla+=header;
    for(let i=1; i<=l; i++){
        let linea = `${multiplo} * ${i} = ${multiuplicar(multiplo, i)}`;
        tabla+=`${linea}\n`;
    }
}


function imprimirTabla(){
    console.log(tabla);
}


function multiuplicar(multiplo:number, i:number){
    return multiplo * i;
}
function crearArchivo(){
    fs.writeFileSync(`./output/table ${b} result.txt`, tabla)
}

crearTabla();
crearArchivo();
s ? imprimirTabla() : console.log('Archivo creado'); 
