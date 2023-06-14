import prisma from "../middleware/prismaClient.js";
export const notes = {
  notes: async () => {
    return prisma.note.findMany();
  },
  createNote: async ({ title, content, authorId, status }) => {
    const note = await prisma.note.create({
      data: {
        title,
        content,
        authorId,
        status,
      },
    });
    return note;
  },
  deleteNote: async ({ id }) => {
    await prisma.note.delete({
      where: { id },
    });
    return "note deleted successfully";
  },
  updateStatus: async ({ id, status }) => {
    await prisma.note.update({
      where: { id },
      data: { status },
    });
    return "note updated successfully";
  },
};
