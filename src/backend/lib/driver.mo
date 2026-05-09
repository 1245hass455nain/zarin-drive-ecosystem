import Map "mo:core/Map";
import Common "../types/common";
import T "../types/driver";

module {
  public func add(
    drivers : Map.Map<Common.DriverId, T.Driver>,
    state : { var nextDriverId : Nat },
    driver : T.Driver,
  ) : T.Driver {
    let id = state.nextDriverId;
    state.nextDriverId += 1;
    let newDriver = { driver with id };
    drivers.add(id, newDriver);
    newDriver;
  };

  public func get(
    drivers : Map.Map<Common.DriverId, T.Driver>,
    id : Common.DriverId,
  ) : ?T.Driver {
    drivers.get(id);
  };

  public func update(
    drivers : Map.Map<Common.DriverId, T.Driver>,
    driver : T.Driver,
  ) : { #ok; #notFound } {
    switch (drivers.get(driver.id)) {
      case null { #notFound };
      case (?_) {
        drivers.add(driver.id, driver);
        #ok;
      };
    };
  };

  public func list(
    drivers : Map.Map<Common.DriverId, T.Driver>,
  ) : [T.Driver] {
    drivers.values().toArray();
  };
};
