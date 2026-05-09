import Map "mo:core/Map";
import Common "../types/common";
import T "../types/ride";
import RideLib "../lib/ride";

mixin (
  rides : Map.Map<Common.RideId, T.Ride>,
  rideState : { var nextRideId : Nat },
) {
  public func addRide(ride : T.Ride) : async T.Ride {
    RideLib.add(rides, rideState, ride);
  };

  public query func getRide(id : Common.RideId) : async ?T.Ride {
    RideLib.get(rides, id);
  };

  public func updateRideStatus(
    id : Common.RideId,
    status : T.RideStatus,
    completedAt : ?Common.Timestamp,
    customerRating : ?Nat,
    driverRating : ?Nat,
    driverId : ?Common.DriverId,
  ) : async { #ok; #notFound } {
    RideLib.updateStatus(rides, id, status, completedAt, customerRating, driverRating, driverId);
  };

  public query func listRides() : async [T.Ride] {
    RideLib.list(rides);
  };
};
