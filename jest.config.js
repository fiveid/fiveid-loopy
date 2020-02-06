const pathsToIgnore = ["<rootDir>/node_modules/"];

module.exports = {
  roots: ["<rootDir>/src"],
  transform: {
    "^.+\\.tsx?$": "ts-jest"
  },
  testPathIgnorePatterns: pathsToIgnore,
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  globals: {
    "ts-jest": {
      diagnostics: false
    }
  },
  coverageReporters: ["text", "json", "cobertura"]
};
