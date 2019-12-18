import React from "react";
import UserForm from "../../components/User/Form/Form";

const ScreensUserForm = ({ match: { params } }) => (
  <div>
    <h1>{`${!params.id ? "Create" : "Update"}`} User</h1>
    <UserForm id={params.id} />
  </div>
);

export default ScreensUserForm;
