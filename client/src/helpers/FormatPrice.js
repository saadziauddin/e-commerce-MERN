const exchangeRates = {
    PKR: 1,
    USD: 0.0036,
    AED: 0.013,
    SAR: 0.014,
    OMR: 0.0014,
    TRY: 0.12,
    GBP: 0.0028
};

const currencyCodes = {
    PKR: 'PKR',
    USD: 'USD',
    AED: 'AED',
    SAR: 'SAR',
    OMR: 'OMR',
    TRY: 'TRY',
    GBP: 'GBP',
};

const FormatPrice = ({ price, currency }) => {
    if (typeof currency !== "string") {
        throw new TypeError(`Expected a string for currency, got: ${typeof currency}`);
    }
    if (!exchangeRates[currency]) {
        throw new RangeError(`Invalid currency code: ${currency}`);
    }
    const convertedPrice = price * exchangeRates[currency];
    
    const currencyCode = currencyCodes[currency];

    return Intl.NumberFormat("en", {
        style: "currency",
        currency: currencyCode,
        maximumFractionDigits: 2,
    }).format(convertedPrice);
};

export default FormatPrice;
