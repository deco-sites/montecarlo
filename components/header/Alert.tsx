import { HTMLWidget } from "apps/admin/widgets.ts";
import Slider from "../../components/ui/Slider.tsx";
import SliderJS from "../../islands/SliderJS.tsx";
import { useId } from "../../sdk/useId.ts";
import Icon from "deco-sites/montecarlo/components/ui/Icon.tsx";
import ButtonCopy from "deco-sites/montecarlo/islands/Header/ButtonCopy.tsx";

export interface Alert {
  title?: HTMLWidget;
  labelButton?: string;
  cupom?: string;
}

export interface Props {
  alerts?: Alert[];
  /** @format color-input */
  backgroundAlert: string;
  /**
   * @title Autoplay interval
   * @description time (in seconds) to start the carousel autoplay
   */
  interval?: number;
}

function Buttons() {
  return (
    <>
      <div class="flex items-center justify-center z-10 col-start-1 row-start-1">
        <Slider.PrevButton class=" bg-transparent border-none hover:bg-transparent text-primary">
          <Icon
            class="text-black"
            size={24}
            id="arrowLeftMin"
            strokeWidth={3}
          />
        </Slider.PrevButton>
      </div>
      <div class="flex items-center justify-center z-10 col-start-3 row-start-1">
        <Slider.NextButton class=" bg-transparent border-none hover:bg-transparent text-primary">
          <Icon
            class="text-black"
            size={24}
            id="arrowRightMin"
            strokeWidth={3}
          />
        </Slider.NextButton>
      </div>
    </>
  );
}

function Alert({ alerts = [], interval = 5, backgroundAlert }: Props) {
  const id = useId();

  return (
    <div
      id={id}
      style={{ background: backgroundAlert }}
      class="w-full justify-center items-center py-1 grid grid-cols-[24px_auto_24px]"
    >
      <Slider class="carousel carousel-center  gap-6 col-start-2">
        {alerts.map((alert, index) => (
          <Slider.Item index={index} class="carousel-item">
            <div class="flex flex-row gap-4 justify-center items-center uppercase text-xs">
              {alert.title && (
                <span
                  class="text-secondary-content flex justify-center items-center"
                  dangerouslySetInnerHTML={{ __html: alert.title }}
                >
                </span>
              )}
              <span class="text-secondary-content flex justify-center items-center">
                {alert.labelButton}
              </span>
              <ButtonCopy label={alert.cupom}>
                <div class="text-secondary-content flex justify-center items-center gap-2 cursor-pointer">
                  <span class="uppercase border border-dashed border-black px-1 font-bold">
                    {alert.cupom}
                  </span>
                  <Icon id="FileCopy" size={18} />
                </div>
              </ButtonCopy>
            </div>
          </Slider.Item>
        ))}
      </Slider>

      <Buttons />

      <SliderJS rootId={id} interval={interval && interval * 1e3} />
    </div>
  );
}

export default Alert;
