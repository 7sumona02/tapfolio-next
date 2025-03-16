import { supabase } from "@/lib/supabaseClient";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default async function EditCardPage({ params }: { params: { id: string } }) {
  const { data: card, error } = await supabase
    .from("business_cards")
    .select("*")
    .eq("id", params.id)
    .single();

  if (error) {
    return <div>Error loading card details. Please try again later.</div>;
  }

  async function updateCard(formData: FormData) {
    "use server";

    const id = formData.get("id") as string;
    const name = formData.get("name") as string;
    const title = formData.get("title") as string;
    const company = formData.get("company") as string;
    const phone = formData.get("phone") as string;
    const email = formData.get("email") as string;
    const website = formData.get("website") as string;
    const address = formData.get("address") as string;
    const twitter = formData.get("twitter") as string;
    const linkedin = formData.get("linkedin") as string;
    const github = formData.get("github") as string;

    const { error } = await supabase
      .from("business_cards")
      .update({ name, title, company, phone, email, website, address, twitter, linkedin, github })
      .eq("id", id);

    if (error) {
      console.error("Error updating card:", error);
      throw new Error("Failed to update card.");
    }

    redirect("/view-card");
  }

  return (
    <div className="container mx-auto py-8 max-w-5xl">
      <h1 className="text-2xl font-bold mb-8">Edit Business Card</h1>
      <Card className="w-full bg-white shadow-xl">
        <CardContent className="p-6">
          <form action={updateCard} className="space-y-6">
            <input type="hidden" name="id" value={card.id} />
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Personal Information</h2>
              <div className="grid grid-cols-1 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    name="name"
                    defaultValue={card.name}
                    placeholder="John Doe"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="title">Job Title</Label>
                  <Input
                    id="title"
                    name="title"
                    defaultValue={card.title}
                    placeholder="Marketing Director"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company">Company</Label>
                  <Input
                    id="company"
                    name="company"
                    defaultValue={card.company}
                    placeholder="Green Solutions Inc."
                  />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Contact Information</h2>
              <div className="grid grid-cols-1 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    name="phone"
                    defaultValue={card.phone}
                    placeholder="(555) 123-4567"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    defaultValue={card.email}
                    placeholder="john@example.com"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="website">Website</Label>
                  <Input
                    id="website"
                    name="website"
                    defaultValue={card.website}
                    placeholder="www.example.com"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Input
                    id="address"
                    name="address"
                    defaultValue={card.address}
                    placeholder="123 Business St, City"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Social Media Links</h2>
              <div className="grid grid-cols-1 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="twitter">Twitter</Label>
                  <Input
                    id="twitter"
                    name="twitter"
                    defaultValue={card.twitter}
                    placeholder="https://twitter.com/yourusername"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="linkedin">LinkedIn</Label>
                  <Input
                    id="linkedin"
                    name="linkedin"
                    defaultValue={card.linkedin}
                    placeholder="https://linkedin.com/in/yourusername"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="github">GitHub</Label>
                  <Input
                    id="github"
                    name="github"
                    defaultValue={card.github}
                    placeholder="https://github.com/yourusername"
                  />
                </div>
              </div>
            </div>

            <Button type="submit" className="w-full">
              Save Changes
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}