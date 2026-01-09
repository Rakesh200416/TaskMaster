import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";
import type { Express } from "express";
import type { Server } from "http";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  app.get(api.tasks.list.path, async (req, res) => {
    const tasks = await storage.getTasks();
    res.json(tasks);
  });

  app.post(api.tasks.create.path, async (req, res) => {
    try {
      const input = api.tasks.create.input.parse(req.body);
      const task = await storage.createTask(input);
      res.status(201).json(task);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
        });
      }
      res.status(500).json({ message: "Internal Server Error" });
    }
  });

  app.put(api.tasks.update.path, async (req, res) => {
    const id = Number(req.params.id);
    try {
      const input = api.tasks.update.input.parse(req.body);
      const task = await storage.updateTask(id, input);
      res.json(task);
    } catch (err) {
      res.status(404).json({ message: "Task not found" });
    }
  });

  app.delete(api.tasks.delete.path, async (req, res) => {
    const id = Number(req.params.id);
    await storage.deleteTask(id);
    res.status(204).send();
  });

  return httpServer;
}
