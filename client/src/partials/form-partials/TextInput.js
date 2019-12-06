import React from "react";
import styled from "styled-components";
import { useField } from "formik";

// Styled components ....
const StyledInput = styled.input``;

const StyledErrorMessage = styled.div``;

const StyledLabel = styled.label``;

const MyTextInput = ({ label, ...props }) => {
  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  // which we can spread on <input> and also replace ErrorMessage entirely.
  const [field, meta] = useField(props);
  return (
    <>
      <StyledLabel htmlFor={props.id || props.name}>{label}</StyledLabel>
      <StyledInput className="text-input" {...field} {...props} />
      {meta.touched && meta.error ? (
        <StyledErrorMessage className="error">{meta.error}</StyledErrorMessage>
      ) : null}
    </>
  );
};

export default MyTextInput;
