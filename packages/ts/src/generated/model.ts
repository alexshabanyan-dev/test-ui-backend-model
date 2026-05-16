/* eslint-disable */
/** Auto-generated from schema/model.schema.json — do not edit. */

/**
 * Test SSOT schema for UI + backend code generation
 */
export interface RootModel {
  /**
   * Contract version of the payload
   */
  version: string;
  account: Account;
}
/**
 * Main business object
 */
export interface Account {
  id: string;
  owner: Person;
  billingAddress?: Address;
  teams?: Team[];
}
/**
 * A person referenced from account or team
 */
export interface Person {
  id: string;
  name: string;
  role: "admin" | "user";
}
/**
 * Postal address
 */
export interface Address {
  city: string;
  country: string;
}
/**
 * Team inside an account
 */
export interface Team {
  title: string;
  members: Person[];
}
