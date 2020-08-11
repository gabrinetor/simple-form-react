import React from 'react';
import { Formik, Field } from 'formik';
import { TextField, Button } from "@material-ui/core"

function App() {
  return (
    <div>
      <Formik initialValues={{ Nome: '', Sobrenome: '' }} 
      onSubmit={( data, { setSubmitting }) => {
        setSubmitting(true);
        // chamada assync
        console.log('submit: ', data);
        setSubmitting(false);
      }}
      >
        {({ values, isSubmitting, handleChange, handleBlur, handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <Field name='Nome' type='input' as={TextField} />
            <TextField 
              name="Nome" 
              value={values.Nome} 
              onChange={handleChange} 
              onBlur={handleBlur} 
            />
            <TextField 
              name="Sobrenome" 
              value={values.Sobrenome} 
              onChange={handleChange} 
              onBlur={handleBlur} 
            />
            <Button type="submit">Enviar</Button>
            <pre>
              {JSON.stringify(values, null, 2)}
            </pre>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default App;
