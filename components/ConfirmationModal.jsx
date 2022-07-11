/*global Promise */
/*eslint no-undef: "error"*/
import s from "../styles/nouvelleCommande.module.css";
import { useState, useRef, useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Badge from "@mui/material/Badge";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { PickersDay } from "@mui/x-date-pickers/PickersDay";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { CalendarPickerSkeleton } from "@mui/x-date-pickers/CalendarPickerSkeleton";
import { fr } from "date-fns/locale";
import getDaysInMonth from "date-fns/getDaysInMonth";

function getRandomNumber(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

// function getDateOrder() {
//   return;
// }

function fakeFetch(date, { signal }) {
  return new Promise((resolve, reject) => {
    const timeout = setTimeout(() => {
      const daysInMonth = getDaysInMonth(date);
      const daysToHighlight = [1, 2, 3].map(() =>
        getRandomNumber(1, daysInMonth)
      );

      resolve({ daysToHighlight });
    }, 500);

    signal.onabort = () => {
      clearTimeout(timeout);
      reject(new DOMException("aborted", "AbortError"));
    };
  })();
}

const initialValue = new Date();

export default function ConfirmationModal({
  modal,
  handleValidate,
  handleClose,
}) {
  const requestAbortController = useRef(null);
  const [highlightedDays, setHighlightedDays] = useState([1, 2, 15]);
  const [value, setValue] = useState(initialValue);
  // const [error, setError] = useState(false);

  const fetchHighlightedDays = (date) => {
    const controller = new AbortController();
    fakeFetch(date, {
      signal: controller.signal,
    })
      .then(({ daysToHighlight }) => {
        setHighlightedDays(daysToHighlight);
      })
      .catch((error) => {
        if (error.name !== "AbortError") {
          throw error;
        }
      });

    requestAbortController.current = controller;
  };

  useEffect(() => {
    fetchHighlightedDays(initialValue);
    return () => requestAbortController.current?.abort();
  }, []);

  const handleMonthChange = (date) => {
    if (requestAbortController.current) {
      requestAbortController.current.abort();
    }

    setHighlightedDays([]);
    fetchHighlightedDays(date);
  };

  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
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
                    <Stack spacing={3}>
                      <div className="flex justify-center h-[80%] sm:h-[100%] m-auto text-[#5f5f5f] sm:w-[80%] bg-white">
                        <LocalizationProvider
                          locale={fr}
                          dateAdapter={AdapterDateFns}
                        >
                          <DatePicker
                            value={value}
                            onChange={(newValue) => {
                              setValue(newValue);
                            }}
                            onMonthChange={handleMonthChange}
                            renderInput={(params) => <TextField {...params} />}
                            renderLoading={() => <CalendarPickerSkeleton />}
                            renderDay={(day, _value, DayComponentProps) => {
                              const isSelected =
                                !DayComponentProps.outsideCurrentMonth &&
                                highlightedDays.indexOf(day.getDate()) > 0;
                              return (
                                <Badge
                                  key={day.toString()}
                                  overlap="circular"
                                  badgeContent={isSelected ? "✅" : undefined}
                                >
                                  <PickersDay {...DayComponentProps} />
                                </Badge>
                              );
                            }}
                          />
                        </LocalizationProvider>
                      </div>
                    </Stack>
                  </div>
                  <div className=" flex flex-col text-left w-[90%] rounded-md m-auto border-gray-500 text-[#7F7F7F] bg-[#F2F2F2] p-2">
                    <label
                      htmlFor="select-date"
                      className="text-sm sm:text-base"
                    >
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

                {/* {error && (
                  <p className="error text-center text-sm text-[red]">
                    ⛔️ Nous ne pouvons charger les données du serveur, veuillez
                    réessayer svp.
                  </p>
                )} */}
              </div>
            </div>
          </>
        )}
      </LocalizationProvider>
    </>
  );
}
