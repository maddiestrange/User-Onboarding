import React from 'react';
import { withFormik, Form, Field } from "formik";

function Forms(){
    return(
    <Form>
    <Field type='text' name='username' placeholder='Username'/>
    <button>Submit!</button>
    </Form>
    )
}

export default Forms;