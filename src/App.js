import React from 'react';
import { Formik, Field, Form, useField } from 'formik';
import { TextField, Button, Checkbox, Radio, FormControlLabel } from "@material-ui/core"

const MeuRadio = ({label, ...props}) => {
  const [field, meta] = useField(props);
  //field.
  return (
    // <FormControlLabel value={field.value} onChange={field.onChange} control={<Radio />} label={label} />
    <FormControlLabel {...field} control={<Radio />} label={label} />
  )
}

function App() {
  return (
    <div>
    <Formik 
      initialValues={{ 
        Nome: '', 
        Sobrenome: '', 
        isActivated: false, 
        cookies: [], 
        yogurt: '' 
      }} 
      onSubmit={( data, { setSubmitting }) => {
        setSubmitting(true);
        // chamada assync
        console.log('submit: ', data);
        setSubmitting(false);
      }}
    >

      {({ values, isSubmitting }) => (
        <Form>
          <Field placeholder='Nome' name='Nome' type='input' as={TextField} />
          <div>
            <Field placeholder='Sobrenome' name='Sobrenome' type='input' as={TextField} />
          </div>
          <Field name="isActivated" type="checkbox" as={Checkbox} />
          <div>cookies:</div>
          <Field name="cookies" type="checkbox" value="gotas de chocolate" as={Checkbox} />
          <Field name="cookies" type="checkbox" value="frutas vermelhas" as={Checkbox} />
          <Field name="cookies" type="checkbox" value="nutella" as={Checkbox} />
          <div>yogurt: </div>
          <Field name="yogurt" type="radio" value="soja" as={Radio} />
          <Field name="yogurt" type="radio" value="maçã" as={Radio} />
          <Field name="yogurt" type="radio" value="blueberry" as={Radio} />
          <div>
            <Button disabled={isSubmitting} type="submit">
              Enviar
            </Button>
          </div>
          <pre>
            {JSON.stringify(values, null, 2)}
          </pre>
        </Form>
      )}
    </Formik>
    </div>
  );
};

export default App;
