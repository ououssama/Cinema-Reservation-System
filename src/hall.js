import { Reservation } from "./reservation";
import { useState, useEffect, useRef } from "react";
export function Hall(props) {
  //TODO: change data structure for seats reservation to contains seat resevation id and person who reserve seat
  const [seat, setSeat] = useState({ resId: "H1T1", user: 1 });
  const [topSeat, setTopSeat] = useState(new Array(18));
  const [seatCollection, setSeatCollection] = useState(() => {
    const dataStorage = localStorage.getItem("seat_number");
    if (dataStorage?.length > 0) {
      return JSON.parse(dataStorage);
    } else {
      return { Seats: [] };
    }
  });

  // this function run when a seat is reserved and it disable the seat element and change the color
  const lockResDialog = () => {
    // console.log(document.querySelector(".seat"));
    if (
      !document
        .querySelector(".reservation-container")
        .classList.contains("lock")
    ) {
      /*document
        .querySelectorAll(".seat")
        .forEach((elem) =>
          !elem.classList.contains("disable")
            ? (elem.style.backgroundColor = "#ababab")
            : null
        ); */
      document.getElementById(seat.resId).style.backgroundColor = "#8b8b8b";
      document.querySelector(".reservation-container").classList.add("lock");
      document
        .querySelector(".reservation-container")
        .classList.remove("hidden");
    }
  };

  // this function runs when the seat is being reserved and it take the arrays of empty seats and change one of the empty value to selected seat
  const reserveSeat = (seatsRows, updateSeats, seat) => {
    const myArray = new Array(...seatsRows);
    for (let i = 0; i < seatsRows.length; i++) {
      if (seatsRows[i] === undefined) {
        let newValue;
        newValue = myArray.splice(i, 1, seat);
        break;
      }
    }

    // function that update state with new modified array
    updateSeats(myArray);
  };

  useEffect(() => {
    // console.log(seat);
    document.querySelector(".reservation-container").classList.remove("lock");
    document.querySelector(".reservation-container").classList.add("hidden");
    const myArray = new Array(...topSeat);
    for (let i = 0; i < topSeat.length; i++) {
      if (topSeat[i] === undefined) {
        let newValue;
        if (seatCollection.length) {
          newValue = myArray.splice(
            i,
            seatCollection.length,
            ...seatCollection
          );
        }
        break;
      }
    }

    setTopSeat(myArray);
  }, [seat]);

  useEffect(() => {
    localStorage.setItem("seat_number", JSON.stringify(seatCollection));
    reserveSeat(topSeat, setTopSeat, seat);
    //console.log("top seat", seatCollection.Seats.some(e => e.user ===0));
  }, [seatCollection]);

  const selectSet = (data) => {
    // if (seatCollection?.find(elem => elem == data)) {
    setSeatCollection((prev) => ({ Seats: [...prev.Seats, data] }));
    localStorage.setItem("seat_number", JSON.stringify(seatCollection));
    reserveSeat(topSeat, setTopSeat, seat);
    // }
    // localStorage.removeItem("seat_number");
  };

  const cancelSeat = (resId) => {
    console.log("resId", resId);
    let modifiedArray;
    const filtredSeat = () => {
      let newArray = [];
      console.log("before loop");
      for (let i = 0; i < seatCollection.Seats.length; i++) {
        console.log(
          "Seat Collection a",
          seatCollection.Seats[i].resId !== resId
        );
        if (seatCollection.Seats[i].resId !== resId) {
          console.log("Seat Collection filtred", seatCollection.Seats[i]);
          newArray.push(seatCollection.Seats[i]);
        }
      }
      return newArray;
    };
    modifiedArray = filtredSeat();
    setSeatCollection({ Seats: modifiedArray });
  };

  // const unlockResDialog = () => {
  //   document.querySelector(".reservation-container").classList.remove("lock");
  //   document.querySelector(".reservation-container").classList.add("hidden");
  // };
  // useEffect(() => {
  //   document.querySelector(".reservation-container").classList.remove("lock");
  // }, [seat]);

  return (
    <div className="hall-container">
      <p>Hall: {props.hallId}</p>
      <div className="screen"></div>
      <div className="seats-wrapper">
        <div className="seat-bottom">
          <div className="seats-group">
            <div className="seat"></div>
            <div className="seat"></div>
            <div className="seat"></div>
            <div className="seat"></div>
            <div className="seat"></div>
            <div className="seat"></div>
            <div className="seat"></div>
            <div className="seat"></div>
            <div className="seat"></div>
            <div className="seat"></div>
            <div className="seat"></div>
            <div className="seat"></div>
            <div className="seat"></div>
            <div className="seat"></div>
            <div className="seat"></div>
            <div className="seat"></div>
            <div className="seat"></div>
            <div className="seat"></div>
            <div className="seat"></div>
            <div className="seat"></div>
            <div className="seat"></div>
          </div>
          <div className="seats-group">
            <div className="seat"></div>
            <div className="seat"></div>
            <div className="seat"></div>
            <div className="seat"></div>
            <div className="seat"></div>
            <div className="seat"></div>
            <div className="seat"></div>
            <div className="seat"></div>
            <div className="seat"></div>
            <div className="seat"></div>
            <div className="seat"></div>
            <div className="seat"></div>
            <div className="seat"></div>
            <div className="seat"></div>
            <div className="seat"></div>
            <div className="seat"></div>
            <div className="seat"></div>
            <div className="seat"></div>
            <div className="seat"></div>
            <div className="seat"></div>
            <div className="seat"></div>
          </div>
          <div className="seats-group">
            <div className="seat"></div>
            <div className="seat"></div>
            <div className="seat"></div>
            <div className="seat"></div>
            <div className="seat"></div>
            <div className="seat"></div>
            <div className="seat"></div>
            <div className="seat"></div>
            <div className="seat"></div>
            <div className="seat"></div>
            <div className="seat"></div>
            <div className="seat"></div>
            <div className="seat"></div>
            <div className="seat"></div>
            <div className="seat"></div>
            <div className="seat"></div>
            <div className="seat"></div>
            <div className="seat"></div>
            <div className="seat"></div>
            <div className="seat"></div>
            <div className="seat"></div>
          </div>
        </div>
        <div className="seat-top">
          <div className="seats-group">
            {[...topSeat.keys()]?.map((seat) => (
              <div
                key={seat}
                style={{ fontSize: "6px" }}
                id={`H${props.hallId}T${seat}`}
                className={`seat ${
                  seatCollection?.Seats &&
                  seatCollection?.Seats.some(
                    (e) => e.resId == "H" + props.hallId + "T" + seat
                  )
                    ? seatCollection?.Seats.some(
                        (e) =>
                          e.user === props.currentUser &&
                          e.resId === "H" + props.hallId + "T" + seat
                      )
                      ? " select"
                      : " disable"
                    : ""
                }`}
                onClickCapture={(e) =>
                  setSeat({ resId: e.target.id, user: props.currentUser })
                }
                onClick={() => lockResDialog()}
                // onMouseOut={() => unlockResDialog()}
              ></div>
            ))}
          </div>
        </div>
      </div>
      {
        <Reservation
          seat={seat}
          getSeat={selectSet}
          cancelSeat={cancelSeat}
          currentUser={props.currentUser}
          reservedSeats={seatCollection}
        />
      }
      <div>
        {seatCollection?.Seats &&
          seatCollection?.Seats.map((s, i) => (
            <span style={{ marginInline: 5 }} key={i}>
              {s.resId}
            </span>
          ))}
      </div>
      {/* {JSON.parse(localStorage.getItem("seat_number"))?.map((s) => s)} */}
    </div>
  );
}
