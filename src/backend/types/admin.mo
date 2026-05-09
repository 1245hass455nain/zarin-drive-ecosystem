import Common "common";

module {
  public type AdminLog = {
    id : Common.AdminLogId;
    adminId : Text;
    action : Text;
    target : Text;
    details : Text;
    timestamp : Common.Timestamp;
  };

  public type ActivationCode = {
    id : Common.ActivationCodeId;
    code : Text;
    expiryDate : Common.Timestamp;
    used : Bool;
    usedBy : ?Text;
    usedAt : ?Common.Timestamp;
  };
};
