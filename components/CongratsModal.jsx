import Image from "next/image";
import confettiImg from "../public/assets/confetti.png";
import { AiOutlineClose } from "react-icons/ai";

const Congrats = ({
  modalCongrats,
  modalFranco,
  showModalFranco,
  handleClose2,
  handleClose3,
}) => {
  return (
    <>
      {modalCongrats && (
        <div className="h-[50%] z-20 w-full flex flex-col items-center mt-24 rounded-xl bg-white">
          <div
            onClick={handleClose2} //props
            className="fixed right-0 p-4 cursor-pointer"
          >
            <AiOutlineClose />
          </div>
          <div className="pt-5">
            <Image
              alt="confetti emoji"
              src={confettiImg}
              width={90}
              height={100}
            />
          </div>
          <h2 className="text-xl p-2">Félicitations !</h2>
          <p className="text-gray-600 text-[14px] font-thin p-2 text-center">
            La commande est envoyée, nous reviendrons vers vous dans les plus
            brefs délais !
          </p>
          <div onClick={showModalFranco}>voir la popup franco</div>
        </div>
      )}
      {modalFranco && (
        <div className="h-[50%] z-40 w-full flex flex-col items-center mt-24 rounded-xl bg-white">
          <div
            onClick={handleClose3}
            className="fixed right-0 p-4 cursor-pointer"
          >
            <AiOutlineClose />
          </div>
          <h2 className="text-xl p-4">Attention </h2>
          <p className="text-gray-600 text-[14px] font-thin p-10 text-center">
            Vous n'avez pas atteind le franco minimum de 75€ HT. <br />
            Souhaitez-vous poursuivre votre commande ? <br />
            La livraison vous sera facturée 25€ HT.
          </p>
          <div className="flex justify-center items-center text-center w-[90%] my-3">
            <button
              type="button"
              className=" bg-[#06968A] w-[100%] cursor-pointer rounded-md p-3 uppercase text-sm h-12 mt-2 text-center text-white font-bold"
              onClick={handleClose3}
            >
              poursuivre
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Congrats;
