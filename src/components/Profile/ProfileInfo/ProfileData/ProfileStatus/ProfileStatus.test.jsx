import React from "react";
import {create} from 'react-test-renderer';
import ProfileStatus from "./ProfileStatus";
import TestRenderer from 'react-test-renderer';

describe('ProfileStatus component', () => {
    const {act} = TestRenderer;
    test('status from props should be in the state', () => {
        let component;
        act(() => {
            component = create(<ProfileStatus status={'my status'}/>)
        })
        const instance = component.root;
        expect(instance.props.status).toBe('my status');
    });

})