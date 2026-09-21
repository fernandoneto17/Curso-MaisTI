const prompt = require('prompt-sync')();

class Aluno {
    constructor(nome, anoEscolar, notasPort = [], notasMat = []){
        this.nome = nome;
        this.anoEscolar = anoEscolar;
        this.notasPort = notasPort;
        this.notasMat = notasMat;
        this.mediaFinal;
    }

    addNota(nota, disciplina){
        if(disciplina.toLowerCase() == "português" || disciplina.toLowerCase() == "portugues"){
            this.notasPort.push(Number(nota));
            this.calcularMediaFinal();
        }else if(disciplina.toLowerCase() == "matemática" || disciplina.toLowerCase() == "matematica"){
            this.notasMat.push(Number(nota));
            this.calcularMediaFinal();
        }else{
            console.log("Matéria indisponível. Aceitamos apenas Matemática e Português.")
        }
    }

    calcularMedia(disciplina){
        let soma = 0
        let media;

        if(disciplina.toLowerCase() == "português" || disciplina.toLowerCase() == "portugues"){
            for(let i = 0; i < this.notasPort.length; i++){
                soma += this.notasPort[i];
        }
        media = soma/this.notasPort.length;

       }else if(disciplina.toLowerCase() == "matemática" || disciplina.toLowerCase() == "matematica"){
            for(let i = 0; i < this.notasMat.length; i++){
                soma += this.notasMat[i];
       }
       media = soma/this.notasMat.length;
       
    }

    return media;

}

    calcularMediaFinal(){
        this.mediaFinal = (this.calcularMedia("portugues") + this.calcularMedia("matematica"))/ 2
        return this.mediaFinal;
    }

    boletim(){
        console.log(`Notas em Matemática do aluno ${this.nome}:`)

        for(let nota of this.notasMat){
            console.log(nota);
        }

        console.log(`A média do aluno ${this.nome} em Matemática foi ${this.calcularMedia("matematica")}.`)

        console.log(`Notas em Português do aluno ${this.nome}:`)

        for(let nota of this.notasPort){
            console.log(nota);
        }

        console.log(`A média do aluno ${this.nome} em Português foi ${this.calcularMedia("portugues")}.`)

        this.calcularMediaFinal();
        console.log(`A média final do aluno ${this.nome} foi ${this.mediaFinal}`);
    }

}

class Turma{

    constructor(nomeTurma, alunos = []){
        this.nomeTurma = nomeTurma;
        this.alunos = alunos;
    }

    bubbleSort(lista){
        for(let i = 0; i < lista.length - 1; i++){
            for(let j = 0; j < lista.length - 1 - i; j++){
                if(lista[j + 1].media > lista[j].media){
                    [lista[j + 1], lista[j]] = [lista[j], lista[j + 1]];
            }
            }
        }

        return lista;
    }
    
    criarRanking(disciplina){
        let listaAlunos = []
        if(disciplina.toLowerCase() == "matematica" || disciplina.toLowerCase() == "matemática"){
               for (let aluno of this.alunos) {
            listaAlunos.push({
                nome: aluno.nome,
                media: Number(aluno.calcularMedia(disciplina).toFixed(1))
        });
    }   
        console.log(this.bubbleSort(listaAlunos))

        return listaAlunos;
    }
}
}

let aluno1 = new Aluno("João", "8 ano", [4, 6, 4, 10], [5, 10, 7, 10])
let aluno2 = new Aluno("Maria", "8 ano")
aluno2.addNota(10, "matematica");
aluno2.addNota(8, "matematica");
aluno2.addNota(9, "matematica");
aluno2.addNota(7, "matematica");
let turma = new Turma("8 ano")
turma.alunos.push(aluno1);
turma.alunos.push(aluno2);
turma.criarRanking("matematica")