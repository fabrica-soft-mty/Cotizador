//constructor
class Seguro {
    constructor(marca, anio, tipo) {
        this.marca = marca;
        this.anio = anio;
        this.tipo = tipo;
    }
    cotizarSeguro() {
        /*Marcas
        1 = Americano 1.15
        2 = Asiatico 1.05
        3 = Europeo 1.35
         */
        let cantidad;
        const base = 2000;
        switch (this.marca) {
            case '1':
                cantidad = base * 1.15
                break;
            case '2':
                cantidad = base * 1.05
                break;
            case '3':
                cantidad = base * 1.35
                break;
        }
        //Leer el Año
        const diferencia = new Date().getFullYear() - this.anio;
        //Cada año de diferencia hay que reducir 3 % el valor del seguro
        cantidad -= ((diferencia * 3) * cantidad) / 100;
        /**
         * Si el seguro es basico se multimplica por 30%
         * si es compeleto se multimipla por 50 %
         */
        if (this.tipo === 'basico') {
            cantidad *= 1.30;
        } else {
            cantidad *= 1.50;
        }
        return cantidad;

    }

}

//toda la interfaz del html
class Interfaz {
    //mensaje que se imprime en el html
    mostrarMensaje(mensaje, tipo) {
            const div = document.createElement('div');

            if (tipo === 'error') {
                div.classList.add('mensaje', 'error');
            } else {
                div.classList.add('mensaje', 'correcto');
            }
            div.innerHTML = `${mensaje}`;
            formulario.insertBefore(div, document.querySelector('.form-group'));

            setTimeout(function() {
                document.querySelector('.mensaje').remove();
            }, 3000);
        }
        //imprime el resultado de la interfaz
    mostrarResultado(seguro, total) {
        const resultado = document.getElementById('resultado');
        let marca;
        switch (seguro.marca) {
            case '1':
                marca = 'Automatico';
                break;
            case '2':
                marca = 'Asiatico'
                break;
            case '3':
                marca = 'Europeo'
                break;
        }
        //crear un div
        const div = document.createElement('div');
        //insertando la informacino con template string
        div.innerHTML = `
        <p class="header">Tu Resumen:</p>
        <p> Marca: ${marca}</p>
        <p>Año : ${seguro.anio}</p>
        <p>tipo : ${seguro.tipo}</p>
        <p>Total :${total}</p>
        `;
        const spinner = document.querySelector('#cargando img');
        spinner.style.display = 'block';
        setTimeout(() => {
            resultado.appendChild(div);
            spinner.style.display = 'none';
        }, 3000);

    }
}


//event listener
const formulario = document.getElementById('cotizar-seguro');
formulario.addEventListener('submit', function(e) {
    e.preventDefault();
    //seleccionando el valor del select marca
    const marca = document.getElementById('marca');
    const marcaSeleccionada = marca.options[marca.selectedIndex].value;

    //seleccionando el valor del select anio
    const anio = document.getElementById('anio');
    const anioSelecionado = anio.options[anio.selectedIndex].value;

    //seleccionando el valor del radio buton con query Selector sintaxis css
    const tipo = document.querySelector('input[name="tipo"]:checked').value;

    const interfaz = new Interfaz();

    if (marcaSeleccionada === '' || anioSelecionado === '' || tipo === '') {
        //interfaz imprime error
        interfaz.mostrarMensaje('faltan datos revisar el Formulario', 'error');
    } else {
        //Limpiar resutlados anteriores
        const resultados = document.querySelector('#resultado div');
        if (resultados != null) {
            resultados.remove();
        }
        //interfaz imprime error
        const seguro = new Seguro(marcaSeleccionada, anioSelecionado, tipo);
        //cotizar el seguro con el algoritmo
        const cantidad = seguro.cotizarSeguro();
        //Mostrar el resultado
        interfaz.mostrarResultado(seguro, cantidad);
        interfaz.mostrarMensaje('Cotizando....', 'correcto');



    }


});

const max = new Date().getFullYear(),
    min = max - 20;


const SelectAnios = document.getElementById('anio');
for (let i = max; i >= min; i--) {
    let option = document.createElement('option');
    option.value = i;
    option.innerHTML = i;
    SelectAnios.appendChild(option);
}