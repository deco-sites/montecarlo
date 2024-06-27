import { HTMLWidget } from "apps/admin/widgets.ts";
import Slider from "../../components/ui/Slider.tsx";
import SliderJS from "../../islands/SliderJS.tsx";
import { useId } from "../../sdk/useId.ts";
import Icon from "deco-sites/montecarlo/components/ui/Icon.tsx";
import ButtonCopy from "deco-sites/montecarlo/islands/Header/ButtonCopy.tsx";
import { useUI } from "deco-sites/montecarlo/sdk/useUI.ts";

export interface Alert {
  title?: HTMLWidget;
  labelButton?: string;
  cupom?: string;
}

export interface Props {
  alerts?: Alert[];
  /**
   * @title Autoplay interval
   * @description time (in seconds) to start the carousel autoplay
   */
  interval?: number;
}

function Buttons() {
  return (
    <>
      <div class="flex items-center justify-center z-10 col-start-1 row-start-1 absolute md:left-1/4">
        <Slider.PrevButton class=" bg-transparent border-none hover:bg-transparent text-primary">
          <Icon
            class="text-black"
            size={24}
            id="arrowLeftMin"
            strokeWidth={3}
          />
        </Slider.PrevButton>
      </div>
      <div class="flex items-center justify-center z-10 col-start-3 row-start-1 absolute md:left-3/4">
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

const style = {
  "show-alert": `@keyframes show-alert{
        from{
          transform: translateY(0px);
        }
        to{
          transform: translateY(-32px);
        }
  }
  
  .show-alert{
    animation: show-alert linear;
    animation-timeline: scroll();
    animation-range: 0% 1%;
    animation-fill-mode: both;
  }
  `,

  "show-alert-mobile": `@keyframes show-alert-mobile{
      from{
        transform: translateY(0px);
      }
      to{
        transform: translateY(85px);
        background: #ffffff40;
        }
    }

  .show-alert{
    animation: show-alert-mobile linear;
    animation-timeline: scroll();
    animation-range: 0% 1%;
    animation-fill-mode: both;
    }
  `,
};

function Alert({ alerts = [], interval = 5 }: Props) {
  const id = useId();

  const { isMobile } = useUI();

  return (
    <div
      id={id}
      class="relative w-full justify-center items-center py-1 px-0 md:px-5 grid md:flex grid-cols-[24px_auto_24px] show-alert bg-primary"
    >
      <style
        dangerouslySetInnerHTML={{
          __html: style[isMobile.value ? "show-alert-mobile" : "show-alert"],
        }}
      >
      </style>
      <Slider class="carousel carousel-center gap-6 col-start-2">
        {alerts.map((alert, index) => (
          <Slider.Item index={index} class="carousel-item">
            <div class="flex flex-row gap-4 justify-center items-center uppercase text-xs w-screen">
              {alert.title && (
                <span
                  class="text-secondary-content flex justify-center items-center"
                  dangerouslySetInnerHTML={{ __html: alert.title }}
                >
                </span>
              )}
              {
                alert.labelButton ? (
                  <span class="text-secondary-content flex justify-center items-center">
                    {alert.labelButton}
                  </span>
                ) : null
              }
              {
                alert.labelButton ? (
                  <ButtonCopy label={alert.cupom}>
                    <div class="text-secondary-content flex justify-center items-center gap-2 cursor-pointer">
                      <span class="uppercase border border-dashed border-black px-1 font-bold">
                        {alert.cupom}
                      </span>
                      <Icon id="FileCopy" size={18} />
                    </div>
                  </ButtonCopy>
                ) : null
              }
            </div>
          </Slider.Item>
        ))}
      </Slider>

      <Buttons />

      <SliderJS rootId={id} interval={interval && interval * 1e3} infinite={true} />
    </div>
  );
}

export default Alert;
