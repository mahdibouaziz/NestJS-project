import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AddCvDto } from './dto/add-cv.dto';
import { UpdateCvDto } from './dto/update-cv.dto';
import { CvEntity } from './entities/cv.entity';

@Injectable()
export class CvService {
  constructor(
    @InjectRepository(CvEntity)
    private cvRepository: Repository<CvEntity>,
  ) {}

  async getCVs(): Promise<CvEntity[]> {
    return await this.cvRepository.find();
  }

  async addCv(cvDto: AddCvDto): Promise<CvEntity> {
    return await this.cvRepository.save(cvDto);
  }

  //update cv with id
  async updateCv(id: number, cvDto: UpdateCvDto): Promise<CvEntity> {
    const cv = await this.cvRepository.preload({ id, ...cvDto });
    //if we don't have the cv
    if (!cv) {
      throw new NotFoundException(`cv with id=${id} does not exist`);
    }
    return await this.cvRepository.save(cv);
  }

  //update cv with a criteria (example {name="mandi"})
  async updateCvCriteria(criteria: Partial<UpdateCvDto>, cvDto: UpdateCvDto) {
    return await this.cvRepository.update(criteria, cvDto);
  }
}
