import Map "mo:core/Map";
import Common "../types/common";
import T "../types/admin";

module {
  public func add(
    logs : Map.Map<Common.AdminLogId, T.AdminLog>,
    state : { var nextAdminLogId : Nat },
    log : T.AdminLog,
  ) : T.AdminLog {
    let id = state.nextAdminLogId;
    state.nextAdminLogId += 1;
    let newLog = { log with id };
    logs.add(id, newLog);
    newLog;
  };

  public func list(
    logs : Map.Map<Common.AdminLogId, T.AdminLog>,
  ) : [T.AdminLog] {
    logs.values().toArray();
  };
};
