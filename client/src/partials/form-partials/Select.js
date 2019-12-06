import React from "react";
import styled from "styled-components";
import { useField } from "formik";

// Styled components ....
const StyledSelect = styled.select``;

const StyledErrorMessage = styled.div``;

const StyledLabel = styled.label``;

const MySelect = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <>
      <StyledLabel htmlFor={props.id || props.name}>{label}</StyledLabel>
      <StyledSelect {...field} {...props} />
      {meta.touched && meta.error ? (
        <StyledErrorMessage>{meta.error}</StyledErrorMessage>
      ) : null}
    </>
  );
};

export default MySelect;
