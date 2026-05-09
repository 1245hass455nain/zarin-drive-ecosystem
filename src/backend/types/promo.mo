import Common "common";

module {
  public type DiscountType = { #fixed; #percentage };

  public type PromoStatus = { #active; #inactive };

  public type PromoCode = {
    id : Common.PromoCodeId;
    code : Text;
    discountType : DiscountType;
    discountAmount : Int;
    expiryDate : Common.Timestamp;
    usageLimit : Nat;
    usageCount : Nat;
    status : PromoStatus;
  };
};
