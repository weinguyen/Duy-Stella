"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const admin_entity_1 = require("../entities/admin.entity");
class LoginDto extends (0, swagger_1.OmitType)(admin_entity_1.Admin, ['id']) {
}
exports.LoginDto = LoginDto;
//# sourceMappingURL=login.dto.js.map