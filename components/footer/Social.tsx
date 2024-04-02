import Icon, { AvailableIcons } from "../../components/ui/Icon.tsx";

export interface SocialItem {
  label:
    | "Discord"
    | "Facebook"
    | "Instagram"
    | "Linkedin"
    | "Tiktok"
    | "Twitter";
  link: string;
}

export default function Social(
  { content, vertical = false }: {
    content?: { title?: string; items?: SocialItem[] };
    vertical?: boolean;
  },
) {
  return (
    <>
      {content && content.items && content.items.length > 0 && (
        <ul
          class={`flex gap-4 justify-center lg:justify-start ${
            vertical ? "lg:flex-col lg:items-start" : "flex-wrap items-center"
          }`}
        >
          {content.items.map((item) => {
            return (
              <li>
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${item.label} Logo`}
                  class="flex gap-2 items-center"
                >
                  <span class="block p-1">
                    <Icon size={24} id={item.label} />
                  </span>
                  {vertical && (
                    <div class="text-sm hidden lg:block">{item.label}</div>
                  )}
                </a>
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
}
