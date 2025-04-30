import Carousel from "../../components/ui/card-carousel";
import { ExerciseProp } from "../Exercises";
import Exercise from "./Exercise";

const CardsCarousel = ( {exercises} : {exercises : ExerciseProp[]} ) => {
  const cards = exercises.map((card, index) => (
    <Exercise key={index} exercise={card} />
  ));

  return (
    <div className="w-full h-full px-[30px] py-5">
      <Carousel items={cards} />
    </div>
  );
}

export default CardsCarousel;