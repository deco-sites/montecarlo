import { formatPrice } from "../../sdk/format.ts";
import { useEffect, useRef, useState } from "preact/hooks";

export interface Props { 
    classProps?: string,
    sliderClass?: string,
    name?: string,
    label?: string,
    min: number,
    max: number,
}

function RangeSlider(props: Props) {
    const { classProps, min, max, sliderClass, label, name } = props;

    const rangeSliderRef = useRef<HTMLDivElement>(null);
    const leftKnobRef = useRef<HTMLButtonElement>(null);
    const rightKnobRef = useRef<HTMLButtonElement>(null);
    const rangeFillRef = useRef<HTMLDivElement>(null);

    const queryParams = new URLSearchParams(window.location.search);
    const filter = queryParams.get(`filter.${name}`);
    const [initialMin, initialMax] = filter ? filter.split(':').map(Number) : [min, max];

    const [leftValue, setLeftValue] = useState(initialMin);
    const [rightValue, setRightValue] = useState(initialMax);

    const leftValueRef = useRef(leftValue);
    const rightValueRef = useRef(rightValue);

    useEffect(() => {
        leftValueRef.current = leftValue;
    }, [leftValue]);

    useEffect(() => {
        rightValueRef.current = rightValue;
    }, [rightValue]);

    useEffect(() => {
        const rangeSlider = rangeSliderRef.current!;
        const rangeBar = rangeSlider.querySelector('.range-bar') as HTMLDivElement;
        const leftKnob = leftKnobRef.current!;
        const rightKnob = rightKnobRef.current!;
        const rangeFill = rangeFillRef.current!;

        const rangeBarRect = rangeBar.getBoundingClientRect();
        const valuePerPixel = (max - min) / rangeBarRect.width;

        const initialLeftPosition = (initialMin - min) / valuePerPixel;
        const initialRightPosition = (initialMax - min) / valuePerPixel;

        leftKnob.style.left = initialLeftPosition + 'px';
        rightKnob.style.left = initialRightPosition - leftKnob.offsetWidth + 'px';
        rangeFill.style.width = rightKnob.offsetLeft - leftKnob.offsetLeft + leftKnob.offsetWidth + 'px';
        rangeFill.style.left = leftKnob.offsetLeft + 'px';

        let isDraggingLeft = false;
        let isDraggingRight = false;

        const startDragLeft = () => (isDraggingLeft = true);
        const startDragRight = () => (isDraggingRight = true);

        const stopDragging = () => {
            isDraggingLeft = false;
            isDraggingRight = false;

            const queryParams = new URLSearchParams(window.location.search);
            queryParams.set(`filter.${name}`, `${leftValueRef.current}:${rightValueRef.current}`);

            window.location.href = `${window.location.origin}${window.location.pathname}?${queryParams}`;
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
        rangeSlider.addEventListener('mousemove', handleDragSlider as EventListener);
        rangeSlider.addEventListener('mouseup', stopDragging);

        leftKnob.addEventListener('touchstart', (event) => {
            startDragLeft();
        });
        rightKnob.addEventListener('touchstart', (event) => {
            startDragRight();
        });
        rangeSlider.addEventListener('touchmove', (event) => {
            handleDragSlider(event.touches[0]);
        });
        rangeSlider.addEventListener('touchend', stopDragging);

        return () => {
            leftKnob.removeEventListener('mousedown', startDragLeft);
            rightKnob.removeEventListener('mousedown', startDragRight);
            rangeSlider.removeEventListener('mousemove', handleDragSlider as EventListener);
            rangeSlider.removeEventListener('mouseup', stopDragging);

            leftKnob.removeEventListener('touchstart', startDragLeft);
            rightKnob.removeEventListener('touchstart', startDragRight);
            rangeSlider.removeEventListener('touchmove', (event) => {
                handleDragSlider(event.touches[0]);
            });
            rangeSlider.removeEventListener('touchend', stopDragging);
        };
    }, [min, max, initialMin, initialMax, name]);

    return (
        <>
            <span class="font-poppins text-sm">{label}</span>
            <div class={`relative ${classProps}`}
                ref={rangeSliderRef} data-range-slider min={min} max={max} name={name}>
                <div class={`range-slider ${sliderClass}`}>
                    <div class="range-bar">
                        <div ref={rangeFillRef} class="range-fill"></div>
                    </div>
                    <button ref={leftKnobRef} class="knob left"></button>
                    <button ref={rightKnobRef} class="knob right"></button>
                </div>

                <div class="flex gap-2 w-[200px] font-poppins text-sm text-[#AAA89C]">
                    <span class="range-min-interval">{formatPrice(leftValue ? leftValue : 1)}</span> - <span class="range-max-interval">{formatPrice(rightValue ? rightValue : 1)}</span>
                </div>
            </div>
        </>
    );
};

export default RangeSlider;
