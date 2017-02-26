import { Meteor } from "meteor/meteor";
import { createContainer } from "meteor/react-meteor-data";

import AdminPage from "../pages/AdminPage";

export default createContainer(
  () => {
    const adminSub = Meteor.subscribe("adminSub");
    const admins = Meteor.users.find({ isAdmin: true }).fetch();

    return {
      admins,
      loading: !adminSub.ready()
    };
  },
  AdminPage
);
