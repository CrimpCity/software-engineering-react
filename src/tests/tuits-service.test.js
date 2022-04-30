import 'regenerator-runtime/runtime'
import { createUser, deleteUsersByUsername, findAllUsers, findUserById } from "../services/users-service";
import { findAllTuits, findTuitById, findTuitByUser, createTuit, updateTuit, deleteTuit } from "../services/tuits-service";

describe('can create tuit with REST API', () => {
  let newUser;
  let newTuit
  const testUser = {
    username: 'tester',
    password: 'tester',
    email: "test@test.com"
  }
  const testTuit = {
    tuit: "this is a test tuit"
  }

  // setup test before running test
  beforeAll(async () => {
    // remove any/all users to make sure we create it in the test
    await deleteUsersByUsername(testUser.username);
    // can't delete tuit by id because we don't know the id yet
    // await deleteTuit(newTuit._id);
    // create a new user who will create a tuit
    newUser = await createUser(testUser);

  })

  // clean up after test runs
  afterAll(async () => {
    // remove any data we created
    await deleteUsersByUsername(testUser.username);
    await deleteTuit(newTuit._id);
  })
  test('create and find new tuit from REST API', async () => {
    // create new tuit for the test user
    newTuit = await createTuit(newUser._id, testTuit);
    // find the tuit to execute the populate
    const createdTuit = await findTuitById(newTuit._id);
    expect(createdTuit.tuit).toEqual(testTuit.tuit);
    expect(createdTuit.postedBy._id).toEqual(newUser._id);
  });
});

describe('can delete tuit wtih REST API', () => {
  let newUser;
  let newTuit
  const testUser = {
    username: 'tester',
    password: 'tester',
    email: "test@test.com"
  }
  const testTuit = {
    tuit: "this is a test tuit"
  }

  // setup test before running test
  beforeAll(async () => {
    // remove any/all users to make sure we create it in the test
    await deleteUsersByUsername(testUser.username);
    // can't remove a tuit who's ID we don't know so can't remove newTuit from DB
    // create a new user who will create a tuit
    newUser = await createUser(testUser);
    // create new tuit which will be deleted
    newTuit = await createTuit(newUser._id, testTuit);
  })

  // clean up after test runs
  afterAll(async () => {
    // remove any data we created
    await deleteUsersByUsername(testUser.username);
    // this is being tested so kind of presumptuous to expect it to work
    await deleteTuit(newTuit._id);
  })
  test('delete tuit using REST API', async () => {
    // delete the new tuit by it's id
    const status = await deleteTuit(newTuit._id);

    // verify we deleted at least one tuit by it's id
    expect(status.deletedCount).toBeGreaterThanOrEqual(1);

  });
});

describe('can retrieve a tuit by their primary key with REST API', () => {
  let newUser;
  let newTuit
  const testUser = {
    username: 'tester',
    password: 'tester',
    email: "test@test.com"
  }
  const testTuit = {
    tuit: "this is a test tuit"
  }

  // setup test before running test
  beforeAll(async () => {
    // remove any/all users to make sure we create it in the test
    await deleteUsersByUsername(testUser.username);
    // can't remove a tuit who's ID we don't know so can't remove newTuit from DB
    // create a new user who will create a tuit
    newUser = await createUser(testUser);
    // create new tuit for the test user
    newTuit = await createTuit(newUser._id, testTuit);
  })

  // clean up after test runs
  afterAll(async () => {
    // remove any data we created
    await deleteUsersByUsername(testUser.username);
    await deleteTuit(newTuit._id);
  })
  test('find new tuit from REST API', async () => {
    // find the tuit to execute the populate
    const createdTuit = await findTuitById(newTuit._id);
    expect(createdTuit.tuit).toEqual(testTuit.tuit);
    expect(createdTuit.postedBy._id).toEqual(newUser._id);
  });
});


describe('can retrieve all tuits with REST API', () => {
  let newUser;
  let newTuit1;
  let newTuit2;
  let newTuit3;

  const testUser = {
    username: 'tester',
    password: 'tester',
    email: "test@test.com"
  };

  const testTuit1 = {
    tuit: "Test tuit #1"
  };
  const testTuit2 = {
    tuit: "Test tuit #2"
  };
  const testTuit3 = {
    tuit: "Test tuit #3"
  };

  // for convenience let's put the tuits in a list
  const testTuits = [testTuit1, testTuit2, testTuit3];


  // setup test before running test
  beforeAll(async () => {
    // remove any/all users to make sure we create it in the test
    await deleteUsersByUsername(testUser.username);
    // can't remove a tuit who's ID we don't know so can't remove newTuit from DB
    // create a new user who will create a tuit
    newUser = await createUser(testUser);
    // create new tuit for the test user
    newTuit1 = await createTuit(newUser._id, testTuit1);
    newTuit2 = await createTuit(newUser._id, testTuit2);
    newTuit3 = await createTuit(newUser._id, testTuit3);
  })

  // clean up after test runs
  afterAll(async () => {
    // remove any data we created
    await deleteUsersByUsername(testUser.username);
    await deleteTuit(newTuit1._id);
    await deleteTuit(newTuit2._id);
    await deleteTuit(newTuit3._id);
  })
  test('create and find new tuit from REST API', async () => {
    // retrieve all the tuits
    const allTuits = await findAllTuits();

    // there should be a minimum number of 3 tuits
    expect(allTuits.length).toBeGreaterThanOrEqual(3);

    // let's check all the tuits of the user we created
    const userTuits = await findTuitByUser(newUser._id);
    // compare tuits from database to test tuits
    expect(userTuits[0].tuit).toEqual(testTuit1.tuit);
    expect(userTuits[0].postedBy._id).toEqual(newUser._id);
    expect(userTuits[1].tuit).toEqual(testTuit2.tuit);
    expect(userTuits[1].postedBy._id).toEqual(newUser._id);
    expect(userTuits[2].tuit).toEqual(testTuit3.tuit);
    expect(userTuits[2].postedBy._id).toEqual(newUser._id);
  });
});