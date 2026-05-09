import Map "mo:core/Map";
import Common "../types/common";
import T "../types/promo";

module {
  public func add(
    promos : Map.Map<Common.PromoCodeId, T.PromoCode>,
    state : { var nextPromoId : Nat },
    promo : T.PromoCode,
  ) : T.PromoCode {
    let id = state.nextPromoId;
    state.nextPromoId += 1;
    let newPromo = { promo with id };
    promos.add(id, newPromo);
    newPromo;
  };

  public func list(
    promos : Map.Map<Common.PromoCodeId, T.PromoCode>,
  ) : [T.PromoCode] {
    promos.values().toArray();
  };

  public func update(
    promos : Map.Map<Common.PromoCodeId, T.PromoCode>,
    promo : T.PromoCode,
  ) : { #ok; #notFound } {
    switch (promos.get(promo.id)) {
      case null { #notFound };
      case (?_) {
        promos.add(promo.id, promo);
        #ok;
      };
    };
  };
};
