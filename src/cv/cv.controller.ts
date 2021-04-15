import { Controller, Get } from '@nestjs/common';
import { CvService } from './cv.service';

@Controller('cv')
export class CvController {
  constructor(private cvService: CvService) {}

  @Get()
  async getCvs() {
    return await this.cvService.getCVs();
  }
}
