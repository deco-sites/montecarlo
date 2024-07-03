import type { Product } from "apps/commerce/types.ts";
import type { Release } from "./Release.tsx";
import type { Discount } from "./Discount.tsx";
import type { Custom } from "./Custom.tsx";

import ReleaseFlag from './Release.tsx';
import DiscountFlag from './Discount.tsx';
import CustomFlag from './Custom.tsx';

export interface Props {
    productAdditionalProperty: Product["additionalProperty"];
    releaseFlag?: Release;
    discountFlag?: Discount;
    customFlag?: Custom;
    isProductPage?: boolean;
}

function Flags({ productAdditionalProperty, releaseFlag, discountFlag, isProductPage }: Props) {
    const releaseProduct = productAdditionalProperty?.filter((eachAdditionalProperty) => { eachAdditionalProperty.value == 'Lançamentos' });
    let isReleaseProduct = releaseProduct && releaseProduct.length > 0;

    const customFlagProduct = productAdditionalProperty?.filter((eachAdditionalProperty) => { eachAdditionalProperty.name == 'flagCustomizada' });
    let isCustomFlagProduct = customFlagProduct && customFlagProduct.length > 0;

    productAdditionalProperty?.forEach((eachAdditionalProperty) => {
        if(eachAdditionalProperty.name == 'flagCustomizada') {
            customFlagProduct?.push(eachAdditionalProperty);
            isCustomFlagProduct = true;
        }

        if(eachAdditionalProperty.value == 'Lançamentos') {
            releaseProduct?.push(eachAdditionalProperty);
            isReleaseProduct = true;
        }
    });

    let propertiesFormatted;

    if (customFlagProduct && isCustomFlagProduct) {
        const properties = customFlagProduct[0].value ? customFlagProduct[0].value : '' ;
        propertiesFormatted = JSON?.parse(properties);
    }

    return (
        <>
            <div className={`${isProductPage ? 'relative top-0 left-0' : 'absolute z-10 top-5 left-3'}`}>
                {isReleaseProduct ? <ReleaseFlag isProductPage={isProductPage} text={releaseFlag?.text} backgroundColor={releaseFlag?.backgroundColor} fontColor={releaseFlag?.fontColor} /> : ''}
                {propertiesFormatted ? <CustomFlag isProductPage={isProductPage} text={propertiesFormatted.textoFlag} textColor={propertiesFormatted.corTexto} backgroundColor={propertiesFormatted.corFundo}  /> : ''}
            </div>
            <div className={`${isProductPage ? 'hidden' : 'block'}`}>
                <DiscountFlag isProductPage={isProductPage} oldPrice={discountFlag?.oldPrice} newPrice={discountFlag?.newPrice} initialText={discountFlag?.initialText} finalText={discountFlag?.finalText} backgroundColor={discountFlag?.backgroundColor} fontColor={discountFlag?.fontColor} />
            </div>
        </>
    );
}

export default Flags;