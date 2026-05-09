import Map "mo:core/Map";
import Common "../types/common";
import T "../types/admin";

module {
  public func add(
    codes : Map.Map<Common.ActivationCodeId, T.ActivationCode>,
    state : { var nextActivationCodeId : Nat },
    code : T.ActivationCode,
  ) : T.ActivationCode {
    let id = state.nextActivationCodeId;
    state.nextActivationCodeId += 1;
    let newCode = { code with id };
    codes.add(id, newCode);
    newCode;
  };

  public func list(
    codes : Map.Map<Common.ActivationCodeId, T.ActivationCode>,
  ) : [T.ActivationCode] {
    codes.values().toArray();
  };

  public func use(
    codes : Map.Map<Common.ActivationCodeId, T.ActivationCode>,
    code : Text,
    usedBy : Text,
    usedAt : Common.Timestamp,
  ) : { #ok : T.ActivationCode; #notFound; #alreadyUsed; #expired } {
    let found = codes.entries().find(func((_, c) : (Common.ActivationCodeId, T.ActivationCode)) : Bool { c.code == code });
    switch (found) {
      case null { #notFound };
      case (?(id, existing)) {
        if (existing.used) { return #alreadyUsed };
        if (existing.expiryDate < usedAt) { return #expired };
        let updated = { existing with used = true; usedBy = ?usedBy; usedAt = ?usedAt };
        codes.add(id, updated);
        #ok(updated);
      };
    };
  };
};
