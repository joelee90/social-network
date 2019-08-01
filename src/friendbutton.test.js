import React from 'react';
import {render, fireEvent, waitForElement, wait} from '@testing-library/react';
import FriendButton from './friendbutton';
import axios from './axios';

jest.mock('./axios');

test('Add friend button rendering before any req to anyone', async () => {
    axios.get.mockResolvedValue({
        data: {
            buttonText: "Add Friend"
        }
    });
    const { container } = render(<FriendButton />);
    expect(container.innerHTML).toContain("div");
});
