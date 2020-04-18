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
    const [initialized, setInitialized]=useState(false);
    const [doc, setDoc]=useState([]);

    const openAddTemplateModal =()=>{
        setOpenAddModal(true);
    }
    const closeAddModal = ()=>{
        setOpenAddModal(false);
        setOpenEditModal(false);
    }

    const cancelAddModal = () => {
        setOpenAddModal(false);
    }

    const cancelEditModal = () => {
        setOpenEditModal(false);
    }

    const onSave = () => {
        cancelAddModal();
        cancelEditModal();
    }

    const generateSinglePdf = async id => {
        await generatePDF(id);
        alert("PDF Generated");
        getAllDocuments();
    }

    useEffect(() => {
        if(!initialized){
            getAllDocuments();
        }
    })

    return (
        <div className="page">
          <h1 className="text-center">Documents</h1>
          <ButtonToolbar onClick={openAddTemplateModal}>
            <Button variant="primary">Add Document</Button>
          </ButtonToolbar>
          <Modal show={openAddModal} onHide={closeAddModal}>
            <Modal.Header closeButton>
              <Modal.Title>Add Document</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <DocumentForm
                onSave={onSave.bind(this)}
                cancelModal={cancelAddModal.bind(this)}
                documentStore={documentStore}
              />
            </Modal.Body>
          </Modal>
          <Modal show={openEditModal} onHide={cancelEditModal}>
            <Modal.Header closeButton>
              <Modal.Title>Edit Document</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <DocumentForm
                edit={true}
                doc={doc}
                onSave={onSave.bind(this)}
                cancelModal={cancelEditModal.bind(this)}
                documentStore={documentStore}
              />
            </Modal.Body>
          </Modal>
          <br />
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Name</th>
                <th>PDF</th>
                <th>Generate PDF</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {documentStore.documents.map(d => {
                return (
                  <tr key={d.id}>
                    <td>{d.name}</td>
                    <td>
                      <a href={`${APIURL}/${d.pdfPath}`} target="_blank">
                        Open
                      </a>
                    </td>
                    <td>
                      <Button
                        variant="outline-primary"
                        onClick={generateSinglePdf.bind(this, d.id)}
                      >
                        Generate PDF
                      </Button>
                    </td>
                    <td>
                      <Button
                        variant="outline-primary"
                        onClick={editTemplate.bind(this, d)}
                      >
                        Edit
                      </Button>
                    </td>
                    <td>
                      <Button
                        variant="outline-primary"
                        onClick={deleteSingleDocument.bind(this, d.id)}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </div>
      );
    }
    export default withRouter(observer(HomePage));