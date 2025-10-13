import Lottie from "lottie-react";
import iconLoading from "../../assets/img/Liquid 4 Dot Loader.json";

function Loading() {
  return (
    <Lottie
      animationData={iconLoading}
      loop
      autoplay
      className="w-full h-full"
    />
  );
}

export default Loading;
