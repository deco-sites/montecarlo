import Icon from "deco-sites/montecarlo/components/ui/Icon.tsx";
import { HTMLWidget } from "apps/admin/widgets.ts";
import {
  SendEventOnClick,
  SendEventOnView,
} from "../../components/Analytics.tsx";
import { useUI } from "../../sdk/useUI.ts";
import { useId } from "deco-sites/montecarlo/sdk/useId.ts";

export interface State {
  /** @title State */
  label: string;
  cities: City[];
}

export interface City {
  /** @title City */
  label: string;
  startsOpen?: boolean;
  stores?: StoreInfo[];
}

interface Phone {
  /** @title Phone */
  label: string;
  href?: string;
}

export interface StoreInfo {
  /** @title Store */
  label: string;
  address: HTMLWidget;
  phone?: Phone[];
  mapLink?: string;
}

export interface Props {
  title?: string;
  description?: string;
  sac?: HTMLWidget;
  info?: State[];
}

export default function StoresInfo(props: Props) {
  const { title, description, sac, info } = props;

  const id = useId();

  return (
    <div class="flex flex-col gap-5 container py-10 px-5 md:grid md:grid-cols-2 md:px-14 md:py-14 max-w-[1440px]">
      {title || description
        ? (
          <div class="flex flex-col gap-3 px-10">
            {title
              ? (
                <h2 class="font-poppins text-2xl md:text-[40px] md:leading-[44px]">
                  {title}
                </h2>
              )
              : null}
            {description
              ? <p class="font-poppins text-sm font-medium">{description}</p>
              : null}
          </div>
        )
        : null}

      {info
        ? (
          <div class="flex flex-col gap-2 md:row-span-3">
            {info.map((state, index) => (
              <State key={index} title={state.label}>
                <div class="flex flex-col gap-2 mt-2 mb-3">
                  {state.cities?.map((city, index) => (
                    <City
                      key={index}
                      title={city.label}
                      startsOpen={city.startsOpen}
                    >
                      {city.stores?.map((store, index) => (
                        <>
                          <div
                            key={index}
                            class="flex flex-col gap-5 mx-5"
                            id={id + index}
                          >
                            <h5 class="font-poppins font-semibold text-sm">
                              {store.label}
                            </h5>
                            {store.address
                              ? (
                                <div class="flex flex-col gap-2">
                                  <span class="font-poppins text-xs uppercase">
                                    Endereço:
                                  </span>
                                  <div
                                    class="font-poppins text-sm"
                                    dangerouslySetInnerHTML={{
                                      __html: store.address,
                                    }}
                                  />
                                </div>
                              )
                              : null}
                            {store.phone && store.phone.length > 0
                              ? (
                                <div class="flex flex-col gap-2">
                                  <span class="font-poppins text-xs uppercase">
                                    Telefone:
                                  </span>
                                  {store.phone.map((phone, index) => (
                                    <a
                                      class="font-poppins text-sm"
                                      key={index}
                                      href={phone.href}
                                    >
                                      {phone.label}
                                    </a>
                                  ))}
                                </div>
                              )
                              : null}
                            {store.mapLink
                              ? (
                                <a
                                  href={store.mapLink}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  class="font-poppins text-sm w-fit border-b border-[#FFC72C]"
                                  id={id + index + "link"}
                                >
                                  <SendEventOnClick
                                    id={id + "desktopClick"}
                                    event={{
                                      name: "select_item",
                                      params: {
                                        item_list_id: id + "desktopClick",
                                        item_list_name: image.label,
                                        items: [],
                                      },
                                    }}
                                  />
                                  Traçar Rotas
                                </a>
                              )
                              : null}
                            <SendEventOnView
                              id={id + index}
                              event={{
                                name: "view_item_list",
                                params: {
                                  item_list_id: id + index,
                                  item_list_name: store.label,
                                  items: [],
                                },
                              }}
                            />
                          </div>
                          <hr class="h-px bg-gray-200 border-0 last:hidden" />
                        </>
                      ))}
                    </City>
                  ))}
                </div>
              </State>
            ))}
          </div>
        )
        : null}

      {sac
        ? (
          <div
            class="font-poppins text-sm px-10 md:py-10"
            dangerouslySetInnerHTML={{ __html: sac }}
          />
        )
        : null}
    </div>
  );
}

interface InfoProps {
  title: string;
  startsOpen?: boolean;
  children?: preact.ComponentChildren;
}

function State(props: InfoProps) {
  const { title, children } = props;

  return (
    <details class={`group/State`}>
      <summary
        class={`flex cursor-pointer items-center justify-between bg-[#F5F3E7] py-2 px-3`}
      >
        <h4 class={`group-open/State:font-semibold font-poppins text-sm ml-2`}>
          {title}
        </h4>
        <Icon
          class={`transform transition-transform rotate-45 group-open/State:rotate-90`}
          size={15}
          id="Close"
        >
        </Icon>
      </summary>
      <div>
        {children}
      </div>
    </details>
  );
}

function City(props: InfoProps) {
  const { title, children, startsOpen } = props;

  return (
    <details class={`group/City`} open={startsOpen}>
      <summary
        class={`flex cursor-pointer items-center justify-between bg-[#F8F7F3] py-2 px-3`}
      >
        <h4 class={`group-open/City:font-semibold font-poppins text-sm ml-2`}>
          {title}
        </h4>
        <Icon
          class={`transform transition-transform rotate-45 group-open/City:rotate-90`}
          size={15}
          id="Close"
        >
        </Icon>
      </summary>
      <div class="flex flex-col mt-5 mb-2 gap-5">
        {children}
      </div>
    </details>
  );
}
