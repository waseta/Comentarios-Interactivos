import { describe, expect, it, test } from 'vitest' 
import data from '@src/data.json'


describe('data json', () => {

    test('show that data is valid', () => {
        expect(data).toBeTruthy()
        expect(data).toBeTypeOf('object')
    })

    test('show that this has current user', () => {
        expect(data).toHaveProperty('currentUser')
        expect(data.currentUser).toBeTruthy()
        expect(data.currentUser).toHaveProperty('username')
        expect(data.currentUser[ 'username']).toBeTypeOf('string')
    })
    test('show that this has comments', () => {
        expect(data).toHaveProperty('comments')
        expect(data.comments).toBeTruthy()
        expect(data.comments).toBeTypeOf('object')
        expect(data.comments).toHaveLength(2)
    })

    })
