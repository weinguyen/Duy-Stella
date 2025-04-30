import { Repository } from 'typeorm';
import { Project } from './entities/project.entity';
import { CreateProjectDto } from './dto/create-project.dto';
export declare class ProjectService {
    private readonly projectRespository;
    constructor(projectRespository: Repository<Project>);
    create(createProjectDto: CreateProjectDto): Promise<Project>;
    findAll(): Promise<Project[]>;
    remove(id: string): Promise<void>;
    uploadFile(file: Express.Multer.File): string;
}
