import {
  Args,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { Owner } from 'src/owners/entities/owner.entity';
import { createpetInput } from './dto/create-pet.input';
import { Pet } from './pet.entity';
import { PetsService } from './pets.service';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
@Resolver((of) => Pet)
export class PetsResolver {
  constructor(private petService: PetsService) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Query((returns) => [Pet])
  async pets() {
    return await this.petService.findAll();
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Query((returns) => [Pet])
  getPet(@Args('id', { type: () => Int }) id: number): Promise<Pet> {
    return this.petService.findOne(id);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Mutation((returns) => Pet)
  async createPet(@Args('createPetInput') createPetInput: createpetInput) {
    return await this.petService.createPet(createPetInput);
  }

  @ResolveField((returns) => Owner)
  owner(@Parent() pet: Pet): Promise<Owner> {
    return this.petService.getOwner(pet.ownerId);
  }
}
