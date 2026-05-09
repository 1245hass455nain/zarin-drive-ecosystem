import Map "mo:core/Map";
import Common "../types/common";
import T "../types/wallet";

module {
  public func update(
    wallets : Map.Map<Common.DriverId, T.Wallet>,
    wallet : T.Wallet,
  ) : T.Wallet {
    wallets.add(wallet.driverId, wallet);
    wallet;
  };

  public func get(
    wallets : Map.Map<Common.DriverId, T.Wallet>,
    driverId : Common.DriverId,
  ) : ?T.Wallet {
    wallets.get(driverId);
  };

  public func list(
    wallets : Map.Map<Common.DriverId, T.Wallet>,
  ) : [T.Wallet] {
    wallets.values().toArray();
  };
};
