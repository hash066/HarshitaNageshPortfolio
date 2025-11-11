import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { hobbyService } from "@/lib/database";
import { storageService } from "@/lib/storage";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Upload, X } from "lucide-react";

interface AddHobbyDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

export const AddHobbyDialog = ({ open, onOpenChange, onSuccess }: AddHobbyDialogProps) => {
  const { user } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    date: new Date().toISOString().split('T')[0],
    description: "",
    tags: "",
    category: "tech"
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast.error('Please select an image file');
      return;
    }

    // Validate file size (5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('File size must be less than 5MB');
      return;
    }

    setSelectedFile(file);
    
    // Show preview
    const reader = new FileReader();
    reader.onload = (e) => setPreviewUrl(e.target?.result as string);
    reader.readAsDataURL(file);
  };

  const handleRemoveImage = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast.error("You must be logged in to add a hobby");
      return;
    }

    setIsSubmitting(true);
    try {
      // Upload image if selected
      let imageUrl: string | null = null;
      if (selectedFile) {
        toast.loading("Uploading image...");
        imageUrl = await storageService.uploadImage(selectedFile);
        toast.dismiss();
      }

      // Create hobby
      const tagsArray = formData.tags
        .split(',')
        .map(tag => tag.trim())
        .filter(tag => tag.length > 0);

      await hobbyService.createHobby(user.id, {
        title: formData.title,
        date: formData.date,
        description: formData.description,
        tags: tagsArray,
        category: formData.category,
        image_url: imageUrl,
      });

      toast.success("Hobby added successfully!");
      
      // Reset form
      setFormData({
        title: "",
        date: new Date().toISOString().split('T')[0],
        description: "",
        tags: "",
        category: "tech"
      });
      setSelectedFile(null);
      setPreviewUrl(null);
      
      onOpenChange(false);
      onSuccess?.();
    } catch (err) {
      console.error('Failed to add hobby:', err);
      toast.error(err instanceof Error ? err.message : 'Failed to add hobby');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto bg-surface/95 backdrop-blur-sm border-border/50">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-glow">
            Add New Hobby
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Share your latest adventure, project, or interest with the world.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title *</Label>
            <Input
              id="title"
              placeholder="Weekend Hiking Adventure"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
              disabled={isSubmitting}
              className="bg-background/50"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="date">Date *</Label>
              <Input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                required
                disabled={isSubmitting}
                className="bg-background/50"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category *</Label>
              <Select
                value={formData.category}
                onValueChange={(value) => setFormData({ ...formData, category: value })}
                disabled={isSubmitting}
              >
                <SelectTrigger className="bg-background/50">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="tech">Tech</SelectItem>
                  <SelectItem value="outdoor">Outdoor</SelectItem>
                  <SelectItem value="lifestyle">Lifestyle</SelectItem>
                  <SelectItem value="school">School</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Tell us about your experience..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              disabled={isSubmitting}
              rows={4}
              className="bg-background/50 resize-none"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="tags">Tags (comma-separated)</Label>
            <Input
              id="tags"
              placeholder="hiking, nature, photography"
              value={formData.tags}
              onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
              disabled={isSubmitting}
              className="bg-background/50"
            />
            <p className="text-xs text-muted-foreground">Separate tags with commas</p>
          </div>

          <div className="space-y-2">
            <Label>Image (optional)</Label>
            {previewUrl ? (
              <div className="relative">
                <img 
                  src={previewUrl} 
                  alt="Preview" 
                  className="w-full h-48 object-cover rounded-lg border border-border/50"
                />
                <Button
                  type="button"
                  variant="destructive"
                  size="icon"
                  className="absolute top-2 right-2"
                  onClick={handleRemoveImage}
                  disabled={isSubmitting}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-border/50 rounded-lg cursor-pointer hover:border-primary/50 transition-colors bg-background/30">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <Upload className="w-8 h-8 mb-2 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">
                    <span className="font-semibold">Click to upload</span> or drag and drop
                  </p>
                  <p className="text-xs text-muted-foreground">PNG, JPG, GIF up to 5MB</p>
                </div>
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleFileSelect}
                  disabled={isSubmitting}
                />
              </label>
            )}
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={isSubmitting}
              className="shadow-glow"
            >
              {isSubmitting ? "Saving..." : "Add Hobby"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
