import "./Lista.css";
import Editar from "../../assets/img/pen-to-square-solid.svg";
import Excluir from "../../assets/img/trash-can-regular.svg";
const Lista = (props) => {
    return(
        <section className="layout_grid listagem">
            <h1>{props.tituloLista}</h1>
            <hr/>
            <div className="tabela">
                <table>
                    <thead>
                        <tr className="table_cabecalho">
                            <th>Nome</th>
                            <th style={{display:props.visibilidade}}>Gênero </th>
                            <th>Editar</th>
                            <th>Excluir</th>
                        </tr>
                    </thead>
                    <tbody>

                        {/* verificar se a letra esta vindo vazia */}
                        {props.lista && props.lista.length > 0 ? (
                            //vamos mapear os itens da lista
                            props.lista.map((item) => (
                                //dando um identificador para cada linha da lista
                            <tr className="item_lista" key={item.idGenero}>
                            <td data-cell="Nome">
                                {item.nome}
                            </td>
                            <td data-cell="Genero" style={{display:props.visibilidade}}>Açao</td>
                            <td data-cell="Editar"><img src={Editar} alt="Caneta"/></td>
                            <td>
                                <button onClick={() => props.funcExcluir(item)} className="botao_Excluir" data-cell="Excluir"><img src={Excluir} alt="Lixeira"/></button>
                            </td>
                        </tr>
                          ))
                        ) :
                        (
                            <p>Nenhum genero foi encontrado.</p>
                        )
                    }
                    </tbody>
                </table>
            </div>
        </section>
    )
}

export default Lista;