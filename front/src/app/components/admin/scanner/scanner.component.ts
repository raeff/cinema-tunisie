import { Component, ViewChild, ViewEncapsulation, OnInit } from "@angular/core";
import { Order_Service } from "../../../Services/order.service";
import { CookieService } from "ngx-cookie-service";
import { order } from "../../../Models/order";
@Component({
  selector: "app-scanner",
  templateUrl: "./scanner.component.html",
  styleUrls: ["./scanner.component.scss"],
})
export class ScannerComponent implements OnInit {
  guestExist: boolean = false;
  cookievalue = "unknown";
  index: any;
  orderList: any;
  elementType: "canvas";
  adminContent: string;

  orderId: string;
  order: order;

  constructor(
    private orderService: Order_Service,
    private cookieService: CookieService
  ) {}

  camerasNotFound(e: Event) {
    // Display an alert modal here
  }

  cameraFound(e: Event) {
    // Log to see if the camera was found
  }

  close() {
    this.guestExist = false;
  }

  scanSuccessHandler(result: string) {
    console.log(result);
    for (var i = 0; i < this.orderList.length; i++) {
      if (this.orderList[i].qr) {
        if (this.orderList[i].qr == result) {
          this.orderList[i].qr = null;

          this.orderService
            .update_Order(this.orderList[i]._id, this.orderList[i])
            .subscribe((order) => {
              console.log(order);
            });
          this.guestExist = true;
          break;
        }
      }
    }
  }

  ngOnInit() {
    this.cookievalue = this.cookieService.get("UserDetails");
    if (!this.cookievalue) {
      this.adminContent = null;
    } else {
      if (JSON.parse(this.cookievalue).user.role == "admin") {
        this.adminContent = JSON.parse(this.cookievalue).user.role;
      } else {
        this.adminContent = null;
      }
    }
    this.orderService.get_Orders().subscribe((orders) => {
      this.orderList = orders;
    });
  }
}
