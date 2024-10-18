import { Expose, Transform } from "class-transformer";
import FilterDTO from "./filterDTO";

export default abstract class SearchResponseDTO<T> {
  @Expose({ name: "available_filters" })
  private availableFilters: FilterDTO[];

  @Expose({ name: "applied_filters" })
  private appliedFilters: FilterDTO[];

  @Expose()
  private offset: number;

  @Expose()
  private limit: number;

  @Expose()
  private total: number;

  @Expose()
  private results: T[];

  constructor(
    availableFilters: FilterDTO[],
    appliedFilters: FilterDTO[],
    offset: number,
    limit: number,
    total: number,
    results: T[],
  ) {
    this.availableFilters = availableFilters;
    this.appliedFilters = appliedFilters;
    this.offset = offset;
    this.limit = limit;
    this.total = total;
    this.results = results;
  }
}
