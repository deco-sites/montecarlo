import { useScriptAsDataURI } from "deco/hooks/useScript.ts";
import { Script } from "apps/website/types.ts";

const snippet = () => {
    addEventListener("pushstate", (e) => {
        e.preventDefault()
        if(e.arguments?.[2]){
            window.location.href = window.location.origin + e.arguments[2]
        }
    });
};

const loader = (): Script => {
  const transformReq = () => {

    const script = `<script defer src="${
      useScriptAsDataURI(snippet)
    }"></script>`;

    return script;
  };
  return ({ src: transformReq });
};

export default loader;
