import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader

export default function ImageCarousel({}) {
  const IMAGES = ["./students-on-grass.jpeg", "./students-on-grass.jpeg"];

  return (
    <Carousel showThumbs={false}>
      {IMAGES.map((imgSrc, index) => {
        return (
          <div key={index}>
            <img src={imgSrc} />
          </div>
        );
      })}
    </Carousel>
  );
}
