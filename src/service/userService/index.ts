import { Repository } from "sequelize-typescript";
import User from "../../database/models/user";
import CreateUserDTO from "../../dto/request/createUserDTO";
import UserDTO from "../../dto/response/userDTO";
import mapper from "../../mapper/userMapper";
import UserNotFoundError from "./userNotFoundError";
import { IUserService } from "./IUserService";
import SearchResponseDTO from "../../dto/response/searchResponseDTO";
import { Op } from "sequelize";
import SearchUserResponseDTO, {
  BIRTHDATE_FROM,
  BIRTHDATE_TO,
} from "../../dto/response/searchUserResponseDTO";
import FilterDTO from "../../dto/response/searchResponseDTO/filterDTO";

export default class userService implements IUserService {
  private userRepository: Repository<User>;

  constructor(userRepository: Repository<User>) {
    this.userRepository = userRepository;
  }

  public createUser = async (
    createUserDTO: CreateUserDTO,
  ): Promise<UserDTO> => {
    const createdUser = await this.userRepository.create(
      mapper.createUserDTOToPlainObject(createUserDTO),
    );
    return mapper.userToUserDTO(createdUser);
  };

  public findUserById = async (id: number): Promise<UserDTO> => {
    const user = await this.userRepository.findByPk(id);
    if (!user) {
      throw new UserNotFoundError(id);
    }
    return mapper.userToUserDTO(user);
  };

  public searchUsers = async (
    offset: number,
    limit: number,
    birthdate_from?: string,
    birthdate_to?: string,
  ): Promise<SearchResponseDTO<UserDTO>> => {
    const whereClause: { birthdate?: { [key: string]: string } } = {};

    if (birthdate_from) {
      whereClause.birthdate = {
        ...whereClause.birthdate,
        [Op.gte]: birthdate_from,
      };
    }
    if (birthdate_to) {
      whereClause.birthdate = {
        ...whereClause.birthdate,
        [Op.lte]: birthdate_to,
      };
    }

    const { count, rows } = await this.userRepository.findAndCountAll({
      where: whereClause,
      limit,
      offset,
    });
    return new SearchUserResponseDTO(
      this.getAppliedFilters(birthdate_from, birthdate_to),
      offset,
      limit,
      count,
      rows.map((user) => mapper.userToUserDTO(user)),
    );
  };

  public getAppliedFilters = (
    birthdate_from?: string,
    birthdate_to?: string,
  ) => {
    const filters: FilterDTO[] = [];
    if (birthdate_from) {
      filters.push(new FilterDTO(BIRTHDATE_FROM, [birthdate_from]));
    }
    if (birthdate_to) {
      filters.push(new FilterDTO(BIRTHDATE_TO, [birthdate_to]));
    }
    return filters;
  };
}
