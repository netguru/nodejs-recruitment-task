import { Injectable } from "@nestjs/common";

import { AbstractAsyncPresenter } from "@app/api/presenter/AbstractAsyncPresenter";
import { User } from "@app/model/user/User";
import { ReadMeData } from "@app/model/user/ReadMeData";

@Injectable()
export class MePresenter extends AbstractAsyncPresenter<User, ReadMeData> {
  async present(user: User): Promise<ReadMeData> {
    return {
      id: user.userId,
      name: user.name,
      role: user.role,
    };
  }
}
