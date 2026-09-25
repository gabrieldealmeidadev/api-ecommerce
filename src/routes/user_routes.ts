import { Router } from "express";
import {
  createUser,
  getAllUser,
  getUserById,
  updateUser,
  deleteUser,
} from "../controllers/user_controller";

const router = Router();

router.post("/", createUser);
router.get("/", getAllUser);
router.get("/:id", getUserById);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router;
