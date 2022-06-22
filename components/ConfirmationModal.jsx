import { AiOutlineClose } from "react-icons/ai";
import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { CurrentUserContext } from "../contexts/currentUserContext";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import dayjs from "dayjs";
import { fr } from "date-fns/locale";

export default function ConfirmationModal({ handleValidate }) {
  const [error, setError] = useState("");
  const [date, setDate] = useState([]);
  const { modal, setModal } = useContext(CurrentUserContext);

  const setValue = new Date("2014-08-18T21:11:54");

  useEffect(() => {
    setError("");
    axios
      .get("/api/orders")
      .then((res) => setDate(res.data))
      .catch(() =>
        setError("Could not get data from the server, please try again")
      );
  }, []);
  console.log(date);

  const handleClose = () => {
    setModal(!modal);
  };

  const handleChange = (newValue) => {
    setValue(newValue);
  };

  const now = dayjs(Date.now());

  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        {modal && (
          <>
            <div className="fixed h-[50%] sm:h-[70%] w-full z-20 flex flex-col justify-center mt-20 mx-auto sm:mt-20 sm:px-52 rounded-xl bg-white">
              <div
                onClick={handleClose}
                className="absolute right-0 top-0 p-4 cursor-pointer"
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
                  <Stack spacing={3}>
                    <div className="flex justify-center h-[80%] sm:h-[100%] m-auto text-[#5f5f5f] sm:w-[80%] bg-white">
                      <LocalizationProvider
                        locale={fr}
                        dateAdapter={AdapterDateFns}
                      >
                        <DesktopDatePicker
                          inputFormat="dd/MM/yyyy"
                          value={now}
                          onChange={handleChange}
                          renderInput={(params) => <TextField {...params} />}
                        />
                      </LocalizationProvider>
                    </div>
                  </Stack>

                  {/* <select
                  id="choose-date "
                  onChange={(e) => handleChangeDate(e.target.value)}
                  className="text-[#bbbbbb] bg-[#F2F2F2]"
                >
                  <option className="" value=""></option>
                  {date.map((d) => (
                    <option key={d.id} value={d.id}>
                      {d.dateLivraison}
                    </option>
                  ))}
                </select> */}
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
          </>
        )}
      </LocalizationProvider>
    </>
  );
}
