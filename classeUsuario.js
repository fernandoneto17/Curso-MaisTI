const prompt = require('prompt-sync')();
const fs = require('fs');

class Usuario{

    constructor(idUsuario, nomeUsuario, email, senha, interesses = []){
        this.idUsuario = idUsuario;
        this.nomeUsuario = nomeUsuario;
        this.email = email;
        this.senha = senha;
        this.interesses = interesses;
    }

}

class Categoria{
    
    constructor(idCategoria, nomeCategoria){
        this.idCategoria = idCategoria;
        this.nomeCategoria = nomeCategoria;
    }
}

class Item{

    constructor(idItem, nomeItem, descricaoItem, categoria, dono, situacao = 'disponível'){
        this.idItem = idItem;
        this.nomeItem = nomeItem;
        this.descricaoItem = descricaoItem;
        this.categoria = categoria;
        this.dono = dono;
        this.situacao = situacao;

    }
}

class Escambo{

    constructor(idEscambo, itemAReceber, itemAOfertar, idProponente, idDestinatario, situacao = "pedente"){
        this.idEscambo = idEscambo;
        this.itemAReceber = itemAReceber;
        this.itemAOfertar = itemAOfertar;
        this.idProponente = idProponente;
        this.idDestinatario = idDestinatario;
        this.situacao = situacao;

    }
}

class Sistema {
    constructor(){
        this.usuarios = [];
        this.categorias = [];
        this.proximoIdUsuario = 1;
        this.usuarioLogado = null;

        this.categorias.push(new Categoria(1, "Eletrônicos"));
        this.categorias.push(new Categoria(2, "Roupas e Acessórios"));
        this.categorias.push(new Categoria(3, "Livros e Revistas"));
        this.categorias.push(new Categoria(4, "Esportes e Lazer"));
    }

    pausar(){
        console.log("\n-------------------------------------------");
        prompt("Pressione ENTER para continuar...");
        console.clear();
    }

    posicaoDoEmail(email) {
        for(let i = 0; i < this.usuarios.length; i++){

            if(this.usuarios[i].email == email){
                return i;
            }
        }

        return -1;
    }

    cadastrarUsuario(nome, email, senha, interesses = []) {
         if(this.posicaoDoEmail(email) == -1){
            this.usuarios.push(new Usuario(this.proximoIdUsuario, nome, email, senha, interesses))
            this.proximoIdUsuario++;

            this.salvarArquivo();
            return "✅ Usuário cadastrado com sucesso!";
        }else{
            return "⚠️ Já existe um usuário cadastrado com esse e-mail.";
        }

    }

    login(email, senha) {

       if(this.posicaoDoEmail(email) == -1){
        return "⚠️ E-mail não cadastrado.";
       }else{
        if(this.usuarios[this.posicaoDoEmail(email)].senha != senha){
            return "⚠️ Senha incorreta.";
        }
       }

       this.usuarioLogado = this.usuarios[this.posicaoDoEmail(email)];
       return `✅ Bem-vindo(a), <${this.usuarios[this.posicaoDoEmail(email)].nomeUsuario}>!`;
    }

    logout() {
        this.usuarioLogado = null;
        return "Você saiu da conta."
    }   

    salvarArquivo(){
        const dadosUsuarios = [];

        for(let i = 0; i < this.usuarios.length; i++){
            dadosUsuarios.push({id: this.usuarios[i].idUsuario, nome: this.usuarios[i].nome, email: this.usuarios[i].email, senha: this.usuarios[i].senha, interesses: this.usuarios[i].interesses});
        }

        let dadosEmString = JSON.stringify(dadosUsuarios, null, 2);
        const arquivo = fs.writeFileSync('escambo.json', dadosEmString, 'utf-8');

        return arquivo;
    }

    carregar(){
        if(!fs.existsSync('./escambo.json')){
            return
        }else{
            const leituraArquivo = fs.readFileSync("escambo.json", 'utf-8');
            const objetoLeituraArquivo = JSON.parse(leituraArquivo);
            return objetoLeituraArquivo;
        }
    }
}

const sistema = new Sistema();
let opcao = -1;

console.clear();
console.log("\n===========================================");
console.log("      BEM-VINDO AO SISTEMA DE ESCAMBO      ");
console.log("===========================================");

while (opcao !== 0) {

    sistema.carregar();
    if (sistema.usuarioLogado === null) {

        console.log("\n---- MENU ----");
        console.log("1 - Criar conta");
        console.log("2 - Entrar");
        console.log("0 - Sair");
        console.log("-------------------------\n");

        opcao = parseInt(prompt("Escolha uma opção: "));

        switch (opcao) {
            case 1:
                const nomeCadastro = prompt("Nome: ");
                const emailCadastro = prompt("E-mail: ");
                const senhaCadastro = prompt("Senha: ");
                sistema.cadastrarUsuario(nomeCadastro, emailCadastro, senhaCadastro);
                sistema.pausar();
                break;
            case 2:
                const emailLogin = prompt("E-mail: ");
                const senhaLogin = prompt("Senha: ");
                sistema.login(emailLogin, senhaLogin);
                sistema.pausar();
                break;
            case 0:
                console.log("\nFinalizando o sistema... Até logo!\n");
                break;
            default:
                console.log("\n⚠️ Opção inválida! Tente novamente.");
                sistema.pausar();
                break;
        }

    } else {

        console.log("\n---- MENU (" + sistema.usuarioLogado.nome + ") ----");
        console.log("1 - Sair da conta");
        console.log("0 - Encerrar o sistema");
        console.log("-------------------------\n");

        opcao = parseInt(prompt("Escolha uma opção: "));

        switch (opcao) {
            case 1:
                sistema.logout();
                sistema.pausar();
                break;
            case 0:
                console.log("\nFinalizando o sistema... Até logo!\n");
                break;
            default:
                console.log("\n⚠️ Opção inválida! Tente novamente.");
                sistema.pausar();
                break;
        }
    }
}
