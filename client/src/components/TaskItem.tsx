import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2, GripVertical } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { type Task, type TaskStatus, TASK_STATUS } from "@shared/schema";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface TaskItemProps {
  task: Task;
  onUpdateStatus: (id: number, status: TaskStatus) => void;
  onDelete: (id: number) => void;
}

export function TaskItem({ task, onUpdateStatus, onDelete }: TaskItemProps) {
  const statusStyles: Record<TaskStatus, string> = {
    "Not Started": "bg-slate-100 text-slate-700 border-slate-200",
    "In Progress": "bg-blue-100 text-blue-700 border-blue-200",
    "Completed": "bg-green-100 text-green-700 border-green-200",
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.2 }}
    >
      <Card className={cn(
        "group border shadow-sm transition-all hover:shadow-md",
        task.status === "Completed" && "bg-slate-50/50"
      )}>
        <CardContent className="p-4 flex items-center gap-4">
          <GripVertical className="w-4 h-4 text-slate-300 group-hover:text-slate-400 shrink-0" />
          
          <div className="flex-1 min-w-0">
            <p className={cn(
              "text-base font-semibold text-foreground transition-all truncate",
              task.status === "Completed" && "line-through text-muted-foreground"
            )}>
              {task.text}
            </p>
            {task.description && (
              <p className={cn(
                "text-sm text-muted-foreground line-clamp-1 mt-0.5",
                task.status === "Completed" && "line-through opacity-50"
              )}>
                {task.description}
              </p>
            )}
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <Select
              value={task.status}
              onValueChange={(value) => onUpdateStatus(task.id, value as TaskStatus)}
            >
              <SelectTrigger className={cn(
                "h-8 w-[130px] text-[10px] font-bold uppercase rounded-full border shadow-none",
                statusStyles[task.status as TaskStatus]
              )}>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {TASK_STATUS.map((status) => (
                  <SelectItem key={status} value={status} className="text-xs">
                    {status}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-slate-400 hover:text-destructive hover:bg-destructive/10 rounded-full"
              onClick={() => onDelete(task.id)}
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
