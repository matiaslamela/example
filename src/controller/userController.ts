import { NextFunction, Request, Response } from "express";
import { instanceToPlain, plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { StatusCodes } from "http-status-codes";
import CreateUserDTO from "../dto/request/createUserDTO";
import FieldValidationError from "../errors/fieldValidationError";
import { mapValidationErrorToFieldValidationErrorDTOList } from "../mapper/validationErrorMapper";
import UserDTO from "../dto/response/userDTO";
import { IUserService } from "../service/userService/IUserService";
import SearchUserParams from "../dto/request/SearchUserParams";
import FieldValidationErrorDTO from "../dto/error/fieldValidationErrorDTO";

export default class UserController {
  private userService: IUserService;
  constructor(userService: IUserService) {
    this.userService = userService;
  }

  public findUserById = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return next(
          new FieldValidationError([
            new FieldValidationErrorDTO("id", "id must be a number"),
          ]),
        );
      }
      const user = await this.userService.findUserById(id);
      res.status(StatusCodes.OK).json(instanceToPlain(user));
    } catch (e) {
      next(e);
    }
  };

  public searchUsers = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const searchUserParams: SearchUserParams = new SearchUserParams(
        req.query.offset as string,
        req.query.limit as string,
        req.query.birthdate_from as string,
        req.query.birthdate_to as string,
      );

      const errors = await validate(searchUserParams);
      if (errors.length > 0) {
        return next(
          new FieldValidationError(
            mapValidationErrorToFieldValidationErrorDTOList(errors),
          ),
        );
      }
      const users = await this.userService.searchUsers(
        searchUserParams.getOffset,
        searchUserParams.getLimit,
        searchUserParams.getBirthdateFrom,
        searchUserParams.getBirthdateTo,
      );
      res.status(StatusCodes.OK).json(instanceToPlain(users));
    } catch (e) {
      next(e);
    }
  };

  public createUser = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const userDTO: CreateUserDTO = plainToInstance(
        CreateUserDTO,
        req.body as CreateUserDTO,
      );
      const errors = await validate(userDTO);
      if (errors.length > 0) {
        return next(
          new FieldValidationError(
            mapValidationErrorToFieldValidationErrorDTOList(errors),
          ),
        );
      }
      const userCreated: UserDTO = await this.userService.createUser(userDTO);
      res.status(StatusCodes.CREATED).json(instanceToPlain(userCreated));
    } catch (e) {
      next(e);
    }
  };
}
