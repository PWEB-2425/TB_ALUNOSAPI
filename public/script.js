// setup da interface

const botaoCria = document.getElementById("ca_cria");
botaoCria.addEventListener("click", criarAluno);

listarAlunos();


async function listarAlunos() {
    const url = "http://localhost:3000/alunos";

    const resposta = await fetch(url);
    console.log(resposta);

    const alunosJS = await resposta.json();
    console.log(alunosJS);

    let ulalunos = document.getElementById("listaA");
    console.log(ulalunos);
    ulalunos.innerHTML = "";

    for (aluno of alunosJS) {

        let novoli = document.createElement("li");
        novoli.innerHTML = aluno.nome + " " + aluno.curso;
        let novob = document.createElement("button");
        novob.setAttribute("data-alunoid", aluno.id);
        novob.innerHTML = "remover";
        novob.addEventListener("click", apagarAluno);
        novoli.appendChild(novob);
        ulalunos.appendChild(novoli);
    }
}

async function criarAluno() {
    const url = "http://localhost:3000/alunos";

    const alunoJS = {};

    alunoJS.nome = document.getElementById("ca_nome").value;
    alunoJS.curso = document.getElementById("ca_curso").value;
    console.log(alunoJS);
    alunoJSON = JSON.stringify(alunoJS);
    console.log(alunoJSON);

    const resposta = await fetch(url, { method: "POST", body: alunoJSON });

    listarAlunos();

}
    
async function apagarAluno(evento) {

    const botaoclicado = evento.target;
    const idaluno = botaoclicado.dataset.alunoid;
    url = "http://localhost:3000/alunos/" + idaluno;
    const resposta = await fetch(url, { method: "DELETE" });
    listarAlunos();

}