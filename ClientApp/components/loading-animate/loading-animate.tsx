import { Image } from "primereact/image";
import { classNames } from "primereact/utils";

interface LoadingAnimateProps {
  imgAlt: string;
  imgSrc: string;
  hidden?: boolean;
  imgHeight?: number;
}

const LoadingAnimate = ({
  imgSrc,
  imgAlt,
  hidden = false,
  imgHeight = 120,
}: LoadingAnimateProps) => {
  return (
    <div className={classNames("loading-animate-overlay", { hidden: hidden })}>
      <div className="loading-animate-content flex flex-column align-items-center justify-content-center">
        <div
          className="loading-image-container"
          style={{ height: `${imgHeight}px` }}
        >
          <Image src={imgSrc} alt={imgAlt} width="100%" height={`100%`} />
        </div>
      </div>
    </div>
  );
};

export default LoadingAnimate;
