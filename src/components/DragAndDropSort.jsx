import React, { useState } from "react";
import styles from "./DragAndDropSort.module.scss";

const DragAndDropSort = () => {
  const [cardList, setCardList] = useState([
    { id: 1, order: 3, number: "1", color: "red" },
    { id: 2, order: 1, number: "3", color: "yellow" },
    { id: 3, order: 2, number: "6", color: "blue" },
    { id: 4, order: 4, number: "4", color: "green" },
    { id: 5, order: 6, number: "2", color: "orange" },
    { id: 6, order: 5, number: "5", color: "cornflowerblue" },
    { id: 7, order: 7, number: "7", color: "darkmagenta" },
  ]);

  const [currentCard, setCurrentCard] = useState(null);

  const dragStartHandler = (e, card) => {
    console.log("drag", card);
    setCurrentCard(card);
  };

  const dragLeaveHandler = (e, card) => {
    e.target.style.background = card.color;
  };

  const dragEndHandler = (e, card) => {
    e.target.style.background = card.color;
  };

  const dragOverHandler = (e) => {
    e.preventDefault();
    e.target.style.background = "lightgray";
  };

  const dropHandler = (e, card) => {
    e.preventDefault();
    setCardList(
      cardList.map((i) => {
        if (i.id === card.id) {
          return { ...i, order: currentCard.order };
        }
        if (i.id === currentCard.id) {
          return { ...i, order: card.order };
        }
        return i;
      })
    );
    e.target.style.background = "white";
  };

  const sortCards = (a, b) => {
    if (a.order > b.order) {
      return 1;
    } else {
      return -1;
    }
  };
  
  return (
    <div className={styles.app}>
      <div className={styles.wrapper}>
        {cardList.sort(sortCards).map((card, index) => {
          return (
            <div
              key={index}
              className={styles.card}
              style={{ backgroundColor: `${card.color}` }}
              draggable={true} // включаем свойсво draggable, чтобы можно было перемещать элементы;
              onDragStart={(e) => dragStartHandler(e, card)} //  слушатель срабатывает в момент, когда мы взяли карточку;
              onDragLeave={(e) => dragLeaveHandler(e, card)} // слушатель срабатывает в момент, когда вышли за пределы другой карточки;
              onDragEnd={(e) => dragEndHandler(e, card)} // слушатель срабатывает если мы отпустили перемещение;
              onDragOver={(e) => dragOverHandler(e)} // слушатель срабатывает если мы находимся над другим объектом;
              onDrop={(e) => dropHandler(e, card)} // слушатель срабатывает, когда мы отпустили карточку и ждем соответсвующее действие;
            >
              {card.number}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DragAndDropSort;
