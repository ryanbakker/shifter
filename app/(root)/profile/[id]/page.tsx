import { getUserById } from "@/lib/actions/user.actions";
import { auth } from "@clerk/nextjs";

function Profile({ params: { id } }: { params: { id: string } }) {
  const { sessionClaims } = auth();
  const userId = sessionClaims?.userId as string;
  const user = getUserById(userId);

  console.log("User => ", user);

  return (
    <div>
      <p>User Profile</p>
    </div>
  );
}

export default Profile;
