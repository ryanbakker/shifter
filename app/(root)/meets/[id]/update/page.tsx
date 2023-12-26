import MeetForm from "@/components/shared/MeetForm";
import { getMeetById } from "@/lib/actions/meet.actions";
import { auth } from "@clerk/nextjs";

type UpdateMeetProps = {
  params: {
    id: string;
  };
};

async function UpdateMeet({ params: { id } }: UpdateMeetProps) {
  const { sessionClaims } = auth();

  const userId = sessionClaims?.userId as string;
  const meet = await getMeetById(id);

  return (
    <>
      <section className="wrapper text-slate-50 flex items-center w-full justify-center mt-6 flex-col space-y-3">
        <h2 className="text-3xl font-medium">Create Meet</h2>
        <p className="text-sm text-slate-200 font-light">
          Provide any relevant details for your meet
        </p>
      </section>

      <div className="wrapper">
        <MeetForm userId={userId} type="Update" meet={meet} meetId={meet._id} />
      </div>
    </>
  );
}

export default UpdateMeet;
