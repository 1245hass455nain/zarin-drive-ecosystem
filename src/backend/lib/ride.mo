import Map "mo:core/Map";
import Common "../types/common";
import T "../types/ride";

module {
  public func add(
    rides : Map.Map<Common.RideId, T.Ride>,
    state : { var nextRideId : Nat },
    ride : T.Ride,
  ) : T.Ride {
    let id = state.nextRideId;
    state.nextRideId += 1;
    let newRide = { ride with id };
    rides.add(id, newRide);
    newRide;
  };

  public func get(
    rides : Map.Map<Common.RideId, T.Ride>,
    id : Common.RideId,
  ) : ?T.Ride {
    rides.get(id);
  };

  public func updateStatus(
    rides : Map.Map<Common.RideId, T.Ride>,
    id : Common.RideId,
    status : T.RideStatus,
    completedAt : ?Common.Timestamp,
    customerRating : ?Nat,
    driverRating : ?Nat,
    driverId : ?Common.DriverId,
  ) : { #ok; #notFound } {
    switch (rides.get(id)) {
      case null { #notFound };
      case (?existing) {
        let updated = { existing with status; completedAt; customerRating; driverRating; driverId };
        rides.add(id, updated);
        #ok;
      };
    };
  };

  public func list(
    rides : Map.Map<Common.RideId, T.Ride>,
  ) : [T.Ride] {
    rides.values().toArray();
  };
};
