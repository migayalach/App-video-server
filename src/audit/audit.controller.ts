import { Controller, Get, Param, Query } from '@nestjs/common';
import { AuditService } from './audit.service';

@Controller('audit')
export class AuditController {
  constructor(private readonly auditService: AuditService) {}

  @Get('')
  async findAll(
    @Query('idUser') idUser: string,
    @Query('page') page: string,
  ): Promise<any> {
    return await this.auditService.findAll(idUser, +page);
  }

  @Get(':idAudit')
  async findOne(@Param('idAudit') idAudit: string): Promise<any> {
    return await this.auditService.findOne(idAudit);
  }
}
