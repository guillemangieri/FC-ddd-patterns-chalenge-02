import EventDispatcher from "../../@shared/event/event-dispatcher";
import Address from "../value-object/address";
import CustomerAddressChangedEvent from "./customer-address-changed.event";
import CustomerCreatedEvent from "./customer-created.event";
import CustomerAddressChangedHandler from "./handler/customer-address-changed.handler";
import Log1CustomerCreatedHandler from "./handler/send-console-log-1-customer-created.handler";
import Log2CustomerCreatedHandler from "./handler/send-console-log-2-customer-created.handler";

//=========================  Inicio trabalho 2 desafio ==================================

describe("Domain events tests - Unregister Customer Created Event", () => {

  it("should send event handler from customer created", () => {
    const eventDispatcher = new EventDispatcher();
    
    const eventHandler1 = new Log1CustomerCreatedHandler();
    const eventHandler2 = new Log2CustomerCreatedHandler();

    const spyEventHandler1 = jest.spyOn(eventHandler1, "handle");
    const spyEventHandler2 = jest.spyOn(eventHandler2, "handle");
    
    eventDispatcher.register("CustomerCreatedEvent", eventHandler1);
    eventDispatcher.register("CustomerCreatedEvent", eventHandler2);

    expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]).toMatchObject(eventHandler1);
    expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"][1]).toMatchObject(eventHandler2);
    expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"].length).toBe(2);    
    expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"]).toBeDefined();

    const customerCreatedEvent1 = new CustomerCreatedEvent( {
      id: "1",
      name: "Gui Mangieri",
      address: new Address("Esmeralda", 513, "78000-000", "Cuiabá"),
    });

    eventDispatcher.notify(customerCreatedEvent1);


    expect(spyEventHandler1).toHaveBeenCalled();
    expect(spyEventHandler2).toHaveBeenCalled();

  });




it("should show the address change in the console", () => {
  const dispatcher = new EventDispatcher();
  const handler = new CustomerAddressChangedHandler();

  // Espionar e manter visível no terminal
  const consoleSpy = jest.spyOn(console, "log");

  dispatcher.register("CustomerAddressChangedEvent", handler);

  const oldAddress = new Address("Esmeralda", 513, "78000-000", "Cuiabá");
  const event = new CustomerAddressChangedEvent({
    id: "001",
    name: "Gui Mangieri",
    address: oldAddress
  });

  dispatcher.notify(event); // Deve exibir log com Esmeralda

  const newAddress = new Address("Nigéria", 333, "78050-000", "Cuiabá");
  event.changeAddress(newAddress);

  dispatcher.notify(event); // Deve exibir log com Nigéria

  expect(consoleSpy).toHaveBeenCalledWith(
    expect.stringContaining("Endereço do cliente")
  );

  consoleSpy.mockRestore();
});


})