import Title from "./../product/Shelf/Title.tsx";
import SubTitle from "./../product/Shelf/SubTitle.tsx";
import {
  SendEventOnClick,
  SendEventOnView,
} from "../../components/Analytics.tsx";
import { useId } from "../../sdk/useId.ts";

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
  const id = useId();

  return (
    <div
      class="mt-12 container px-5 lg:container lg:flex lg:justify-center lg:flex-col"
      id={id}
    >
      <div class="flex justify-center gap-2 lg:gap-4 flex-col mb-12">
        <Title text={title} />
        <SubTitle text={subTitle} />
      </div>

      <div class="flex flex-wrap gap-5 justify-center 2xl:gap-20">
        {cards.map((card, index) => {
          return (
            <div
              class="flex text-black flex-col justify-center items-center max-w-[198px] w-[calc(50%-0.7rem)] lg:w-[calc(25%-0.5rem)] h-[70px] sm:h-[100px] 2xl:h-[120px] border-2 border-primary cursor-pointer"
              id={id + index}
            >
              <p class="font-normal text-sm md:text-[20px] font-medium text-center">
                {card.text}
              </p>
              <p class="text-center text-base md:text-[25px] font-bold">
                {card.value}
              </p>
              <SendEventOnClick
                id={id + index}
                event={{
                  name: "select_promotion",
                  params: {
                    item_list_name: card.text,
                    item_list_id: id + index,
                    promotion_name: card.value,
                    items: [],
                  },
                }}
              />
            </div>
          );
        })}
      </div>
      <SendEventOnView
        id={id}
        event={{
          name: "view_promotion",
          params: {
            view_promotion: "Navegue por categoria",
            creative_name: "Acesse as principais categorias",
            creative_slot: "Acesse as principais categorias",
            promotion_id: id,
            promotion_name: "navegue por categoria",
            items: [],
          },
        }}
      />
    </div>
  );
};

export default DashCard;
