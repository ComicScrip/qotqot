import s from "../styles/LoadingSpin.module.css";

function LoadingSpin() {
  return (
    <div className={s.loader}>
      <img src="/images/Loading_icon.gif" alt="spin to win" />
    </div>
  );
}

export default LoadingSpin;
