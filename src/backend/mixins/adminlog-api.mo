import Map "mo:core/Map";
import Common "../types/common";
import T "../types/admin";
import AdminLogLib "../lib/adminlog";

mixin (
  adminLogs : Map.Map<Common.AdminLogId, T.AdminLog>,
  adminLogState : { var nextAdminLogId : Nat },
) {
  public func addAdminLog(log : T.AdminLog) : async T.AdminLog {
    AdminLogLib.add(adminLogs, adminLogState, log);
  };

  public query func listAdminLogs() : async [T.AdminLog] {
    AdminLogLib.list(adminLogs);
  };
};
