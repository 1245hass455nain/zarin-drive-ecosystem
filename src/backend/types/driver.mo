import Common "common";

module {
  public type VehicleType = { #Bike; #Rickshaw; #Car; #Premium };

  public type DriverRank = { #Gold; #Diamond; #Platinum };

  public type DriverStatus = { #online; #offline; #onRide; #suspended; #blocked };

  public type Driver = {
    id : Common.DriverId;
    name : Text;
    phone : Text;
    cnic : Text;
    licenseNumber : Text;
    vehicleType : VehicleType;
    vehiclePlate : Text;
    vehicleModel : Text;
    vehicleColor : Text;
    activationCode : Text;
    rank : DriverRank;
    walletBalance : Int;
    totalRides : Nat;
    status : DriverStatus;
    rating : Float;
  };
};
