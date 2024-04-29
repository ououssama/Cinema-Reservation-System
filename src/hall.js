import { Reservation } from "./reservation";
import { useState, useEffect, useRef } from "react";
import Toast from "./Widgets/toast";

export function Hall(props) {
  const [hall, setHall] = useState(null);
  const [seat, setSeat] = useState({ resId: "H1T1", user: 1 });
  const [bottomSeat, setBottomSeat] = useState([
    new Array(21),
    new Array(21),
    new Array(21),
  ]);
  const [topSeat, setTopSeat] = useState(new Array(18));
  const [seatCollection, setSeatCollection] = useState(() => {
    const dataStorage = localStorage.getItem("seat_number");
    if (dataStorage?.length > 0) {
      return JSON.parse(dataStorage);
    } else {
      return { Seats: [] };
    }
  });

  const getHall = (event) => {
    const hallID = parseInt(
      event.target.options[event.target.selectedIndex].value,
    );
    setHall(hallID);
  };

  // this function run when a seat is reserved and it disable the seat element and change the color
  const lockResDialog = () => {
    document
      .querySelectorAll(".seat")
      .forEach((elem) => (elem.style.backgroundColor = "#ababab"));
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
      document
        .querySelectorAll(".seat")
        .forEach((elem) => (elem.style.backgroundColor = ""));
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

  const selectSet = (data) => {
    // if (seatCollection?.find(elem => elem == data)) {
    setSeatCollection((prev) => ({ Seats: [...prev.Seats, data] }));
    localStorage.setItem("seat_number", JSON.stringify(seatCollection));
    reserveSeat(topSeat, setTopSeat, seat);
    // }
    // localStorage.removeItem("seat_number");
  };

  const cancelSeat = (resId) => {
    let modifiedArray;
    const filtredSeat = () => {
      let newArray = [];
      for (let i = 0; i < seatCollection.Seats.length; i++) {
        if (seatCollection.Seats[i].resId !== resId) {
          newArray.push(seatCollection.Seats[i]);
        }
      }
      return newArray;
    };
    modifiedArray = filtredSeat();
    setSeatCollection({ Seats: modifiedArray });
  };

  useEffect(() => {
    // console.log(seat);
    if (hall) {
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
              ...seatCollection,
            );
          }
          break;
        }
      }

      setTopSeat(myArray);
    }
  }, [seat]);

  useEffect(() => {
    localStorage.setItem("seat_number", JSON.stringify(seatCollection));
    reserveSeat(topSeat, setTopSeat, seat);
    //console.log("top seat", seatCollection.Seats.some(e => e.user ===0));
  }, [seatCollection]);

  useEffect(() => {
    console.log(hall);
  }, [hall]);

  return (
    <div className="hall-container">
      <Toast visible={props.isUserAdded} message="Account created" />
      <label className="select-input-container" for="hall">
        Hall
        <select
          className="input-primary"
          id="hall"
          name="hall"
          onChange={(e) => getHall(e)}
        >
          <option selected disabled>
            Choose a hall
          </option>
          <option value={props.hallId}>{props.hallId}</option>
        </select>
      </label>
      {hall !== null ? (
        <>
          <div className="screen"></div>
          <div className="seats-wrapper">
            <div className="seat-bottom">
              <div id="A" className="seats-group">
                {[...bottomSeat[0].keys()].map((seat, i) => (
                  <div
                    key={i}
                    id={`H${props.hallId}B${seat}-A`}
                    className={`seat ${
                      seatCollection?.Seats &&
                      seatCollection?.Seats.some(
                        (data) =>
                          data.resId === `H${props.hallId}B${seat}-A` &&
                          data.level == 1,
                      )
                        ? seatCollection?.Seats.some(
                            (data) =>
                              data.user === props.currentUser &&
                              data.resId === `H${props.hallId}B${seat}-A` &&
                              data.level === 1,
                          )
                          ? " select"
                          : " disable"
                        : ""
                    }`}
                    onClickCapture={(e) =>
                      setSeat({
                        resId: e.target.id,
                        user: props.currentUser,
                        level: 1,
                      })
                    }
                    onClick={() => lockResDialog()}
                  ></div>
                ))}
              </div>
              <div id="B" className="seats-group">
                {[...bottomSeat[1].keys()].map((seat, i) => (
                  <div
                    key={i}
                    id={`H${props.hallId}B${seat}-B`}
                    className={`seat ${
                      seatCollection?.Seats &&
                      seatCollection?.Seats.some(
                        (data) =>
                          data.resId === `H${props.hallId}B${seat}-B` &&
                          data.level == 1,
                      )
                        ? seatCollection?.Seats.some(
                            (data) =>
                              data.user === props.currentUser &&
                              data.resId === `H${props.hallId}B${seat}-B` &&
                              data.level === 1,
                          )
                          ? " select"
                          : " disable"
                        : ""
                    }`}
                    onClickCapture={(e) =>
                      setSeat({
                        resId: e.target.id,
                        user: props.currentUser,
                        level: 1,
                      })
                    }
                    onClick={() => lockResDialog()}
                  ></div>
                ))}
              </div>
              <div id="C" className="seats-group">
                {[...bottomSeat[2].keys()].map((seat, i) => (
                  <div
                    key={i}
                    id={`H${props.hallId}B${seat}-C`}
                    className={`seat ${
                      seatCollection?.Seats &&
                      seatCollection?.Seats.some(
                        (data) =>
                          data.resId === `H${props.hallId}B${seat}-C` &&
                          data.level == 1,
                      )
                        ? seatCollection?.Seats.some(
                            (data) =>
                              data.user === props.currentUser &&
                              data.resId === `H${props.hallId}B${seat}-C` &&
                              data.level === 1,
                          )
                          ? " select"
                          : " disable"
                        : ""
                    }`}
                    onClickCapture={(e) =>
                      setSeat({
                        resId: e.target.id,
                        user: props.currentUser,
                        level: 1,
                      })
                    }
                    onClick={() => lockResDialog()}
                  ></div>
                ))}
              </div>
            </div>
            <div className="seat-top">
              <div className="seats-group">
                {[...topSeat.keys()]?.map((seat) => (
                  <div
                    key={seat}
                    id={`H${props.hallId}T${seat}`}
                    className={`seat ${
                      seatCollection?.Seats &&
                      seatCollection?.Seats.some(
                        (data) =>
                          data.resId == "H" + props.hallId + "T" + seat &&
                          data.level == 0,
                      )
                        ? seatCollection?.Seats.some(
                            (data) =>
                              data.user === props.currentUser &&
                              data.resId === "H" + props.hallId + "T" + seat &&
                              data.level == 0,
                          )
                          ? " select"
                          : " disable"
                        : ""
                    }`}
                    onClickCapture={(e) =>
                      setSeat({
                        resId: e.target.id,
                        user: props.currentUser,
                        level: 0,
                      })
                    }
                    onClick={() => lockResDialog()}
                    // onMouseOut={() => unlockResDialog()}
                  ></div>
                ))}
              </div>
            </div>
          </div>
          <Reservation
            seat={seat}
            getSeat={selectSet}
            cancelSeat={cancelSeat}
            currentUser={props.currentUser}
            reservedSeats={seatCollection}
          />
        </>
      ) : (
        <div>Please choose a hall</div>
      )}
    </div>
  );
}
