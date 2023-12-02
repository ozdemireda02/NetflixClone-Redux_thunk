import axios from "axios"
import { options } from "../../constants/constants"
import { actionTypes } from "../actionTypes";

// baseURL belirleme
axios.defaults.baseURL = "https://api.themoviedb.org/3"

// popüler filmleri alacak ve store aktaracak
export const getPopular = () => (dispatch) => {
    axios
    .get("/movie/popular",options)
    .then((res) => dispatch({type:actionTypes.SET_MOVIES,payload:res.data.results}))
    .catch((err) => dispatch({type:actionTypes.SET_MOVIES_ERROR}));
};

// tür verilerini al ve store aktar
export const getGenres = () => (dispatch) => {
    axios
    .get("/genre/movie/list?language=en" , options)
    // api'den olumlu cevap gelirse türleri store 'a aktar
    .then((res) => dispatch({type:actionTypes.SET_GENRES,payload:res.data.genres}))
    // api'den olumsuz cevap gelirse store'u güncelle
    .catch((err) => dispatch({type:actionTypes.SET_GENRES_ERROR}));
    
};