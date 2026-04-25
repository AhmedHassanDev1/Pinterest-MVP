export const GRPC_PACKAGES = {
  AUTH: 'AUTH',
  USERS: 'USERS',
  PINS: 'PINS',
  BOARDS: 'BOARDS',
  SAVES: 'SAVES',
  LIKES: 'interactions',
  COMMENTS: 'COMMENTS'
}

export const GRPC_SERVICES = {
  AUTH: 'Auth',
  USER: 'Users',
  PROFILE: "Profiles",
  AVATAR: "Avatars",
  PINS: 'Pins',
  BOARDS: "Boards",
  SAVES: "Saves",
  LIKES: "Likes",
};

export const GRPC_METHODS = {
  CREATE_USER: 'CreateUser',
  GET_USER: 'GetUser',
  GET_USER_BY_EMAIL: 'GetUserByEmail',
  GET_PROFILE_INFO: 'GetProfile',
  EDITE_PROFILE: 'UpdateProfile',
  DELETE_ACCOUNT: 'DeleteAccount',
  GET_AVATAR: 'GetAvatar',
  UPDATE_AVATAR: 'UploadAvatar',
  EDITE_ACCOUNT: 'EditeAccount',
  // Auth Services
  LOG_IN: 'LogIn',
  REGISTER: 'Register',
  LOG_OUT: 'LogOut',
  REFRESH_TOKEN: 'RefreshToken',
  VERIFY_EMAIL: 'VerifyEmail',
  FORGET_PASSWORD: 'ForgotPassword',
  RESET_PASSWORD: 'ResetPassword',

  //  Pins Services
  CREATE_PIN: "CreatePin",
  PUBLISH_PIN: "PublishPin",
  GET_PIN: "GetPin",
  DELETE_PIN: "DeletePin",
  LIST_PINS: "ListPins",

  // Board Services
  CREATE_BOARD: "CreateBoard",
  GET_BOARD: "GetBoard",
  DELETE_BOARD: "DeleteBoard",
  EDITE_BOARD: "EditeBoard",
  GET_LIST_BOARDS: "ListBoards",
  MERGE_BOARD: "MergeBoard",
  // interactions Services
  ADD_LIKE: "AddLike",
  REMOVE_LIKE: "RemoveLike",
  // Saves Services 
  ADD_SAVE: "AddSave",
  REMOVE_SAVE: "RemoveSave",
  GET_SAVES_BY_BOARD: "GetSavesByBoard",
  GETUNORGANIZEDSAVES: "GetUnorganizedSaves",
  CHECK_SAVE: "CheckSave"
};