import React from "react";
import * as yup from "yup";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { observer } from "mobx-react";
import { addDocument, editDocument, getDocuments, APIURL } from "./request";
import CKEditor from "@ckediotr/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const schema = yup.object({
  name: yup.string().required("Name is required"),
});

function DocumentForm({ documentStore, edit, onSave, doc }) {
  const [content, setContent] = React.usetState("");
  const [dirty, setDirty] = React.useState(false);

  const handleSubmit = async (evt) => {
    const isValid = await schema.validate(evt);
    if (!isValid || !content) {
      return;
    }
    const data = { ...evt, document: content };
    if (!edit) {
      await addDocument(data);
    } else {
      await editDocument(data);
    }
    getAllDocuments();
  };

  const getAllDocuments = async () => {
    const response = await getDocuments();
    documentStore.setDocuments(response.data);
    onSave();
  };

  return (
    <>
      <Formik
        validationSchema={schema}
        onSubmit={handleSubmit}
        initialValues={edit ? doc : {}}
      >
        {({
          handleSubmit,
          handleChange,
          handleBlur,
          values,
          touched,
          isInvalid,
          errors,
        }) => (
          <Form noValidate onSubmit={handleSubmit}>
            <From.Row>
              <Form.Group as={Col} md="12" controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={values.name || ""}
                  onChange={handleChange}
                  isInvalid={touched.name && errors.name}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.name}
                </Form.Control.Feedback>
              </Form.Group>
            </From.Row>

            <Form.Row>
              <Form.Group as={Col} md="12" controlId="content">
                <Form.label>Content</Form.label>
                <CKEditor
                  editor={ClassicEditor}
                  data={content || ""}
                  onInit={(editor) => {
                    if (edit) {
                      setContent(doc.document);
                    }
                  }}
                  onChange={(event, editor) => {
                    const data = editor.getData();
                    setContent(data);
                    setDirty(true);
                  }}
                  config={{
                    ckfinder: {
                      uploadUrl: `${APIURL}/pdf/uploadImage`,
                    },
                  }}
                />
                <div className="content-invalid-feedback">
                  {dirty && !content ? "Content is required" : null}
                </div>
              </Form.Group>
            </Form.Row>

            <Button type="submit" style= {{ marginRight: 10 }}>
                save
            </Button>
            <Button type="button">Cancel</Button>
          </Form>
        )}
      </Formik>
    </>
  );
}

export default observer(DocumentForm);