import Common "common";

module {
  public type Wallet = {
    driverId : Common.DriverId;
    totalEarned : Int;
    commissionOwed : Int;
    netBalance : Int;
    lastUpdated : Common.Timestamp;
  };
};
