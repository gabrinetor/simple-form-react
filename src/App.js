import React from 'react';
import { Formik, Field } from 'formik';
import { TextField, Button } from "@material-ui/core"

function App() {
  return (
    <div>
    <Formik 
      initialValues={{ Nome: '', Sobrenome: '' }} 
      onSubmit={( data, { setSubmitting }) => {
        setSubmitting(true);
        // chamada assync
        console.log('submit: ', data);
        setSubmitting(false);
      }}
    >
      {({ values, isSubmitting, handleChange, handleBlur, handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <Field placeholder='Nome' name='Nome' type='input' as={TextField} />
          <Field placeholder='Sobrenome' name='Sobrenome' type='input' as={TextField} />
          <div>
            <Button disabled={isSubmitting} type="submit">
              Enviar
            </Button>
          </div>
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
