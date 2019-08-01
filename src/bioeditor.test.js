import React from 'react';
import axios from "./axios";
import {render, waitForElement, fireEvent} from '@testing-library/react';
import BioEditor from "./bioeditor";



jest.mock('./axios');

test('when no bio is passed to it, add-btn is rendered', async () => {
    const { container } = render(<BioEditor/>);
    let button = await waitForElement(() => container.querySelector("button"));
    expect(
        button.innerHTML
    ).toContain(
        "Add your bio!"
    );
});

test('when a bio is passed to it, edit-btn is rendered', async () => {
    const { container } = render(<BioEditor bio="blah blah"/>);
    let button = await waitForElement(() => container.querySelector("button"));
    expect(
        button.innerHTML
    ).toContain(
        "Edit your bio!"
    );
});

test('clicking edit btn causes a textarea and save btn to be rendered',
    async () => {
        const { container } = render(<BioEditor bio="blah"/>);
        let button = await waitForElement(()=> container.querySelector("button"));
        fireEvent.click(button);
        expect(container.innerHTML).toContain("textarea");
        let button2 = await waitForElement(()=> container.querySelector("button"));
        expect(button2.innerHTML).toContain("Save");
    }
);

test('clicking add btn causes a textarea and save btn to be rendered',
    async () => {
        const { container } = render(<BioEditor />);
        let button = await waitForElement(()=> container.querySelector("button"));
        fireEvent.click(button);
        expect(container.innerHTML).toContain("textarea");
        let button2 = await waitForElement(()=> container.querySelector("button"));
        expect(button2.innerHTML).toContain("Save");
    }
);
