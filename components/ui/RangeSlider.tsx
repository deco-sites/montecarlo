import { useSection } from "deco/hooks/useSection.ts";
import { formatPrice } from "../../sdk/format.ts";
import { useEffect, useRef, useState } from "preact/hooks";
import { useSignal, useSignalEffect } from "@preact/signals";
import { useScript } from "deco/hooks/useScript.ts";
import htmx from "apps/decohub/apps/htmx.ts";

export interface Props {
  classProps?: string;
  sliderClass?: string;
  name?: string;
  label?: string;
  min: number;
  max: number;
  url: string;
}

function RangeSlider(props: Props) {
  const { label, min, max, sliderClass, classProps, name, url } = props;

  const searchParams = new URLSearchParams(window.location.search);
  const priceFilter = searchParams.get("filter.price");

  const [initialMin, initialMax] = priceFilter
    ? priceFilter.split(":").map(Number)
    : [min, max];

  const onLoad = () => {
    const formatters = new Map<string, Intl.NumberFormat>();

    const formatter = (currency: string, locale: string) => {
      const key = `${currency}::${locale}`;

      if (!formatters.has(key)) {
        formatters.set(
          key,
          new Intl.NumberFormat(locale, {
            style: "currency",
            currency,
          }),
        );
      }

      return formatters.get(key)!;
    };

    const formatPrice = (
      price: number | undefined,
      currency = "BRL",
      locale = "pt-BR",
    ) => price ? formatter(currency, locale).format(price) : null;

    const rangeSlider = document.querySelector("#range-slider");
    const leftKnob = rangeSlider!.querySelector(".knob.left");
    const rightKnob = rangeSlider!.querySelector(".knob.right");
    const rangeFill = rangeSlider!.querySelector(".range-fill");
    const rangeMinInterval = rangeSlider!.querySelector(".range-min-interval");
    const rangeMaxInterval = rangeSlider!.querySelector(".range-max-interval");
    const rangeBar = rangeSlider!.querySelector(".range-bar");

    const min = parseInt(rangeSlider!.getAttribute("min")!);
    const max = parseInt(rangeSlider!.getAttribute("max")!);

    const searchParams = new URLSearchParams(window.location.search);
    const priceFilter = searchParams.get("filter.price");

    const [initialMin, initialMax] = priceFilter
      ? priceFilter.split(":").map(Number)
      : [min, max];

    let leftValue = initialMin;
    let rightValue = initialMax;

    let isDraggingLeft = false;
    let isDraggingRight = false;

    const rangeBarRect = rangeBar!.getBoundingClientRect();
    const valuePerPixel = (max - min) / rangeBarRect.width;

    const initialLeftPosition = (leftValue - min) / valuePerPixel;
    const initialRightPosition = (rightValue - min) / valuePerPixel;

    leftKnob!.style.left = initialLeftPosition + "px";
    rightKnob!.style.left = initialRightPosition - leftKnob!.offsetWidth + "px";
    rangeFill!.style.width = rightKnob!.offsetLeft - leftKnob!.offsetLeft +
      leftKnob!.offsetWidth + "px";
    rangeFill!.style.left = leftKnob!.offsetLeft + "px";

    rangeMinInterval!.textContent = formatPrice(leftValue);
    rangeMaxInterval!.textContent = formatPrice(rightValue);

    const startDragLeft = () => (isDraggingLeft = true);
    const startDragRight = () => (isDraggingRight = true);

    const stopDragging = () => {
      isDraggingLeft = false;
      isDraggingRight = false;

      const queryParams = new URLSearchParams(window.location.search);
      queryParams.set(`filter.price`, `${leftValue}:${rightValue}`);

      const url = `${window.location.pathname}?${queryParams}`;
      rangeSlider.setAttribute("hx-get", url);
      rangeSlider.setAttribute("hx-push-url", "true");
      htmx.trigger(rangeSlider, "trigger-range-change");
    };

    const handleDragSlider = (event: MouseEvent | TouchEvent) => {
      if (isDraggingLeft || isDraggingRight) {
        const rangeBarRect = rangeSlider.querySelector(".range-bar")!
          .getBoundingClientRect();
        const valuePerPixel = (max - min) / rangeBarRect.width;
        let newX = (event instanceof MouseEvent
          ? event.clientX
          : event.touches[0].clientX) - rangeBarRect.left;

        newX = Math.max(0, Math.min(rangeBarRect.width, newX));

        if (isDraggingLeft) {
          leftKnob!.style.left = newX + "px";
          leftValue = Math.round(newX * valuePerPixel) + min;
        }

        if (isDraggingRight) {
          rightKnob!.style.left = newX - leftKnob!.offsetWidth + "px";
          rightValue =
            Math.round((newX + rightKnob!.offsetWidth) * valuePerPixel) + min;
        }

        rangeFill!.style.width = rightKnob!.offsetLeft - leftKnob!.offsetLeft +
          leftKnob!.offsetWidth + "px";
        rangeFill!.style.left = leftKnob!.offsetLeft + "px";

        rangeMinInterval!.textContent = formatPrice(leftValue);
        rangeMaxInterval!.textContent = formatPrice(rightValue);

      }
    };

    leftKnob!.addEventListener("mousedown", startDragLeft);
    rightKnob!.addEventListener("mousedown", startDragRight);
    rangeSlider!.addEventListener("mousemove", handleDragSlider);
    rangeSlider!.addEventListener("mouseup", stopDragging);

    leftKnob!.addEventListener("touchstart", startDragLeft);
    rightKnob!.addEventListener("touchstart", startDragRight);
    rangeSlider!.addEventListener(
      "touchmove",
      (event) => handleDragSlider(event.touches[0]),
    );
    rangeSlider!.addEventListener("touchend", stopDragging);

    htmx.on("trigger-range-change", function (event) {
      event.preventDefault();
      const url = event.target.getAttribute("hx-get");
      history.pushState({}, "", url);
      htmx.ajax("GET", url);
    });
  };

  return (
    <>
      <span class="font-poppins text-sm">{label}</span>
      <div
        class={`relative ${classProps ? classProps : ""}`}
        data-range-slider
        min={initialMin}
        max={initialMax}
        name={name}
        id="range-slider"
        hx-swap="outerHTML"
        hx-target="closest section"
        hx-indicator="#spinner"
        data-url=""
      >
        <div class={`range-slider ${sliderClass ? sliderClass : ""}`}>
          <div class="range-bar">
            <div class="range-fill"></div>
          </div>
          <button class="knob left"></button>
          <button class="knob right"></button>
        </div>

        <div
          class="range-values flex justify-center gap-2 w-[200px] font-poppins text-sm text-[#AAA89C]"
          data-min
          data-max
        >
          <span class="range-min-interval">{formatPrice(initialMin, "BRL")}</span> -{" "}
          {console.log("format", formatPrice(initialMax))}
          <span class="range-max-interval">{formatPrice(initialMax, "BRL")}</span>
        </div>
      </div>
      <script
        type="module"
        dangerouslySetInnerHTML={{ __html: useScript(onLoad) }}
      />
    </>
  );
}

export default RangeSlider;
