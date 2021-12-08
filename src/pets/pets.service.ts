import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OwnersService } from 'src/owners/owners.service';
import { Repository } from 'typeorm';
import { createpetInput } from './dto/create-pet.input';
import { Pet } from './pet.entity';

@Injectable()
export class PetsService {
  constructor(
    @InjectRepository(Pet) private petsRepositoy: Repository<Pet>,
    private ownersService: OwnersService,
  ) {}

  async createPet(createpetInput: createpetInput) {
    const newPet = await this.petsRepositoy.create(createpetInput);
    return this.petsRepositoy.save(newPet);
  }

  async findAll() {
    return await this.petsRepositoy.find();
  }

  async findOne(id: number) {
    return await this.petsRepositoy.findOneOrFail(id);
  }

  async getOwner(ownerId: number) {
    return await this.ownersService.findOne(ownerId);
  }
}
