import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { clearMessage } from "../slices/message";
import UserService from "../services/user.service";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { logout } from "../slices/auth";

const AddAddress = () => {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(clearMessage());
  }, [dispatch]);
  const initialValues = {
    streetAddress: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
  };
  const validationSchema = Yup.object().shape({
    streetAddress: Yup.string()
      .test(
        "len",
        "The Street Address must be greater than 3 characters.",
        (val) => val && val.toString().length >= 3
      )
      .required("This field is required!"),
    city: Yup.string()
      .test(
        "len",
        "City must be greater than 3 characters.",
        (val) => val && val.toString().length >= 3
      )
      .required("This field is required!"),
    state: Yup.string().required("This field is required!"),
    postalCode: Yup.string()
      .test(
        "len",
        "Postal Code must be greater than 5 characters.",
        (val) => val && val.toString().length >= 5
      )
      .required("This field is required!"),
    country: Yup.string().required("This field is required!"),
  });

  const handleSubmit = (formValue) => {
    const { streetAddress, city, state, postalCode, country } = formValue;

    UserService.addAddress(
      {
        addresses: [
          {
            streetAddress: streetAddress,
            city: city,
            state: state,
            postalCode: postalCode,
            country: country,
          },
        ],
      },
      (err, res) => {
        if (err) {
          toast(err.message);
        }
        if (res.statusCode !== 200) {
          toast(res.message);
        }
        toast(res.message);
        navigate("/profile");
      }
    );
  };

  const logOut = () => {
    dispatch(logout())
      .unwrap()
      .then(() => {
        navigate("/");
      });
  };
  return (
    <>
      <ToastContainer />
      <button
        onClick={() => {
          logOut();
        }}
      ></button>
      <div className="col-md-12 signup-form">
        <button
          onClick={() => {
            navigate("/profile");
          }}
        >
          Back To User
        </button>
        <div className="card card-container">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            <Form>
              <div>
                <div className="form-group">
                  <label htmlFor="streetAddress">Street Address</label>
                  <Field
                    name="streetAddress"
                    type="text"
                    className="form-control"
                  />
                  <ErrorMessage
                    name="streetAddress"
                    component="div"
                    className="alert alert-danger"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="city">City</label>
                  <Field name="city" type="text" className="form-control" />
                  <ErrorMessage
                    name="city"
                    component="div"
                    className="alert alert-danger"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="state">State</label>
                  <Field name="state" type="text" className="form-control" />
                  <ErrorMessage
                    name="state"
                    component="div"
                    className="alert alert-danger"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="postalCode">Postal Code</label>
                  <Field
                    name="postalCode"
                    type="text"
                    className="form-control"
                  />
                  <ErrorMessage
                    name="postalCode"
                    component="div"
                    className="alert alert-danger"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="country">Country</label>
                  <Field name="country" type="text" className="form-control" />
                  <ErrorMessage
                    name="country"
                    component="div"
                    className="alert alert-danger"
                  />
                </div>

                <div className="form-group">
                  <button type="submit" className="btn btn-primary btn-block">
                    Add Address
                  </button>
                </div>
              </div>
            </Form>
          </Formik>
        </div>
      </div>
    </>
  );
};

export default AddAddress;
