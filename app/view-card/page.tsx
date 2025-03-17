import { supabase } from "@/lib/supabaseClient";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ShareModal } from "@/components/ShareModal";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { auth } from "@clerk/nextjs/server";

export default async function ViewCardsPage() {
  const {userId} = await auth();

  // Fetch all business cards from Supabase
  const { data: cards, error } = await supabase
    .from("business_cards")
    .select("*")
    .eq("user_id", userId);

  if (error) {
    return <div>Error loading business cards. Please try again later.</div>;
  }

  return (
    <div className="container mx-auto py-8 max-w-5xl">
      <h1 className="text-2xl font-bold mb-8">View Business Cards</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((card) => (
          <Card key={card.id} className="w-full bg-white shadow-xl">
            <CardContent className="p-6">
              <Link href={`/card/${card.slug}`}>
                <h3 className="text-xl font-bold">{card.name}</h3>
              </Link>
              <p className="text-green-600 font-medium">{card.title}</p>
              <p className="text-sm text-gray-500">{card.company}</p>

              <div className="mt-6 flex space-x-4">
                <ShareModal slug={card.slug}>
                  <Button variant="outline">Share</Button>
                </ShareModal>
                <Link href={`/edit-card/${card.id}`}>
                  <Button variant="outline">Edit</Button>
                </Link>
                <form action={deleteCard} className="inline">
                  <input type="hidden" name="id" value={card.id} />
                  <Button variant="destructive" type="submit">
                    Delete
                  </Button>
                </form>
              </div>
            </CardContent>
          </Card>
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