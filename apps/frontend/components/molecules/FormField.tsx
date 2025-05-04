import React from 'react';
import { TextField, TextFieldProps } from '@mui/material';

interface FormFieldProps extends TextFieldProps {
  // Additional props if needed
}

const FormField: React.FC<FormFieldProps> = (props) => {
  return <TextField fullWidth margin="normal" {...props} />;
};

export default FormField;