import React from 'react';
import { Formik, Field, Form, useField, FieldArray } from 'formik';
import { TextField, Button, Checkbox, Radio, FormControlLabel, Select, MenuItem } from "@material-ui/core"
import './App.css';
import * as yup from "yup";

function MyRadio({ label, ...props }) {
  const [field] = useField(props);
  return <FormControlLabel {...field} control={<Radio />} label={label} />;
};

function MyTextField({placeholder, ...props}) {
  const [field, meta] = useField(props);
  const textErro = meta.error && meta.touched ? meta.error : "";
  return (
    <TextField 
      placeholder={placeholder}
      {...field} 
      helperText={textErro}
      error={!!textErro}
    />
  );
};

const validaDados = yup.object({
  Nome: yup
    .string()
    .required()
    .max(15),
  pets: yup.array().of(
    yup.object({
      name: yup.string().required()
    })
  )
});

function App() {
  return (
    <div alignItens="center">
    <Formik 
    validateOnChange={true}
      initialValues={{ 
        Nome: '', 
        Sobrenome: '', 
        isActivated: false, 
        cookies: [], 
        yogurt: '',
        pets: [{type: 'cachorro', name: 'chico', id: '' + Math.random() }] 
      }} 
      validaDados={validaDados}
      onSubmit={( data, { setSubmitting }) => {
        setSubmitting(true);
        console.log('submit: ', data);
        setSubmitting(false);
      }}
    >

      {({ values, erros, isSubmitting }) => (
        <Form>
          <Field placeholder="Nome" name="Nome" />
          <div>
            <Field placeholder="Sobrenome" name="Sobrenome" type="input" as={TextField} />
          </div>
          <Field name="isActivated" type="checkbox" as={Checkbox} />
          <div>cookies:</div>
          <Field name="cookies" type="checkbox" value="gotas de chocolate" as={Checkbox} />
          <Field name="cookies" type="checkbox" value="frutas vermelhas" as={Checkbox} />
          <Field name="cookies" type="checkbox" value="nutella" as={Checkbox} />
          
          <div>yogurt: </div>
          <MyRadio name="yogurt" type="radio" value="soja" label="soja" />
          <MyRadio name="yogurt" type="radio" value="maçã" label="maçã" />
          <MyRadio name="yogurt" type="radio" value="blueberry" label="blueberry" />
          
          <FieldArray name="pets">
            {arrayHelpers => (
              <div>
                <Button onClick={() => 
                  arrayHelpers.push({
                    type: '🐻', 
                    name: '',
                    id: '' + Math.random()
                  })
                }
              >
                add pet
              </Button>
              {values.pets.map((pet, index) => {
                return (
                  <div key={pet.id}>
                    <MyTextField placeholder="Nome do Pet" name={`pets.${index}.name`} />
                    <Field name={`pets.${index}.type`} type="select" as={Select}>
                      <MenuItem value="lobo">Lobo</MenuItem>
                      <MenuItem value="urso">Urso</MenuItem>
                      <MenuItem value="tigre">Tigre</MenuItem>
                    </Field>
                    <Button onClick={() => arrayHelpers.remove(index)}>
                      x
                    </Button>
                  </div>
                );
              })}
              </div>
            )}
          </FieldArray>

          <div>
            <Button disabled={isSubmitting} type="submit">
              Enviar
            </Button>
          </div>

          <pre>{JSON.stringify(values, null, 2)}</pre>
          <pre>{JSON.stringify(erros, null, 2)}</pre>
        </Form>
      )}
    </Formik>
    </div>
  );
};

export default App;
