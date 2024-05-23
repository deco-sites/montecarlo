import { formatPrice } from "../../sdk/format.ts";
import { useEffect, useRef, useState } from "preact/hooks";

export interface Props { 
    classProps?: string,
    sliderClass?: string,
    min: number,
    max: number,
}

function RangeSlider(props: Props) {
    const { classProps, min, max, sliderClass } = props;

    const rangeSliderRef = useRef<HTMLDivElement>(null);
    const leftKnobRef = useRef<HTMLButtonElement>(null);
    const rightKnobRef = useRef<HTMLButtonElement>(null);
    const rangeFillRef = useRef<HTMLDivElement>(null);

    const [leftValue, setLeftValue] = useState(min);
    const [rightValue, setRightValue] = useState(max);

    useEffect(() => {
        const rangeSlider = rangeSliderRef.current!;
        const rangeBar = rangeSlider.querySelector('.range-bar') as HTMLDivElement;
        const leftKnob = leftKnobRef.current!;
        const rightKnob = rightKnobRef.current!;
        const rangeFill = rangeFillRef.current!;

        let isDraggingLeft = false;
        let isDraggingRight = false;

        const startDragLeft = () => (isDraggingLeft = true);
        const startDragRight = () => (isDraggingRight = true);

        const stopDragging = () => {
            isDraggingLeft = false;
            isDraggingRight = false;
        };

        const handleDragSlider = (event: MouseEvent | Touch) => {
            if (isDraggingLeft || isDraggingRight) {
                const rangeBarRect = rangeBar.getBoundingClientRect();
                let newX = event.clientX - rangeBarRect.left;

                newX = Math.max(0, Math.min(rangeBarRect.width, newX));

                if (isDraggingLeft) {
                    leftKnob.style.left = newX + 'px';
                    if (newX - leftKnob.offsetWidth > rightKnob.offsetLeft) {
                        rightKnob.style.left = newX - leftKnob.offsetWidth + 'px';
                    }
                }

                if (isDraggingRight) {
                    rightKnob.style.left = newX - leftKnob.offsetWidth + 'px';
                    if (newX < leftKnob.offsetLeft) {
                        leftKnob.style.left = newX + 'px';
                    }
                }

                rangeFill.style.width = rightKnob.offsetLeft - leftKnob.offsetLeft + leftKnob.offsetWidth + 'px';
                rangeFill.style.left = leftKnob.offsetLeft + 'px';

                const minValue = parseInt(rangeSlider.getAttribute('min')!);
                const maxValue = parseInt(rangeSlider.getAttribute('max')!);
                const valuePerPixel = (maxValue - minValue) / rangeBarRect.width;

                const leftValue = Math.round(leftKnob.offsetLeft * valuePerPixel) + minValue;
                const rightValue = Math.round((rightKnob.offsetLeft + rightKnob.offsetWidth) * valuePerPixel) + minValue;

                setLeftValue(leftValue);
                setRightValue(rightValue);
            }
        };

        leftKnob.addEventListener('mousedown', startDragLeft);
        rightKnob.addEventListener('mousedown', startDragRight);
        document.addEventListener('mousemove', handleDragSlider as EventListener);
        document.addEventListener('mouseup', stopDragging);

        leftKnob.addEventListener('touchstart', (event) => {
            startDragLeft();
        });
        rightKnob.addEventListener('touchstart', (event) => {
            startDragRight();
        });
        document.addEventListener('touchmove', (event) => {
            handleDragSlider(event.touches[0]);
        });
        document.addEventListener('touchend', stopDragging);

        return () => {
            leftKnob.removeEventListener('mousedown', startDragLeft);
            rightKnob.removeEventListener('mousedown', startDragRight);
            document.removeEventListener('mousemove', handleDragSlider as EventListener);
            document.removeEventListener('mouseup', stopDragging);

            leftKnob.removeEventListener('touchstart', startDragLeft);
            rightKnob.removeEventListener('touchstart', startDragRight);
            document.removeEventListener('touchmove', (event) => {
                handleDragSlider(event.touches[0]);
            });
            document.removeEventListener('touchend', stopDragging);
        };
    }, []);

    return (
        <div class={`relative ${classProps}`}
            ref={rangeSliderRef} data-range-slider min={min} max={max}>
            <div class={`range-slider ${sliderClass}`}>
                <div class="range-bar">
                    <div ref={rangeFillRef} class="range-fill"></div>
                </div>
                <button ref={leftKnobRef} class="knob left"></button>
                <button ref={rightKnobRef} class="knob right"></button>
            </div>

            <div class="flex gap-2 w-[200px] font-poppins text-sm text-[#AAA89C]">
                <span class="range-min-interval">{formatPrice(leftValue)}</span> - <span class="range-max-interval">{formatPrice(rightValue)}</span>
            </div>
        </div>
    );
};

export default RangeSlider;
