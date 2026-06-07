import {
  useEffect,
  useState
} from "react";

import api from "../../api/axios";

import "./StoreList.css";

function StoreList() {

  const [stores, setStores] =
    useState([]);

  const [search, setSearch] =
    useState("");

  useEffect(() => {
    fetchStores();
  }, []);

  const fetchStores =
    async () => {

      try {

        const response =
          await api.get(
            "/stores"
          );

        setStores(
          response.data.stores
        );

      } catch (error) {

        console.log(error);

      }
    };

  const submitRating =
    async (
      storeId,
      rating
    ) => {

      if (!rating) return;

      try {

        await api.post(
          "/ratings",
          {
            storeId,
            rating
          }
        );

        alert(
          "Rating Saved Successfully"
        );

        fetchStores();

      } catch (error) {

        console.log(error);

        alert(
          "Failed to save rating"
        );

      }
    };

  const filteredStores =
    stores.filter(
      (store) =>
        store.name
          .toLowerCase()
          .includes(
            search.toLowerCase()
          )
    );

  return (

    <div className="stores-page">

      <div className="stores-container">

        <div className="stores-header">

          <h1>
            Store Directory
          </h1>

          <p>
            Browse stores and submit ratings
          </p>

        </div>

        <div className="search-box">

          <input
            type="text"
            placeholder="Search store..."
            value={search}
            onChange={(e) =>
              setSearch(
                e.target.value
              )
            }
          />

        </div>

        <div className="store-grid">

          {
            filteredStores.length > 0
              ? filteredStores.map(
                (store) => (

                  <div
                    className="store-card"
                    key={store.id}
                  >

                    <h3>
                      {store.name}
                    </h3>

                    <p className="address">
                      {store.address}
                    </p>

                    <div className="rating-section">

                      <span>
                        Overall Rating
                      </span>

                      <h2>
                        {
                          store.averageRating ||
                          0
                        }
                        /5
                      </h2>

                    </div>

                    <div className="select-section">

                      <label>
                        Rate This Store
                      </label>

                      <select
                        defaultValue=""
                        onChange={(e) =>
                          submitRating(
                            store.id,
                            Number(
                              e.target.value
                            )
                          )
                        }
                      >

                        <option value="">
                          Select Rating
                        </option>

                        <option value="1">
                          ⭐ 1
                        </option>

                        <option value="2">
                          ⭐ 2
                        </option>

                        <option value="3">
                          ⭐ 3
                        </option>

                        <option value="4">
                          ⭐ 4
                        </option>

                        <option value="5">
                          ⭐ 5
                        </option>

                      </select>

                    </div>

                  </div>

                )
              )
              : (
                <div className="no-store">
                  No Stores Found
                </div>
              )
          }

        </div>

      </div>

    </div>
  );
}

export default StoreList;