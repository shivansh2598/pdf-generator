import React from "react";
import * as yup from "yup";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { observer } from "mobx-react";
import { addDocument, editDocument, getDocuments, APIURL } from "./request";
import CKEditor from "@ckediotr/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const schema = yup.object({
    name: yup.string().required("Name is required")
});

