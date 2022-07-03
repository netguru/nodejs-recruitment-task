export class FixturesLoadingException {
  constructor(
    public message: string,
    public affectedFixtureName: string,
    public affectedFixtureConstructorName: string
  ) {}
}
