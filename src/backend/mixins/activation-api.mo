import Map "mo:core/Map";
import Time "mo:core/Time";
import Common "../types/common";
import T "../types/admin";
import ActivationLib "../lib/activation";

mixin (
  activationCodes : Map.Map<Common.ActivationCodeId, T.ActivationCode>,
  activationState : { var nextActivationCodeId : Nat },
) {
  public func addActivationCode(code : T.ActivationCode) : async T.ActivationCode {
    ActivationLib.add(activationCodes, activationState, code);
  };

  public query func listActivationCodes() : async [T.ActivationCode] {
    ActivationLib.list(activationCodes);
  };

  public func useActivationCode(
    code : Text,
    usedBy : Text,
  ) : async { #ok : T.ActivationCode; #notFound; #alreadyUsed; #expired } {
    let now = Time.now();
    ActivationLib.use(activationCodes, code, usedBy, now);
  };
};
