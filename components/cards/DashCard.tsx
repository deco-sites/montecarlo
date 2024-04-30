import Title from "./../product/Shelf/Title.tsx";
import SubTitle from "./../product/Shelf/SubTitle.tsx";

export interface Card {
  /**
   * @title Regra
   * @description Por exemplo: "Acima de", "Até", "Abaixo"
   */
  text: string;
  value: string;
  linkToRedirect: string;
}

export interface Props {
  title?: string;
  /**
   * @format html
   */
  subTitle?: string;
  cards: Card[];
}

const DashCard = ({ title, subTitle, cards }: Props) => {
  return (
    <div class="mt-12 container px-5 lg:container lg:flex lg:justify-center lg:flex-col">
      <div class="flex justify-center gap-2 lg:gap-4 flex-col mb-12">
        <Title text={title} />
        <SubTitle text={subTitle} />
      </div>

      <div class="flex flex-wrap gap-5 justify-center 2xl:gap-20">
        {cards.map((card) => {
          return (
            <div class="flex text-black flex-col justify-center items-center max-w-[198px] w-[calc(50%-0.7rem)] lg:w-[calc(25%-0.5rem)] h-[70px] sm:h-[100px] 2xl:h-[120px] border-2 border-primary cursor-pointer">
              <p class="font-normal text-sm md:text-[20px] font-medium text-center">
                {card.text}
              </p>
              <p class="text-center text-base md:text-[25px] font-bold">
                {card.value}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DashCard;
