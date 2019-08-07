import React, { useEffect, useState } from 'react';
import { withFormik, Form, Field } from "formik";
import * as Yup from 'yup';
import axios from 'axios';

function Forms({values, errors, touched, status}){
    const [users, setUsers] = useState([{name: 'Maddie'}])

    useEffect(()=>{
    console.log('infinite looping?')
    if(status){
        setUsers([...users, status])
    }
    }, [status])

    return(
    <div className="App">
    <Form>
        <Field type='text' name='name' placeholder='Name'/>

        <Field type="email" name="email" placeholder="Email" />
        {touched.email && errors.email && <p>{errors.email}</p>}

        <Field type="password" name="password" placeholder="Password" />
        {touched.password && errors.password && <p>{errors.password}</p>}
     
        <label className='checkbox-container'>
            Accept TOS
            <Field type="checkbox" name="tos" checked={values.tos} />
        </label>
        <button type='submit'>Submit!</button>
    </Form>


    {users.map(user => {
      return ( 
        <p key={user.id}>{user.name}</p>
      )})}
    </div>
    )
}

const FormikForms = withFormik({
    mapPropsToValues({name, email, password, tos}){
        return{
            name: name || '',
            email: email || '',
            password: password || '',
            tos: tos || false
        }
    },

    validationSchema: Yup.object().shape({
        name:  Yup.string()
        .required('Name is required'),
        email: Yup.string()
        .email('Email not valid')
        .required('Email is required'),
        password: Yup.string()
        .min(6, 'Password must be 6 characters or longer')
        .required('Password is required'),
        tos: Yup.bool().oneOf([true], 'Field must be checked')
    }),


    handleSubmit(values, { resetForm, setErrors, setSubmitting, setStatus }) {
        if (values.email === "alreadytaken@atb.dev") {
          setErrors({ email: "That email is already taken" });
        } else {
          axios
            .post("https://reqres.in/api/users", values)
            .then(res => {
              console.log(res);
              resetForm();
              setSubmitting(false);
              setStatus(res.data);
            })
            .catch(err => {
              console.log(err);
              setSubmitting(false);
            });
        }
      }
})(Forms);

export default FormikForms;