import prisma from "../middleware/prismaClient.js";
export const User = {
  users: async () => {
    const users = await prisma.User.findMany({});
    return users;
  },
  allNotesUser: async ({ email }) => {
    const userNotes = await prisma.User.findFirst({
      where: { email },
      include: {
        notes: true, // Include the associated notes
      },
    });
    return userNotes;
  },
  createUser: async ({ email, password }) => {
    const user = await prisma.User.create({
      data: { email: email, password: password },
    });
    return user;
  },
  deleteUser: async ({ email }) => {
    await prisma.User.delete({
      where: { email },
    });
    return `user ${email} deleted successfully`;
  },
};
