import React, { useState, useEffect } from "react";
import UserService from "../services/user.service";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { useDispatch } from "react-redux";
import { logout } from "../slices/auth";

const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [userData, setUserData] = useState({});
  const [addresses, setAddresses] = useState([]);

  useEffect(() => {
    UserService.getUserData((err, res) => {
      if (err) {
        console.log(err);
      } else {
        console.log(res);
        setUserData({
          firstName: res.userData.firstName,
          lastName: res.userData.lastName,
          gender: res.userData.gender,
          phoneNumber: res.userData.phoneNumber,
          dob: moment(res.userData.dob).format("YYYY-MM-DD"),
          email: res.userData.email,
        });
        setAddresses(res.userData.useraddresses);
      }
    });
  }, []);

  const confirmDeleteProduct = (id) => {
    UserService.deleteAddress(id, (err, res) => {
      window.location.reload();
    });
  };

  const actionBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <Button
          icon="pi pi-trash"
          className="p-button-rounded p-button-warning"
          onClick={() => confirmDeleteProduct(rowData.id)}
        >
          Delete
        </Button>
      </React.Fragment>
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
      <Button
        onClick={() => {
          logOut();
        }}
      >
        Log Out
      </Button>
      <div className="container">
        <div className="col-md-12 signup-form">
          <div className="card card-container">
            Name: {userData.firstName} {userData.lastName}
            <br />
            Email: {userData.email} <br />
            Phone Number:{userData.phoneNumber} <br />
            Date Of Birth: {userData.dob} <br />
            Gender: {userData.gender} <br />
          </div>
        </div>

        <Button
          onClick={() => {
            navigate("/addAddress");
          }}
        >
          Add Address
        </Button>
        <DataTable
          value={addresses}
          responsiveLayout="scroll"
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
          dataKey="id"
          paginator
          emptyMessage="No data found."
          className="datatable-responsive"
          currentPageReportTemplate="Showing {first} to {last} of {totalRecords} posts"
          rows={10}
        >
          <Column
            field="streetAddress"
            sortable
            header="Street Address"
          ></Column>
          <Column field="city" sortable header="City"></Column>
          <Column field="state" sortable header="State"></Column>
          <Column field="postalCode" sortable header="Postal Code"></Column>
          <Column field="country" sortable header="Country"></Column>
          <Column
            body={actionBodyTemplate}
            exportable={false}
            header="Action"
          ></Column>
        </DataTable>
      </div>
    </>
  );
};

export default Profile;
