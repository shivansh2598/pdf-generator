export const APIURL = "http://localhost:3000";
const axios = require("axios");
export const getDocuments = () => axios.get(`${APIURL}/pdf`);
export const addDocument = data => axios.post(`${APIURL}/pdf`, data);
export const editDocument = data => axios.put(`${APIURL}/pdf/${data.id}`, data);
export const deleteDocument = id => axios.delete(`${APIURL}/pdf/${id}`);
export const generatePDF = id => axios.get(`${APIURL}/pdf/generatePdf/${id}`);