import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateNoteDto } from './dto/create-note.dto';

@Injectable()
export class NotesRepository{
  constructor(
    private readonly prisma: PrismaService) {
  }

  async findAllByUserId(userId: number) {
    return await this.prisma.note.findMany({
      where: {
        userId,
      },
    });
  }


  async createNote(note: CreateNoteDto) {
    return this.prisma.note.create({
      data: { ...note }
    })
  }

  async findByIdAndUserId(id: number, userId: number) {
    return this.prisma.note.findUnique({
      where: {
        id,
        userId,
      },
    });
  }

  async deleteNote(id: number): Promise<void> {
    await this.prisma.note.delete({
      where: { id },
    });
  }

  async isTitleUniqueForUser(title: string, userId: number) {
    const existingNote = await this.prisma.note.findFirst({
      where: {
        title,
        userId,
      },
    });

    return !!existingNote;
  }
}