import { useRef, useEffect } from "react";
export function Reservation(props) {
  const resContainer = useRef();

  const unlockResDialog = (event) => {
    // console.log(event);
    event.stopPropagation();
    if (resContainer.current.classList.contains("lock")) {
      resContainer.current.classList.add("hidden");
      resContainer.current.classList.remove("lock");
      document.getElementById(props.seat.resId).style.backgroundColor =
        "#ababab";
    }
  };

  const selectReservation = (s) => {
    document.getElementById(s).classList.add("disable");
    return s && props.getSeat({ resId: s, user: props.currentUser });
  };

  const cancelReservation = (id) => {
    document.getElementById(id).classList.remove("select");
    return props.cancelSeat(id);
  };

  useEffect(() => {
    const seatId = document.getElementById(props.seat.resId);
    const resPostion = resContainer.current;
    const mousePosition = { x: 0, y: 0 };
    seatId.onclick = (e) => {
      mousePosition.x = e.clientX;
      mousePosition.y = e.clientY;
      // console.log(resPostion.classList);
      // if (!resPostion.classList.contains("lock")) {
      if (!resPostion.classList.contains("lock")) {
        if (mousePosition.x < resPostion.offsetWidth) {
          resPostion.style.left = 0 + "px";
        } else {
          resPostion.style.left =
            mousePosition.x - resPostion.offsetWidth - 10 + "px";
        }

        if (mousePosition.y < resPostion.offsetHeight) {
          resPostion.style.top = 0 + "px";
        } else {
          resPostion.style.top =
            mousePosition.y - resPostion.offsetHeight - 10 + "px";
        }
      }
    };
  }, [props.seat]);

  useEffect(() => {
    const outsideClick = (e) => {
      if (
        resContainer.current &&
        !resContainer.current.contains(e.target) &&
        !e.target.classList.contains("seat")
      ) {
        console.log("hidden");
        resContainer.current.classList.add("hidden");
        resContainer.current.classList.remove("lock");
        console.log("Seat reservation Reference", props.seat.resId);
        document.getElementById(props.seat.resId).style.backgroundColor =
          "#ababab";
      }
    };

    document.addEventListener("click", outsideClick);

    return () => {
      document.removeEventListener("click", outsideClick);
    };
  }, [resContainer, props.seat]);

  return (
    <div
      ref={resContainer}
      className="reservation-container hidden"
      onMouseLeave={(e) => {
        unlockResDialog(e);
      }}
    >
      <div className="reservation">
        <h3>Reservation</h3>
        <p>
          Seat <span>{props.seat.resId}</span>
        </p>
        {props.reservedSeats.Seats &&
        props.reservedSeats.Seats.some((e) => e.resId == props.seat.resId) ? (
          <button
            className="cancel-btn"
            onClick={() => cancelReservation(props.seat.resId)}
          >
            cancel
          </button>
        ) : (
          <button onClick={() => selectReservation(props.seat.resId)}>
            Select
          </button>
        )}
      </div>
    </div>
  );
}
