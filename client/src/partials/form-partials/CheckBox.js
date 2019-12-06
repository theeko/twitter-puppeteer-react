import React from "react";
import styled from "styled-components";
import { useField } from "formik";

// Styled components ....
const StyledInput = styled.input``;

const StyledErrorMessage = styled.div``;

const StyledLabel = styled.label``;

const MyCheckbox = ({ children, ...props }) => {
  // We need to tell useField what type of input this is
  // since React treats radios and checkboxes differently
  // than inputs/select/textarea.
  const [field, meta] = useField({ ...props, type: "checkbox" });
  return (
    <>
      <StyledLabel className="checkbox">
        <StyledInput type="checkbox" {...field} {...props} />
        {children}
      </StyledLabel>
      {meta.touched && meta.error ? (
        <StyledErrorMessage className="error">{meta.error}</StyledErrorMessage>
      ) : null}
    </>
  );
};

export default MyCheckbox;
