const inquirer = require('inquirer');
require('colors');

const preguntas =[
    {
        type: 'list',
        name: 'option',
        message: '¿Que desea hacer?',
        choices: [{
            value: '1',
            name: `${'1.'.green} Buscar ciudad`
        },
        {
            value: '2',
            name: `${'2.'.green} Historial`
        },
        {
            value: '0',
            name: `${'0.'.green} Salir`
        }]
    }
]

const inquirerMenu = async ()=>{
    console.clear();
    console.log('======================'.green);
    console.log('Seleccione una opcion'.white);
    console.log('======================\n'.green);

    const {option} = await inquirer.prompt(preguntas);
    return option;
}

const pausa = async ()=>{
    const question={
        type: 'input',
        name: 'enter',
        message: `Presione ${'Enter'.red} para continuar`
    }
    console.log('\n');
    await inquirer.prompt(question);
    
}

const leerInput = async (message)=>{
    const question={
        type: 'input',
        name: 'descripcion',
        message,
        validate(value){
            if (value.length===0) {
                return 'por favor ingrese un valor'
            }
            return true;
        }
    }
    
    const {descripcion}=await inquirer.prompt(question);
    return descripcion;
    
}

const listarLugares =async( lugares =[])=>{
    const choices=lugares.map((lugar,i)=>{
        const idx= `${i+1}.`.green;
        return{
            value: lugar.id,
            name:`${idx} ${lugar.nombre}`
        }
    })
    choices.unshift({
        value:0,
        name: `0.`.green +` Cancelar`
    })
    const preguntas =[
        {   
            type: 'list',
            name: 'id',
            message: 'Seleccione Lugar',
            choices
        }
    ]
    const {id} = await inquirer.prompt(preguntas);
    return id;
}
const mostrarListadoChecklist =async( tareas =[])=>{
    const choices=tareas.map((tarea,i)=>{
        const idx= `${i+1}.`.green;
        return{
            value: tarea.id,
            name:`${idx} ${tarea.desc}`,
            checked: (tarea.completadoEn)?true:false
        }
    })
    const preguntas =[
        {   
            type: 'checkbox',
            name: 'id',
            message: 'Seleccione',
            choices
        }
    ]
    const {id} = await inquirer.prompt(preguntas);
    return id;
}

const confirmacion = async (message)=>{
    const preguntas =[
        {   
            type: 'confirm',
            name: 'ok',
            message
        }
    ]
    const {ok} = await inquirer.prompt(preguntas);
    return ok;
}

module.exports={inquirerMenu,pausa,leerInput,listarLugares,confirmacion,mostrarListadoChecklist}