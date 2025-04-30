import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Project } from './entities/project.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProjectDto } from './dto/create-project.dto';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project)
    private readonly projectRespository: Repository<Project>,
  ) {}
  async create(createProjectDto: CreateProjectDto): Promise<Project> {
    const project = this.projectRespository.create(createProjectDto);
    return this.projectRespository.save(project);
  }
  async findAll(): Promise<Project[]> {
    return this.projectRespository.find();
  }
  async remove(id: string): Promise<void> {
    const project = await this.projectRespository.findOneById(id);
    if (project?.image) {
      const filepath = path.join(__dirname, '..', '..', '..', project.image);
      fs.promises.unlink(filepath);
    }

    await this.projectRespository.delete(id);
  }
  uploadFile(file: Express.Multer.File): string {
    return file.path;
  }
}
