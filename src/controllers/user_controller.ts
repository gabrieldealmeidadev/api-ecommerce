import { Request, Response } from "express";
import prisma from "../config/prisma";
import { hashPassword } from "../config/bcrypt";

export async function createUser(req: Request, res: Response) {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Todos os campos são obrigatórios",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        message: "A senha deve ter no mínimo 6 caracteres",
      });
    }

    if (name.length < 3) {
      return res.status(400).json({
        message: "O nome deve ter no mínimo 3 caracteres",
      });
    }

    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(email)) {
      return res.status(400).json({
        message: "O email deve ser válido",
      });
    }

    const existingEmail = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (existingEmail) {
      return res.status(400).json({
        message: "O email já está em uso",
      });
    }

    const hashedPassword = await hashPassword(password);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    return res.status(201).json({
      message: "Usuário criado com sucesso",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: "Erro ao criar usuário",
    });
  }
}

export async function getAllUser(req: Request, res: Response) {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return res.status(200).json({
      message: "Usuários encontrados",
      users,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Erro ao buscar usuários",
    });
  }
}

export async function getUserById(req: Request, res: Response) {
  try {
    const { id } = req.params as { id: string };
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });
    if (!user) {
      return res.status(404).json({
        message: "Usuário não encontrado",
      });
    }
    return res.status(200).json({
      message: "Usuário encontrado",
      user,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Erro ao buscar usuário",
    });
  }
}

export async function updateUser(req: Request, res: Response) {
  try {
    const { id } = req.params as { id: string };
    const { name, email, password } = req.body;

    const existingUser = await prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (!existingUser) {
      return res.status(404).json({
        message: "Usuário não encontrado",
      });
    }

    if (!name || !email) {
      return res.status(400).json({
        message: "Nome e email são obrigatórios",
      });
    }

    if (name.length < 3) {
      return res.status(400).json({
        message: "O nome deve ter no mínimo 3 caracteres",
      });
    }

    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!regex.test(email)) {
      return res.status(400).json({
        message: "O email deve ser válido",
      });
    }

    if (password && password.length < 6) {
      return res.status(400).json({
        message: "A senha deve ter no mínimo 6 caracteres",
      });
    }

    const existingEmail = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (existingEmail && existingEmail.id !== id) {
      return res.status(400).json({
        message: "O email já está em uso",
      });
    }

    let hashedPassword = existingUser.password;

    if (password) {
      hashedPassword = await hashPassword(password);
    }

    const user = await prisma.user.update({
      where: {
        id,
      },
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    return res.status(200).json({
      message: "Usuário atualizado com sucesso",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: "Erro ao atualizar usuário",
    });
  }
}

export async function deleteUser(req: Request, res: Response) {
  try {
    const { id } = req.params as { id: string };

    const existingUser = await prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (!existingUser) {
      return res.status(404).json({
        message: "Usuário não encontrado",
      });
    }

    await prisma.user.delete({
      where: {
        id,
      },
    });

    return res.status(200).json({
      message: "Usuário excluído com sucesso",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Erro ao excluir usuário",
    });
  }
}
