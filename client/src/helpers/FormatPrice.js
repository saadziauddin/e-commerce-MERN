// const FormatPrice = ({price}) => {
//   return Intl.NumberFormat("en-IN", {
//     style: "currency",
//     currency: "INR",
//     maximumFractionDigits: 2
//   }).format(price / 100);
// };

const exchangeRates = {
    INR: 1,
    PKR: 3.5,
    USD: 0.012,
    GBP: 0.0095,
    TRY: 0.34,
    OMR: 0.0047,
    AED: 0.045,
    SAR: 0.045
};

// Helps to map to valid ISO codes
const isoCurrencyCodes = {
    INR: 'INR',
    PKR: 'PKR',
    USD: 'USD',
    GBP: 'GBP',
    TRY: 'TRY',
    OMR: 'OMR',
    AED: 'AED',
    SAR: 'SAR'
};

const FormatPrice = ({ price, currency }) => {
    // console.log("Currency passed:", currency);
    // console.log("Type of currency:", typeof currency);

    if (typeof currency !== "string") {
        throw new TypeError(`Expected a string for currency, got: ${typeof currency}`);
    }

    if (!exchangeRates[currency]) {
        throw new RangeError(`Invalid currency code: ${currency}`);
    }

    // Convert price using exchange rate
    const convertedPrice = price * exchangeRates[currency];

    // Get ISO currency code for formatting
    const isoCurrency = isoCurrencyCodes[currency];

    // Format the converted price using Intl.NumberFormat
    return Intl.NumberFormat("en", {
        style: "currency",
        currency: isoCurrency,
        maximumFractionDigits: 2,
    }).format(convertedPrice);
};

export default FormatPrice;
