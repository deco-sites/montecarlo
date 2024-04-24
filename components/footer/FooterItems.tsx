import Icon, { AvailableIcons } from "../../components/ui/Icon.tsx";
import { SendEventOnClick } from "../../components/Analytics.tsx";

export type Item = {
  label: string;
  href: string;
};

export type Section = {
  label: string;
  items: Item[];
};

export default function FooterItems({
  sections,
  justify = false,
}: {
  sections: Section[];
  justify: boolean;
}) {
  return (
    <>
      {sections.length > 0 && (
        <>
          {/* Tablet and Desktop view */}
          <ul
            class={`hidden md:flex flex-row gap-6 lg:gap-10 ${
              justify && "lg:justify-between"
            }`}
          >
            {sections.map((section) => (
              <li>
                <div class="flex flex-col gap-2">
                  <span class="font-medium text-sm">{section.label}</span>
                  <ul class={`flex flex-col gap-2 flex-wrap text-sm`}>
                    {section.items?.map((item) => (
                      <li>
                        <a
                          href={item.href}
                          id={item.href.replace("/", "")}
                          class="block py-1 link link-hover text-xs"
                        >
                          {item.label}
                        </a>
                        <SendEventOnClick
                          id={item.href.replace("/", "")}
                          event={{
                            name: "select_item" as const,
                            params: {
                              menu_name: item.label,
                              menu_url: item.href,
                              items: [],
                            },
                          }}
                        />
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </ul>

          {/* Mobile view */}
          <ul class="flex flex-col md:hidden gap-6 font-semibold text-sm">
            {sections.map((section) => (
              <li>
                <div class="collapse collapse-arrowCustom border-b-[1px] border-black rounded-none py-2">
                  <input id={section.label} type="checkbox" class="min-h-[0]" />
                  <label
                    htmlFor={section.label}
                    class="collapse-title min-h-[0] !p-0 flex gap-2"
                  >
                    <span>{section.label}</span>
                  </label>
                  <div class="collapse-content px-0">
                    <ul class={`flex flex-col gap-1 pl-5 pt-2`}>
                      {section.items?.map((item) => (
                        <li>
                          <a
                            href={item.href}
                            class="block py-1 link link-hover text-xs"
                          >
                            {item.label}
                          </a>
                          <SendEventOnClick
                            id={item.href.replace("/", "")}
                            event={{
                              name: "select_item" as const,
                              params: {
                                menu_name: item.label,
                                menu_url: item.href,
                                items: [],
                              },
                            }}
                          />
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </>
      )}
    </>
  );
}
