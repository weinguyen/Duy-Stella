"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateGuestDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const guest_entity_1 = require("../entities/guest.entity");
class CreateGuestDto extends (0, swagger_1.OmitType)(guest_entity_1.Guest, [
    'id',
    'createdAt',
]) {
}
exports.CreateGuestDto = CreateGuestDto;
//# sourceMappingURL=create-guest.dto.js.map