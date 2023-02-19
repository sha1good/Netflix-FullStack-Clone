import "./home.scss";
import Navbar from "../../components/navbar/Navbar";
import Featured from "../../components/featured/Featured";
import List from "../../components/list/List";
import { useEffect, useState } from "react";
import { userRequest } from "../../hooks/requestMethods";

const Home = ({ type }) => {
  const [lists, setLists] = useState([]);
  const [genre, setGenre] = useState(null);

  useEffect(() => {
    const getRandomMovieLists = async () => {
      try {
        const response = await userRequest.get(
          `/lists${type ? "?type=" + type : ""}${
            genre ? "&genre=" + genre : ""
          }`
        );
        //console.log(response.data);
        setLists(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getRandomMovieLists();
  }, [type, genre]);
  console.log(lists);
  return (
    <div className="home">
      <Navbar />
      <Featured type={type} setGenre={setGenre} />
      {lists.length > 0 ? (
        lists.map((list) => <List list={list} key={list._id} />)
      ) : (
        <span className="homespan">No Data To Display For This Genre</span>
      )}
    </div>
  );
};

export default Home;
