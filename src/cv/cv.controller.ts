import {
  Body,
  Controller,
  Delete,
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

  @Get('stats')
  async getStats() {
    return await this.cvService.stats();
  }

  @Get()
  async getCvs(): Promise<CvEntity[]> {
    return await this.cvService.getCVs();
  }

  @Post()
  async addCv(@Body() cvDto: AddCvDto): Promise<CvEntity> {
    return await this.cvService.addCv(cvDto);
  }

  @Get('/:id')
  async getCvById(@Param('id', ParseIntPipe) id: number): Promise<CvEntity> {
    return await this.cvService.getCvById(id);
  }

  @Patch('/:id')
  async updateCV(
    @Body() cvDto: UpdateCvDto,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<CvEntity> {
    return await this.cvService.updateCv(id, cvDto);
  }

  @Delete('/:id')
  async deleteCv(@Param('id', ParseIntPipe) id: number) {
    return await this.cvService.deleteCv(id);
  }

  @Delete('/soft/:id')
  async softDeleteCv(@Param('id', ParseIntPipe) id: number) {
    return await this.cvService.softDeleteCv(id);
  }

  @Post('/restore/:id')
  async softRestoreCv(@Param('id', ParseIntPipe) id: number) {
    return await this.cvService.restoreCv(id);
  }
}
