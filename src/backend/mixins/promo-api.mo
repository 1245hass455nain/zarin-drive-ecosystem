import Map "mo:core/Map";
import Common "../types/common";
import T "../types/promo";
import PromoLib "../lib/promo";

mixin (
  promos : Map.Map<Common.PromoCodeId, T.PromoCode>,
  promoState : { var nextPromoId : Nat },
) {
  public func addPromoCode(promo : T.PromoCode) : async T.PromoCode {
    PromoLib.add(promos, promoState, promo);
  };

  public query func listPromoCodes() : async [T.PromoCode] {
    PromoLib.list(promos);
  };

  public func updatePromoCode(promo : T.PromoCode) : async { #ok; #notFound } {
    PromoLib.update(promos, promo);
  };
};
