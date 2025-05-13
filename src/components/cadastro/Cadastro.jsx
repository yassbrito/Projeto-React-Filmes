import "./Cadastro.css";
import Botao from "../botao/Botao";

const Cadastro = (props) => {
    return(
        <section className="section_cadastro">
            <form onSubmit={props.funcCadastro}  action="" className="layout_grid from_cadastro">
                <h1>{props.tituloCadastro}</h1>
                <hr/>
                <div className="campos_cadastro">
                    <div className="campo_cad_nome">
                        <label htmlFor="nome">Nome</label>
                        <input 
                        type="text" 
                        name="Nome" 
                        placeholder={`Digite o nome do ${props.placeholder}`}
                        value={props.valorInput}
                        //ao mudar o input algo acontece:
                            //atualizar o estado do pai ao digitar 
                        onChange={(e) => props.setValorInput(e.target.value)}
                        />
                    </div>
                    <div className="campo_cad_genero" style={{display:props.visibilidade}}>
                        <label htmlFor="genero">Gênero</label>
                        <select name="genero" id="">
                        <option value="" disable selected>Selecione</option>
                        <option value="">op 1</option>
                        <option value="">op 2</option>
                        <option value="">op 3</option>

                        </select>
                    </div>
                    <Botao nomeDoBotao="Cadastrar😆✌️"/>
                </div>
            </form>
        </section>
    )
}

export default Cadastro;