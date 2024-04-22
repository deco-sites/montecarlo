/**
 * This file takes care of global app side effects,
 * like clicking on add to cart and the cart modal being displayed
 */

import { signal } from "@preact/signals";
import { ProductListingPage } from "apps/commerce/types.ts";

export const page = signal<ProductListingPage | null>(null);