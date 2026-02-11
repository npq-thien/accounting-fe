import { Before, Given, Then, When } from '@cucumber/cucumber';
import assert from 'assert';

// Mock AuthProvider functionality for testing
interface User {
  username: string;
  role: string;
}

interface TestWorld {
  user: User | null;
  loginSuccess: boolean;
  error: string | null;
}

// Global test world to maintain state between steps
let testWorld: TestWorld;

// Simulate the login function from AuthProvider
async function login(username: string, password: string): Promise<boolean> {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 100));

  // Match the actual authentication logic from AuthProviders.tsx
  if (username === "admin" && password === "admin") {
    testWorld.user = {
      username: "admin",
      role: "admin",
    };
    return true;
  } else if (username === "user" && password === "user") {
    testWorld.user = {
      username: "user",
      role: "user",
    };
    return true;
  }

  return false;
}

function logout(): void {
  testWorld.user = null;
}

function getCurrentUser(): User | null {
  return testWorld.user;
}

// Hooks
Before(function () {
  // Reset test world before each scenario
  testWorld = {
    user: null,
    loginSuccess: false,
    error: null,
  };
});

// Step Definitions
Given('the system is ready', function () {
  // System initialization - could be used to mock API, setup test data, etc.
  assert.ok(true, 'System should be ready');
});

Given('I am logged in as {string} with password {string}', async function (username: string, password: string) {
  const success = await login(username, password);
  assert.strictEqual(success, true, `Should successfully login with ${username}`);
  testWorld.loginSuccess = success;
});

When('I login with username {string} and password {string}', async function (username: string, password: string) {
  try {
    testWorld.loginSuccess = await login(username, password);
    testWorld.error = null;
  } catch (error) {
    testWorld.loginSuccess = false;
    testWorld.error = error instanceof Error ? error.message : 'Unknown error';
  }
});

When('I check the current user', function () {
  testWorld.user = getCurrentUser();
});

When('I logout', function () {
  logout();
});

Then('the login should be successful', function () {
  assert.strictEqual(testWorld.loginSuccess, true, 'Login should be successful');
  assert.notStrictEqual(testWorld.user, null, 'User should be set after successful login');
});

Then('the login should fail', function () {
  assert.strictEqual(testWorld.loginSuccess, false, 'Login should fail');
  assert.strictEqual(testWorld.user, null, 'User should be null after failed login');
});

Then('the current user should be {string}', function (expectedUsername: string) {
  assert.notStrictEqual(testWorld.user, null, 'User should not be null');
  assert.strictEqual(
    testWorld.user?.username,
    expectedUsername,
    `Current user should be ${expectedUsername}, but got ${testWorld.user?.username}`
  );
});

Then('the current user role should be {string}', function (expectedRole: string) {
  assert.notStrictEqual(testWorld.user, null, 'User should not be null');
  assert.strictEqual(
    testWorld.user?.role,
    expectedRole,
    `Current user role should be ${expectedRole}, but got ${testWorld.user?.role}`
  );
});

Then('there should be no logged in user', function () {
  assert.strictEqual(testWorld.user, null, 'User should be null after logout');
});

