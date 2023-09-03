import axios from "axios";

export const recibimientosApi = axios.create({
    baseURL: '/api'
})