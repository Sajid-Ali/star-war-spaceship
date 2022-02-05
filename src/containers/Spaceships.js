import axios from "axios";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Creators from "../redux/Reducers/star-war-reducers";
import { getSpaceships } from "../redux/selectors/star-war-selectors";

const Spaceships = (props) => {
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();

  const spaceships = useSelector(getSpaceships);
  const { loading, data, error } = spaceships;

  const submitHandler = (e) => {
    e.preventDefault();

    const getData = async () => {
      dispatch(Creators.fetchDataRequest());

      try {
        const {
          data: { results },
        } = await axios.get(
          `https://itunes.apple.com/search?term=${searchTerm}`
        );

        console.log(results);

        dispatch(Creators.fetchDataSuccess(results));
      } catch (error) {
        dispatch(Creators.fetchDataFail(error));
      }
    };

    getData();
    // console.log("On submit handler clicked!");
  };

  return (
    <form onSubmit={submitHandler}>
      {loading && <p>Loading...</p>}
      <h1> Home Container</h1>

      <input
        placeholder="Search..."
        type="text"
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button>Go</button>
    </form>
  );
};

export default Spaceships;
