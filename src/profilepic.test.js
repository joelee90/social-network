import React from 'react';
import {render, fireEvent, waitForElement, wait} from '@testing-library/react';
import ProfilePic from "./profilepic";

test('renders default image when no url prop', async () => {
    const { container } = render(<ProfilePic url="/default.png"/>);
    expect(
        container.querySelector('img').src
    ).toContain('/default.png');
});

test('renders image with specified url', async () => {
    const { container } = render(<ProfilePic url="/whatever.png" />);
    expect(
        container.querySelector('img').src
    ).toContain("/whatever.png");
});

test('onClick props when img is clicked', async () => {
    const onClick = jest.fn();
    const { container } = render(<ProfilePic onClick={onClick} />);

    const img = container.querySelector('img');
    fireEvent.click(img);
    expect(
        onClick.mock.calls.length
    ).toBe(1);
});
