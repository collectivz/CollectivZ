import React from "react";
import renderer from 'react-test-renderer';
import List from "./List";



describe('', function () {
    const elems = [{name: 'Group1', type: 'group'}];

    it(`group snapshot`, function () {
        const json = renderer.create(<List data={elems}  type="group" emptyListString="Aucun group créé."><div /></List>).toJSON();
        expect(json).toMatchSnapshot();
    });
});