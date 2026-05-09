import Common "common";
import DriverTypes "driver";

module {
  public type RideStatus = {
    #searching;
    #accepted;
    #arriving;
    #reached;
    #started;
    #inProgress;
    #completed;
    #cancelled;
  };

  public type PaymentMethod = { #cash; #wallet; #easypaisa; #jazzCash };

  public type Ride = {
    id : Common.RideId;
    customerId : Common.CustomerId;
    driverId : ?Common.DriverId;
    pickupAddress : Text;
    dropAddress : Text;
    pickupLat : Float;
    pickupLng : Float;
    dropLat : Float;
    dropLng : Float;
    vehicleType : DriverTypes.VehicleType;
    baseFare : Int;
    distanceFare : Int;
    totalFare : Int;
    status : RideStatus;
    paymentMethod : PaymentMethod;
    createdAt : Common.Timestamp;
    completedAt : ?Common.Timestamp;
    customerRating : ?Nat;
    driverRating : ?Nat;
    otp : Text;
  };
};
