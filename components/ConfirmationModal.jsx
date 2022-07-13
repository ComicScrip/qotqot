import s from "../styles/nouvelleCommande.module.css";
import { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import dayjs from "dayjs";

export default function ConfirmationModal({
  modal,
  handleValidate,
  handleClose,
}) {
  const [error] = useState("");

  const [setDate] = useState("");
  const weekday = require("dayjs/plugin/weekday");
  dayjs.extend(weekday);
  const isToday = require("dayjs/plugin/isToday");
  dayjs.extend(isToday);

  const date1 = dayjs().weekday(2).format("DD-MM-YY");
  const date2 = dayjs().weekday(4).format("DD-MM-YY");
  const date3 = dayjs().weekday(9).format("DD-MM-YY");
  const date4 = dayjs().weekday(11).format("DD-MM-YY");

  const optionsM = [
    {
      label: date1,
      value: date1,
    },
    {
      label: date2,
      value: date2,
    },
    {
      label: date3,
      value: date3,
    },
    {
      label: date4,
      value: date4,
    },
  ];
  const optionsJ = [
    {
      label: date2,
      value: date2,
    },
    {
      label: date3,
      value: date3,
    },
    {
      label: date4,
      value: date4,
    },
  ];

  const handleChange = (value) => {
    setDate(value);
  };

  return (
    <>
      {modal && (
        <>
          <div className={s.confirmation}>
            <div className="flex flex-col justify-center mt-32 h-fit mx-auto sm:px-52 sm:w-[60%] rounded-xl bg-white">
              <div
                onClick={handleClose}
                className="flex justify-end p-4 cursor-pointer"
              >
                <AiOutlineClose />
              </div>
              <h1 className="sm:text-4xl bold text-center py-3 mt-3">
                Confirmation de commande
              </h1>

              <form onSubmit={handleValidate}>
                <div className="flex flex-col justify-center text-left w-[90%] rounded-md m-auto border-gray-500 text-[#7F7F7F] bg-[#F2F2F2] mb-4 p-2">
                  <label className="text-sm sm:text-base cursor-pointer ">
                    Créneau de livraison{" "}
                  </label>

                  <select
                    className="text-[#3f3f3f] bg-[#F2F2F2]"
                    type="date"
                    required
                    onChange={handleChange}
                  >
                    {dayjs().isBefore(dayjs().weekday(2).hour(23))
                      ? optionsM.map((option, index) => (
                          <option key={index} value={option.value}>
                            {option.label}
                          </option>
                        ))
                      : optionsJ.map((option, index) => (
                          <option key={index} value={option.value}>
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
                    className="text-sm text-black bg-[#F2F2F2]"
                    rows="3"
                    name="message"
                    onChange={(e) => e.target.value}
                    placeholder="Mon message..."
                  />
                </div>
                <div className="flex justify-center items-center text-center m-auto my-3">
                  <button
                    type="submit"
                    className=" bg-[#06968A] w-[90%] cursor-pointer rounded-md p-3 uppercase text-sm h-12 mt-2 text-center text-white font-bold"
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
