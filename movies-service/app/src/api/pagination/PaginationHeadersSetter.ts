import { ResponseInterface } from "@app/logic/service/ResponseInterface";
import { PaginatedList } from "@app/model/common/PaginatedList";
import { PaginationData } from "@app/model/common/PaginationData";

export class PaginationHeadersSetter {
  public static setPaginationHeaders<T>(
    response: ResponseInterface,
    pagination: PaginationData,
    paginatedList: PaginatedList<T>
  ): void {
    const count = paginatedList.getCount();
    const total = paginatedList.getTotal();
    const page = pagination.page;
    const perPage = pagination.perPage;

    response.setHeader("X-Count", count);

    response.setHeader("X-Last", Math.ceil(total / perPage));
    response.setHeader("X-First", 1);

    response.setHeader("X-Total", total);
    response.setHeader("X-Page", page);
    response.setHeader("X-PageSize", perPage);
    response.setHeader("X-Has-More", page * perPage < total ? "true" : "false");
  }
}
