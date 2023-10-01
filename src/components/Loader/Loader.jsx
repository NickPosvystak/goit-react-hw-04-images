import { RotatingLines } from "react-loader-spinner";
import css from './Loader.module.css'


export const Loader = () => {
    return (
      <div className={css.Overlay}>
        <RotatingLines
          strokeColor="grey"
          strokeWidth="5"
          animationDuration="0.75"
          width="96"
          visible={true}
          className={css.Modal}
        />
      </div>
    );
}