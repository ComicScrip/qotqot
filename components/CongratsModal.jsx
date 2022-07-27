import Image from "next/image";
import confettiImg from "../public/assets/confetti.png";
import { AiOutlineClose } from "react-icons/ai";
import s from "../styles/nouvelleCommande.module.css";

const Congrats = ({
  modalCongrats,
  modalFranco,
  handleClose2,
  handleClose3,
  confirmPurchase,
}) => {
  return (
    <>
      {modalCongrats && (
        <div className={s.congrats}>
          <div className="flex flex-col justify-center h-fit mt-32 mx-auto sm:px-20 sm:w-[50vw] rounded-xl bg-white">
            <div
              onClick={handleClose2}
              className="flex justify-end w-full p-4 cursor-pointer"
            >
              <AiOutlineClose />
            </div>
            <div className="w-[80%] m-auto">
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
                <p className="text-gray-600 text-[16px] font-base p-2  py-12 text-center">
                  La commande est envoyée, nous reviendrons vers vous dans les
                  plus brefs délais !
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {modalFranco && (
        <div className={s.franco}>
          <div className="z-40 flex flex-col items-center mt-32 h-fit mx-auto sm:px-20 sm:w-[50vw] rounded-xl bg-white">
            <div
              onClick={handleClose3}
              className="flex w-full justify-end py-4 cursor-pointer"
            >
              <AiOutlineClose />
            </div>
            <div className="w-[80%] m-auto">
              <h2 className="text-center text-xl p-4">Attention </h2>
              <p className="text-gray-600 text-[16px] font-base p-10 text-center">
                Vous n'avez pas atteind le franco minimum de 75€ HT. <br />
                Souhaitez-vous poursuivre votre commande ? <br />
                La livraison vous sera facturée 25€ HT.
              </p>
              <div className="flex justify-center items-center text-center my-3">
                <button
                  type="button"
                  className=" bg-[#06968A] w-full cursor-pointer rounded-md p-3 uppercase text-sm h-12 mt-2 text-center text-white font-bold"
                  onClick={confirmPurchase}
                >
                  poursuivre
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Congrats;
