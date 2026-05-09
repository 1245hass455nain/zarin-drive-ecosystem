import Map "mo:core/Map";
import Common "../types/common";
import T "../types/customer";
import CustomerLib "../lib/customer";

mixin (
  customers : Map.Map<Common.CustomerId, T.Customer>,
  customerState : { var nextCustomerId : Nat },
) {
  public func addCustomer(customer : T.Customer) : async T.Customer {
    CustomerLib.add(customers, customerState, customer);
  };

  public query func getCustomer(id : Common.CustomerId) : async ?T.Customer {
    CustomerLib.get(customers, id);
  };

  public func updateCustomer(customer : T.Customer) : async { #ok; #notFound } {
    CustomerLib.update(customers, customer);
  };

  public query func listCustomers() : async [T.Customer] {
    CustomerLib.list(customers);
  };
};
