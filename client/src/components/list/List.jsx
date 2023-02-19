import {
  ArrowBackIosOutlined,
  ArrowForwardIosOutlined,
} from "@material-ui/icons";
import ListItem from "../listItem/ListItem";
import { useRef, useState } from "react";
import "./list.scss";

const List = ({ list }) => {
  const listRef = useRef();
  const [sliderNumber, setSliderNumber] = useState(0);
  const [isMoved, setIsMoved] = useState(false);
  const [clickLimit] = useState(window.innerWidth / 230);

  const handleClick = (direction) => {
    setIsMoved(true);
    let distance = listRef.current.getBoundingClientRect().x - 50;

    if (direction === "left" && sliderNumber > 0) {
      setSliderNumber(sliderNumber - 1);
      listRef.current.style.transform = `translateX(${230 + distance}px)`;
    }
    if (direction === "right" && sliderNumber < 10 - clickLimit) {
      setSliderNumber(sliderNumber + 1);
      listRef.current.style.transform = `translateX(${-230 + distance}px)`;
    }
  };

  //  style={{ opacity: !isMoved && "0"}}
  console.log(list);
  return (
    <div className="list">
      <span className="listTitle">{list.title}</span>
      <div className="wrapper">
        <ArrowBackIosOutlined
          className="sliderArrow left"
          onClick={() => handleClick("left")}
          style={{ display: !isMoved && "none" }}
        />
        <div className="container" ref={listRef}>
          {list.content.map((item, index) => (
            <ListItem index={index} item={item} key={index} />
          ))}
        </div>
        <ArrowForwardIosOutlined
          className="sliderArrow right"
          onClick={() => handleClick("right")}
        />
      </div>
    </div>
  );
};

export default List;
