import { useEffect } from "react";
import { Button } from "../ui/button";
import { checkoutOrder } from "@/lib/actions/order.actions";
import { loadStripe } from "@stripe/stripe-js";
import { IMeet } from "@/lib/database/models/meet.model";
import { Heart } from "lucide-react";

loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

const Checkout = ({ meet, userId }: { meet: IMeet; userId: string }) => {
  useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);
    if (query.get("success")) {
      console.log("Order placed! You will receive an email confirmation.");
    }

    if (query.get("canceled")) {
      console.log(
        "Order canceled -- continue to shop around and checkout when you’re ready."
      );
    }
  }, []);

  const onCheckout = async () => {
    const order = {
      meetTitle: meet.title,
      meetId: meet._id,
      price: meet.price,
      isFree: meet.isFree,
      buyerId: userId,
    };

    await checkoutOrder(order);
  };

  return (
    <form action={onCheckout} method="post">
      <Button
        type="submit"
        role="link"
        className="flex flex-row gap-1.5 hover:bg-red-500 hover:text-white transition-all"
      >
        <Heart size={18} /> RSVP
      </Button>
    </form>
  );
};

export default Checkout;
