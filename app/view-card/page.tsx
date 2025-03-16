import { supabase } from "@/lib/supabaseClient";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function ViewCardsPage() {
  // Fetch all business cards from Supabase
  const { data: cards, error } = await supabase
    .from("business_cards")
    .select("*");

  if (error) {
    return <div>Error loading business cards. Please try again later.</div>;
  }

  return (
    <div className="container mx-auto py-8 max-w-5xl">
      <h1 className="text-2xl font-bold mb-8">View Business Cards</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((card) => (
          <Link href={`/card/${card.slug}`} key={card.id} className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">{card.name}</h2>
            <p className="text-gray-600 mb-2">{card.title}</p>
            <p className="text-gray-600 mb-2">{card.company}</p>
            {/* <div className="mt-4 space-y-2">
              {card.phone && <p><strong>Phone:</strong> {card.phone}</p>}
              {card.email && <p><strong>Email:</strong> {card.email}</p>}
              {card.website && <p><strong>Website:</strong> {card.website}</p>}
              {card.address && <p><strong>Address:</strong> {card.address}</p>}
            </div> */}
            <div className="mt-6 flex space-x-4">
              <Link
                href={`/`}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Share
              </Link>
              <form action={deleteCard} className="inline">
                <input type="hidden" name="id" value={card.id} />
                <button
                  type="submit"
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </form>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

// Delete card action
async function deleteCard(formData: FormData) {
  "use server";

  const id = formData.get("id") as string;

  // Delete the card from Supabase
  const { error } = await supabase
    .from("business_cards")
    .delete()
    .eq("id", id);

  if (error) {
    console.error("Error deleting card:", error);
    throw new Error("Failed to delete card.");
  }

  // Refresh the page after deletion
  redirect("/view-card");
}