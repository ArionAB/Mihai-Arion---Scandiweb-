import StripeCheckout from "react-stripe-checkout";

const StripeCheckoutButton = ({ price }) => {
  const priceForStripe = price * 100;
  const publishableKey =
    "pk_test_51KZGy1FvwcnZohPlzV9v3pW5rwltL0CeTu52Y3i7j3dxHeb2V7WaDMldQzABLBsmix3Ie6HhoHUxErlElO8DQUYs00lVEQUWXG";

  const onToken = (token) => {
    console.log(token);
    alert("Payment Successfull");
  };

  return (
    <StripeCheckout
      label="Pay now"
      name="Scadiweb"
      billingAddress
      shippingAddress
      description={`Your total is ${price}`}
      amount={priceForStripe}
      panelLabel="Pay now"
      token={onToken}
      stripeKey={publishableKey}
    />
  );
};

export default StripeCheckoutButton;
