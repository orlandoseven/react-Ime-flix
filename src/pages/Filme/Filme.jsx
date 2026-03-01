import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../services/api";
import "./filme.css";
import{toast} from 'react-toastify';

function Filme() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [filme, setFilme] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadFilme() {
      await api
        .get(`/movie/${id}`, {
          params: {
            api_key: "95e3ca8fcbda1be5519be4a7f9acb283",
            language: "pt-BR",
            append_to_response: "videos",
          },
        })
        .then((response) => {
          setFilme(response.data);
          setLoading(false);
        })
        .catch(() => {
          console.log("filme não encontrado");
          navigate("/", { replace: true });
          return;
        });
    }
    loadFilme();

    return () => {
      console.log("componente desmontado");
    };
  }, [navigate, id]);

  const salvarFilme = ()=>{
    const minhaLista = localStorage.getItem("@primeflix");
    let filmeSalvos = JSON.parse(minhaLista) || [];

    const hasFilme = filmeSalvos.some((filmeSalvo)=> filmeSalvo.id === filme.id
    );

    if(hasFilme){
    toast.warn("Esse Filme já esta na lista");
    return;
  }

  filmeSalvos.push(filme);
  localStorage.setItem("@primeflix",JSON.stringify(filmeSalvos));
  toast.success("Filme salvo com sucesso!");

  }
  



  if (loading) {
    return (
      <div className="loading">
        <h1>Carregando...</h1>
      </div>
    );
  }

  return (
    <div className="filme-detalhe">
      <h1>{filme.title}</h1>
      <img
        src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`}
        alt={filme.title}
      />
      <h3>Sinopse</h3>
      <span>{filme.overview}</span>
      <strong>Avaliação: {filme.vote_average}</strong>

      <div className="area-buttons">
        <button onClick={salvarFilme}>Salvar</button>
        <button>
          {(() => {
            // procura trailer oficial no resultado de vídeos (TMDB)
            const results = filme.videos?.results || [];
            let trailer = results.find(
              (v) => v.site === "YouTube" && v.type === "Trailer" && v.type === "Oficial",
            );
            if (!trailer) {
              trailer = results.find(
                (v) => v.site === "YouTube" && v.type === "Trailer",
              );
            }

            const href = trailer
              ? `https://www.youtube.com/watch?v=${trailer.key}`
              : `https://youtube.com/results?search_query=${encodeURIComponent(filme.title + " trailer")}`;

            return (
              <a href={href} target="_blank" rel="noreferrer">
                Trailer
              </a>
            );
          })()}
        </button>
      </div>
    </div>
  );
}

export default Filme;
