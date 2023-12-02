import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { baseImageURL, options } from './../constants/constants';
import Loading from "../components/Loading";
import { Splide } from "@splidejs/react-splide";
import { SplideSlide } from "@splidejs/react-splide";
import { Link } from "react-router-dom";


axios.defaults.baseURL = "https://api.themoviedb.org/3"

const DetailPage = () => {
  // filmin id'sini alma
  const {id} = useParams();
  // filmin verileri
  const [movie,setMovie] = useState(null);
  // oyuncuların verisi
  const [cast,setCast] = useState(null);
  // öneriler verisi
  const [offer,setOffer] = useState(null);

  

  // url'deki id ye göre filmin verilerini al
  useEffect(() => {

  // filmin temel bilgilerini alır
   axios
   .get(`https://api.themoviedb.org/3/movie/${id}`,options)
   .then((res) => setMovie(res.data))   
   .catch((err) => console.log(err)) 
   
  // filmdeki kişilerin bilgilerini alır
  axios
   .get(`/movie/${id}/credits`,options)
   .then((res) => setCast(res.data.cast))   
   .catch((err) => console.log(err)) 

  // öneri verileri alır
  axios
  .get(`/movie/${id}/recommendations`,options)
  .then((res) => setOffer(res.data.results))   
  .catch((err) => console.log(err)) 
 

  },[]);

  console.log(offer)
  return (
    <div className="row ">
      {!movie ? (
        <Loading />
      ) : (
        <>

          {/* üst alan */}
          <div className="col-12 banner">
            <img
              className="w-100 h-100 object-fit-cover"
              src={baseImageURL.concat(movie.backdrop_path)}
            />
            <div className="banner-bg">
              <span >{movie.title}</span>
            </div>
          </div>
          
          {/* sol taraf */}
          <div className="col-md-6 mt-4 p-4">
          {/* şirketler */}
            <h3>Yapımcı Şirketler</h3>
            <div className="d-flex flex-wrap gap-4 ">
            {movie.production_companies.map((comp) => (
              <div className="bg-white rounded p-2 d-flex align-items-center">
                {comp.logo_path 
                ? (<img className="object-fit-contain" title={comp.name} width={100} height={50} src={baseImageURL.concat(comp.logo_path)} />)
                : (<p style={{ width:"100px", marginTop:"10px"}} className="text-black text-center fw-bold">{comp.name}</p>)
                }
                
              </div>
            ))}
            </div>
          {/* diller */}
          <h3 className="mt-4">Konuşulan Diller</h3>
          <div className="d-flex flex-wrap gap-4 ">
            {movie.spoken_languages.map((lang) => (
              <div className="bg-white rounded p-1 text-black ">
                <span>{lang.english_name}</span>
              </div>
            ))}
            </div>
          {/* ülkeler */}
          <h3 className="mt-4">Yapımcı Ülkeler</h3>
          <div className="d-flex flex-wrap gap-4 ">
            {movie.production_countries.map((country) => (
              <div className="bg-white rounded p-1 text-black ">
                <span>{country.name}</span>
              </div>
            ))}
            </div>
           </div>

           {/* sağ taraf */}
          <div className="col-md-6 mt-4 p-4">
          <p className="lead">{movie.overview}</p>

          <p className="d-flex flex-wrap"> <span className="fw-bold">Bütçe : </span>{movie.budget ? (movie.budget) :  <p> Bilinmiyor</p> } </p>
          <p className="d-flex flex-wrap"> <span className="fw-bold">Gelir : </span>{movie.revenue ? (movie.revenue) : <p> Bilinmiyor</p> } </p>
          </div>

          {/* kişiler */}
          <div className="col-12 mb-3 p-4">
            <h2>Oyuncular</h2>
          <Splide
        options={{
          height: "200px",
          gap: '10px', // elemanlar arası boşluk
          pagination: false, // alttaki noktaları kaldır
          autoWidth: true, // genişliklerine göre otomatik sığdır
        }}
      >
        {cast?.map((actor) => (
          <SplideSlide key={actor.cast_id}>
            <div className="actor-card h-100">
             <img
                className="movie"
                src={baseImageURL.concat(actor.profile_path)}
              />
            <p>
              <span>{actor.name}</span>
            </p>
            </div>
          </SplideSlide>
        ))}
      </Splide>
          </div>

          {/* öneriler */}
          <div className="col-12 mb-3 p-4">
            <h2>Öneriler</h2>
          <Splide
        options={{
          height: "200px",
          gap: '10px', // elemanlar arası boşluk
          pagination: false, // alttaki noktaları kaldır
          autoWidth: true, // genişliklerine göre otomatik sığdır
        }}
      >
        {offer?.map((other) => (
          <SplideSlide key={other.id}>
            <Link to={`/other/${other.id}`}>
            <div className="other-card h-100">
             <img
                className="movie"
                src={baseImageURL.concat(other.poster_path)}
              />
            </div>
            </Link>
          </SplideSlide>
        ))}
      </Splide>
          </div>

            
      </>
      )
      }
    </div>
  )
}

export default DetailPage