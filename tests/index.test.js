// // // Calculates how old someone is and depending on the year this test could pass or fail
import { myCollection, client } from './connection';
import { MongoClient } from "mongodb";
import { DeleteUserData, InsertRegistrationData, LoginData, AddUserPost, IncrementPostLikes, IncrementPostDisLikes, AddPostComment } from './functions';
import add from './sum'

describe('sum.js', function () {
    test('return sum of 2 numbers', function () {
        expect(add(1, 2)).toBe(3)
    })
})


describe('functions.js', function () {
    test('should contain important values in object', async function () {
        var object = await InsertRegistrationData(myCollection, 'west@gmail.com', 'Jonas', 'Lekgau', 'west', 'West1327')
        expect(object).toEqual(expect.objectContaining({
            email: 'west@gmail.com', fullName: 'Jonas Lekgau', username: 'west', password: 'West1327'
        }));
    });
})

describe('functions.js', function () {
    test('Should return an object containing the passed email if it exists in the database', async () => {
        const object = await LoginData(myCollection, 'west@gmail.com')

        expect(object).toEqual(expect.objectContaining({
            email: 'west@gmail.com'
        }));
    }

    );
});

describe('functions.js', function () {
    test('Should return an object containing the passed email\'s posts', async () => {
        const object = await AddUserPost(myCollection, "west", "Hey You")
        expect(object).toEqual(expect.objectContaining({
            user_post: "Hey You",
            likes: expect.any(Number),
            dislikes: expect.any(Number),
            comments: expect.any(Array)
        }
        ));
    });
});


describe('functions.js', function () {
    test('Should return an object containing the posts incremented likes', async () => {
        const object = await IncrementPostLikes(myCollection, "Hey You")
        expect(object).toEqual(expect.objectContaining({
            user_post: "Hey You",
            likes: expect.any(Number),
            dislikes: expect.any(Number),
            comments: expect.any(Array)
        }));
    });
});



describe('functions.js', function () {
    test('Should return an object containing the posts incremented dislikes', async () => {
        const object = await IncrementPostDisLikes(myCollection, "Hey You")
        expect(object).toEqual(expect.objectContaining({
            user_post: "Hey You",
            likes: expect.any(Number),
            dislikes: expect.any(Number),
            comments: expect.any(Array)

        }));
    });
});

describe('functions.js', function () {
    test('Should return an object containing the posts incremented dislikes', async () => {
        const object = await AddPostComment(myCollection, "Hey You")
        expect(object).toEqual(expect.objectContaining({
            comment: "Hey You",
            likes: expect.any(Number),
            dislikes: expect.any(Number),


        }));
    });
});


describe('functions.js', function () {
    test('Should delete the passed email data and return 0', async () => {
        const array = await DeleteUserData(myCollection, 'babe@gmail.com')
        expect(array).toHaveLength(0)
    });
});


// // // // test('should contain important value in nested object', () => {
// // // //     const nestedObject = {
// // // //         ignore: 'ignore',
// // // //         payload: {
// // // //            important: 'important',
// // // //            ignore: 'ignore',
// // // //         },
// // // //     };

// // // //     expect(nestedObject).toEqual(
// // // //         expect.objectContaining({
// // // //             payload: expect.objectContaining({
// // // //                 important: 'important',
// // // //             }),
// // // //         })
// // // //     );
// // // // });

// // // /*
// // // test('should contain important value in object', () => {
// // //     const object = {
// // //         important: 'important',
// // //         ignore: 'ignore',
// // //     };

// // //     expect(object).toEqual(expect.objectContaining({
// // //         important: 'important'
// // //     }));
// // // d});
// // // */


// // // // Nested object partial matching
// // // // If you are looking for a value in a nested object, you can also nest objectContaining.

// // // // test('should contain important value in nested object', () => {
// // // //     const nestedObject = {
// // // //         ignore: 'ignore',
// // // //         payload: {
// // // //            important: 'important',
// // // //            ignore: 'ignore',
// // // //         },
// // // //     };

// // // //     expect(nestedObject).toEqual(
// // // //         expect.objectContaining({
// // // //             payload: expect.objectContaining({
// // // //                 important: 'important',
// // // //             }),
// // // //         })
// // // //     );
// // // // });


// // // // The arrayContaining matcher will also work regardless of the order of your array.

// // // // test('should contain important values in array, in any order', () => {
// // // //     const array = [
// // // //         'ignore',
// // // //         'important',
// // // //         'alsoImportant',
// // // //         'veryImportant',
// // // //         'veryVeryImportant',
// // // //     ];

// // // //     expect(array).toEqual(expect.arrayContaining(
// // // //         ['veryVeryImportant', 'veryImportant', 'alsoImportant', 'important']
// // // //     ));
// // // // });

// // // /*
// // // test('should contain only the important values in array, in any order', () => {
// // //     const array = [
// // //         'important',
// // //         'alsoImportant',
// // //         'veryImportant',
// // //     ];

// // //     expect(array).toEqual(expect.arrayContaining(
// // //         ['veryImportant', 'alsoImportant', 'important']
// // //     ));
// // //     expect(array).toHaveLength(3);
// // // });
// // // */