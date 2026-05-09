import Map "mo:core/Map";
import Common "../types/common";
import T "../types/customer";

module {
  public func add(
    customers : Map.Map<Common.CustomerId, T.Customer>,
    state : { var nextCustomerId : Nat },
    customer : T.Customer,
  ) : T.Customer {
    let id = state.nextCustomerId;
    state.nextCustomerId += 1;
    let newCustomer = { customer with id };
    customers.add(id, newCustomer);
    newCustomer;
  };

  public func get(
    customers : Map.Map<Common.CustomerId, T.Customer>,
    id : Common.CustomerId,
  ) : ?T.Customer {
    customers.get(id);
  };

  public func update(
    customers : Map.Map<Common.CustomerId, T.Customer>,
    customer : T.Customer,
  ) : { #ok; #notFound } {
    switch (customers.get(customer.id)) {
      case null { #notFound };
      case (?_) {
        customers.add(customer.id, customer);
        #ok;
      };
    };
  };

  public func list(
    customers : Map.Map<Common.CustomerId, T.Customer>,
  ) : [T.Customer] {
    customers.values().toArray();
  };
};
