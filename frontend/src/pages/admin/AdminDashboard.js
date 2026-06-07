import {
  useEffect,
  useState
} from "react";

import api
from "../../api/axios";

function AdminDashboard() {

  const [dashboard,
    setDashboard] =
    useState(null);

  useEffect(() => {

    fetchDashboard();

  }, []);

  const fetchDashboard =
  async () => {

    try {

      const response =
      await api.get(
        "/admin/dashboard"
      );

      setDashboard(
        response.data.data
      );

    }
    catch(error){

      console.log(error);

    }
  };

  if(!dashboard){
    return <h2>Loading...</h2>;
  }

  return (

    <div>

      <h1>
        Admin Dashboard
      </h1>

      <h3>
        Total Users:
        {dashboard.totalUsers}
      </h3>

      <h3>
        Total Stores:
        {dashboard.totalStores}
      </h3>

      <h3>
        Total Ratings:
        {dashboard.totalRatings}
      </h3>

    </div>
  );
}

export default AdminDashboard;