import Map "mo:core/Map";
import Common "../types/common";
import T "../types/driver";
import DriverLib "../lib/driver";

mixin (
  drivers : Map.Map<Common.DriverId, T.Driver>,
  driverState : { var nextDriverId : Nat },
) {
  public func addDriver(driver : T.Driver) : async T.Driver {
    DriverLib.add(drivers, driverState, driver);
  };

  public query func getDriver(id : Common.DriverId) : async ?T.Driver {
    DriverLib.get(drivers, id);
  };

  public func updateDriver(driver : T.Driver) : async { #ok; #notFound } {
    DriverLib.update(drivers, driver);
  };

  public query func listDrivers() : async [T.Driver] {
    DriverLib.list(drivers);
  };
};
