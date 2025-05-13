import { useEffect, useState } from "react";

import api from "../../Services/services";

//importar o sweet alert:
import Swal from "sweetalert2";

//importacao e componentes
import Cadastro from "../../components/cadastro/Cadastro";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import Lista from "../../components/lista/Lista";


const CadastroGenero = () => {
    //nome do genero
    const [genero, setGenero] = useState("");

    function alerta(icone, mensagem){
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
                alerta("Sucess", "Cadastro realizado com sucesso!")
                setGenero("");
            } catch (error) {
                alerta("Error", "Erro! Entre em contato com o suporte!")
                console.log(error);
            }
        } else {
            alert("o campo precisa estar preenchido")
        }

    }

    //teste: validar o genero
    // useEffect(() =>{
    //     console.log(genero);
    // },[genero]);

    //fim do teste

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
                />
            </main>
            <Footer />
        </>
    )
}

export default CadastroGenero;