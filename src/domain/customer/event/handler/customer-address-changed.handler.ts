import EventHandlerInterface from "../../../@shared/event/event-handler.interface";
import CustomerAddressChangedEvent from "../customer-address-changed.event";

export default class CustomerAddressChangedHandler
  implements EventHandlerInterface<CustomerAddressChangedEvent>
{
  handle(event: CustomerAddressChangedEvent): void {
    const record = event.eventData;
    console.log(
      `Endereço do cliente: ${record.id}, ${record.name} alterado para: ${record.address.toString()}`
    );
    
  }
}