export const stringToSlug = (arg: string) =>
  arg.toLocaleLowerCase().replaceAll(' ', '-')
