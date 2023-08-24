export function detectCreditCardType(cardNumber) {
  // Expresiones regulares para los diferentes tipos de tarjetas
  const cardPatterns = {
    visa: /^4[0-9]{12}(?:[0-9]{3})?$/,
    mastercard: /^5[1-5][0-9]{14}$/,
    amex: /^3[47][0-9]{13}$/,
    discover: /^6(?:011|5[0-9]{2})[0-9]{12}$/,
    dinersclub: /^3(?:0[0-5]|[68][0-9])[0-9]{11}$/,
  };

  for (const type in cardPatterns) {
    if (cardPatterns[type].test(cardNumber)) {
      return type;
    }
  }

  return 'unknown';
}