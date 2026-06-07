import {
  useEffect,
  useState
} from "react";

import api
from "../../api/axios";

function OwnerDashboard() {

  const [data,
    setData] =
    useState(null);

  useEffect(() => {

    fetchDashboard();

  }, []);

  const fetchDashboard =
  async () => {

    try {

      const response =
      await api.get(
        "/store-owner/dashboard"
      );

      setData(
        response.data
      );

    }
    catch(error){

      console.log(error);

    }
  };

  if(!data){
    return <h2>Loading...</h2>;
  }

  return (

    <div>

      <h1>
        Store Owner Dashboard
      </h1>

      <h2>
        Average Rating:
        {
          data.averageRating
        }
      </h2>

      <h2>
        Users Who Rated
      </h2>

      {
        data.users.map(
          (user,index)=>(
            <div key={index}>

              <p>
                {user.name}
              </p>

              <p>
                {user.email}
              </p>

              <p>
                Rating:
                {user.rating}
              </p>

              <hr/>

            </div>
          )
        )
      }

    </div>
  );
}

export default OwnerDashboard;