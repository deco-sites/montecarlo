import Title from "./../product/Shelf/Title.tsx";
import SubTitle from "./../product/Shelf/SubTitle.tsx";

export interface Card {
  text: string;
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

      <div class="flex flex-wrap gap-5 justify-center">
        {cards.map((card) => {
          return (
            <div class="flex justify-center items-center max-w-[283px] w-[calc(50%-0.7rem)] lg:w-[calc(25%-0.5rem)] h-24 md:h-[150px] border-2 border-dashed border-perola+ cursor-pointer">
              <p class="font-normal text-2xl text-perola+ lg:text-[32px]">
                {card.text}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DashCard;
