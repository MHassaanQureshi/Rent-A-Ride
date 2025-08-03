import Slipview from "@/app/components/ShowDoc";
import { connectDataBase } from "@/lib/db";
import Slip from "@/models/documents";

interface Props {
  booking_id: string;
  image: [];
}

// dynamically showing slip for each booking
export default async function SlipPage({ params }: { params: { id: string } }) {
  await connectDataBase();

  const slip = await Slip.findOne({ booking_id: params.id }).lean<Props | null>();

  if (!slip) {
    return <div className="text-white p-4">Vehicle not found.</div>;
  }
  const data = JSON.parse(JSON.stringify(slip)) as Props;
  return (
    <div className="flex items-center justify-center w-full">
      <Slipview car={data} />
    </div>
  );
}
