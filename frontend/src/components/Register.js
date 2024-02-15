import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { register } from "../slices/auth";
import { clearMessage } from "../slices/message";
import moment from "moment";
import { ToastContainer, toast } from "react-toastify";
const maxDate = moment().subtract("18", "years").format("YYYY-MM-DD");

const Register = () => {
  let navigate = useNavigate();

  const { message } = useSelector((state) => state.message);
  const dispatch = useDispatch();

  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

  useEffect(() => {
    dispatch(clearMessage());
  }, [dispatch]);

  const initialValues = {
    firstName: "",
    lastName: "",
    password: "",
    phoneNumber: "",
    email: "",
    dob: "",
    gender: "",
  };

  const validationSchema = Yup.object().shape({
    firstName: Yup.string()
      .test(
        "len",
        "The firstName must be between 3 and 20 characters.",
        (val) =>
          val && val.toString().length >= 3 && val.toString().length <= 20
      )
      .required("This field is required!"),
    lastName: Yup.string()
      .test(
        "len",
        "The lastName must be between 3 and 20 characters.",
        (val) =>
          val && val.toString().length >= 3 && val.toString().length <= 20
      )
      .required("This field is required!"),
    email: Yup.string()
      .email("This is not a valid email.")
      .required("This field is required!"),
    phoneNumber: Yup.string()
      .matches(phoneRegExp, "Phone number is not valid")
      .required("This field is required!"),
    dob: Yup.date().required("This field is required!"),
    gender: Yup.string().required("This field is required!"),
    password: Yup.string()
      .test(
        "len",
        "The password must be between 6 and 40 characters.",
        (val) =>
          val && val.toString().length >= 6 && val.toString().length <= 40
      )
      .required("This field is required!"),
  });

  const handleRegister = (formValue) => {
    const { firstName, lastName, email, phoneNumber, password, dob, gender } =
      formValue;

    dispatch(
      register({
        firstName,
        lastName,
        email,
        phoneNumber,
        password,
        dob,
        gender,
      })
    )
      .unwrap()
      .then(() => {
        navigate("/profile");
      })
      .catch(() => {
        toast(message);
      });
  };

  return (
    <div className="col-md-12 signup-form">
      <ToastContainer />
      <div className="card card-container">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleRegister}
        >
          <Form>
            <div>
              <div className="form-group">
                <label htmlFor="firstName">First Name</label>
                <Field name="firstName" type="text" className="form-control" />
                <ErrorMessage
                  name="firstName"
                  component="div"
                  className="alert alert-danger"
                />
              </div>
              <div className="form-group">
                <label htmlFor="lastName">Last Name</label>
                <Field name="lastName" type="text" className="form-control" />
                <ErrorMessage
                  name="lastName"
                  component="div"
                  className="alert alert-danger"
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <Field name="email" type="email" className="form-control" />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="alert alert-danger"
                />
              </div>
              <div className="form-group">
                <label htmlFor="phoneNumber">Phone Number</label>
                <Field
                  name="phoneNumber"
                  type="text"
                  className="form-control"
                />
                <ErrorMessage
                  name="phoneNumber"
                  component="div"
                  className="alert alert-danger"
                />
              </div>
              <div className="form-group">
                <label htmlFor="dob">Date Of Birth</label>
                <Field
                  name="dob"
                  type="date"
                  className="form-control"
                  max={maxDate}
                />
                <ErrorMessage
                  name="dob"
                  component="div"
                  className="alert alert-danger"
                />
              </div>

              <div className="form-group">
                <label htmlFor="gender">Gender</label>
                <Field as="select" name="gender" className="form-control">
                  <option disabled value="">
                    Pick Gender
                  </option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </Field>

                <ErrorMessage
                  name="gender"
                  component="div"
                  className="alert alert-danger"
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <Field
                  name="password"
                  type="password"
                  className="form-control"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="alert alert-danger"
                />
              </div>

              <div className="form-group">
                <button type="submit" className="btn btn-primary btn-block">
                  Sign Up
                </button>
              </div>
            </div>
          </Form>
        </Formik>
      </div>
      {message && (
        <div className="form-group">
          <div className="alert alert-danger" role="alert">
            {message}
          </div>
        </div>
      )}
    </div>
  );
};

export default Register;
