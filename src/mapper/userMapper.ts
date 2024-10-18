import User from "../database/models/user";
import CreateUserDTO from "../dto/request/createUserDTO";
import UserDTO from "../dto/response/userDTO";

function createUserDTOToPlainObject(createUserDTO: CreateUserDTO) {
  return {
    name: createUserDTO.name,
    birthdate: createUserDTO.birthdate,
  };
}

function userToUserDTO(user: User): UserDTO {
  return new UserDTO(
    user.id,
    user.name,
    user.birthdate,
    user.createdAt,
    user.updatedAt,
  );
}

export default {
  createUserDTOToPlainObject,
  userToUserDTO,
};
