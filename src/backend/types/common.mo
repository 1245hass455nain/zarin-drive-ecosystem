module {
  // Shared IDs
  public type CustomerId = Nat;
  public type DriverId = Nat;
  public type RideId = Nat;
  public type PromoCodeId = Nat;
  public type AdminLogId = Nat;
  public type ActivationCodeId = Nat;

  // Shared timestamp (nanoseconds Int from Time.now())
  public type Timestamp = Int;
};
