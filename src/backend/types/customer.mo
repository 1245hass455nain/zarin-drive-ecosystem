import Common "common";

module {
  public type CustomerStatus = { #active; #suspended; #banned };

  public type Customer = {
    id : Common.CustomerId;
    name : Text;
    phone : Text;
    email : Text;
    walletBalance : Int;
    totalRides : Nat;
    status : CustomerStatus;
    joinDate : Common.Timestamp;
  };
};
