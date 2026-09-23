let listaNomes = [];
listaSenhas = [];
let proximaSenha = 0;

function entrarNaFila(nome){
    listaNomes.push(nome);
    proximaSenha += 1;
    listaSenhas.push(proximaSenha);

    console.log("======== NOVO PACIENTE ========");
    console.log(`Paciente ${nome} entrou na fila.`);

    return
}

function chamarProximo(){
    let proximoNome = listaNomes.shift();
    let senhaExibida = listaSenhas.shift();

    if(proximoNome == undefined){
        return console.log("Não há mais pacientes cadastrados.");
    }else{
        console.log("======== CHAMADA DE PACIENTE ========")
        return console.log(`Paciente "${proximoNome}", de senha: ${senhaExibida}, por favor comparecer ao consultório.`);
    }

}

entrarNaFila("Ana Souza")
entrarNaFila("Carlos Lima")
entrarNaFila("Beatriz Rocha")

chamarProximo()
chamarProximo()

entrarNaFila("Diego Alves")

chamarProximo()
chamarProximo()
chamarProximo()