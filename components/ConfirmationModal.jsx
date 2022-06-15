import { AiOutlineClose } from "react-icons/ai";
import { useState } from "react";

export default function ConfirmationModal() {
  const [congrats, setCongrats] = useState(false);

  const showCongrats = () => {
    setCongrats(!congrats);
  };

  return (
    <>
      <div className="w-full h-[50%] flex flex-col px4 py-2 rounded-xl">
        <div className="absolute right-0 px-2">
          <AiOutlineClose />
        </div>
        <h1 className="text-md bold text-center py-4">
          Confirmation de commande
        </h1>
        <form>
          <div className="flex flex-col text-left w-[90%] rounded-md m-auto border-gray-500 text-[#7F7F7F] bg-[#F2F2F2] mb-4 p-2">
            <label className="text-sm">Créneau de livraison</label>
            <select
              id="choose-date "
              onChange=""
              className="text-[#bbbbbb]  bg-[#F2F2F2]"
            >
              <option className="" value="">
                15/06/2022
              </option>
            </select>
          </div>
          <div className=" flex flex-col text-left w-[90%] rounded-md m-auto border-gray-500 text-[#7F7F7F] bg-[#F2F2F2] p-2">
            <label htmlFor="select-date" className="text-sm">
              Ajouter un commentaire
            </label>
            <textarea
              type="textarea"
              className="text-sm  bg-[#F2F2F2]"
              rows="4"
              name="message"
              onChange={(e) => e.target.value}
              placeholder="Mon message..."
            />
          </div>
          <div className="flex justify-center items-center text-center m-auto my-3">
            <button
              type="button"
              className=" bg-[#06968A] w-[90%] cursor-pointer rounded-md p-4 uppercase text-sm h-12 mt-4 text-center text-white font-bold"
              onClick={showCongrats}
            >
              Confirmer la commande
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
