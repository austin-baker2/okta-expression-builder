import type { ELFunction } from "../types/expression";

export const functionRegistry: ELFunction[] = [
  // String Functions
  {
    name: "String.substringBefore",
    category: "String",
    description: "Returns the substring before the first occurrence of the separator.",
    parameters: [
      { name: "source", type: "String", required: true, description: "The source string" },
      { name: "separator", type: "String", required: true, description: "The separator to search for" },
    ],
    returnType: "String",
    example: 'String.substringBefore(user.email, "@")',
  },
  {
    name: "String.substringAfter",
    category: "String",
    description: "Returns the substring after the first occurrence of the separator.",
    parameters: [
      { name: "source", type: "String", required: true, description: "The source string" },
      { name: "separator", type: "String", required: true, description: "The separator to search for" },
    ],
    returnType: "String",
    example: 'String.substringAfter(user.email, "@")',
  },
  {
    name: "String.toUpperCase",
    category: "String",
    description: "Converts the string to uppercase.",
    parameters: [
      { name: "source", type: "String", required: true, description: "The string to convert" },
    ],
    returnType: "String",
    example: "String.toUpperCase(user.firstName)",
  },
  {
    name: "String.toLowerCase",
    category: "String",
    description: "Converts the string to lowercase.",
    parameters: [
      { name: "source", type: "String", required: true, description: "The string to convert" },
    ],
    returnType: "String",
    example: "String.toLowerCase(user.email)",
  },
  {
    name: "String.stringContains",
    category: "String",
    description: "Returns true if the string contains the specified substring.",
    parameters: [
      { name: "source", type: "String", required: true, description: "The string to search in" },
      { name: "searchString", type: "String", required: true, description: "The substring to find" },
    ],
    returnType: "Boolean",
    example: 'String.stringContains(user.email, "@company.com")',
  },
  {
    name: "String.append",
    category: "String",
    description: "Appends a string to the end of the source string.",
    parameters: [
      { name: "source", type: "String", required: true, description: "The base string" },
      { name: "suffix", type: "String", required: true, description: "The string to append" },
    ],
    returnType: "String",
    example: 'String.append(user.firstName, " ")',
  },
  {
    name: "String.replace",
    category: "String",
    description: "Replaces all occurrences of a search string with a replacement.",
    parameters: [
      { name: "source", type: "String", required: true, description: "The source string" },
      { name: "search", type: "String", required: true, description: "The string to find" },
      { name: "replacement", type: "String", required: true, description: "The replacement string" },
    ],
    returnType: "String",
    example: 'String.replace(user.email, "@old.com", "@new.com")',
  },
  {
    name: "String.replaceFirst",
    category: "String",
    description: "Replaces the first occurrence of a search string with a replacement.",
    parameters: [
      { name: "source", type: "String", required: true, description: "The source string" },
      { name: "search", type: "String", required: true, description: "The string to find" },
      { name: "replacement", type: "String", required: true, description: "The replacement string" },
    ],
    returnType: "String",
    example: 'String.replaceFirst(user.login, "old", "new")',
  },
  {
    name: "String.len",
    category: "String",
    description: "Returns the length of the string.",
    parameters: [
      { name: "source", type: "String", required: true, description: "The string to measure" },
    ],
    returnType: "Integer",
    example: "String.len(user.firstName)",
  },
  {
    name: "String.removeSpaces",
    category: "String",
    description: "Removes all spaces from the string.",
    parameters: [
      { name: "source", type: "String", required: true, description: "The string to clean" },
    ],
    returnType: "String",
    example: "String.removeSpaces(user.displayName)",
  },
  {
    name: "String.substring",
    category: "String",
    description: "Returns a substring from startIndex to endIndex.",
    parameters: [
      { name: "source", type: "String", required: true, description: "The source string" },
      { name: "startIndex", type: "Integer", required: true, description: "Start index (inclusive)" },
      { name: "endIndex", type: "Integer", required: true, description: "End index (exclusive)" },
    ],
    returnType: "String",
    example: "String.substring(user.login, 0, 5)",
  },
  {
    name: "String.stringSwitch",
    category: "String",
    description: "Multi-case matching: returns the value associated with the first matching expression, or a default value.",
    parameters: [
      { name: "source", type: "String", required: true, description: "The string to match" },
      { name: "defaultValue", type: "String", required: true, description: "Default if no match" },
      { name: "match1", type: "String", required: false, description: "First match value" },
      { name: "result1", type: "String", required: false, description: "Result if match1 matches" },
    ],
    returnType: "String",
    example: 'String.stringSwitch(user.department, "Unknown", "Engineering", "ENG", "Marketing", "MKT")',
  },
  {
    name: "String.regexMatch",
    category: "String",
    description: "Returns true if the string matches the regular expression pattern.",
    parameters: [
      { name: "source", type: "String", required: true, description: "The string to test" },
      { name: "pattern", type: "String", required: true, description: "Regular expression pattern" },
    ],
    returnType: "Boolean",
    example: 'String.regexMatch(user.email, ".*@company\\.com$")',
  },
  // Array Functions
  {
    name: "Arrays.add",
    category: "Array",
    description: "Adds an element to the array and returns the new array.",
    parameters: [
      { name: "array", type: "Array", required: true, description: "The source array" },
      { name: "element", type: "String", required: true, description: "Element to add" },
    ],
    returnType: "Array",
    example: 'Arrays.add(user.groups, "newGroup")',
  },
  {
    name: "Arrays.remove",
    category: "Array",
    description: "Removes an element from the array and returns the new array.",
    parameters: [
      { name: "array", type: "Array", required: true, description: "The source array" },
      { name: "element", type: "String", required: true, description: "Element to remove" },
    ],
    returnType: "Array",
    example: 'Arrays.remove(user.groups, "oldGroup")',
  },
  {
    name: "Arrays.clear",
    category: "Array",
    description: "Returns an empty array.",
    parameters: [
      { name: "array", type: "Array", required: true, description: "The array to clear" },
    ],
    returnType: "Array",
    example: "Arrays.clear(user.groups)",
  },
  {
    name: "Arrays.get",
    category: "Array",
    description: "Returns the element at the specified index.",
    parameters: [
      { name: "array", type: "Array", required: true, description: "The source array" },
      { name: "index", type: "Integer", required: true, description: "Zero-based index" },
    ],
    returnType: "String",
    example: "Arrays.get(user.groups, 0)",
  },
  {
    name: "Arrays.contains",
    category: "Array",
    description: "Returns true if the array contains the specified element.",
    parameters: [
      { name: "array", type: "Array", required: true, description: "The array to search" },
      { name: "element", type: "String", required: true, description: "Element to find" },
    ],
    returnType: "Boolean",
    example: 'Arrays.contains(user.groups, "admin")',
  },
  {
    name: "Arrays.size",
    category: "Array",
    description: "Returns the number of elements in the array.",
    parameters: [
      { name: "array", type: "Array", required: true, description: "The array to measure" },
    ],
    returnType: "Integer",
    example: "Arrays.size(user.groups)",
  },
  {
    name: "Arrays.flatten",
    category: "Array",
    description: "Flattens nested arrays into a single array.",
    parameters: [
      { name: "arrays", type: "Array", required: true, description: "Array of arrays to flatten" },
    ],
    returnType: "Array",
    example: "Arrays.flatten(user.nestedGroups)",
  },
  {
    name: "Arrays.toCsvString",
    category: "Array",
    description: "Converts an array to a comma-separated string.",
    parameters: [
      { name: "array", type: "Array", required: true, description: "The array to convert" },
    ],
    returnType: "String",
    example: "Arrays.toCsvString(user.groups)",
  },
  {
    name: "Arrays.toCommaSeparatedString",
    category: "Array",
    description: "Converts an array to a comma-separated string (alias of toCsvString).",
    parameters: [
      { name: "array", type: "Array", required: true, description: "The array to convert" },
    ],
    returnType: "String",
    example: "Arrays.toCommaSeparatedString(user.groups)",
  },
  {
    name: "Arrays.isEmpty",
    category: "Array",
    description: "Returns true if the array is empty or null.",
    parameters: [
      { name: "array", type: "Array", required: true, description: "The array to check" },
    ],
    returnType: "Boolean",
    example: "Arrays.isEmpty(user.groups)",
  },
  // Conversion Functions
  {
    name: "Convert.toInt",
    category: "Conversion",
    description: "Converts a string to an integer.",
    parameters: [
      { name: "source", type: "String", required: true, description: "The string to convert" },
    ],
    returnType: "Integer",
    example: 'Convert.toInt("42")',
  },
  {
    name: "Convert.toNum",
    category: "Conversion",
    description: "Converts a string to a number (double).",
    parameters: [
      { name: "source", type: "String", required: true, description: "The string to convert" },
    ],
    returnType: "Number",
    example: 'Convert.toNum("3.14")',
  },
  // Directory Functions
  {
    name: "hasDirectoryUser",
    category: "Directory",
    description: "Returns true if the user has a mapping in the specified directory (e.g., Active Directory).",
    parameters: [],
    returnType: "Boolean",
    example: "hasDirectoryUser()",
  },
  {
    name: "findDirectoryUser",
    category: "Directory",
    description: "Finds and returns the directory user object for the current user.",
    parameters: [],
    returnType: "Object",
    example: "findDirectoryUser()",
  },
  // Manager Functions
  {
    name: "getManagerUser",
    category: "Manager",
    description: "Returns the manager's Okta user profile for the current user.",
    parameters: [
      { name: "source", type: "String", required: true, description: "The user's manager attribute" },
    ],
    returnType: "Object",
    example: 'getManagerUser("user.manager")',
  },
  {
    name: "getManagerUpn",
    category: "Manager",
    description: "Returns the manager's UPN (User Principal Name).",
    parameters: [
      { name: "source", type: "String", required: true, description: "The user's manager attribute" },
    ],
    returnType: "String",
    example: 'getManagerUpn("user.manager")',
  },
  // Time Functions
  {
    name: "Time.now",
    category: "Time",
    description: "Returns the current date/time in ISO 8601 format.",
    parameters: [],
    returnType: "String",
    example: "Time.now()",
  },
  {
    name: "Time.fromWindowsToIso8601",
    category: "Time",
    description: "Converts a Windows timestamp to ISO 8601 format.",
    parameters: [
      { name: "timestamp", type: "String", required: true, description: "Windows timestamp" },
    ],
    returnType: "String",
    example: "Time.fromWindowsToIso8601(user.passwordLastChanged)",
  },
  {
    name: "Time.fromUnixToIso8601",
    category: "Time",
    description: "Converts a Unix timestamp to ISO 8601 format.",
    parameters: [
      { name: "timestamp", type: "String", required: true, description: "Unix timestamp" },
    ],
    returnType: "String",
    example: 'Time.fromUnixToIso8601("1609459200")',
  },
  {
    name: "Time.fromStringToIso8601",
    category: "Time",
    description: "Converts a date string to ISO 8601 format using the specified format pattern.",
    parameters: [
      { name: "dateString", type: "String", required: true, description: "The date string" },
      { name: "format", type: "String", required: true, description: "The date format pattern" },
    ],
    returnType: "String",
    example: 'Time.fromStringToIso8601("2026-01-15", "yyyy-MM-dd")',
  },
  {
    name: "Time.fromIso8601ToWindows",
    category: "Time",
    description: "Converts an ISO 8601 date to Windows timestamp format.",
    parameters: [
      { name: "isoDate", type: "String", required: true, description: "ISO 8601 date string" },
    ],
    returnType: "String",
    example: 'Time.fromIso8601ToWindows("2026-01-15T00:00:00Z")',
  },
  {
    name: "Time.fromIso8601ToUnix",
    category: "Time",
    description: "Converts an ISO 8601 date to Unix timestamp.",
    parameters: [
      { name: "isoDate", type: "String", required: true, description: "ISO 8601 date string" },
    ],
    returnType: "String",
    example: 'Time.fromIso8601ToUnix("2026-01-15T00:00:00Z")',
  },
  {
    name: "Time.delta",
    category: "Time",
    description: "Returns a date offset from the current time by the specified number of days.",
    parameters: [
      { name: "days", type: "Integer", required: true, description: "Number of days (positive or negative)" },
    ],
    returnType: "String",
    example: "Time.delta(-30)",
  },
  {
    name: "Time.within",
    category: "Time",
    description: "Returns true if the specified date is within the given number of days from now.",
    parameters: [
      { name: "dateString", type: "String", required: true, description: "ISO 8601 date to check" },
      { name: "days", type: "Integer", required: true, description: "Number of days threshold" },
    ],
    returnType: "Boolean",
    example: "Time.within(user.hireDate, 30)",
  },
];
