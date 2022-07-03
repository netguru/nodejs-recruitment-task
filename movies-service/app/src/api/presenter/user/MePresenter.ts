import { Injectable } from "@nestjs/common";

import { AbstractAsyncPresenter } from "@app/api/presenter/AbstractAsyncPresenter";
import { ReadMeData } from "@app/model/user/ReadMeData";
import { User } from "@app/model/user/User";

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
