import { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { checkoutOrder } from "@/lib/actions/order.actions";
import { loadStripe } from "@stripe/stripe-js";
import { IMeet } from "@/lib/database/models/meet.model";
import { Heart } from "lucide-react";

loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

const Checkout = ({ meet, userId }: { meet: IMeet; userId: string }) => {
  const [loading, setLoading] = useState(false);

  const handleButtonClick = async () => {
    setLoading(true);

    // Add a delay (1 second in this case)
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const order = {
      meetTitle: meet.title,
      meetId: meet._id,
      price: meet.price,
      isFree: meet.isFree,
      buyerId: userId,
    };

    await checkoutOrder(order);

    // Reset loading state after submission
    setLoading(false);
  };

  return (
    <form onSubmit={handleButtonClick}>
      <Button
        type="submit"
        role="link"
        className={`rounded-md sm:w-fit py-5 px-6 ${
          loading
            ? "bg-red-500 text-white cursor-not-allowed"
            : "bg-white text-red-500"
        } flex flex-row gap-1.5 hover:bg-red-500 hover:text-white transition-all`}
        disabled={loading}
      >
        {loading ? <Heart size={18} fill="white" /> : <Heart size={18} />} RSVP
      </Button>
    </form>
  );
};

export default Checkout;
