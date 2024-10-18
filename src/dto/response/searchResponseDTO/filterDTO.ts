import { Expose, Transform } from "class-transformer";

export default class FilterDTO {
  @Expose()
  private name: string;

  @Transform(({ value }) => (value && value.length ? value : undefined), {
    toPlainOnly: true,
  })
  private values?: (string | number)[];

  constructor(name: string, values?: (string | number)[]) {
    this.name = name;
    this.values = values;
  }

  get getValues() {
    return this.values;
  }

  set setValues(values: (string | number)[]) {
    this.values = values;
  }
}
