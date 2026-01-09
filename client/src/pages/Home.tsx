import { useTasksSynced, useCreateTask, useUpdateTask, useDeleteTask } from "@/hooks/use-tasks";
import { AddTaskForm } from "@/components/AddTaskForm";
import { TaskItem } from "@/components/TaskItem";
import { AnimatePresence, motion } from "framer-motion";
import { ListTodo, CheckCircle2, Clock, PlayCircle, BarChart3 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { type TaskStatus } from "@shared/schema";

export default function Home() {
  const { tasks, isLoading } = useTasksSynced();
  const createTask = useCreateTask();
  const updateTask = useUpdateTask();
  const deleteTask = useDeleteTask();

  const counts = {
    total: tasks.length,
    notStarted: tasks.filter(t => t.status === "Not Started").length,
    inProgress: tasks.filter(t => t.status === "In Progress").length,
    completed: tasks.filter(t => t.status === "Completed").length,
  };

  const handleAddTask = (text: string, description: string) => {
    createTask.mutate({ text, description, status: "Not Started" });
  };

  const handleUpdateStatus = (id: number, status: TaskStatus) => {
    updateTask.mutate({ id, status });
  };

  const handleDeleteTask = (id: number) => {
    deleteTask.mutate(id);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50/50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex flex-col items-center justify-center gap-4 text-center">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold tracking-tight text-foreground flex items-center justify-center gap-2">
              <CheckCircle2 className="w-8 h-8 text-primary" />
              TaskMaster Pro
            </h1>
            <p className="text-muted-foreground font-medium">
              Organize your workflow with advanced tracking.
            </p>
          </div>
        </div>

        {/* Dashboard */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Total", value: counts.total, icon: BarChart3, color: "text-slate-600", bg: "bg-slate-100" },
            { label: "Not Started", value: counts.notStarted, icon: Clock, color: "text-orange-600", bg: "bg-orange-50" },
            { label: "In Progress", value: counts.inProgress, icon: PlayCircle, color: "text-blue-600", bg: "bg-blue-50" },
            { label: "Completed", value: counts.completed, icon: CheckCircle2, color: "text-green-600", bg: "bg-green-50" },
          ].map((stat, i) => (
            <Card key={i} className="border-none shadow-sm overflow-hidden">
              <CardContent className="p-4 flex items-center gap-3">
                <div className={`${stat.bg} p-2 rounded-lg`}>
                  <stat.icon className={`w-5 h-5 ${stat.color}`} />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">{stat.label}</p>
                  <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Add Task */}
        <AddTaskForm onAdd={handleAddTask} />

        {/* Task List */}
        <div className="space-y-4">
          <AnimatePresence mode="popLayout">
            {tasks.length === 0 ? (
              <motion.div
                key="empty-state"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-20 bg-white rounded-2xl border-2 border-dashed border-slate-200"
              >
                <ListTodo className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-slate-900">No tasks on your radar</h3>
                <p className="text-slate-500">Time to add something and get moving!</p>
              </motion.div>
            ) : (
              tasks.map((task) => (
                <TaskItem
                  key={task.id}
                  task={task}
                  onUpdateStatus={handleUpdateStatus}
                  onDelete={handleDeleteTask}
                />
              ))
            )}
          </AnimatePresence>
        </div>

        <div className="text-center pt-4">
          <p className="text-xs text-muted-foreground">
            All data persisted in browser storage
          </p>
        </div>
      </div>
    </div>
  );
}
