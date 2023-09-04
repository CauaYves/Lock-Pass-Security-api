import { Injectable, ConflictException, NotFoundException } from '@nestjs/common'
import { CreateCardDto } from './dto/create-card.dto'
import { UpdateCardDto } from './dto/update-card.dto'
import { CardsRepository } from './cards.repository'
import Cryptr = require("cryptr")
import { EncryptedCardDto } from './dto/encrypted-card.dto'
import * as dayjs from 'dayjs'

@Injectable()
export class CardsService {
  constructor(
    private readonly cardsRepository: CardsRepository,
  ) {}

  private readonly cryptr = new Cryptr(process.env.CRYPT)

  async create(createCardDto: CreateCardDto) {
    const existingCard = await this.cardsRepository.isTitleUniqueForUser(createCardDto.title, createCardDto.userId)

    if (existingCard) {
      throw new ConflictException('Title already exists for this user!')
    }

    return this.cardsRepository.createCard(
      {
      ...createCardDto, 
      cvc: this.cryptr.encrypt(createCardDto.cvc.toString()),
      password: this.cryptr.encrypt(createCardDto.password),
      expiry: dayjs(createCardDto.expiry, 'MM-YYYY').toDate(),
      cardNumber: createCardDto.cardNumber.toString()
    })
  }

async findAll(userId: number) {
  const encryptedCards = await this.cardsRepository.findAllByUserId(userId)
  const decryptedCards = encryptedCards.map((encryptedCard) => this.decryptCard(encryptedCard))
  return decryptedCards
}

  async findOne(id: number, userId: number): Promise<CreateCardDto | null> {
    const card = await this.cardsRepository.findByIdAndUserId(id, userId)
    if (!card) throw new NotFoundException('Nota não encontrada')
    return this.decryptCard(card)
  }

  update(id: number, updateCardDto: UpdateCardDto) { return `This action updates a #${id} card` }

  async remove(id: number, userId: number) {
    const card = await this.cardsRepository.findByIdAndUserId(id, userId)
    if (!card) throw new NotFoundException('Note not found!')
  
    return await this.cardsRepository.deleteCard(id)
  }

  private decryptCard(encryptedCard: EncryptedCardDto): CreateCardDto {
      return {
       ...encryptedCard,
       password: this.cryptr.decrypt(encryptedCard.password),
       cvc: this.cryptr.decrypt(encryptedCard.cvc),
       expiry: dayjs(encryptedCard.expiry).format('YYYY-MM'),
       cardNumber: parseInt(encryptedCard.cardNumber),
      }
    }

}
