import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { CvService } from './cv.service';
import { AddCvDto } from './dto/add-cv.dto';
import { UpdateCvDto } from './dto/update-cv.dto';
import { CvEntity } from './entities/cv.entity';

@Controller('cv')
export class CvController {
  constructor(private cvService: CvService) {}

  @Get()
  async getCvs(): Promise<CvEntity[]> {
    return await this.cvService.getCVs();
  }

  @Post()
  async addCv(@Body() cvDto: AddCvDto): Promise<CvEntity> {
    return await this.cvService.addCv(cvDto);
  }

  @Patch('/:id')
  async updateCV(
    @Body() cvDto: UpdateCvDto,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<CvEntity> {
    return await this.cvService.updateCv(id, cvDto);
  }
}
