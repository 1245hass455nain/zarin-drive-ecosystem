import Map "mo:core/Map";
import Common "types/common";
import CustomerT "types/customer";
import DriverT "types/driver";
import RideT "types/ride";
import WalletT "types/wallet";
import PromoT "types/promo";
import AdminT "types/admin";
import CustomerApi "mixins/customer-api";
import DriverApi "mixins/driver-api";
import RideApi "mixins/ride-api";
import WalletApi "mixins/wallet-api";
import PromoApi "mixins/promo-api";
import ActivationApi "mixins/activation-api";
import AdminLogApi "mixins/adminlog-api";

actor {
  // --- Customers ---
  let customers = Map.empty<Common.CustomerId, CustomerT.Customer>();
  let customerState = { var nextCustomerId : Nat = 0 };
  include CustomerApi(customers, customerState);

  // --- Drivers ---
  let drivers = Map.empty<Common.DriverId, DriverT.Driver>();
  let driverState = { var nextDriverId : Nat = 0 };
  include DriverApi(drivers, driverState);

  // --- Rides ---
  let rides = Map.empty<Common.RideId, RideT.Ride>();
  let rideState = { var nextRideId : Nat = 0 };
  include RideApi(rides, rideState);

  // --- Wallets ---
  let wallets = Map.empty<Common.DriverId, WalletT.Wallet>();
  include WalletApi(wallets);

  // --- Promo Codes ---
  let promos = Map.empty<Common.PromoCodeId, PromoT.PromoCode>();
  let promoState = { var nextPromoId : Nat = 0 };
  include PromoApi(promos, promoState);

  // --- Activation Codes ---
  let activationCodes = Map.empty<Common.ActivationCodeId, AdminT.ActivationCode>();
  let activationState = { var nextActivationCodeId : Nat = 0 };
  include ActivationApi(activationCodes, activationState);

  // --- Admin Logs ---
  let adminLogs = Map.empty<Common.AdminLogId, AdminT.AdminLog>();
  let adminLogState = { var nextAdminLogId : Nat = 0 };
  include AdminLogApi(adminLogs, adminLogState);
};

