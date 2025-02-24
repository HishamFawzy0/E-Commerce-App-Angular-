import { Orders } from '../../shared/interfaces/orders';
import { OrderService } from './../../core/services/order/order.service';
import { Component, inject } from '@angular/core';

@Component({
  selector: 'app-allorders',
  imports: [],
  templateUrl: './allorders.component.html',
  styleUrl: './allorders.component.scss'
})
export class AllordersComponent {
private readonly orderService = inject(OrderService);
orders :Orders[] = [];
  ngOnInit() {
    this.orderService.getMyOrders().subscribe({
      next: (orders) => {
        console.log(orders);
        this.orders = orders;
      },
      error: (error) => {
        console.error(error);
      }
    })
  }

}
