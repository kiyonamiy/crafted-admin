export const PermissionCodeEnum = {
  DICT: {
    MODULE: "system:dict",
    TYPE: {
      MODULE: "system:dict-type",
      CREATE: "system:dict-type:create",
      UPDATE: "system:dict-type:update",
      DELETE: "system:dict-type:delete",
    },
    DATA: {
      MODULE: "system:dict-data",
      CREATE: "system:dict-data:create",
      UPDATE: "system:dict-data:update",
      DELETE: "system:dict-data:delete",
    },
  },
  INSTITUTION: {
    MODULE: "system:institution",
    CREATE: "system:institution:create",
    UPDATE: "system:institution:update",
    DELETE: "system:institution:delete",
    GET: "system:institution:get",
  },
  PERMISSION: {
    MODULE: "system:permission",
    CREATE: "system:permission:create",
    UPDATE: "system:permission:update",
    DELETE: "system:permission:delete",
    GET: "system:permission:get",
  },
  ROLE: {
    MODULE: "system:role",
    ASSIGN: "system:permission:assign",
    CREATE: "system:role:create",
    UPDATE: "system:role:update",
    DELETE: "system:role:delete",
    GET: "system:role:get",
  },
  USER: {
    MODULE: "system:user",
    CREATE: "system:user:create",
    UPDATE: "system:user:update",
    GET: "system:user:get",
  },
} as const;
