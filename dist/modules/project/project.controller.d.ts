import { ProjectService } from './project.service';
import { CreateProjectDto } from './dto/create-project.dto';
export declare class ProjectController {
    private readonly projectService;
    constructor(projectService: ProjectService);
    create(createProjectDto: CreateProjectDto): Promise<import("./entities/project.entity").Project>;
    findall(): Promise<import("./entities/project.entity").Project[]>;
    uploadFile(file: Express.Multer.File): string;
    remove(id: string): Promise<void>;
}
