import { useEffect, useState } from "preact/hooks";
import Icon from "../../components/ui/Icon.tsx";
import { useUI } from "../../sdk/useUI.ts";

export interface Props {
  comercialTimeNumber: string;
  notComercialTimeNumber: string;
}

function ButtonWhatsapp(
  { comercialTimeNumber, notComercialTimeNumber }: Props,
) {
  const [active, setIsActive] = useState(true);
  const [mouse, setMouse] = useState(false);
  const [isProduct, setIsProduct] = useState(false);
  const [whatsapp, setWhatasapp] = useState("");

  const { isMobile } = useUI();

  function relplaceNumber() {
    const date = new Date();
    const dateOfWeek = date.getDay();
    const HoursOfDay = date.getHours();

    if (dateOfWeek !== 0) {
      if (HoursOfDay >= 10 && HoursOfDay <= 21) {
        setWhatasapp(comercialTimeNumber);
      } else {
        setWhatasapp(notComercialTimeNumber);
      }
    } else {
      if (HoursOfDay >= 14 && HoursOfDay <= 19) {
        setWhatasapp(comercialTimeNumber);
      } else {
        setWhatasapp(notComercialTimeNumber);
      }
    }
  }

  useEffect(() => {
    let timeoutId: number;
    relplaceNumber();
    const handleScroll = () => {
      setIsActive(false);
      clearTimeout(timeoutId);

      timeoutId = setTimeout(() => {
        setIsActive(true);
      }, 500);
    };

    globalThis.window.addEventListener("scroll", handleScroll);

    return () => {
      globalThis.window.removeEventListener("scroll", handleScroll);
      clearTimeout(timeoutId);
    };
  }, []);

  useEffect(() => {
    if (620 > globalThis.window.innerWidth) {
      const url = window.location?.pathname.split("/");
      const path = url ? url[url.length - 1] : "";

      if (path === "p") {
        setIsProduct(true);
      } else {
        setIsProduct(false);
      }
    }
  }, [isProduct]);

  return (
    <>
      {active && !isMobile.value
        ? (
          <div
            onMouseOver={() => setMouse(true)}
            onMouseLeave={() => setMouse(false)}
            class="flex flex-col justify-center items-center gap-2 right-8 z-30"
          >
            <a
              href={`https://wa.me/55${whatsapp}`}
              class="fixed flex bottom-6 right-6 z-40 bg-[#45D268] text-white w-40 h-12 flex-row items-center justify-center p-3 md:py-0 md:px-4 rounded-full no-underline cursor-pointer transition gap-1 ease-in"
              aria-label="Chat on WhatsApp"
            >
              <button
                class="bg-transparent text-white p-0 rounded-full ml-[-5%]"
                aria-label="Chat on WhatsApp"
              >
                <Icon id="WhatsApp" size={28} stroke="0.01" />
              </button>
              <p class="hidden md:flex bg-[#45D268] text-white text-center text-xs capitalize w-20 h-9 items-center justify-center">
                compre pelo whatsApp
              </p>
            </a>
          </div>
        )
        : (
          active && isMobile.value && (
            <div
              onMouseOver={() => setMouse(true)}
              onMouseLeave={() => setMouse(false)}
              class="flex flex-col justify-center items-center gap-2 right-8 z-30"
            >
              <a
                href={`https://wa.me/55${whatsapp}`}
                class="fixed flex bottom-6 right-6 z-40 bg-[#45D268] text-white w-14 h-14 px-3 py-3 rounded-full no-underline cursor-pointer transition gap-0 ease-in"
                aria-label="Chat on WhatsApp"
              >
                <button
                  class="bg-transparent text-white p-0 rounded-full ml-[-5%]"
                  aria-label="Chat on WhatsApp"
                >
                  <Icon id="WhatsApp" size={28} stroke="0.01" />
                </button>
              </a>
            </div>
          )
        )}
    </>
  );
}

export default ButtonWhatsapp;
