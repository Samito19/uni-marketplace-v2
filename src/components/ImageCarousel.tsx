import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader

type Props = {
  images: string[];
};
export default function ImageCarousel({ images }: Props) {
  return (
    <Carousel showThumbs={false}>
      {images.map((imgSrc, index) => {
        return (
          <div
            className="border-[1px] rounded-[5px] flex w-full h-[22rem] items-center justify-center"
            key={index}
          >
            <img src={imgSrc} className="z-10 object-contain p-10" />
            <img
              src={imgSrc}
              className="absolute object-cover blur-lg w-full h-full"
            />
          </div>
        );
      })}
    </Carousel>
  );
}
