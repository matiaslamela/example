import UserDTO from "./userDTO";
import SearchResponseDTO from "./searchResponseDTO";
import FilterDTO from "./searchResponseDTO/filterDTO";

export const BIRTHDATE_FROM = "birthdate_from";
export const BIRTHDATE_TO = "birthdate_to";

export default class SearchUserResponseDTO extends SearchResponseDTO<UserDTO> {
  static allAvailableFilters: FilterDTO[] = [
    new FilterDTO(BIRTHDATE_FROM),
    new FilterDTO(BIRTHDATE_TO),
  ];
  constructor(
    appliedFilters: FilterDTO[],
    offset: number,
    limit: number,
    total: number,
    results: UserDTO[],
  ) {
    super(
      SearchUserResponseDTO.allAvailableFilters,
      appliedFilters,
      offset,
      limit,
      total,
      results,
    );
  }
}
