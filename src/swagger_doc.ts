export function swagger_doc(url: string) {
  return {
    definition: {
      openapi: "3.0.0",
      info: {
        title: "Doc API",
        version: "1.0.0",
        description: "A simple express library API",
      },
      servers: [
        {
          url,
        },
      ],
    },
    apis: [
      "./src/modules/creations/router.ts",
      "./src/modules/elements/router.ts",
      "./src/modules/fonts/router.ts",
      "./src/modules/resources/router.ts",
      "./src/modules/templates/router.ts",
      "./src/modules/uploads/router.ts",
      "./src/modules/users/router.ts",
    ],
  }
}
