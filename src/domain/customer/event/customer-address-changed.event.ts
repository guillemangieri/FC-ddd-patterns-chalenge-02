import EventInterface from "../../@shared/event/event.interface";
import Address from "../value-object/address";
import CustomerCreatedEvent from "./customer-created.event";

interface CustomerAddressChangedPayload {
  id: string;
  name: string;
  address: Address;
}

export default class CustomerAddressChangedEvent implements EventInterface {
  dataTimeOccurred: Date;
  eventData: CustomerAddressChangedPayload;

  constructor(eventData: CustomerAddressChangedPayload) {
    this.dataTimeOccurred = new Date();
    this.eventData = eventData;
  }

  changeAddress(address: Address): void {
    this.eventData.address = address;
  }
}
