import { useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface AddTaskFormProps {
  onAdd: (text: string, description: string) => void;
}

export function AddTaskForm({ onAdd }: AddTaskFormProps) {
  const [text, setText] = useState('');
  const [description, setDescription] = useState('');
  const [open, setOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      onAdd(text, description);
      setText('');
      setDescription('');
      setOpen(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-full py-6 text-lg font-semibold rounded-xl shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300">
          <Plus className="w-5 h-5 mr-2" strokeWidth={3} />
          Add New Task
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Create New Task</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6 py-4">
          <div className="space-y-2">
            <Label htmlFor="task-name">Task Name</Label>
            <Input
              id="task-name"
              placeholder="Enter task name..."
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="text-base"
              autoFocus
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="task-description">Task Description</Label>
            <Textarea
              id="task-description"
              placeholder="Type more details about the task here..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="min-h-[150px] text-base resize-none"
            />
          </div>
          <DialogFooter className="gap-2 sm:gap-0">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setOpen(false);
                setText('');
                setDescription('');
              }}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={!text.trim()}>
              Submit Task
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
