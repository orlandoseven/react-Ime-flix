import './favoritos.css';
import { Link } from 'react-router-dom';
import {useEffect,useState} from 'react';
import {toast} from 'react-toastify';

function Favoritos(){

    const [filmes,setFilmes] = useState([]);

    useEffect(()=>{
        const minhaLista = localStorage.getItem("@primeflix");
        setFilmes(JSON.parse(minhaLista) || [])
    },[]);

    function removerFilme(id){
        let filtroFilmes = filmes.filter((item) =>{
            return (item.id !== id)
        })
        setFilmes(filtroFilmes);
        localStorage.setItem("@primeflix", JSON.stringify(filtroFilmes));
        toast.success("Filme removido com sucesso!")
    }


    return(
        <div className='filmes-favoritos'>
            <h1>Meus filmes Favoritos</h1>
            {filmes.length === 0 && <p className='span-semFilme'>Você não possui filmes salvos!</p>}

            <ul>
                {filmes.map((item) =>{
                    return(
                        <li key={item.id}>
                            <span>{item.title}</span>
                            <div>
                            <Link to={`/filme/${item.id}`}>Ver Detalhes</Link>
                            <button onClick={() => removerFilme(item.id)}>Remover</button>
                            </div>
                        </li>
                    )
                })}
            </ul>

        </div>
    )
}

export default Favoritos;