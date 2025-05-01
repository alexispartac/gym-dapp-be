/**
 * Program IDL in camelCase format in order to be used in JS/TS.
 *
 * Note that this is only a type helper and is not the actual IDL. The original
 * IDL can be found at `target/idl/gym_dapp_be.json`.
 */
export type GymDappBe = {
  "address": "9akkfdTGrGZaavswyVC7jqBu3AsTBim634xuUhKSoYMr",
  "metadata": {
    "name": "gymDappBe",
    "version": "0.1.0",
    "spec": "0.1.0",
    "description": "Created with Anchor"
  },
  "instructions": [
    {
      "name": "addExercise",
      "discriminator": [
        184,
        42,
        143,
        241,
        221,
        150,
        179,
        154
      ],
      "accounts": [
        {
          "name": "user",
          "writable": true,
          "signer": true
        },
        {
          "name": "exercises",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  101,
                  120,
                  101,
                  114,
                  99,
                  105,
                  115,
                  101,
                  115
                ]
              },
              {
                "kind": "account",
                "path": "user"
              }
            ]
          }
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "exercise",
          "type": {
            "defined": {
              "name": "exercise"
            }
          }
        }
      ]
    },
    {
      "name": "addRoutine",
      "discriminator": [
        84,
        182,
        172,
        175,
        218,
        245,
        194,
        153
      ],
      "accounts": [
        {
          "name": "user",
          "writable": true,
          "signer": true
        },
        {
          "name": "routines",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  114,
                  111,
                  117,
                  116,
                  105,
                  110,
                  101,
                  115
                ]
              },
              {
                "kind": "account",
                "path": "user"
              }
            ]
          }
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "routine",
          "type": {
            "defined": {
              "name": "routine"
            }
          }
        }
      ]
    },
    {
      "name": "addWorkout",
      "discriminator": [
        116,
        254,
        3,
        246,
        182,
        126,
        229,
        241
      ],
      "accounts": [
        {
          "name": "user",
          "writable": true,
          "signer": true
        },
        {
          "name": "workouts",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  119,
                  111,
                  114,
                  107,
                  111,
                  117,
                  116,
                  115
                ]
              },
              {
                "kind": "account",
                "path": "user"
              }
            ]
          }
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "workout",
          "type": {
            "defined": {
              "name": "workout"
            }
          }
        }
      ]
    },
    {
      "name": "initializeUserAccount",
      "discriminator": [
        131,
        248,
        61,
        211,
        152,
        205,
        122,
        238
      ],
      "accounts": [
        {
          "name": "user",
          "writable": true,
          "signer": true
        },
        {
          "name": "useraccount",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  117,
                  115,
                  101,
                  114,
                  97,
                  99,
                  99,
                  111,
                  117,
                  110,
                  116
                ]
              },
              {
                "kind": "account",
                "path": "user"
              }
            ]
          }
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "userid",
          "type": "string"
        },
        {
          "name": "username",
          "type": "string"
        },
        {
          "name": "email",
          "type": "string"
        },
        {
          "name": "password",
          "type": "string"
        }
      ]
    },
    {
      "name": "initializeUserExercises",
      "discriminator": [
        234,
        124,
        110,
        79,
        235,
        255,
        23,
        58
      ],
      "accounts": [
        {
          "name": "user",
          "writable": true,
          "signer": true
        },
        {
          "name": "exercises",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  101,
                  120,
                  101,
                  114,
                  99,
                  105,
                  115,
                  101,
                  115
                ]
              },
              {
                "kind": "account",
                "path": "user"
              }
            ]
          }
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "userid",
          "type": "string"
        }
      ]
    },
    {
      "name": "initializeUserRoutine",
      "discriminator": [
        164,
        128,
        91,
        110,
        131,
        214,
        212,
        98
      ],
      "accounts": [
        {
          "name": "user",
          "writable": true,
          "signer": true
        },
        {
          "name": "routines",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  114,
                  111,
                  117,
                  116,
                  105,
                  110,
                  101,
                  115
                ]
              },
              {
                "kind": "account",
                "path": "user"
              }
            ]
          }
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "userid",
          "type": "string"
        }
      ]
    },
    {
      "name": "initializeUserWorkouts",
      "discriminator": [
        39,
        232,
        97,
        253,
        143,
        51,
        169,
        26
      ],
      "accounts": [
        {
          "name": "user",
          "writable": true,
          "signer": true
        },
        {
          "name": "workouts",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  119,
                  111,
                  114,
                  107,
                  111,
                  117,
                  116,
                  115
                ]
              },
              {
                "kind": "account",
                "path": "user"
              }
            ]
          }
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "userid",
          "type": "string"
        }
      ]
    },
    {
      "name": "removeRoutine",
      "discriminator": [
        46,
        203,
        182,
        129,
        2,
        126,
        215,
        170
      ],
      "accounts": [
        {
          "name": "user",
          "writable": true,
          "signer": true
        },
        {
          "name": "routines",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  114,
                  111,
                  117,
                  116,
                  105,
                  110,
                  101,
                  115
                ]
              },
              {
                "kind": "account",
                "path": "user"
              }
            ]
          }
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "routineid",
          "type": "string"
        }
      ]
    },
    {
      "name": "removeWorkout",
      "discriminator": [
        87,
        170,
        76,
        160,
        205,
        79,
        207,
        67
      ],
      "accounts": [
        {
          "name": "user",
          "writable": true,
          "signer": true
        },
        {
          "name": "workouts",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  119,
                  111,
                  114,
                  107,
                  111,
                  117,
                  116,
                  115
                ]
              },
              {
                "kind": "account",
                "path": "user"
              }
            ]
          }
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "workoutid",
          "type": "string"
        }
      ]
    },
    {
      "name": "updateExercises",
      "discriminator": [
        237,
        39,
        47,
        71,
        86,
        177,
        11,
        228
      ],
      "accounts": [
        {
          "name": "user",
          "writable": true,
          "signer": true
        },
        {
          "name": "exercises",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  101,
                  120,
                  101,
                  114,
                  99,
                  105,
                  115,
                  101,
                  115
                ]
              },
              {
                "kind": "account",
                "path": "user"
              }
            ]
          }
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "exercise",
          "type": {
            "defined": {
              "name": "exercise"
            }
          }
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "exercises",
      "discriminator": [
        128,
        230,
        12,
        229,
        145,
        44,
        0,
        86
      ]
    },
    {
      "name": "routines",
      "discriminator": [
        21,
        90,
        153,
        55,
        142,
        62,
        155,
        234
      ]
    },
    {
      "name": "user",
      "discriminator": [
        159,
        117,
        95,
        227,
        239,
        151,
        58,
        236
      ]
    },
    {
      "name": "workouts",
      "discriminator": [
        240,
        133,
        193,
        79,
        148,
        44,
        84,
        140
      ]
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "invalidCredentials",
      "msg": "Invalid credentials provided."
    },
    {
      "code": 6001,
      "name": "userNotFound",
      "msg": "User account not found."
    },
    {
      "code": 6002,
      "name": "invalidUserId",
      "msg": "Invalid user ID provided."
    },
    {
      "code": 6003,
      "name": "invalidUsername",
      "msg": "Invalid username provided."
    },
    {
      "code": 6004,
      "name": "invalidEmail",
      "msg": "Invalid email provided."
    },
    {
      "code": 6005,
      "name": "invalidPassword",
      "msg": "Invalid password provided."
    }
  ],
  "types": [
    {
      "name": "exercise",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "id",
            "type": "string"
          },
          {
            "name": "name",
            "type": "string"
          },
          {
            "name": "muscleGroup",
            "type": "string"
          },
          {
            "name": "sets",
            "type": {
              "vec": {
                "defined": {
                  "name": "set"
                }
              }
            }
          }
        ]
      }
    },
    {
      "name": "exercises",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "userid",
            "type": "string"
          },
          {
            "name": "exercises",
            "type": {
              "vec": {
                "defined": {
                  "name": "exercise"
                }
              }
            }
          }
        ]
      }
    },
    {
      "name": "routine",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "routineid",
            "type": "string"
          },
          {
            "name": "name",
            "type": "string"
          },
          {
            "name": "exercises",
            "type": {
              "vec": {
                "defined": {
                  "name": "exercise"
                }
              }
            }
          }
        ]
      }
    },
    {
      "name": "routines",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "userid",
            "type": "string"
          },
          {
            "name": "routines",
            "type": {
              "vec": {
                "defined": {
                  "name": "routine"
                }
              }
            }
          }
        ]
      }
    },
    {
      "name": "set",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "setNumber",
            "type": "u32"
          },
          {
            "name": "kg",
            "type": "f32"
          },
          {
            "name": "reps",
            "type": "u32"
          },
          {
            "name": "previous",
            "type": "string"
          },
          {
            "name": "done",
            "type": "bool"
          }
        ]
      }
    },
    {
      "name": "user",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "userid",
            "type": "string"
          },
          {
            "name": "username",
            "type": "string"
          },
          {
            "name": "email",
            "type": "string"
          },
          {
            "name": "password",
            "type": "string"
          }
        ]
      }
    },
    {
      "name": "workout",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "workoutid",
            "type": "string"
          },
          {
            "name": "exercises",
            "type": {
              "vec": {
                "defined": {
                  "name": "exercise"
                }
              }
            }
          },
          {
            "name": "date",
            "type": "i64"
          },
          {
            "name": "duration",
            "type": "u32"
          },
          {
            "name": "volume",
            "type": "u32"
          },
          {
            "name": "sets",
            "type": "u32"
          },
          {
            "name": "rewards",
            "type": "u32"
          }
        ]
      }
    },
    {
      "name": "workouts",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "userid",
            "type": "string"
          },
          {
            "name": "workouts",
            "type": {
              "vec": {
                "defined": {
                  "name": "workout"
                }
              }
            }
          }
        ]
      }
    }
  ]
};
