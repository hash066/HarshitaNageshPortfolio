import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useRealtimeHobbies } from "@/hooks/useRealtimeHobbies";
import { hobbyService } from "@/lib/database";
import Navigation from "@/components/Navigation";
import { AddHobbyDialog } from "@/components/AddHobbyDialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Plus, Loader2, Trash2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";

const Hobbies = () => {
  const { user, isLoading: authLoading } = useAuth();
  const { hobbies, isLoading: hobbiesLoading, error, refetch } = useRealtimeHobbies();
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [hobbyToDelete, setHobbyToDelete] = useState<number | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const categories = [
    { id: "all", label: "All" },
    { id: "tech", label: "Tech" },
    { id: "outdoor", label: "Outdoor" },
    { id: "lifestyle", label: "Lifestyle" },
    { id: "school", label: "School" }
  ];

  const filteredEntries = selectedCategory === "all" 
    ? hobbies 
    : hobbies.filter(entry => entry.category === selectedCategory);

  const handleAddClick = () => {
    if (!user) {
      navigate("/login");
      return;
    }
    setIsAddDialogOpen(true);
  };

  const handleSuccess = () => {
    refetch();
  };

  const handleDeleteClick = (hobbyId: number) => {
    setHobbyToDelete(hobbyId);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!hobbyToDelete) return;
    
    setIsDeleting(true);
    try {
      await hobbyService.deleteHobby(hobbyToDelete);
      toast.success("Hobby deleted successfully!");
      refetch();
    } catch (err) {
      console.error('Failed to delete hobby:', err);
      toast.error(err instanceof Error ? err.message : 'Failed to delete hobby');
    } finally {
      setIsDeleting(false);
      setDeleteDialogOpen(false);
      setHobbyToDelete(null);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="pt-24 pb-20">
        <div className="max-w-6xl mx-auto px-6">
          {/* Header */}
          <div className="text-center mb-12 animate-fade-in">
            <h1 className="text-4xl font-bold mb-4 text-glow">
              Personal <span className="text-primary">Corner</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              A glimpse into my world beyond code - adventures, thoughts, and moments worth sharing.
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex justify-center mb-8 animate-slide-up">
            <div className="flex flex-wrap gap-2 p-2 bg-surface/50 backdrop-blur-sm rounded-xl border border-border/50">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                    selectedCategory === category.id
                      ? "bg-primary text-primary-foreground shadow-glow"
                      : "text-muted-foreground hover:text-foreground hover:bg-surface"
                  }`}
                >
                  {category.label}
                </button>
              ))}
            </div>
          </div>

          {/* Loading State */}
          {(authLoading || hobbiesLoading) && (
            <div className="flex flex-col items-center justify-center py-20">
              <Loader2 className="w-12 h-12 animate-spin text-primary mb-4" />
              <p className="text-muted-foreground">Loading hobbies...</p>
            </div>
          )}

          {/* Error State */}
          {error && !hobbiesLoading && (
            <div className="text-center py-20">
              <div className="text-6xl mb-4 opacity-50">⚠️</div>
              <h3 className="text-xl font-semibold mb-2 text-destructive">Error Loading Hobbies</h3>
              <p className="text-muted-foreground mb-4">{error}</p>
              <Button onClick={() => refetch()}>Try Again</Button>
            </div>
          )}

          {/* Entries Grid */}
          {!authLoading && !hobbiesLoading && !error && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredEntries.map((entry, index) => (
                  <Card 
                    key={entry.id} 
                    className="group hover-lift bg-surface/30 backdrop-blur-sm border-border/50 hover:border-primary/50 transition-all duration-500 relative"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    {/* Delete Button - Only visible to admin */}
                    {user && (
                      <Button
                        variant="destructive"
                        size="icon"
                        className="absolute top-2 right-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-lg"
                        onClick={() => handleDeleteClick(entry.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}

                    {entry.image_url && (
                      <div className="relative overflow-hidden rounded-t-lg">
                        <img 
                          src={entry.image_url} 
                          alt={entry.title}
                          className="w-full h-48 object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-surface/50 to-transparent" />
                      </div>
                    )}
                    
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start mb-2">
                        <CardTitle className="text-lg text-glow">{entry.title}</CardTitle>
                        <span className="text-xs text-muted-foreground">
                          {new Date(entry.date).toLocaleDateString()}
                        </span>
                      </div>
                    </CardHeader>
                    
                    <CardContent className="pt-0">
                      {entry.description && (
                        <p className="text-muted-foreground mb-4 leading-relaxed">
                          {entry.description}
                        </p>
                      )}
                      
                      {entry.tags && entry.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {entry.tags.map((tag) => (
                            <Badge 
                              key={tag} 
                              variant="secondary" 
                              className="text-xs bg-primary/10 text-primary border-primary/20"
                            >
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Empty State */}
              {filteredEntries.length === 0 && (
                <div className="text-center py-20">
                  <div className="text-6xl mb-4 opacity-50">🌟</div>
                  <h3 className="text-xl font-semibold mb-2">No entries yet</h3>
                  <p className="text-muted-foreground mb-6">
                    {selectedCategory === "all" 
                      ? "Be the first to share your hobbies!"
                      : `No ${selectedCategory} entries found. Try a different category.`
                    }
                  </p>
                  {user && (
                    <Button onClick={handleAddClick} className="shadow-glow">
                      <Plus className="w-4 h-4 mr-2" />
                      Add Your First Hobby
                    </Button>
                  )}
                </div>
              )}

              {/* Add Button - Fixed at bottom */}
              {filteredEntries.length > 0 && (
                <div className="fixed bottom-8 right-8 z-40">
                  <Button
                    size="lg"
                    onClick={handleAddClick}
                    className="rounded-full shadow-2xl shadow-primary/50 hover:shadow-primary/70 transition-all duration-300 h-16 w-16 p-0"
                  >
                    <Plus className="w-6 h-6" />
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Add Hobby Dialog */}
      <AddHobbyDialog 
        open={isAddDialogOpen} 
        onOpenChange={setIsAddDialogOpen}
        onSuccess={handleSuccess}
      />

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent className="bg-surface/95 backdrop-blur-sm border-border/50">
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Hobby</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this hobby? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmDelete}
              disabled={isDeleting}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Hobbies;