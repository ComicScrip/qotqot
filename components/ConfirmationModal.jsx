import s from "../styles/nouvelleCommande.module.css";
import { useState } from "react";
// import axios from "axios";
import { AiOutlineClose } from "react-icons/ai";
import dayjs from "dayjs";

export default function ConfirmationModal({
  modal,
  handleValidate,
  handleClose,
}) {
  // eslint-disable-next-line no-unused-vars
  const [error, setError] = useState("");
  // eslint-disable-next-line no-unused-vars
  const [date, setDate] = useState("");
  var weekday = require("dayjs/plugin/weekday");
  dayjs.extend(weekday);

  const date1 = dayjs().weekday(1).format("DD-MM-YY");
  const date2 = dayjs().weekday(4).format("DD-MM-YY");
  const date3 = dayjs().weekday(8).format("DD-MM-YY");
  const date4 = dayjs().weekday(11).format("DD-MM-YY");

  const options = [
    {
      label: date1,
      value: date,
    },
    {
      label: date2,
      value: "",
    },
    {
      label: date3,
      value: "",
    },
    {
      label: date4,
      value: "",
    },
  ];

  const handleChange = (value) => {
    setDate(value);
  };

  // useEffect(() => {
  //   setError("");
  //   axios
  //     .post("/api/panier")
  //     .then((res) => setDate(res.data))
  //     .catch(() =>
  //       setError("Could not get data from the server, please try again")
  //     );
  // }, []);
  // console.log(date);

  return (
    <>
      {modal && (
        <>
          <div className={s.confirmation}>
            <div className="flex flex-col justify-center mt-32 h-fit mx-auto sm:mt-20 sm:px-48 sm:w-[70%] rounded-xl bg-white">
              <div
                onClick={handleClose}
                className="flex justify-end p-4 cursor-pointer"
              >
                <AiOutlineClose />
              </div>
              <h1 className="sm:text-4xl bold text-center py-3 mt-3">
                Confirmation de commande
              </h1>

              <form>
                <div className="flex flex-col justify-center text-left w-[90%] rounded-md m-auto border-gray-500 text-[#7F7F7F] bg-[#F2F2F2] mb-4 p-2">
                  <label className="text-sm sm:text-base cursor-pointer ">
                    Créneau de livraison{" "}
                  </label>
                  {/* <Calendar
                    onChange={onChange}
                    value={today}
                    defaultView="month"
                    disableDays={["mon", "wed", "fri", "sun", "sat"]}
                    defaultValue={{
                      activeStartDate: { today },
                      endDate: "2022-07-25",
                    }}
                  /> */}

                  <select
                    id="choose-date "
                    className="text-[#bbbbbb] bg-[#F2F2F2]"
                    type="date"
                    onChange={handleChange}
                  >
                    <option value={date}>---</option>
                    {options.map((option) => (
                      <option key={option.id} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div className=" flex flex-col text-left w-[90%] rounded-md m-auto border-gray-500 text-[#7F7F7F] bg-[#F2F2F2] p-2">
                  <label htmlFor="select-date" className="text-sm sm:text-base">
                    Ajouter un commentaire{" "}
                  </label>
                  <textarea
                    type="textarea"
                    className="text-sm  bg-[#F2F2F2]"
                    rows="3"
                    name="message"
                    onChange={(e) => e.target.value}
                    placeholder="Mon message..."
                  />
                </div>
                <div className="flex justify-center items-center text-center m-auto my-3">
                  <button
                    type="button"
                    className=" bg-[#06968A] w-[90%] cursor-pointer rounded-md p-3 uppercase text-sm h-12 mt-2 text-center text-white font-bold"
                    onClick={handleValidate}
                  >
                    Confirmer la commande
                  </button>
                </div>
              </form>

              {error && (
                <p className="error text-center text-sm text-[red]">
                  ⛔️ Nous ne pouvons charger les données du serveur, veuillez
                  réessayer svp.
                </p>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
}
