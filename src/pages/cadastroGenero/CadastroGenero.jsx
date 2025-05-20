import { useEffect, useState } from "react";

import api from "../../Services/services";

//importar o sweet alert:
import Swal from "sweetalert2";

//importacao e componentes
import Cadastro from "../../components/cadastro/Cadastro";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import Lista from "../../components/lista/Lista";


//function() = {} funcao
//() => {} funcao anonima ou arrow function
//------------------ funcao ---- dependencia
//hooks: useEffect( () => {} ,        []     )

const CadastroGenero = () => {
    //nome do genero
    //so criamos useStates quando precisamos guardar uma informaçao que muda e que o react
    const [genero, setGenero] = useState("");
    const [listaGenero, setListaGenero] = useState([]);
    const [excluirGenero, setExcluirGenero] = useState([]);

    function alertar(icone, mensagem) {
        const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.onmouseenter = Swal.stopTimer;
                toast.onmouseleave = Swal.resumeTimer;
            }
        });
        Toast.fire({
            icon: icone,
            title: mensagem
        });
    }
    async function cadastrarGenero(evt) {
        evt.preventDefault();
        //verificar se o input esta vindo vazio
        // ".trim()" = remove os espaços em branco
        if (genero.trim() != "") {
            //try => tentar(o esperado)
            //catch => pega a exceçao
            try {
                //cadastrar um genero: post
                await api.post("genero", { nome: genero });
                alertar("success", "Cadastro realizado com sucesso!")
                setGenero("");

                listarGenero();
            } catch (error) {
                alertar("error", "Erro! Entre em contato com o suporte!")
                console.log(error);
            }
        } else {
            alert("o campo precisa estar preenchido")
        }

    }

    //sincrono => acontece simultaneamente.
    //assincrono => esperar algo/resposta para ir para outro bloco do codigo.
    async function listarGenero() {
        try {
            //await => Aguarde ter uma respostada solicitacao
            const resposta = await api.get("genero");
            //   console.log(resposta);
            setListaGenero(resposta.data);
        } catch (error) {
            console.log(error);

        }
    }


    //funcao de excluir o genero:
    async function deletarGenero(generoId) {
        try {

            Swal.fire({
                title: "Você tem certeza?",
                text: "Você não conseguira reverter!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Sim, deletar!"
            }).then(async (result) => {
                if (result.isConfirmed) {
                    await api.delete(`genero/${generoId.idGenero}`);
                    Swal.fire({
                        title: "Deletado!",
                        text: "Seu item foi deletado!",
                        icon: "success"
                    });
                }
            });
            listaGenero();
        } catch (error) {
            console.log(error);
        }
    }

    async function editarGenero(generoId) {
        console.log(generoId);
        const { value: novoGenero } = await Swal.fire({
            title: "Modifique seu gênero",
            input: "text",
            inputLabel: "Novo Gênero",
            inputValue: generoId.nome,
            showCancelButton: true,
            inputValidator: (value) => {
                if (!value) {
                    return "O campo precisa estar preenchido!";
                }
            }
        });
        if (novoGenero) {
            try {
                // console.log(genero.nome);
                // console.log(novoGenero);
                api.put(`genero/${generoId.idGenero}`, {nome: novoGenero});
                Swal.fire(`O genero modificado ${novoGenero}`);
            } catch (error) {
                console.log(error);
            }
            // Swal.fire(`O gênero modifcado ${novoGenero}`);
        }
    }

    //teste: validar o genero
    // useEffect(() =>{
    //     console.log(genero);
    // },[genero]);

    //fim do teste


    useEffect(() => {
        listarGenero();
    }, [listaGenero]);

    return (
        <>
            <Header />
            <main>
                <Cadastro
                    tituloCadastro="Cadastro de Gênero"
                    visibilidade="none"
                    placeholder="gênero"


                    //atribuindo a funcao:
                    funcCadastro={cadastrarGenero}

                    //atribuindo o valor input:
                    valorInput={genero}

                    //atribuindo a funcao que atualiza o meu genero:
                    setValorInput={setGenero}
                />
                <Lista
                    tituloLista="Lista de Gênero"
                    visibilidade="none"

                    //atribuir para lista, o meu estado atual:
                    lista={listaGenero}

                    funcExcluir={deletarGenero}
                    funcEditar={editarGenero}
                />
            </main>
            <Footer />
        </>
    )
}

export default CadastroGenero;