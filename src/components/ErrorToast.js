import React from "react";
import { MdErrorOutline } from "react-icons/md";
import PropTypes from "prop-types";

const ErrorToast = ({ error, errorMessage }) => {
  return (
    <div className={`error-toast ${error ? "show" : ""}`}>
      <MdErrorOutline /> <p>{errorMessage}</p>
    </div>
  );
};

ErrorToast.propTypes = {
  error: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string.isRequired,
};

export default ErrorToast;
