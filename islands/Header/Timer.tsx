import { useEffect, useState, useRef } from "preact/compat";
import { AppContext } from "../../apps/site.ts";
import type { SectionProps } from "deco/types.ts";
import type { Props as Header } from "../../components/header/Header.tsx";

export interface Props {
    text?: string;
    /** @format datetime */
    counter?: string;
    cupom?: string;
}

const style = {
"timer-header": `
    .timer-header {
        background-color: #FFC72C;
        padding: 0 20px;
    }

    .timer-header .text, .timer-header .timer, .timer-header .cupom {
        text-align: center;
    }

    .timer-header-complete {
        display: grid;
        grid-template-rows: auto auto;
        grid-template-columns: 1fr 1fr;
    }

    .timer-header-complete .text {
        grid-column: 1 / -1;
    }

    .timer-header-counter-cupom {
        display: flex;
        justify-content: space-between;
    }

    @media(min-width: 1024px) {
        .timer-header {
            display: flex;
            padding: 0;
        }
    
        .timer-header-complete {
            justify-content: space-between;
            padding: 0 300px 0 135px;
        }
    
        .timer-header-text-counter {
            justify-content: space-between;
            padding: 0 490px 0 443px;
        }
    
        .timer-header-text-cupom {
            justify-content: space-between;
            padding: 0 490px 0 443px;
        }
    
        .timer-header-counter-cupom {
            justify-content: space-between;
            padding: 0 490px 0 550px;
        }
    
        .timer-header-text, .timer-header-counter, .timer-header-cupom {
            justify-content: center;
        }
    }
`,};

function Timer({text, counter, cupom}: SectionProps<typeof loader>) {
    const [timeLeft, setTimeLeft] = useState<number>(0);
    function CopyCupom() {
        navigator.clipboard.writeText(cupom ? cupom : "");
    }

    function getClass() {
        if(text && counter && cupom) {
            return "timer-header-complete";
        } else if (text && counter && !cupom) {
            return "timer-header-text-counter";
        } else if (text && !counter && cupom) {
            return "timer-header-text-cupom";
        } else if (!text && counter && cupom) {
            return "timer-header-counter-cupom";
        } else if (text && !counter && !cupom) {
            return "timer-header-text";
        } else if (!text && counter && !cupom) {
            return "timer-header-counter";
        } else if (!text && !counter && cupom) {
            return "timer-header-cupom";
        }
        return "";
    }

    useEffect(() => {
        const targetTime = counter ? Date.parse(counter) : 0;
        const interval = setInterval(() => {
            const now = new Date().getTime();
            const distance = targetTime - now;
            setTimeLeft(distance);

            if (distance < 0) {
                clearInterval(interval);
                setTimeLeft(0); // Timer expired
            }
        }, 1000);

        return () => clearInterval(interval); // Cleanup on unmount
    }, [counter]);

    // Calculate time components
    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

    return (
        <div class={"timer-header " + getClass()}>
            <style dangerouslySetInnerHTML={{ __html: style["timer-header"] }}></style>
            {text && text.length > 0 &&(
                <p class="text">{text}</p>
            )}
            {counter && counter.length > 0 &&(
                <p class="timer">{days < 10 ? '0'+days : days} : {hours < 10 ? '0'+hours : hours} : {minutes < 10 ? '0'+minutes : minutes} : {seconds < 10 ? '0'+seconds : seconds}</p>
            )}
            {cupom && cupom.length > 0 &&(
                <button class="cupom" onClick={CopyCupom}>{cupom}</button>
            )}
        </div>
    );
}

export const loader = (props: Props, _req: Request) => {
    return { ...props };
};

export default Timer;