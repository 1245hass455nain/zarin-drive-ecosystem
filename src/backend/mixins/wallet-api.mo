import Map "mo:core/Map";
import Common "../types/common";
import T "../types/wallet";
import WalletLib "../lib/wallet";

mixin (
  wallets : Map.Map<Common.DriverId, T.Wallet>,
) {
  public func updateWallet(wallet : T.Wallet) : async T.Wallet {
    WalletLib.update(wallets, wallet);
  };

  public query func getWallet(driverId : Common.DriverId) : async ?T.Wallet {
    WalletLib.get(wallets, driverId);
  };

  public query func listWallets() : async [T.Wallet] {
    WalletLib.list(wallets);
  };
};
