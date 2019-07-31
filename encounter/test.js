// jest.mock('./twApi');
//
// test('', () => {
//     twApi.getTweets.mockResolvedValue({
//
//     })
// })

// const myMockFunc = jest.fn((function() {re}));
//
// myMockFunc(10, 20);
//
// myMockFunc.calls.length;
// myMockFunc.calls[0];
//
//
//
// import axios from './axios';
//
// jest.mock('./axios');
//
// test('', () => {
//     axios.get.mockResolvedValue({
//         data: {}
//     })
//
// })

import React from 'react';
import {render} from '@testing-library/react';
import App from './app';
import axios from './axios';

jest.mock('./axios');

test('app renders correctly', async () => {
    axios.get.mockResolvedValue({
        data: {
            id: 1,
            first: 'funky',
            last: 'chicken',
            url: '/funkychicken.gif'
        }
    })

    const {container} = render(<App />);
    expect(container.innerHTML).toBe('');
    await waitForElement (()=> contain.querySelector('div'));
    console.log(container.innerHTML);

})


import React from 'react';
import {render} from '@testing-library/react';
import ProfilePic from './profilepic';

test('renders default pic when there is none', async () => {
    const {container} = render(<ProfilePic />);
    expect(
        container.querySelector('img').src
    ).toContain('/default.jpg');
})
