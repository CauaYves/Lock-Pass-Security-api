import { Injectable, ConflictException, NotFoundException } from '@nestjs/common'
import { CreateNoteDto } from './dto/create-note.dto'
import { UpdateNoteDto } from './dto/update-note.dto'
import { NotesRepository } from './notes.repository'

@Injectable()
export class NotesService {
  constructor(
    private readonly notesRepository: NotesRepository,
  ) {}

  async create(createNoteDto: CreateNoteDto) {
    const existingNote = await this.notesRepository.isTitleUniqueForUser(createNoteDto.title, createNoteDto.userId)
    if (existingNote) throw new ConflictException('Título já existe para este usuário')
    return this.notesRepository.createNote({ ...createNoteDto })
  }

  async findAll(userId: number) {
    return await this.notesRepository.findAllByUserId(userId)
  }

  async findOne(id: number, userId: number) {
    const note = await this.notesRepository.findByIdAndUserId(id, userId)
    if (!note) throw new NotFoundException('Nota não encontrada')
    return note
  }

  update(id: number, updateNoteDto: UpdateNoteDto) {
    return `This action updates a #${id} note`
  }

  async remove(id: number, userId: number) {
    const note = await this.notesRepository.findByIdAndUserId(id, userId)
    if (!note) throw new NotFoundException('Nota não encontrada')
    
    return await this.notesRepository.deleteNote(id)
  }
}
