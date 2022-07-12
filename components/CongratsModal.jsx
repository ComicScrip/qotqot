import Image from "next/image";
import confettiImg from "../public/assets/confetti.png";
import { AiOutlineClose } from "react-icons/ai";
import s from "../styles/nouvelleCommande.module.css";

const Congrats = ({
  modalCongrats,
  modalFranco,
  confirmPurchase,
  handleClose2,
  handleClose3,
}) => {
  return (
    <>
      {modalCongrats && (
        <div className={s.congrats}>
          <div className="flex flex-col justify-center h-fit mt-32 mx-auto sm:px-52 sm:w-[70%] rounded-xl bg-white">
            <div
              onClick={handleClose2} //props
              className="flex justify-end items-end p-4 cursor-pointer"
            >
              <AiOutlineClose />
            </div>
            <div className="text-center">
              <div className="pt-5">
                <Image
                  alt="confetti emoji"
                  src={confettiImg}
                  width={90}
                  height={100}
                />
              </div>
              <h2 className="text-xl p-2">Félicitations !</h2>
              <p className="text-gray-600 text-[14px] font-base p-2  py-12 text-center">
                La commande est envoyée, nous reviendrons vers vous dans les
                plus brefs délais !
              </p>
              {/* <div onClick={showModalFranco}>voir la popup franco</div> */}
            </div>
          </div>
        </div>
      )}

      {modalFranco && (
        <div className={s.franco}>
          <div className="z-40 w-full flex flex-col items-center mt-24 rounded-xl bg-white">
            <div
              onClick={handleClose3}
              className="fixed right-0 p-4 cursor-pointer"
            >
              <AiOutlineClose />
            </div>
            <h2 className="text-xl p-4">Attention </h2>
            <p className="text-gray-600 text-[14px] font-base p-10 text-center">
              Vous n'avez pas atteind le franco minimum de 75€ HT. <br />
              Souhaitez-vous poursuivre votre commande ? <br />
              La livraison vous sera facturée 25€ HT.
            </p>
            <div className="flex justify-center items-center text-center w-[90%] my-3">
              <button
                type="button"
                className=" bg-[#06968A] w-[100%] cursor-pointer rounded-md p-3uppercase text-sm h-12 mt-2 text-center text-white font-bold"
                onClick={confirmPurchase}
              >
                poursuivre
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Congrats;
