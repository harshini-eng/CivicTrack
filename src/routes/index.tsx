import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Camera } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { addReport, CATEGORIES, type ReportCategory } from "@/lib/reports";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "CivicTrack — Report a Civic Issue" },
      { name: "description", content: "Report potholes, garbage, streetlights and water leakage in your area." },
      { property: "og:title", content: "CivicTrack — Report a Civic Issue" },
      { property: "og:description", content: "Report civic issues in your locality and track their status." },
    ],
  }),
  component: ReportForm,
});

function ReportForm() {
  const navigate = useNavigate();
  const [photo, setPhoto] = useState<string | null>(null);
  const [category, setCategory] = useState<ReportCategory | "">("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");

  const onFile = (f: File | undefined) => {
    if (!f) return;
    if (f.size > 5 * 1024 * 1024) {
      toast.error("Photo must be under 5 MB.");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => setPhoto(reader.result as string);
    reader.readAsDataURL(f);
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!category || !description.trim() || !location.trim()) {
      toast.error("Please fill in category, description and location.");
      return;
    }
    addReport({ category, description: description.trim(), location: location.trim(), photo });
    toast.success("Report submitted. Thank you!");
    navigate({ to: "/reports" });
  };

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <h1 className="text-2xl font-bold text-navy md:text-3xl">Report an Issue</h1>
      <p className="mt-1 text-sm text-muted-foreground">Help your city fix problems faster.</p>

      <form onSubmit={submit} className="mt-6 space-y-5 rounded-lg border bg-card p-5 shadow-sm">
        <div className="space-y-2">
          <Label>Photo</Label>
          <label className="flex min-h-40 cursor-pointer flex-col items-center justify-center gap-2 rounded-md border-2 border-dashed bg-muted/50 p-4 text-sm text-muted-foreground hover:bg-muted">
            {photo ? (
              <img src={photo} alt="Preview" className="max-h-56 rounded object-contain" />
            ) : (
              <>
                <Camera className="h-8 w-8 text-accent" />
                <span>Tap to upload a photo</span>
              </>
            )}
            <input type="file" accept="image/*" className="hidden" onChange={(e) => onFile(e.target.files?.[0])} />
          </label>
        </div>

        <div className="space-y-2">
          <Label>Category</Label>
          <Select value={category} onValueChange={(v) => setCategory(v as ReportCategory)}>
            <SelectTrigger><SelectValue placeholder="Select a category" /></SelectTrigger>
            <SelectContent>
              {CATEGORIES.map((c) => (
                <SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="desc">Description</Label>
          <Textarea id="desc" rows={3} maxLength={500} value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Briefly describe the issue" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="loc">Location</Label>
          <Input id="loc" maxLength={120} value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Area / locality name" />
        </div>

        <Button type="submit" variant="cta" size="lg" className="w-full">Submit Report</Button>
      </form>
    </div>
  );
}
