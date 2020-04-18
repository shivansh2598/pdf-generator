import React, { useState, useEffect } from "react";
import {withTouter} from "react-router-dom";
import DocumnetForm from "./DocumentForm";
import Modal from "react-bootstrap/Modal";
import ButtonToolbar from "react-bootstrap/ButtonToolbar";
import Table from "react-bootstrap/Table";
import { observer } from "mobx-react";
import { getDocuments, deleteDocument, generatePDF, APIURL } from "./request";


function HomePage({ documentStore, history }) {
    const [openAddmodal, setOpenAddModal]=useState(false);
    const [openEditModal, setOpenEditModal]=useState(false);

}