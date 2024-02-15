let role = {
  admin: "admin",
  staff: "staff",
  driver: "driver",
  customer: "customer",
  shipper: "shipper",
  guest: "guest",
};

let deviceType = {
  ios: 1,
  android: 2,
  web: 3,
};

let dateFormatToShowOnFrontend = "DD-MM-YY hh:mm a";

let deliveryTimeBufferInMin = 120;
let awsSignedUrlExpireTimeSec = 300;
let uploadFilesize = 5000000;


module.exports = {
  role,
  deviceType,
  dateFormatToShowOnFrontend,
  deliveryTimeBufferInMin,
  awsSignedUrlExpireTimeSec,
  uploadFilesize
};
