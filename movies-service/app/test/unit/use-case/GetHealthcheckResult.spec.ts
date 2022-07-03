import { INestApplication } from "@nestjs/common";
import { getTestApp } from "@test/testModuleBuilder";
import { expect } from "chai";

import { GetHealthcheckResult } from "@app/logic/use-case/healthcheck/GetHealthcheckResult";

describe("Healthcheck use-case (unit)", () => {
  let app: INestApplication;
  let getHealthcheckResult: GetHealthcheckResult;

  beforeEach(async () => {
    app = await getTestApp();
    getHealthcheckResult = app.get<GetHealthcheckResult>(GetHealthcheckResult);
  });

  after(async () => {
    await app.close();
  });

  it("Check healthcheck", async () => {
    const result = getHealthcheckResult.get();
    expect(result).eq("OK");
  });
});
