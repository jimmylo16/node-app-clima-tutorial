require('dotenv').config()

const {leerInput,inquirerMenu,pausa,listarLugares}= require('./helpers/inquirer');
const Busqueda= require('./models/busquedas');
console.log(process.env)

const main = async()=>{
    let opt;
    const busquedas = new Busqueda();
    do {
        opt= await inquirerMenu();
        switch (opt) {
            case '1':

                const busqueda = await leerInput('Ciudad: ');
                const lugares = await busquedas.ciudad(busqueda);
                const id= await listarLugares(lugares);
                const lugarSel = lugares.find(l =>l.id===id)
               
                console.log(`\n informacion de la ciudad \n`.red);
                console.log('Ciudad: ',lugarSel.nombre);
                console.log('Lat: ',lugarSel.lat);
                console.log('Longitud: ',lugarSel.lng);
                console.log('Temperatura: ',);
                console.log('Minima: ',);
                console.log('Maximo: ',);
                console.log('Descriptcion: ',);
                
                break;
            case '2':
                
                break;
        }

        if (opt!=='0') await pausa();
    } while (opt!=='0');
    console.log(opt);
    
}

main();
