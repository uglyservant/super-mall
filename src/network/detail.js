import {request} from "@/network/request";

export function getDetail(iid) {
  return request({
    url: "/detail",
    params: {
      iid
    }
  })
}

export class Goods {
  constructor(itemInfo, columns, services) {
    this.title = itemInfo.title;
    this.desc = itemInfo.desc;
    this.price = itemInfo.price;
    this.oldPrice = itemInfo.oldPrice;
    this.discountDesc = itemInfo.discountDesc;
    this.lowNowPrice = itemInfo.lowNowPrice;
    this.columns = columns;
    this.services = services;
  }
}
