export default function handler(req: any, res: any) {
  // Return a simple response for all API requests
  res.status(200).json({ 
    message: "TaskMaster Pro API is running", 
    timestamp: new Date().toISOString(),
    endpoints: {
      getTasks: "GET /api/tasks",
      addTask: "POST /api/tasks",
      updateTask: "PUT /api/tasks/:id",
      deleteTask: "DELETE /api/tasks/:id"
    }
  });
}

export const config = {
  api: {
    externalResolver: true,
  },
};