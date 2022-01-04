import { FormControl, FormErrorMessage, FormHelperText, FormLabel, Input } from "@chakra-ui/react";
import { Field } from "formik";
import React from "react";


interface ChakraFieldProps {
  name: string;
  label: string;
  placeholder?: string;
  inputType?: string;
  required?: boolean;
  helperText?: string;
  inputRest?: object;
}

const ChakraField = ({ name, label, placeholder = '', inputType = 'text', required = true, helperText = '', inputRest={} }: ChakraFieldProps) => (
  <Field name={name}>
    {({ field, form }) => (
      <FormControl isInvalid={form.errors[name] && form.touched[name]}>
        <FormLabel htmlFor={name}>{label}</FormLabel>
        <Input {...field} type={inputType} id={name} placeholder={placeholder} isRequired={required} autoComplete={label} {...inputRest}/>
        {helperText && <FormHelperText>{helperText}</FormHelperText>}
        {form.errors[name] && <FormErrorMessage>{form.errors[name]}</FormErrorMessage>}
      </FormControl>
    )}
  </Field>
);

export default ChakraField;