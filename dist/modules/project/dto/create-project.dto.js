"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateProjectDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const project_entity_1 = require("../entities/project.entity");
class CreateProjectDto extends (0, swagger_1.OmitType)(project_entity_1.Project, ['id']) {
}
exports.CreateProjectDto = CreateProjectDto;
//# sourceMappingURL=create-project.dto.js.map