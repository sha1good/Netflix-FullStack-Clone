import { Link, useHistory, useLocation } from "react-router-dom";
import "./list.css";
import { useState } from "react";
import { useContext } from "react";

import { updateAList } from "../../context/listContext/listApiCall";
import { ListContext } from "../../context/listContext/ListContext";

export default function Movie() {
  const location = useLocation();
  const list = location.list;
  console.log(list);
  const { dispatch } = useContext(ListContext);
  const history = useHistory();

  const [updateList, setUpdateList] = useState(null);

  const handleChange = (event) => {
    const value = event.target.value;
    setUpdateList({ ...updateList, [event.target.name]: value });
  };

  const handleUpdate = (event) => {
    event.preventDefault();
    updateAList(list._id, updateList, dispatch);
    history.push("/lists");
  };

  return (
    <div className="product">
      <div className="productTitleContainer">
        <h1 className="productTitle">List</h1>
        <Link to="/newlist">
          <button className="productAddButton">Create</button>
        </Link>
      </div>
      <div className="productTop">
        <div className="productTopRight">
          <div className="productInfoTop">
            <span className="productName">{list?.title || "Super Comedy"}</span>
          </div>
          <div className="productInfoBottom">
            <div className="productInfoItem">
              <span className="productInfoKey">id:</span>
              <span className="productInfoValue">
                {list?._id || "4666589949"}
              </span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">genre:</span>
              <span className="productInfoValue">
                {list?.genre || "comedy"}
              </span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">type:</span>
              <span className="productInfoValue">{list?.type || 1995}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="productBottom">
        <form className="productForm">
          <div className="productFormLeft">
            <label>Title</label>
            <input
              type="text"
              placeholder={list?.title}
              name="title"
              value={list?.title}
              readOnly
            />
            <label>Genre</label>
            <input
              type="text"
              placeholder={list?.genre}
              name="genre"
              onChange={handleChange}
            />
            <label>Type</label>
            <select name="type" onChange={handleChange}>
              <option>Type</option>
              <option value="movie">Movie</option>
              <option value="series">Series</option>
            </select>
          </div>
          <div className="productFormRight">
            <button className="productButton" onClick={handleUpdate}>
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
