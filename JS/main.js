window.onload = function () {
    mostrarInformacionNutricional();
}

function mostrarInformacionNutricional() {

    do {
        sexo = prompt("Ingrese su sexo (M/F):");
    } while (sexo === null || sexo.trim() === "" || sexo.length > 1);


    do {
        edad = prompt("Ingrese su edad:");
    } while (edad === null || edad.trim() === "" || edad <= 10 || edad >= 115);

    do {
        altura = prompt("Ingrese su altura en centimetros:");
    } while (altura === null || altura.trim() === "")

    do {
        contextura = prompt("Ingrese su contextura G : Grande, M: Media, C: Chica ");
    } while (contextura === null || contextura.trim() === "" || contextura.length > 1);


    do {
        pesoActual = prompt("Ingrese su peso actual en kilogramos:");
    } while (pesoActual === null || pesoActual.trim() === "")

    do {
        anioSobrepeso = prompt("Ingrese cantidad de años con sobrepeso:");

    } while (anioSobrepeso === null || anioSobrepeso.trim() === "")

    sexo = sexo.toUpperCase();
    contextura = contextura.toUpperCase();
    edad = parseInt(edad);
    altura = parseFloat(altura);
    pesoActual = parseFloat(pesoActual);
    anioSobrepeso = parseInt(anioSobrepeso);

    const persona = new Persona(sexo, edad, altura, pesoActual, anioSobrepeso, contextura)

    console.log(persona)

    let imc = calcIMC(persona);
    let pesoIdeal = calcPesoIdeal(persona);
    let pesoPosible = calcPesoPosible(persona, pesoIdeal);

    alert(`
    Tu IMC personal: ${imc}
    Peso Actual: ${pesoActual} Kg
    Peso ideal: ${pesoIdeal} Kg
    Tu rango de peso posible: ${pesoPosible - 1} Kg - ${pesoPosible + 1} Kg `);
    alert('Recuerda que estas fórmulas son solo estimaciones y no consideran la composición corporal. Además, cada persona es única, y lo más importante es mantener un peso saludable y un estilo de vida equilibrado a través de una dieta adecuada y actividad física regular. Consultar a un profesional de la salud puede brindarte una evaluación más precisa y personalizada para alcanzar tus objetivos de peso y bienestar.😊');
}


function Persona(sexo, edad, altura, pesoActual, anioSobrepeso, contextura) {
    this.sexo = sexo;
    this.edad = edad;
    this.altura = altura;
    this.pesoActual = pesoActual;
    this.anioSobrepeso = anioSobrepeso;
    this.contextura = contextura
}

function calcIMC(persona) {
    let estado;
    altura = persona.altura / 100;
    const imc = parseFloat(persona.pesoActual / (altura * altura)).toFixed(2);

    if (imc < 16.5) {
        estado = 'Desnutrición o anorexia';
    } else if (imc >= 16.5 && imc < 18.5) {
        estado = 'Bajo peso';
    } else if (imc >= 18.5 && imc < 25) {
        estado = 'Peso normal';
    } else if (imc >= 25 && imc < 30) {
        estado = 'Sobrepeso';
    } else if (imc >= 30 && imc < 35) {
        estado = 'Obesidad clase I';
    } else if (imc >= 35 && imc < 40) {
        estado = 'Obesidad clase II';
    } else {
        estado = 'Obesidad clase III';
    }
    return `${imc} Kg/m² - Estado: ${estado}`;
}

function calcPesoIdeal(persona) {
    const result = tablaPesosyContextura.find((ele) => ele.Altura >= persona.altura && ele.Sexo === persona.sexo && ele.ContexturaFisica === persona.contextura);
    return result.Medio;

}

function calcPesoPosible(persona, pesoIdeal) {

    let kg1 = (persona.edad > 20) ? (persona.edad - 20) / 10 : 0;
    let kg2 = persona.anioSobrepeso / 10;
    let kg3 = (persona.pesoActual - pesoIdeal) / 10;
    let kg4 = (persona.pesoActual > 100) ? ((persona.pesoActual - 100) * 2) / 10 : 0;
    return Number(pesoIdeal) + Number(kg1) + Number(kg2) + Number(kg3) + Number(kg4);
}


