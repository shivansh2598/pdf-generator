import { observable, action, decorate } from "mobx";

class DocumentStore {
  doucment = [];

  setDocuments(documents) {
    this.documents = documents;
  }
}

DocumentStore = decorate(DocumentStore, {
  documents: observalbe,
  setDocuments: action,
});

export { DocumentStore };

