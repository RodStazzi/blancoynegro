/* para ejecutar el programa, se debe escribir el siguiente comando en la terminal */
/* node index.js black_white --key 123 */
/* Luego, visite su http://localhost:8081 en el navegador y coloque la url de cualquier imagen*/
/* al hacer click en el botón, se guardará en el servidor */

const yargs = require('yargs');
const child_process = require('child_process');

yargs.command(
  'black_white',
  'Valida acceso a Black_White',
  {
    key: {
      description: 'Argumento que recibe la contraseña de acceso',
      demand: true,
      alias: 'k'
    }
  },
  (argvs) => {
    if(argvs.k === 123){
      return child_process.exec('node b_w.js', (err, result) => {
        if(err){
          return console.log('Ha ocurrido un error al leer al archivo');
        }
        console.log(result.trim());
      });
    } else {
      console.log('Acceso denegado');
    }
  }
).help().argv;