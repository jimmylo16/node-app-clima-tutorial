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
                // Recibir de la consola el lugar
                const busqueda = await leerInput('Ciudad: ');
                // Buscar el lugar
                const lugares = await busquedas.ciudad(busqueda);
                // Seleccionar dentro de las posibilidades
                const id= await listarLugares(lugares);
                if (id===0) continue

                const lugarSel = lugares.find(l =>l.id===id);
                

                // Variables segun la ciudad
                const {nombre,lat,lng}= lugarSel;
                const {temp,max,min,desc}= await busquedas.climaLugar(lat,lng);

                console.log(`\n informacion de la ciudad \n`.red);
                console.log('Ciudad: ',nombre);
                console.log('Lat: ',lat);
                console.log('Longitud: ',lng);
                console.log('Temperatura: ',temp);
                console.log('Minima: ',min);
                console.log('Maximo: ',max);
                console.log('Descriptcion: ',desc);

                //Guardar en DB
                
                busquedas.agregarHistorial(nombre);
                
                break;
            case '2':
                busquedas.leerDB();
                busquedas.historialCapitalzado.forEach((lugar,i)=>{
                   const idx=`${i+1}.`.green;
                   console.log(`${idx} ${lugar}`);
                })  
                break;
        }

        if (opt!=='0') await pausa();
    } while (opt!=='0');
    console.log(opt);
    
}

main();
