class FilaDeAtendimento {

    constructor(listaNomes = [], listaSenhas = [], proximaSenha = 0){
        this.listaNomes = listaNomes;
        this.listaSenhas = listaSenhas;
        this.proximaSenha = proximaSenha;
    }

    entrarNaFila(nome){
        this.listaNomes.push(nome);
        this.proximaSenha += 1;
        this.listaSenhas.push(this.proximaSenha);

        console.log("======== NOVO PACIENTE ========");
        console.log(`Paciente ${nome} entrou na fila.\n`);

        return
    }

    chamarProximo(){
        let proximoNome = this.listaNomes.shift();
        let senhaExibida = this.listaSenhas.shift();
        
        if(proximoNome == undefined){
            return console.log("Não há mais pacientes cadastrados.");
        }else{
            console.log("======== CHAMADA DE PACIENTE ========")
            return console.log(`Paciente "${proximoNome}", de senha: ${senhaExibida}, por favor comparecer ao consultório.\n`);
        }

    }

}

let fila = new FilaDeAtendimento()

fila.entrarNaFila("Ana Souza")
fila.entrarNaFila("Carlos Lima")
fila.entrarNaFila("Beatriz Rocha")

fila.chamarProximo()
fila.chamarProximo()

fila.entrarNaFila("Diego Alves")

fila.chamarProximo()
fila.chamarProximo()
fila.chamarProximo()