import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, Request, UseGuards } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { NotesService } from './notes.service'
import { CreateNoteDto } from './dto/create-note.dto'
import { UpdateNoteDto } from './dto/update-note.dto'
import { ApiTags } from '@nestjs/swagger'

@ApiTags('endpoints')
@Controller('notes')
@UseGuards(AuthGuard('jwt'))
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Post()
  create(
    @Body(ValidationPipe) createNoteDto: CreateNoteDto,
    @Request() req: any,
    ) {
    const userId = req.user.id
    createNoteDto.userId = userId
    return this.notesService.create(createNoteDto)
  }

  @Get()
  findAll(@Request() req: any,) {
    const userId = req.user.id
    return this.notesService.findAll(userId)
  }

  @Get(':id')
  findOne(
    @Param('id') id: string,
    @Request() req: any,
    ) {
    const userId = req.user.id
    return this.notesService.findOne(+id, userId)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateNoteDto: UpdateNoteDto) {
    return this.notesService.update(+id, updateNoteDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Request() req: any) {
     const userId = req.user.id
    return this.notesService.remove(+id, userId)
  }
}
