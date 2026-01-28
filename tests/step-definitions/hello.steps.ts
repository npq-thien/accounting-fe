import { Given, Then } from '@cucumber/cucumber';
import assert from 'assert';

let name = '';

Given('the user name is {string}', function (userName: string) {
  name = userName;
});

Then('the system should say {string}', function (expectedGreeting: string) {
  const actualGreeting = `Hello ${name}`;
  assert.strictEqual(actualGreeting, expectedGreeting);
});