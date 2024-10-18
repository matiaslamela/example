import CreateUserDTO from "../../dto/request/createUserDTO";
import SearchResponseDTO from "../../dto/response/searchResponseDTO";
import UserDTO from "../../dto/response/userDTO";

export interface IUserService {
  createUser(createUserDTO: CreateUserDTO): Promise<UserDTO>;
  findUserById(id: number): Promise<UserDTO>;
  searchUsers(
    offset: number,
    limit: number,
    birthdate_from?: string,
    birthdate_to?: string,
  ): Promise<SearchResponseDTO<UserDTO>>;
}
