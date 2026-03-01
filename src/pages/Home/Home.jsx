import { useEffect, useState } from "react";
import api from "../../services/api";
import { Link } from "react-router-dom";
import "./home.css";

function Home() {
  const [filmes, setFilmes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadFilmes() {
      const response = await api.get("movie/now_playing", {
        params: {
          api_key: "95e3ca8fcbda1be5519be4a7f9acb283",
          language: "pt-BR",
          page: 1,
        },
      });

      setFilmes(response.data.results.slice(0, 15));
      setLoading(false);
    }
    loadFilmes();
    
  }, []);

  if(loading){
    return(
        <div className="loading">
            <h2>Carregando filmes...</h2>
            </div>
    )
  }
  return (
    <div className="container">
      {filmes.map((filme) => {
        return (
          <div className="lista-filmes">
            <article className="detalhes-filme" key={filme.id}>

              <img
                src={`https://image.tmdb.org/t/p/w500/${filme.poster_path}`}
                alt={filme.title}
              />
              <Link to={`/filme/${filme.id}`}>Acessar</Link>
            </article>
          </div>
        );
      })}
    </div>
  );
}

export default Home;
